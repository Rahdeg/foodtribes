import React, { useEffect, useState } from "react";
import Home from "./Home";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Rowcontainer from "./Rowcontainer";
import { useStateValue } from "../context/contextProvider";
import Menucontainer from "./Menucontainer";
import Cartcontainer from "./Cartcontainer";

const Maincontainer = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ foodItems,cartShow }, dispatch] = useStateValue();
  
  const [scrolvalue, setScrolValue] = useState(0);

  useEffect(() => {}, [scrolvalue,cartShow]);

  return (
    <div className="w-full h-auto flex flex-col item-center justify-center">
      <Home />
      <section className=" w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className=" text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to orange-600 transition-all ease-in-out duration-100">
            Our fresh & healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className=" w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronLeft
                className=" text-lg text-white"
                onClick={() => setScrolValue(-300)}
              />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className=" w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronRight
                className=" text-lg text-white"
                onClick={() => setScrolValue(300)}
              />
            </motion.div>
          </div>
        </div>
        <Rowcontainer
          flag={true}
          data={foodItems?.filter((item) => item.category === "icecream")}
          scrolvalue={scrolvalue}
        />
      </section>
      <Menucontainer/>
      {
        cartShow && (
          <Cartcontainer/>
        )
      }
      
     
    </div>
  );
};

export default Maincontainer;
