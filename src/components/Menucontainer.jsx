import React, { useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils.js/Data";
import { motion } from "framer-motion";
import Rowcontainer from "./Rowcontainer";
import { useStateValue } from "../context/contextProvider";

const Menucontainer = () => {
  const [filter, setFilter] = useState("icecream");
  // eslint-disable-next-line no-unused-vars
  const [{ foodItems }, dispatch] = useStateValue();

  return (
    <section className=" w-full my-6" id="menu">
      <div className="w-full flex flex-col  items-center justify-between">
        <p className=" text-2xl font-semibold mr-auto capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to orange-600 transition-all ease-in-out duration-100">
          Our Hot Dishes
        </p>
        <div className=" w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((item, idx) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={idx}
                className={`group ${
                  filter === item.urlParamName ? " bg-cartNumBg" : " bg-card"
                }  w-24 min-w-[94px] h-24 cursor-pointer hover:bg-red-600 rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center `}
                onClick={() => setFilter(item.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === item.urlParamName ? " bg-card" : " bg-cartNumBg"
                  } group-hover:bg-card flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === item.urlParamName
                        ? " text-textColor"
                        : " text-white"
                    }  group-hover:textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === item.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  }  group-hover:text-white`}
                >
                  {item.name}{" "}
                </p>
              </motion.div>
            ))}
        </div>
        <div className=" w-full h-screen">
          <Rowcontainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default Menucontainer;
