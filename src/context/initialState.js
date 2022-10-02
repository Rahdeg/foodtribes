import { fetchdata,fetchCart } from "../utils.js/fetchlocal";

const userinfo = fetchdata();
const cartinfo = fetchCart();

export const initialState={
    user: userinfo,
    foodItems:null,
    cartShow:false,
    cartItem:cartinfo,
};