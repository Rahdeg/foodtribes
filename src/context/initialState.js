import { fetchdata, fetchCart } from "../utils.js/fetchlocal";

const userinfo = fetchdata();
const cartinfo = fetchCart();

export const initialState = {
  user: userinfo,
  foodItems: null,
  cartShow: false,
  cartItem: cartinfo,
  paymentdetails: null,
  allUsers: null,
  allItems: null,
  bikedetails: null,
  totalAmount: null,
};
