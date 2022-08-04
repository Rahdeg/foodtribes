import React, { useEffect, useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";

const Rowcontainer = ({ flag , data,scrolvalue}) => {
  const rowcontainer = useRef()
  useEffect(() => {
   rowcontainer.current.scrollLeft += scrolvalue;
  }, [scrolvalue])
  
  return (
    <div
      ref={rowcontainer}
      className={`w-full my-12 flex items-center  gap-3 scroll-smooth ${
        flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap"
      }`}
    >
    {data && data.map((item,idx)=>(
      <div className="w-300 min-w-[300px] md:min-w-[340px] md:w-350 h-auto bg-cardOverlay backdrop-blur-lg my-12 p-2 hover:drop-shadow-lg cursor-pointer rounded-md flex flex-col items-center justify-between">
      
      <div className="w-full flex items-center justify-between " key={idx}>
        <motion.img
          whileHover={{ scale: 1.2 }}
          src={item?.imageUrl}
          className="w-40 h-40 -mt-8 drop-shadow-2xl"
          alt="ice"
        />
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-md"
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
    ))}
      
    </div>
  );
};

export default Rowcontainer;
