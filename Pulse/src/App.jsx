import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ContactUs from "./Pages/ContactUs";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MenShop from "./Pages/MenShop";
import WomenShop from "./Pages/WomenShop";
import Profile from "./Pages/Profile";
import AboutPage from "./Pages/About";
import ProductPage from "./Pages/Product";
// import ProtectedRoute from "./Pages/ProtectedRoute";
import Accessories from "./Pages/Accessories";
import SizeGuide from "./Pages/SizeGuide";
import Success from "./Components/Success";
import ScrollToTop from "./Components/ScrollToTop";
import ForgotPassword from "./Pages/Forgotpassword";
import ResetPassword from "./Pages/ResetPassword";
// import { FaArrowCircleUp } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import ScrollToTop from "./Components/ScrollToTop";

console.log("this is the main app page rigtht ");

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/men" element={<MenShop />} />
      <Route path="/women" element={<WomenShop />} />
      <Route path="/sizeguide" element={<SizeGuide/>}/>
      <Route path="/accessories" element={<Accessories/>}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/:category/:id" element={<ProductPage />} />
      <Route path="/success" element={<Success/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
    </Routes>
  );
}

export default App;
