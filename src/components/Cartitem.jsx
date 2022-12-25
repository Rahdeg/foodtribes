import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../context/contextProvider";
import { actionType } from "../context/reducer";
let items = [];

const Cartitem = ({ item, setFlag, flag }) => {
  const [qty, setqty] = useState(item.qty);
  const [{ cartItem }, dispatch] = useStateValue();

  const cartDispatch = () => {
    localStorage.setItem("cartItem", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEM,
      cartItem: items,
    });
  };

  const updateQty = (type, id) => {
    if (type === "add") {
      setqty(qty + 1);
      // eslint-disable-next-line array-callback-return
      cartItem.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      if (qty === 1) {
        items = cartItem.filter((itema) => itema.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setqty(qty - 1);
        // eslint-disable-next-line array-callback-return
        cartItem.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItem;
  }, [qty, cartItem]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item.imageUrl}
        alt=""
        className="w-20 h-20 mx-w-[60px] rounded-full object-contain"
      />
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.title}</p>
        <p className=" text-sm block text-gray-300 font-semibold">{`$ ${
          item.price * qty
        }`}</p>
      </div>
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          onClick={() => updateQty("remove", item.id)}
          whileTap={{ scale: 0.75 }}
        >
          <BiMinus className=" text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <motion.div
          onClick={() => updateQty("add", item.id)}
          whileTap={{ scale: 0.75 }}
        >
          <BiPlus className=" text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default Cartitem;
