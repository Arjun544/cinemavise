import React, { useContext, useEffect } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import CustomButton from "../Components/CustomButton";
import { SideBarContext } from "./Main";

const NoAccess = () => {
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();
  const { isSideBarExpanded, setisSideBarExpanded } =
    useContext(SideBarContext);
  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  useEffect(() => {
    currentUser.isLogin && navigate("/");
  }, [currentUser]);

  return (
    <div className="relative flex flex-col w-screen h-screen items-center justify-center bg-white dark:bg-gray-800 overflow-x-hidden overflow-y-scroll">
      {/* Collapse sidebar icon */}
      <div
        onClick={sideBarToggle}
        className={`invisible lg:visible absolute z-50 top-10 left-3 flex items-center justify-center h-6 w-6 bg-white dark:bg-gray-900 cursor-pointer hover:bg-gray-50 hover:dark:bg-gray-700 shadow-md rounded-full`}
      >
        <i>
          {isSideBarExpanded ? (
            <MdOutlineKeyboardArrowLeft
              className="fill-black dark:fill-white"
              fontSize={20}
            />
          ) : (
            <MdOutlineKeyboardArrowRight
              className="fill-black dark:fill-white"
              fontSize={20}
            />
          )}
        </i>
      </div>

      {/* Dialogue */}
      <div className="flex flex-col h-1/4 w-1/4 rounded-2xl items-center justify-around bg-slate-100 shadow-sm">
        <div className="flex flex-col gap-2 items-center">
          <span className="font-semibold tracking-wider">Access denied</span>
          <span className="font-semibold text-gray-400 tracking-wider">
            Please sign in to continue
          </span>
        </div>

        <CustomButton onPressed={"/login"} text={"Sign in"} />
      </div>
    </div>
  );
};

export default NoAccess;
