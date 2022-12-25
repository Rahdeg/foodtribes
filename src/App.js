import "./App.css";
import {
  Header,
  Maincontainer,
  Pay,
  Menucontainer,
  Createitem,
  Bike,
  PaymentSuccessful,
  PaymentError,
} from "./components";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/contextProvider";
import { getAllItems } from "./utils.js/firebasefunctions";
import { useEffect } from "react";
import { actionType } from "./context/reducer";
import { Helmet } from "react-helmet";
import { Adminboard } from "./Dashboard";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className=" w-screen h-auto flex flex-col bg-primary">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Chefchi</title>
          <link rel="canonical" href="https://restaurant-10db5.web.app/" />
          <meta name="description" content="Quench your hunger ASAP" />
        </Helmet>
        <Header />
        <main className=" mt-14 md:mt-20 px-4  md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<Maincontainer />} />
            <Route path="/menu" element={<Menucontainer />} />
            <Route path="/dashboard/*" element={<Adminboard />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/bike" element={<Bike />} />
            <Route path="/createitem" element={<Createitem />} />
            <Route path="/success" element={<PaymentSuccessful />} />
            <Route path="/error" element={<PaymentError />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
