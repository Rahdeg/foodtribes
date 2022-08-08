import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";

const Cartcontainer = () => {
  return (
    <div className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]">
      <div className=" w-full flex items-center justify-between cursor-pointer p-4">
        <motion.div whileTap={{ scale: 0.75 }} className="">
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-lg  text-textColor font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 transition-all ease-in-out cursor-pointer text-textColor text-base"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      <div className=" w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
       {/*cartitem section*/}
        <div className=" w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
        {/*cartitem*/}
          <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/restaurant-10db5.appspot.com/o/Images%2F1659576031227-i4.png?alt=media&token=3983485d-fe5b-4d52-88bd-41923f555ed2"
              alt=""
              className="w-20 h-20 mx-w-[60px] rounded-full object-contain"
            />
            <div className="flex flex-col gap-2">
              <p className="text-base text-gray-50">Chocolate Vanilla</p>
              <p className=" text-sm block text-gray-300 font-semibold">$50</p>
            </div>
            <div className="group flex items-center gap-2 ml-auto cursor-pointer">
              <motion.div whileTap={{ scale: 0.75 }}>
                <BiMinus className=" text-gray-50" />
              </motion.div>
              <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                1
              </p>
              <motion.div whileTap={{ scale: 0.75 }}>
                <BiPlus className=" text-gray-50" />
              </motion.div>
            </div>
          </div>
        </div>
         {/*total carts*/}
         <div>
         
         </div>
      </div>
    </div>
  );
};

export default Cartcontainer;
