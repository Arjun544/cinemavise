import React, { useContext } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { SideBarContext } from "../Main";
import { tabs } from "../../Constants/constants";
import NowPlayingSlider from "./Components/NowPlayingSlider";
import TopRated from "./Components/TopRated";
import WhatsPopular from "./Components/WhatsPopular";
import WhatsOnTrending from "./Components/WhatsTrending";

const Home = () => {
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
      <NowPlayingSlider />
      <WhatsOnTrending tabs={tabs} />
      <WhatsPopular tabs={tabs} />
      <TopRated tabs={tabs} />
    </div>
  );
};

export default Home;
