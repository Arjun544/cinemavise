import React, { useContext } from "react";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import  {SideBarContext}  from "../Main";

const Player = () => {
  const { id } = useParams();
  const location = useLocation();
  const { type, season, episode } = location.state;

  const { isSideBarExpanded, setisSideBarExpanded } =
    useContext(SideBarContext);
  const sideBarToggle = () => setisSideBarExpanded((presState) => !presState);

  return (
    <div className="relative z-10 flex w-screen h-screen bg-sky-50 dark:bg-gray-800">
      {/* Collapse sidebar icon */}
      <div
        onClick={() => sideBarToggle()}
        className={`invisible lg:visible absolute z-30 top-8 ${
          isSideBarExpanded ? "-left-3" : "left-3"
        } flex items-center justify-center h-6 w-6 bg-white dark:bg-gray-900 cursor-pointer hover:bg-gray-50 hover:dark:bg-gray-700 shadow-md rounded-full`}
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
      <iframe
        className="h-full w-full"
        title="movie-player"
        id="iframe"
        allow="fullscreen"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        src={`${
          type === "movie"
            ? `https://www.2embed.ru/embed/tmdb/movie?id=${id}`
            : `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`
        } `}
        width="100vh"
        height="100vh"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default Player;
