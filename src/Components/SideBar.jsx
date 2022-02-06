import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import {
  RiLoginCircleLine,
  RiLogoutCircleRLine,
  RiMovie2Fill,
} from "react-icons/ri";
import NavItem from "./NavItem";
import useDarkMode from "../Hooks/useDarkMode";
import { sideBarItems } from "../Constants/constants";
import { SideBarContext } from "../Pages/Main";
import { UserContext } from "../App";

const SideBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [colorTheme, setTheme] = useDarkMode();
  const { isSideBarExpanded } = useContext(SideBarContext);
  const [themeTab, setThemeTab] = useState(colorTheme === "light" ? 1 : 0);

  const handleLogout = () => {
    setCurrentUser({ isLogin: false, token: "", username: "" });
  };

  return (
    <div
      className={`flex flex-col justify-between pt-8 pb-4 h-screen p-4 overflow-hidden bg-slate-50 dark:bg-black ${
        isSideBarExpanded
          ? "w-20 lg:w-72 xl:w-80"
          : "w-20 justify-center items-center"
      }  overflow-y-auto transition-all duration-500 ease-in-out`}
    >
      <div className="flex w-full flex-col overflow-visible ">
        {/* Logo */}
        <Link to="/">
          <div className="flex gap-1 mb-2">
            <div
              className={`flex p-2 bg-black dark:bg-white items-center justify-center rounded-xl ${
                isSideBarExpanded && "lg:ml-2"
              }`}
            >
              <i>
                {
                  <RiMovie2Fill
                    fontSize={18}
                    color={colorTheme === "light" ? "#000" : "#fff"}
                  />
                }
              </i>
            </div>
            {isSideBarExpanded && (
              <span className="invisible lg:text-amber-400 lg:font-bold lg:mt-1.5 lg:visible tracking-wider">
                CinemaVise
              </span>
            )}
          </div>
        </Link>

        {sideBarItems.map((link, index) => (
          <NavItem key={link.name} link={link} index={index} />
        ))}
      </div>
      <div
        className={`flex flex-col ${
          !isSideBarExpanded && "items-center gap-3"
        }`}
      >
        {/* Sign in & Profile */}
        {isSideBarExpanded && (
          <div
            className={`${
              isSideBarExpanded ? "visible" : "invisible"
            } invisible lg:visible flex w-full h-24 rounded-xl items-center justify-around bg-amber-200 shadow-md hover:scale-95 transition-all duration-500 ease-in-out`}
          >
            <div className="flex flex-col justify-around gap-2">
              <span className="font-semibold  text-black tracking-widest capitalize">
                {currentUser.isLogin ? currentUser.username : "Explore more"}
              </span>
              <Link
                to={!currentUser.isLogin && "/login"}
                onClick={() => handleLogout()}
              >
                <span
                  className={`font-semibold text-sm w-fit ${
                    currentUser.isLogin ? "text-red-500" : "text-green-500"
                  } tracking-wider hover:bg-slate-200 cursor-pointer hover:px-4 hover:py-1 hover:rounded-md transition-all duration-500 ease-in-out`}
                >
                  {currentUser.isLogin ? "Logout" : "Sign in"}
                </span>
              </Link>
            </div>
            <div className="flex">
              <img
                className="h-20 w-20"
                src="/Atom.png"
                alt=""
                color={"#fff"}
              />
            </div>
          </div>
        )}
        {/* large screens loign in & logout when side is closed*/}
        {!isSideBarExpanded && (
          <Link
            to={!currentUser.isLogin && "/login"}
            onClick={() => handleLogout()}
          >
            <div
              className={`flex lg:flex lg:visible h-10 w-10 ${
                currentUser.isLogin ? "bg-red-500" : "bg-green-500"
              } items-center justify-center rounded-full`}
            >
              {currentUser.isLogin ? (
                <RiLogoutCircleRLine className="fill-white" fontSize={20} />
              ) : (
                <RiLoginCircleLine className="fill-white" fontSize={20} />
              )}
            </div>
          </Link>
        )}
        {/* small screens loign in & logout when side is open*/}
        <Link
          to={!currentUser.isLogin && "/login"}
          onClick={() => handleLogout()}
        >
          <div
            className={`${
              !isSideBarExpanded && "hidden"
            } flex lg:hidden h-10 w-10 ${
              currentUser.isLogin ? "bg-red-500" : "bg-green-500"
            } dark:bg-slate-700 items-center justify-center rounded-full`}
          >
            {currentUser.isLogin ? (
              <RiLogoutCircleRLine className="fill-white" fontSize={20} />
            ) : (
              <RiLoginCircleLine className="fill-white" fontSize={20} />
            )}
          </div>
        </Link>

        {/* Theme toggle large screens */}
        {isSideBarExpanded ? (
          <div className="hidden lg:flex mt-8 lg:visible">
            <div className="tabs tabs-boxed px-3 flex w-full bg-gray-100 dark:bg-gray-700 items-center justify-between h-12 rounded-full cursor-pointer">
              <a
                href="0"
                onClick={(e) => {
                  e.preventDefault();
                  setThemeTab(0);
                  setTheme("light");
                }}
                className={
                  themeTab === 0
                    ? "tabs tab-active w-20 h-9 items-center bg-white dark:bg-black justify-center font-semibold  text-black text-xs tracking-wider rounded-2xl transform hover:scale-95 transition duration-500 ease-in-out"
                    : "tabs w-20 h-9 items-center text-sm justify-center font-semibold text-gray-400 hover:text-gray-500 tracking-wider"
                }
              >
                <i className="mr-2">{<BsSunFill />}</i>
                Light
              </a>
              <a
                href="1"
                onClick={(e) => {
                  e.preventDefault();
                  setThemeTab(1);
                  setTheme("dark");
                }}
                className={
                  themeTab === 1
                    ? "tabs tab-active w-20 h-9 items-center bg-white dark:bg-black text-xs text-black  dark:text-white justify-center font-semibold tracking-wider bg-amber-light rounded-2xl transform hover:scale-95 transition duration-500 ease-in-out"
                    : "tabs w-20 h-9 items-center text-xs justify-center font-semibold text-gray-400 hover:text-gray-500 tracking-wider"
                }
              >
                <i className="mr-2">{<BsMoonFill />}</i>
                Dark
              </a>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setTheme(colorTheme)}
            className="hidden lg:flex mt-8 lg:visible items-center justify-center h-10 w-10 bg-gray-100 dark:bg-slate-700 rounded-full cursor-pointer"
          >
            <div className="flex items-center justify-center h-8 w-8 bg-white dark:bg-slate-500 rounded-full">
              <i>{<BsSunFill className="fill-black dark:fill-white" />}</i>
            </div>
          </div>
        )}

        {/* theme toggle small screens */}
        <div
          onClick={() => setTheme(colorTheme)}
          className="visible lg:hidden flex items-center justify-center h-10 w-10 mt-4 bg-gray-100 dark:bg-slate-700 rounded-full cursor-pointer"
        >
          <div className="flex items-center justify-center h-8 w-8 bg-white dark:bg-slate-500 rounded-full">
            <i>{<BsSunFill className="fill-black dark:fill-white" />}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
