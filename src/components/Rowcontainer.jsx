import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import Notfound from '../img/NotFound.svg'
import { useStateValue } from "../context/contextProvider";
import { actionType } from "../context/reducer";


const Rowcontainer = ({ flag , data,scrolvalue}) => {
  const rowcontainer = useRef();
  const [{ cartItem }, dispatch] = useStateValue();
  const [items, setItems] = useState(cartItem);
  useEffect(() => {
   rowcontainer.current.scrollLeft += scrolvalue;
  }, [scrolvalue])
  
  const addToCart =()=>{
    
    dispatch({
        type:actionType.SET_CART_ITEM,
         cartItem:items,
      });
      localStorage.setItem("cartItem",JSON.stringify(items));
  }

  useEffect(() => {
  addToCart();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])
  

  return (
    <div
      ref={rowcontainer}
      className={`w-full my-12 flex items-center  gap-3 scroll-smooth ${
        flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center h-420"
      }`}
    >
    {data && data.length >0 ? data.map((item,idx)=>(
      <div 
      key={idx}
      className="w-300 min-w-[300px] md:min-w-[340px] md:w-350 h-auto bg-cardOverlay backdrop-blur-lg my-12 p-2 hover:drop-shadow-lg cursor-pointer rounded-md flex flex-col items-center justify-between">
      
      <div className="w-full flex items-center justify-between " >
        <motion.img
          whileHover={{ scale: 1.2 }}
          src={item.imageUrl}
          className="w-40 h-40 -mt-8 drop-shadow-2xl"
          alt="ice"
        />
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-md"
          onClick={()=>setItems([...cartItem,item])}
        >
          <MdShoppingBasket className=" text-lg font-semibold text-white" />
        </motion.div>
      </div>
      <div className="w-full flex flex-col items-end justify-end">
        <p className=" text-textColor text-base  font-semibold md:text-lg">
         {item.title}
        </p>
        <p className="mt-1 text-sm text-gray-500">{item?.calories}</p>
        <div className="flex items-center gap-8">
          <p className="text-lg text-headingColor font-semibold">
            <span className=" text-sm text-red-500">$</span> {item?.price}
          </p>
        </div>
      </div>
    </div>
    )):<div
    className="w-full flex  flex-col items-center justify-center">
    <img src={Notfound} alt="nn" className=" h-[350px] my-2"/>
    <p className="text-xl text-textColor font-semibold">Items Not available at the moment</p>
    </div>}
      
    </div>
  );
};

export default Rowcontainer;
