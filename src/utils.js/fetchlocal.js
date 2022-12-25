export const fetchdata = () => {
  const userinfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  return userinfo;
};

export const fetchCart = () => {
  const cartinfo =
    localStorage.getItem("cartItem") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItem"))
      : localStorage.clear();
  return cartinfo ? cartinfo : [];
};
