import React from "react";
import avatar from "../../../assets/avatar.png";
import { useGetLoginUserQuery } from "../../../service/userApi";
import { removeLocalStorage } from "../../../utils/localStorage";
import { menus } from "../../../utils/menu";
import MenuAccordion from "./MenuAccordion";
const Sidebar = () => {
  // fetch user data
  const {data} = useGetLoginUserQuery();
  const handleLogout = () =>{
    removeLocalStorage("token")
  }
  return (
    <div className="faucets_sidebar">
      <div className="faucets_logo_container">
        {/* <img src={logo} width="100%" alt="logo" /> */}
        <h3>Faucets</h3>
      </div>
      <div className="faucets_user_profile">
        <div className="faucets_user_pic">
          <img src={data?.data?.avatar ? data?.data?.avatar : avatar} alt="user_pic" />
        </div>
        <div className="faucets_user_info">
          <h2>{data?.data?.name}</h2>
          <p>{data?.data?.email}</p>
        </div>
      </div>
      <div className="faucets_sidebar_menu">
        <ul className="faucets_sidebar_menu_lists">
          {/* {menus && menus?.map((d,i) => )} */}
          <MenuAccordion d={menus} logout={handleLogout} adminAccess={data?.data?.role} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;