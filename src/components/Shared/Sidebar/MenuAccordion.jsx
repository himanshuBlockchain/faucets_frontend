import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import CustomLink from "../../UI/Link";
import { FiLogOut } from "react-icons/fi";

const MenuAccordion = ({ d, logout, adminAccess }) => {
  const [collapse, setCollapse] = useState(false);
  const toggle = (index) => {
    if (collapse === index) {
      return setCollapse(null);
    }
    setCollapse(index);
  };

  const perRoute = d.filter(rt=>rt?.permission?.includes(adminAccess))
  // console.log("permission route",perRoute)
  // console.log(adminAccess)

  return (
    <>
      {perRoute.map((d, i) => {
        // const permissionRoute = d.permission?.includes(adminAccess)
        // console.log(permissionRoute)
        return (
          <li
            key={d.id}
            className={`faucets_sidebar_menu_list ${
              d.dropdown ? "submenu" : ""
            }`}
            id={d.id}
          >
            <CustomLink
              href={d.route}
              onClick={() => toggle(d.id)}
              className="faucets_nav_link"
            >
              <div className="icon_text">
                <span>{d.icon}</span>
                <p>{d.menu}</p>
              </div>
              {d.dropdown && (
                <span>
                  <IoMdArrowDropdown />
                </span>
              )}
            </CustomLink>
            {collapse === d.id ? (
              <ul>
                {d.dropdown?.filter(pt=>pt?.permission?.includes(adminAccess))?.map((drop) => {
                  // console.log("filter menu",drop);
                  return (
                    <li key={drop.id}>
                      <CustomLink
                        href={drop.route}
                        className="faucets_nav_link dropdown"
                      >
                        {drop.menu}
                      </CustomLink>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </li>
        );
      })}
      <li className="faucets_sidebar_menu_list" onClick={logout}>
        <CustomLink href="#" className="faucets_nav_link">
          <div className="icon_text">
            <span>
              <FiLogOut />
            </span>
            <p>Logout</p>
          </div>
        </CustomLink>
      </li>
    </>
  );
};

export default MenuAccordion;
