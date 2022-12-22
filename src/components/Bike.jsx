import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { useStateValue } from '../context/contextProvider'
import { getAllBike, saveBike } from '../utils.js/firebasefunctions'
import { actionType } from '../context/reducer'
import Loader from './Loader'
import { locations } from '../utils.js/Data'

const Bike = () => {
const [name, setname] = useState('')
  const [number, setnumber] = useState('')
  const [message, setmessage] = useState('')
  const [location, setlocation] = useState('')
  const [field, setfield] = useState(false)
  const [alertstatus, setalertstatus] = useState("danger")
  const [msg, setmsg] = useState(null)
  const [isloading, setisloading] = useState(false)
  const [{bikedetails},dispatch] = useStateValue();

  var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
  var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();

  const fetchPayments= async()=>{
    await getAllBike().then(data=>{
      dispatch({
        type:actionType.SET_BIKE_DETAIL,
        bikedetails:data
      })
    })
  }

  const saveDetails=()=>{
    setisloading(true);
    try {
      if (!name|| !number ||!message ||!location ) {
      setfield(true)
      setmsg(`Required field can't be empty`)
      setalertstatus("danger")
      setTimeout(() => {
        setfield(false)
        setisloading(false)
      }, 1000);
      }else{
        const data={
          id:`${Date.now()}`,
          name:name,
          number:number,
          message:message,
          location:location,
          createdAt:[current_date,current_time],
        }
        saveBike(data);
        setisloading(false)
        setfield(true)
        setmsg("Data uploaded successfully")
        clearData();
        setalertstatus("success")
        setTimeout(() => {
         setfield(false) 
        
        }, 4000);
      }
      
    } catch (error) {
      setfield(true)
      setmsg('Error while uploading : Try again ')
      setalertstatus("danger")
      setTimeout(() => {
        setfield(false)
        setisloading(false)
      }, 4000);
    }
    fetchPayments();
  }

  const clearData=()=>{
    setname("");
    setnumber("");
    setmessage("");
    setlocation("");
  }

  return (
    <form className='w-full min-h-screen p-5'>
    {field && (
      <motion.p 
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      className={` w-full p-2 rounded-lg text-center text-lg font-semibold ${alertstatus==='danger' ? 'bg-red-400 text-red-800':' bg-emerald-400 text-emerald-800'}`}>
      {msg}
      </motion.p>
    )}
    {isloading && <Loader/>
    }
    <div class="mb-6">
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
      <input 
      onChange={(e)=>{setname(e.target.value)}}
      value={name}
      type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your name" required/>
    </div>
    <div class="mb-6">
      <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone number</label>
      <input 
      onChange={(e)=>{setnumber(e.target.value)}}
      value={number}
      type="phone" id="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your number" required/>
    </div>
    <div className='w-full'>
      <select onChange={(e)=>{setlocation(e.target.value)}}
      className=' outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
      >
        <option value='select categories'  className='bg-white' >Select Categories</option>
        {locations && locations.map((item,idx)=>(
          <option key={idx} className=' text-base border-0 outline-none capitalize bg-white text-headingColor' value={item.name}>
          {item.name}
          </option>
        ))}
      </select>
      </div>
    <div class="mb-6">  
    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Home address</label>
    <textarea 
    onChange={(e)=>{setmessage(e.target.value)}}
    value={message}
    id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your address  here..."></textarea>
    </div>
    <div className='flex items-center justify-center'>
    <button 
    onClick={saveDetails}
    type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Details</button>
    </div>
    </form>
    
  )
}

export default Bike