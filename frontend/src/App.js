import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import { useSelector } from "react-redux";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import LoginSignUp from "./component/User/LoginSignUp";
import LoginSignUpBank from "./component/Bank/LoginSignUpBank.js";


import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import BankProfile from "./component/Bank/BankProfile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment_agn";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders.js";
import  OrderDetails from "./component/Order/OrderDetails.js"

function App() {
  const { isAuthenticated, user, isAdmin } = useSelector((state) => state.user);
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    // getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exact path="/process/payment" element={<Payment/>} />
        </Elements>
      )} */}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/bank" element = {<LoginSignUpBank />}/>
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/bankaccount" element={<BankProfile />} />
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        <Route exact path="/process/payment" element={<Payment />} />
        <Route exact path="/success" element={<OrderSuccess />} />
        <Route exact path="/orders" component={MyOrders} />
        <Route exact path="/order/:id" component={OrderDetails} />


        <Route element={<ProtectedRoute isAdmin={isAdmin} />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          <Route exact path="/success" element={<OrderSuccess />} />
          {/* {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Route exact path="/process/payment" element = {<OrderSuccess />}/>
          </Elements>
        )} */}
        </Route>
        {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route
          exact path="/process/payment" 
          element = 
          {
              <ProtectedRoute isAdmin={isAdmin}>
                <OrderSuccess />
              </ProtectedRoute>
          }
          />
        </Elements> */}
        {/* )} */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
