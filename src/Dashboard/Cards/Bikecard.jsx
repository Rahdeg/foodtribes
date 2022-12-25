import React, { useEffect } from "react";
import { useStateValue } from "../../context/contextProvider";
import { motion } from "framer-motion";
import { getAllBike } from "../../utils.js/firebasefunctions";
import { actionType } from "../../context/reducer";

const Bikecard = ({ data, idx }) => {
  const [{ bikedetails }, dispatch] = useStateValue();

  useEffect(() => {
    if (!bikedetails) {
      getAllBike().then((data) => {
        dispatch({
          type: actionType.SET_PAYMENT_DETAIL,
          paymentdetails: data,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md">
      {bikedetails && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
        >
          <div className="flex items-center">
            <input
              id="link-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </motion.div>
      )}

      {/*user Image*/}
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {idx + 1}
      </p>
      {/*user Details*/}
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {data.name}
      </p>
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {data.message}
      </p>
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {data.number}
      </p>
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {data.location}
      </p>
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {data.createdAt[0]}
        <br />
        <span>{data.createdAt[1]}</span>
      </p>
    </motion.div>
  );
};

export default Bikecard;
