import React, { useState } from 'react'
import logo from '../img/logo.png'
import {MdShoppingBasket,MdAdd,MdLogout} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import users from '../img/avatar.png'
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {app} from '../Firebase.config'
import { useStateValue } from '../context/contextProvider'
import { actionType } from '../context/reducer'

const Header = () => {

  const firebaseAuth= getAuth(app);
  const provider= new GoogleAuthProvider();

  const [{user},dispatch] = useStateValue();
  const [ismenu, setismenu] = useState(false)

const login= async ()=>{
  if (!user) {
    const {user:{refreshToken,providerData}}= await signInWithPopup(firebaseAuth,provider)
  dispatch({
    type:actionType.SET_USER,
    user:providerData[0],
  })
  localStorage.setItem('user',JSON.stringify(providerData[0]))
  } else {
    setismenu(!ismenu)
  }
  
}

  return (
    <header className='fixed z-50 w-screen p-6 px-16'>
    { /*desktop..tablet*/}
    <div className='hidden md:flex w-full h-full items-center justify-between'>
    <Link to={'/'} 
    className=' flex items-center gap-2'>
      <motion.img 
      whileTap={{scale:0.6}}
      src={logo} alt='logo' className=' w-8 object-cover'/>
      <p className=' text-headingColor text-xl font-bold'>City</p>
    </Link>
    <div className='flex items-center gap-8'>
    <ul className='flex items-center gap-8 '>
    <li className=' text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
    <li className=' text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
    <li className=' text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
    <li className=' text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Services</li>
  </ul>
  <div className='reltive flex items-center justify-center'>
  <MdShoppingBasket className=' text-textColor text-2xl cursor-pointer'/>
  <div className='w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
  <p className=' text-xs font-semibold text-white'>2</p>
  </div> 
  </div>
  <div className='relative'>
  <motion.img 
  whileTap={{scale:0.6}}
  src={user?user.photoURL:users}  className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
  onClick={login}
  />
 {ismenu && (<motion.div 
  initial={{opacity:0,scale:0.6}}
  animate={{opacity:1,scale:1}}
  exit={{opacity:0,scale:0.6}}
  className='w-40 bg-gray-50 shadow-xl  rounded-lg flex flex-col px-4 py-2 absolute top-12 right-0'>  {user && user.email === "walett95@gmail.com" && (<Link to={'/create'}><p className='flex px-4 py-2 cursor-pointer items-center  hover:bg-slate-100 transition-all duration-100 ease-in-out gap-3 text-textColor text-base'>Newitem <MdAdd/></p></Link>)}  <p className='flex px-4 py-2 cursor-pointer items-center  hover:bg-slate-100 transition-all duration-100 ease-in-out gap-3 text-textColor text-base'>Logout <MdLogout/></p> </motion.div> )}
  </div>
  </div>
    </div>
     { /*mobile*/}
     <div className='flex md:hidden w-full h-full'>
     
     </div>
    </header>
  )
}

export default Header