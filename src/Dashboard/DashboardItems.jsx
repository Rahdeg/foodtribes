import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../context/contextProvider";
import { actionType } from "../context/reducer";
import { getAllItems } from "../utils.js/firebasefunctions";
import { ItemsCard } from "./Cards";

const DashboardItems = () => {
  const [{ allItems }, dispatch] = useStateValue();
  const [searchfield, setsearchfield] = useState("");
  const [isfocus, setisfocus] = useState(false);

  useEffect(() => {
    if (!allItems) {
      getAllItems().then((data) => {
        dispatch({
          type: actionType.SET_ALLITEMS,
          allItems: data,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtereditem = allItems?.filter((item) => {
    return item.title.toLowerCase().includes(searchfield.toLowerCase());
  });

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-20">
        <NavLink
          to={"/createitem"}
          className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer"
        >
          <IoAdd />
        </NavLink>
        <input
          className={`w-52 px-4 py-2 border ${
            isfocus ? " border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-500 transition-all ease-in-out text-base text-textColor font-semibold`}
          type="text"
          placeholder="search here ..."
          value={searchfield}
          onChange={(e) => setsearchfield(e.target.value)}
          onBlur={() => setisfocus(false)}
          onFocus={() => setisfocus(true)}
        />
        <AiOutlineClear className=" text-3xl text-textColor cursor-pointer" />
      </div>
      {/*Main Container*/}
      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        {/*count*/}
        <div className="absolute top-4 left-4 ">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count : {""}{" "}
            </span>
            {allItems?.length}
          </p>
        </div>
        {/*Song container*/}
        <ItemsCard data={filtereditem} />
      </div>
    </div>
  );
};

export default DashboardItems;
