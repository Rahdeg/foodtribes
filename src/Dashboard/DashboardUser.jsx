import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/contextProvider";
import { actionType } from "../context/reducer";
import { getAllUser } from "../utils.js/firebasefunctions";
import { Usercards } from "./Cards";



const DashboardUser = () => {
  // eslint-disable-next-line no-unused-vars
  const [{allUsers,user}, dispatch] = useStateValue();
  const [searchfield, setsearchfield] = useState('');
  const [isfocus, setisfocus] = useState(false);

  useEffect(() => {
    if (!allUsers) {
      getAllUser().then((data)=>{
        dispatch({
          type: actionType.SET_ALLUSERS,
          allUsers: data,
         })
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtereditem = allUsers?.filter(item =>{
    return item.name.toLowerCase().includes(searchfield.toLowerCase());
  })
  
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/*filter*/}
      <div className='w-full flex items-center justify-center gap-20'>
      <input 
      className={`w-52 px-4 py-2 border ${isfocus? " border-gray-500 shadow-md" : "border-gray-300"} rounded-md bg-transparent outline-none duration-500 transition-all ease-in-out text-base text-textColor font-semibold`}
      type='text' placeholder='search here ...' value={searchfield} 
      onChange={(e)=>setsearchfield(e.target.value)}
      onBlur={()=>setisfocus(false)}
      onFocus={()=>setisfocus(true)}
      />
      <AiOutlineClear className=' text-3xl text-textColor cursor-pointer'/>
      </div>
      {/*tabular data form*/}
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        {/*table count for user*/}
        <div className="absolute top-4 left-4">
          <p className="text-sm font-semibold">
            Count :
            <span className="text-xl font-bold text-textColor">
              {allUsers?.length}
            </span>
          </p>
        </div>
        {/*table heading*/}
        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Image
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Name
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Email
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            ID
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Created
          </p>
        </div>
        {/*table content*/}
        {
          filtereditem && (
            filtereditem.map((data,idx)=>(
              <Usercards data={data} idx={idx} />
              
            ))
          )
        }
      </div>
    </div>
  );
};

export default DashboardUser;
