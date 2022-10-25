import React from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import CustomLink from "../../UI/Link";
// import { AiOutlineWallet } from "react-icons/ai";
const AvatarDropdownMenu = ({ setOpenMenu,logout, username }) => {
  return (
    <>
      <ul className="submenu">
        <div className="header">
          <h4>Faucets</h4>
          <p>{username}</p>
        </div>
        {avatarMenu.map((d) => (
          <li
            key={d.id}
            className="submenu_list"
            onClick={() => {
              setOpenMenu(false)
              d.menu === 'logout' && logout()
            }}
          >
            <CustomLink href={d.route} className="submenu_link">
              {d.icon}
              &nbsp; {d.menu}
            </CustomLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AvatarDropdownMenu;
const avatarMenu = [
    {
      id: "my7s88ersr",
      menu: "my profile",
      icon: <FiUser />,
      route: "/dashboard/profile/my-profile",
    },
    {
      id: "out7s8fs58",
      menu: "logout",
      icon: <FiLogOut />,
    },
  ];