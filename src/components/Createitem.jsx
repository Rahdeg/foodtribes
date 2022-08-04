import React, { useState } from 'react'
import {motion} from 'framer-motion'
import {MdFastfood,MdCloudUpload,MdDelete, MdFoodBank, MdAttachMoney} from 'react-icons/md'
import { categories } from '../utils.js/Data'
import Loader from './Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../Firebase.config'
import { getAllItems, saveItem } from '../utils.js/firebasefunctions'
import { useStateValue } from '../context/contextProvider'
import { actionType } from '../context/reducer'

const Createitem = () => {

  const [title, settitle] = useState('')
  const [calories, setcalories] = useState('')
  const [price, setprice] = useState('')
  const [category, setcategory] = useState(null)
  const [imageasset, setimageasset] = useState(null)
  const [field, setfield] = useState(false)
  const [alertstatus, setalertstatus] = useState("danger")
  const [msg, setmsg] = useState(null)
  const [isloading, setisloading] = useState(false)
  const [{foodItems},dispatch] = useStateValue();

  const uploadImage=(e)=>{
    setisloading(true);
    const imageFile= e.target.files[0];
    const storageRef= ref(storage,`Images/${Date.now()}-${imageFile.name}`)
    const uploadTask= uploadBytesResumable(storageRef,imageFile);
    uploadTask.on('state_changed',(snapshot)=>{
    const uploadProgress =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    },(error)=>{
      console.log(error);
      setfield(true)
      setmsg('Error while uploading : Try again ')
      setalertstatus("danger")
      setTimeout(() => {
        setfield(false)
        setisloading(false)
      }, 4000);
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl=>{
        setimageasset(downloadUrl);
        setisloading(false)
        setfield(true)
        setmsg("Image uploaded successfully")
        setalertstatus("success")
        setTimeout(() => {
         setfield(false) 
        }, 4000);
      })
    })
  }

  const fetchData= async()=>{
    await getAllItems().then(data=>{
      dispatch({
        type:actionType.SET_FOOD_ITEMS,
        foodItems:data
      })
    })
  }

  const deleteImage =()=>{
    setisloading(true);
    const deleteRef= ref(storage,imageasset);
    deleteObject(deleteRef).then(()=>{
      setimageasset(null)
      setisloading(false)
      setfield(true)
      setmsg("Image deleted successfully")
        setalertstatus("success")
        setTimeout(() => {
         setfield(false) 
        }, 4000);
    })
  }

  const saveDetails=()=>{
    setisloading(true);
    try {
      if (!title|| !calories ||!price || !imageasset ||!category) {
      setfield(true)
      setmsg(`Required field can't be empty`)
      setalertstatus("danger")
      setTimeout(() => {
        setfield(false)
        setisloading(false)
      }, 4000);
      }else{
        const data={
          id:`${Date.now()}`,
          title:title,
          imageUrl:imageasset,
          category:category,
          calories:calories,
          qty:1,
          price:price
        }
        saveItem(data);
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
      console.log(error);
      setfield(true)
      setmsg('Error while uploading : Try again ')
      setalertstatus("danger")
      setTimeout(() => {
        setfield(false)
        setisloading(false)
      }, 4000);
    }
    fetchData()
  }

  const clearData=()=>{
    settitle("");
    setimageasset(null);
    setcalories("");
    setprice("");
   setcategory("select categories")
  }


  return (
    <div className='w-full min-h-screen flex items-center justify-center '>
    <div className='w-[90%] md:w-[75%] border border-gray-500 rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
      {field && (
        <motion.p 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        className={` w-full p-2 rounded-lg text-center text-lg font-semibold ${alertstatus==='danger' ? 'bg-red-400 text-red-800':' bg-emerald-400 text-emerald-800'}`}>
        {msg}
        </motion.p>
      )}
      <div className='w-full py-2 border border-gray-300 flex items-center gap-2'>
      <MdFastfood className=' text-xl text-gray-700'/> 
      <input 
      onChange={(e)=>{settitle(e.target.value)}}
      className='w-full h-full text-lg bg-transparent  outline-none border-none placeholder:text-gray-500  text-textColor'
      type='text' required placeholder='give me a title' value={title}/>
      </div>
      <div className='w-full'>
      <select onChange={(e)=>{setcategory(e.target.value)}}
      className=' outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
      >
        <option value='select categories'  className='bg-white' >Select Categories</option>
        {categories && categories.map((item,idx)=>(
          <option key={idx} className=' text-base border-0 outline-none capitalize bg-white text-headingColor' value={item.urlParamName}>
          {item.name}
          </option>
        ))}
      </select>
      </div>
      <div className='flex items-center justify-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
          {isloading ? <Loader/> :<>
            {!imageasset ? <>
              <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
              <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
              <MdCloudUpload className=' text-gray-500 text-3xl hover:text-gray-700'/>
              <p className='text-gray-500  hover:text-gray-700'>Click here to upload</p>
              </div>
              <input type='file' accept='image/*' name="uploadImage" onChange={uploadImage} className='w-0 h-0'/>
              </label>
              </> : <>
              <div className=" relative h-full">
                <img 
                src={imageasset} 
                alt="" 
                className=" w-full h-full object-cover"/>
                <button type='button' className=' absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out' onClick={deleteImage}>
                <MdDelete className=' text-white'/>
                </button>
              </div>
              </>}
          </>}
      </div>
      <div className='w-full flex flex-col  md:flex-row items-center gap-2'>
            <div className='w-full py-2 border-b border-gray-200 flex items-center gap-2'>
            <MdFoodBank className=' text-gray-700 text-2xl'/>
            <input 
            value={calories}
            onChange={(e)=>{setcalories(e.target.value)}}
            className=' w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' type='text' required placeholder='calories'/>
            </div>
      
      
            <div className='w-full py-2 border-b border-gray-200 flex items-center gap-2'>
            <MdAttachMoney className=' text-gray-700 text-2xl'/>
            <input 
            value={price}
            onChange={(e)=>{setprice(e.target.value)}}
            className=' w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' type='text' required placeholder='price'/>
            </div>

            </div>
    
      <div className='w-full flex items-center'>
      <button className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'onClick={saveDetails} type='button'>Save</button>
      </div>
    </div>
    </div>
  )
}

export default Createitem