import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/contextProvider";
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {app} from '../Firebase.config'
import { actionType } from "../context/reducer";
import emtycart from '../img/emptyCart.svg'
import Cartitem from "./Cartitem";
import { NavLink } from "react-router-dom";

const Cartcontainer = () => {
  const [{ cartShow,cartItem,user ,totalAmount}, dispatch] = useStateValue();
  const [flag, setFlag] = useState('');
  const [tot, settot] = useState('');
  const firebaseAuth= getAuth(app);
  const provider= new GoogleAuthProvider();
  const [ismenu, setismenu] = useState(false)

  useEffect(() => {
    let totalPrice = cartItem?.reduce(function(acc,item){
      return acc + item.qty * item.price;
    },0)
    settot(totalPrice);
    dispatch({
      type:actionType.SET_TOTALAMOUNT,
      totalAmount:tot + 2.5,
    })
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tot,flag,cartItem])
  
  const login= async ()=>{
    if (!user) {
      // eslint-disable-next-line no-unused-vars
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

  const clearitems =()=>{
    dispatch({
      type: actionType.SET_CART_ITEM,
      cartItem: [],
    });
    localStorage.setItem("cartItem",JSON.stringify([]));
  }

  const removeCart =()=>{
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  }
  return (
    <motion.div 
    initial={{opacity:0,x:200}}
    animate={{opacity:1,x:0}}
    exit={{opacity:0,x:200}}
    className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]">
      <div className=" w-full flex items-center justify-between cursor-pointer p-4">
        <motion.div 
        onClick={removeCart}
        whileTap={{ scale: 0.75 }} 
        className="">
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-lg  text-textColor font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          onClick={clearitems}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 transition-all ease-in-out cursor-pointer text-textColor text-base"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {
        cartItem && cartItem.length > 0 ? (
          <div className=" w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/*cartitem section*/}
           <div className=" w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
           {/*cartitem*/}
             {cartItem && cartItem.map((item,idx)=>(
              <Cartitem key={idx} item={item} flag={flag} setFlag={setFlag}/>
             ))}
           </div>
            {/*total carts*/}
            <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Sub Total</p>
            <p className="text-gray-400 text-lg">$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Delivery</p>
            <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>
             {/*border line*/}
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className=" w-full flex items-center justify-between">
            <p className=" text-gray-200 text-xl font-semibold">Total</p>
            <p className=" text-gray-200 text-xl font-semibold">${tot + 2.5}</p>
            </div>
            {
              user ? (
                <motion.button
                whileTap={{scale:0.8}} 
                type='button'
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to bg-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg ">
                <NavLink to={'/pay'}className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to bg-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg " >
                Check Out
      </NavLink>
               
                </motion.button>
              ):(
                <motion.button
                whileTap={{scale:0.8}} 
                type='button'
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to bg-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg "
                onClick={login}
                >
                Login to Checkout
                </motion.button>
              )
            }
            </div>
         </div>
        ):(<div className="w-full h-full flex flex-col gap-6 items-center justify-center">
              <img src={emtycart} alt='' className="w-300" />
              <p className="text-xl text-textColor font-semibold">Add some items to your cart</p>
        </div>)
      }
     
    </motion.div>
  );
};

export default Cartcontainer;
