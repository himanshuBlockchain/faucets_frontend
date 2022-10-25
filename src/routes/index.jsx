import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "../container/ResetPassword/resetPassword";
import FAQPage from "../pages/FAQ";
import ForgotPasswordPage from "../pages/Forgotpassword";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import Dashboard from "./Dashboard";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/register/:referral" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
