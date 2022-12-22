import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../context/contextProvider';
import { actionType } from '../../context/reducer';
import { getAllUser } from '../../utils.js/firebasefunctions';
import { MdDelete } from 'react-icons/md';


const Usercards = (data, idx) => {
  const [{ allUsers,user }, dispatch] = useStateValue();
  

  useEffect(() => {
    if (!allUsers) {
      getAllUser().then((data)=>{
        dispatch({
          type: actionType.SET_ALLUSERS,
          allUsers: data,
         })
      })
    }
  }, [])
  
  return (
    <motion.div 
    key={idx}
    className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md">
    {
      data.data.email !== user?.email && (
        <motion.div
         
        whileTap={{scale:0.75}}
        className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
        >
        <MdDelete className=" text-xl text-red-400 hover:text-red-500"/>
        </motion.div>
      )
    }
    
      {/*user Image*/}
      <div
        className="w-275 min-w-[160px] flex items-center justify-center"
        
      >
        <img
          src={data.data.image}
          alt=""
          className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>
      {/*user Details*/}
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {data.data.name}
      </p>
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {data.data.email}
      </p>
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {data.data.id}
      </p>
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
      {data.data.createdAt[0]}<br/><span>{data.data.createdAt[1]}</span>
      </p>
    </motion.div>
     )
}

export default Usercards