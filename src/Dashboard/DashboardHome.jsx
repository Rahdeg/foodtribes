import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { MdFoodBank, MdOutlineBorderColor } from "react-icons/md";
import { RiEBike2Line } from "react-icons/ri";
import { useStateValue } from "../context/contextProvider";
import { actionType } from "../context/reducer";
import {
  getAllBike,
  getAllItems,
  getAllPayments,
  getAllUser,
} from "../utils.js/firebasefunctions";
import { DashboardCard } from "./Cards";

const DashboardHome = () => {
  const [{ allUsers, bikedetails, allItems, paymentdetails }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUser().then((data) => {
        dispatch({
          type: actionType.SET_ALLUSERS,
          allUsers: data,
        });
      });
    }

    if (!bikedetails) {
      getAllBike().then((data) => {
        dispatch({
          type: actionType.SET_BIKE_DETAIL,
          bikedetails: data,
        });
      });
    }
    if (!allItems) {
      getAllItems().then((data) => {
        dispatch({
          type: actionType.SET_ALLITEMS,
          allItems: data,
        });
      });
    }
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

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap gap-5 ">
      <DashboardCard
        icon={<FaUsers className=" text-2xl text-textColor " />}
        name="Users"
        count={allUsers?.length > 0 ? allUsers.length : 0}
      />
      <DashboardCard
        icon={<MdFoodBank className=" text-2xl text-textColor " />}
        name="Foods"
        count={allItems?.length > 0 ? allItems.length : 0}
      />
      <DashboardCard
        icon={<MdOutlineBorderColor className=" text-2xl text-textColor" />}
        name="Orders"
        count={paymentdetails?.length > 0 ? paymentdetails.length : 0}
      />
      <DashboardCard
        icon={<RiEBike2Line className=" text-2xl text-textColor" />}
        name="Bikes"
        count={bikedetails?.length > 0 ? bikedetails.length : 0}
      />
    </div>
  );
};

export default DashboardHome;
