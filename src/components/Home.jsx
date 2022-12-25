import React from "react";
import bike from "../img/delivery.png";
import home from "../img/heroBg.png";
import { heropdata } from "../utils.js/Data.js";

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="py-2  flex-1 flex flex-col items-start md:items-start justify-center gap-6">
        <div className="flex items-center justify-center gap-2 bg-orange-100 px-4 py-1 drop-shadow-xl rounded-full">
          <p className=" text-orange-500 text-base font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white">
            <img src={bike} alt="m" className="w-full h-full object-contain" />
          </div>
        </div>
        <p className=" font-bold text-[2.5rem] lg:text-[4.5rem] tracking-wide text-headingColor">
          The Fastest Delivery in{" "}
          <span className=" text-orange-600 text-[3rem] lg:text-[5rem]">
            Your City
          </span>
        </p>
        <p className=" text-base text-textColor text-center md:text-left md:w-[80%]">
          To specify how the payment should be split across subaccounts, define
          a subaccounts field. The subaccounts field holds an array of
          subaccount objects, each containing the ID of the subaccount, returned
          from the create subaccount call or as displayed in your dashboard.
        </p>
        <button
          type="button"
          className=" bg-gradient-to-br from-orange-400 to bg-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 md:w-auto"
        >
          Order Now
        </button>
      </div>
      <div className=" py-2 flex-1 flex items-center relative">
        <img
          src={home}
          alt="hm"
          className=" h-370 lg:h-650 w-full lg:w-auto ml-auto"
        />
        <div className=" w-full h-full absolute  top-0 left-0 flex items-center justify-center py-4 gap-4 flex-wrap lg:px-32">
          {heropdata &&
            heropdata.map((data, idx) => (
              <div
                className=" lg:w-190   p-4 bg-cardOverlay backdrop-blur-md  rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                key={idx}
              >
                <img
                  src={data.imgsrc}
                  alt=""
                  className="w-20 lg:w-40  -mt-10  lg:-mt-20 items-center justify-center"
                />
                <p className=" text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {data.name}{" "}
                </p>
                <p className=" text-[10px] lg:text-sm  text-lighttextGray font-semibold  my-1 lg:my-3">
                  {data.descp}{" "}
                </p>
                <p className=" text-xm font-semibold text-headingColor ">
                  <span className=" text-xs text-red-500">$ </span>
                  {data.price}{" "}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
