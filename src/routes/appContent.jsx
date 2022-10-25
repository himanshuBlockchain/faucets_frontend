import React from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { userRole } from "../config/USER_ROLE";
import AddNewFaucetProvider from "../container/Dashboard/Faucets/AddNewFaucetProvider";
import AllFaucetProvider from "../container/Dashboard/Faucets/AllFaucet";
import FaucetProvider from "../container/Dashboard/Faucets/FaucetProvider";
import Dashboard from "../container/Dashboard/Home";
import AddLead from "../container/Dashboard/Lead/AddLead";
import AllLead from "../container/Dashboard/Lead/AllLead";
import MyLead from "../container/Dashboard/Lead/MyLead";
import EditEmail from "../container/Dashboard/Profile/EditEmail";
import EditPassword from "../container/Dashboard/Profile/EditPassword";
import EditProfile from "../container/Dashboard/Profile/EditProfile";
import MyProfile from "../container/Dashboard/Profile/MyProfile";
import Chain from "../container/Dashboard/Setting/Chain";
import AllMembers from "../container/Dashboard/Team/AllMember/members";
import Referral from "../container/Dashboard/Team/Referral";
import History from "../container/Dashboard/Transaction/History";
import AddWallet from "../container/Dashboard/Wallet/addWallet";
import AllWallet from "../container/Dashboard/Wallet/AllWallet";
import MyWallet from "../container/Dashboard/Wallet/MyWallet";
import { getLocalStorage } from "../utils/localStorage";
import { PrivateRoute } from "./ProtectedRoute";

const AppContent = () => {
  const navigate = useNavigate();
  const token = getLocalStorage("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);
  // user data
  // const { data } = useGetUserLoginQuery();
  return (
    <Routes>
      <Route path="/" index element={<Dashboard />} />
      {/* For admin */}
      <Route
        path="/team/all-member"
        element={
          <PrivateRoute roles={[userRole.ADMIN, userRole.SUPER_ADMIN]}>
            <AllMembers />
          </PrivateRoute>
        }
      />
      <Route
        path="/faucets/All-faucet-provider"
        element={
          <PrivateRoute roles={[userRole.ADMIN, userRole.SUPER_ADMIN]}>
            <AllFaucetProvider />
          </PrivateRoute>
        }
      />
      <Route
        path="/wallet/all-wallet"
        element={
          <PrivateRoute roles={[userRole.ADMIN, userRole.SUPER_ADMIN]}>
            <AllWallet />
          </PrivateRoute>
        }
      />
      <Route
        path="/lead/all-lead"
        element={
          <PrivateRoute roles={[userRole.ADMIN, userRole.SUPER_ADMIN]}>
            <AllLead />
          </PrivateRoute>
        }
      />
      <Route
        path="/setting/chain"
        element={
          <PrivateRoute roles={[userRole.SUPER_ADMIN]}>
            <Chain />
          </PrivateRoute>
        }
      />
      {/* For user, admin, and super admin */}
      <Route path="/team/referral" element={<Referral />} />
      <Route path="/lead/my-lead" element={<MyLead />} />
      <Route path="/transaction/transaction-history" element={<History />} />
      <Route path="/lead/add-lead" element={<AddLead />} />
      <Route path="/faucets/faucet-provider" element={<FaucetProvider />} />
      <Route
        path="/faucets/add-new-faucet-provider"
        element={<AddNewFaucetProvider />}
      />
      <Route path="/wallet/add-wallet" element={<AddWallet />} />
      <Route path="/wallet/my-wallet" element={<MyWallet />} />
      <Route path="/profile/my-profile" element={<MyProfile />} />
      <Route path="/profile/edit-profile" element={<EditProfile />} />
      <Route path="/profile/change-email" element={<EditEmail />} />
      <Route path="/profile/change-password" element={<EditPassword />} />
    </Routes>
  );
};

export default AppContent;
