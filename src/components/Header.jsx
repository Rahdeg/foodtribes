import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import users from "../img/avatar.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../Firebase.config";
import { useStateValue } from "../context/contextProvider";
import { actionType } from "../context/reducer";
import { getAllUser, saveUser } from "../utils.js/firebasefunctions";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItem, allUsers }, dispatch] = useStateValue();
  const [ismenu, setismenu] = useState(false);

  var date = new Date();
  var current_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  var current_time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  useEffect(() => {
    if (!allUsers) {
      getAllUser().then((data) => {
        dispatch({
          type: actionType.SET_ALLUSERS,
          allUsers: data,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const logout = () => {
    setismenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const login = async () => {
    if (!user) {
      // eslint-disable-next-line no-unused-vars
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      const data = {
        id: `${Date.now()}`,
        name: providerData[0].displayName,
        number: providerData[0].phoneNumber,
        email: providerData[0].email,
        image: providerData[0].photoURL,
        uid: providerData[0].uid,
        provider: providerData[0].providerId,
        createdAt: [current_date, current_time],
      };

      const info = allUsers?.filter((item) => item.email === data.email);

      if (info[0]?.email !== data.email) {
        saveUser(data);
      }

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setismenu(!ismenu);
    }
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/*desktop..tablet*/}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className=" flex items-center gap-2">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={logo}
            alt="logo"
            className=" w-8 object-cover"
          />
          <p className=" text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <Link to={"/"}>
              <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Home
              </li>
            </Link>
            <Link to={"/menu"}>
              <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Menu
              </li>
            </Link>
            <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Services
            </li>
          </motion.ul>
          <div
            onClick={displayCart}
            className="reltive flex items-center justify-center"
          >
            <MdShoppingBasket className=" text-textColor text-2xl cursor-pointer" />
            {cartItem && cartItem.length > 0 && (
              <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className=" text-xs font-semibold text-white">
                  {cartItem.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : users}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              onClick={login}
              alt=""
            />
            {ismenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl  rounded-lg flex flex-col px-4 py-2 absolute top-12 right-0"
              >
                {" "}
                {user && user.email === "walett95@gmail.com" && (
                  <Link to={"/dashboard/home"}>
                    <p
                      className="flex px-4 py-2 cursor-pointer items-center  hover:bg-slate-100 transition-all duration-100 ease-in-out gap-3 text-textColor text-base"
                      onClick={() => setismenu(false)}
                    >
                      Dashboard <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="flex px-4 py-2 cursor-pointer items-center  hover:bg-slate-100 transition-all duration-100 ease-in-out gap-3 text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>{" "}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/*mobile*/}
      <div className="flex  items-center justify-between md:hidden w-full h-full">
        <div
          onClick={displayCart}
          className="reltive flex items-center px-4 py-4 hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer"
        >
          <MdShoppingBasket className=" text-textColor text-2xl cursor-pointer" />
          {cartItem && cartItem.length > 0 && (
            <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className=" text-xs font-semibold text-white">
                {cartItem.length}
              </p>
            </div>
          )}
        </div>
        <Link to={"/"} className="flex items-center gap-2">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={logo}
            alt="logo"
            className=" w-8 object-cover"
          />
          <p className=" text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : users}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            onClick={login}
          />
          {ismenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl  rounded-lg flex flex-col  absolute top-12 right-0"
            >
              {" "}
              {user && user.email === "walett95@gmail.com" && (
                <Link to={"/dashboard/home"}>
                  <p
                    className="flex px-4 py-4 cursor-pointer items-center  hover:bg-slate-100 transition-all duration-100 ease-in-out gap-3 text-textColor text-base"
                    onClick={() => setismenu(false)}
                  >
                    Dashboard <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <Link to={"/"}>
                  {" "}
                  <li
                    className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  hover:bg-slate-100 px-4 py-4"
                    onClick={() => setismenu(false)}
                  >
                    Home
                  </li>
                </Link>
                <Link to={"/menu"}>
                  <li
                    className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer px-4 py-4 hover:bg-slate-100"
                    onClick={() => setismenu(false)}
                  >
                    Menu
                  </li>
                </Link>
                <li
                  className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer px-4 py-4 hover:bg-slate-100"
                  onClick={() => setismenu(false)}
                >
                  About Us
                </li>
                <li
                  className=" text-base text-textColor hover:text-headingColor  hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer px-4 py-4"
                  onClick={() => setismenu(false)}
                >
                  Services
                </li>
              </ul>
              <p
                className="flex m-2 p-2 rounded-md shadow-md cursor-pointer items-center justify-center hover:bg-slate-300  bg-gray-200 transition-all duration-100 ease-in-out gap-3 text-textColor text-base "
                onClick={logout}
              >
                Logout <MdLogout />
              </p>{" "}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
