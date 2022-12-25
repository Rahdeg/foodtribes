import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/contextProvider";
import { actionType } from "../context/reducer";
import { getAllPayments } from "../utils.js/firebasefunctions";
import { OrderCard } from "./Cards";

const DashboardOrder = () => {
  const [{ paymentdetails }, dispatch] = useStateValue();
  const [searchfield, setsearchfield] = useState("");
  const [isfocus, setisfocus] = useState(false);

  useEffect(() => {
    if (!paymentdetails) {
      getAllPayments().then((data) => {
        dispatch({
          type: actionType.SET_PAYMENT_DETAIL,
          paymentdetails: data,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtereditem = paymentdetails?.filter((item) => {
    return item.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/*filter*/}
      <div className="w-full  flex flex-col md:flex-row items-center justify-center gap-20">
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
      {/*tabular data form*/}
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3 bg-white">
        {/*table count for user*/}
        <div className="absolute top-4 left-4">
          <p className="text-sm font-semibold">
            Count :
            <span className="text-xl font-bold text-textColor">
              {paymentdetails?.length}
            </span>
          </p>
        </div>
        {/*table heading*/}
        <div className="w-full  flex items-center justify-between">
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            ID
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Name
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Address
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Number
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Location
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Created
          </p>
        </div>
        {/*table content*/}
        {filtereditem &&
          filtereditem.map((data, idx) => <OrderCard data={data} idx={idx} />)}
      </div>
    </div>
  );
};

export default DashboardOrder;
