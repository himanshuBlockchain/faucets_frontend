import React, { useEffect, useRef, useState } from "react";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiSun } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";
import avatar from "../../../assets/avatar.png";
import logo from "../../../assets/logo.png";
import AvatarDropdownMenu from "./avatarDropdownMenu";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Popover from "../../UI/Popover";
import { removeLocalStorage } from "../../../utils/localStorage";
// import { useGetUserLoginQuery } from "../../../service/authApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useGetLoginUserQuery } from "../../../service/userApi";
const Header = ({ show, setShow }) => {
  // avater clckable menu
  const profileRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  useClickOutside(profileRef, () => setOpenMenu(false));

  // mobile show menu
  const [showMenu, setShowMenu] = useState(false);

  // handle logout
  const handleLogout = () => {
    removeLocalStorage("token");
  };
  // fetch data
  const { data } = useGetLoginUserQuery();
  // dark and light verstion
  const [value, setValue] = useLocalStorage("dark-mode", "light");
  const handleThemeMode = () => {
    if (value === "dark") {
      setValue("light");
    } else {
      setValue("dark");
    }
  };

  useEffect(() => {
    if (value === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [value]);
  return (
    <div className="faucets_header_wrapper">
      <div className="container">
        <div className="faucets_header_container">
          <div className="faucets_hamburger">
            <img src={logo} width="100%" className="faucets_loog" alt="logo" />
            <RiBarChartHorizontalLine
              className="hamburger_icon"
              onClick={() => setShow(!show)}
            />
          </div>
          <div className="verticalDots">
            <button type="button" onClick={() => setShowMenu(!showMenu)}>
              <BiDotsVerticalRounded />
            </button>
          </div>
          <div
            className={`faucets_header_menu ${showMenu ? "active_show" : ""}`}
          >
            <ul className="faucets_header_menu_lists">
              <li className="faucets_header_menu_list">
                <div className="msg_icon theme_icon" id="theme_icon">
                  <button onClick={handleThemeMode} id="theme_icon">
                    {value === "dark" ? <FiSun /> : <MdOutlineDarkMode />}
                  </button>
                </div>
              </li>
              <li ref={profileRef} className="faucets_header_menu_list">
                <img
                  src={data?.data?.avatar ? data?.data?.avatar : avatar}
                  alt="user_pic"
                  onClick={() => setOpenMenu(!openMenu)}
                />
                <Popover openPopover={openMenu} className="clickable_submenu">
                  <AvatarDropdownMenu
                    setOpenMenu={setOpenMenu}
                    logout={handleLogout}
                    username={data?.data?.username}
                  />
                </Popover>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
