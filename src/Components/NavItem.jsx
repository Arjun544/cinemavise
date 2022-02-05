import React, { useContext, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";
import { SideBarContext } from "../Pages/Main";

const isActiveStyle =
  "flex items-center justify-between lg:gap-3 text-sm text-black dark:text-white font-semibold p-2 tracking-wider hover:bg-slate-200 hover:dark:bg-gray-700 hover:p-2 hover:rounded-md capitalize transition-all duration-300 ease-in-out";
const isNotActiveStyle =
  "flex items-center justify-between text-sm lg:gap-3 p-2 text-gray-500 dark:text-gray-400 capitalize tracking-wider hover:text-black hover:dark:text-white hover:dark:bg-gray-700 hover:bg-slate-200  hover:p-2 hover:rounded-md transition-all duration-200 ease-in-out";

const NavItem = ({ link, index }) => {
  const { currentUser } = useContext(UserContext);
  const { isSideBarExpanded } = useContext(SideBarContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isSubShowing, setIsSubShowing] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className={`my-2 overflow-visible items-start md:items-center md:justify-center ${
        !isSideBarExpanded && "items-center justify-center"
      }`}
    >
      {/* Tooltip */}
      {isHovered && !isSideBarExpanded && (
        <div className="absolute z-50 flex items-center justify-center left-16 px-4 py-2 bg-black rounded-md shadow-md capitalize">
          <span className="text-xs text-white font-semibold tracking-wider">
            {index === 5
              ? link.sub.map((item, indx) => (
                  <div key={indx}>
                    <NavLink
                      to={`${
                        currentUser.isLogin
                          ? `/${link.name}/${item}`
                          : "/noAccess"
                      }`}
                      className={({ isActive }) =>
                        isActive ? isActiveStyle : isNotActiveStyle
                      }
                    >
                      <span className="text-xs text-white font-semibold tracking-wider">
                        {item}
                      </span>
                    </NavLink>
                  </div>
                ))
              : link.name}
          </span>
        </div>
      )}

      <NavLink
        to={`${
          index === 0
            ? "/"
            : index === 5
            ? currentUser.isLogin
              ? link.name + "/" + link.sub[0]
              : "/noAccess"
            : "/" + link.name
        }`}
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }
        onClick={() => setIsSubShowing((presSate) => !presSate)}
      >
        {isSideBarExpanded ? (
          <div className="flex gap-3">
            <i>{link.icon}</i>
            <span className="invisible lg:visible">{link.name}</span>
          </div>
        ) : (
          <i>{link.icon}</i>
        )}
        {link.sub && isSideBarExpanded && (
          <i>
            {isSubShowing ? (
              <MdOutlineKeyboardArrowUp fontSize={20} />
            ) : (
              <MdOutlineKeyboardArrowDown fontSize={20} />
            )}
          </i>
        )}
      </NavLink>
      {/* Sub */}
      {isSideBarExpanded &&
        isSubShowing &&
        link.sub &&
        link.sub.map((item, indx) => (
          <div key={indx} className="ml-7">
            <NavLink
              to={`${
                currentUser.isLogin ? `/${link.name}/${item}` : "/noAccess"
              }`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <span>{item}</span>
            </NavLink>
          </div>
        ))}
    </div>
  );
};

export default NavItem;
