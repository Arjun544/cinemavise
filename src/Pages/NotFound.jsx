import React, { useContext } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import CustomButton from "../Components/CustomButton";
import { SideBarContext } from "./Main";

const NotFound = () => {
  const { isSideBarExpanded, setisSideBarExpanded } =
    useContext(SideBarContext);
  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  return (
    <div className="relative flex flex-col w-screen h-screen bg-white dark:bg-gray-800 overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thin hover:scrollbar-thumb-black scrollbar-thumb-black scrollbar-track-slate-500 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500">
      {/* Collapse sidebar icon */}
      <div
        onClick={sideBarToggle}
        className={`invisible lg:visible absolute z-50 top-10 left-3 flex items-center justify-center h-6 w-6 bg-white dark:bg-gray-600 cursor-pointer hover:bg-gray-50 hover:dark:bg-gray-700 shadow-md rounded-full`}
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
      <div className="flex flex-col items-center justify-center h-full w-full gap-8">
        <div className="flex flex-col items-center">
          <span className="text-blue-400 font-extrabold tracking-widest text-8xl animate-pulse">
            404
          </span>
          <span className="text-black dark:text-white font-extrabold tracking-widest text-lg">
            Page Not Found
          </span>
        </div>

        <CustomButton
          text={"GO HOME"}
          color="bg-blue-100 dark:bg-slate-400"
          onPressed={'/'}
        ></CustomButton>
      </div>
    </div>
  );
};

export default NotFound;
