import React, { useContext, useState } from "react";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import { SideBarContext } from "../Main";
import ShowSeasons from "../ShowDetails/Components/ShowSeasons";

const Player = () => {
  const { id } = useParams();
  const location = useLocation();
  const { type, season, episode, seasons } = location.state;
  const [selectedSeason, setselectedSeason] = useState(season);
  const [selectedEpisode, setselectedEpisode] = useState(episode);

  const { isSideBarExpanded, setisSideBarExpanded } =
    useContext(SideBarContext);
  const sideBarToggle = () => setisSideBarExpanded((presState) => !presState);

  return (
    <div className="relative z-10 flex flex-col w-screen h-screen bg-white dark:bg-gray-800 overflow-x-hidden">
      {/* Collapse sidebar icon */}
      <div
        onClick={() => sideBarToggle()}
        className={
          "invisible lg:visible absolute z-50 top-10 left-3 flex items-center justify-center h-6 w-6 bg-white dark:bg-gray-600 cursor-pointer hover:bg-gray-50 hover:dark:bg-gray-700 shadow-md rounded-full"
        }
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
      {/* Player */}
      <iframe
        className="flex h-full mx-3 md:mx-12 my-6 rounded-3xl"
        title="movie-player"
        id="iframe"
        allow="fullscreen"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        src={`${
          type === "movie"
            ? `https://www.2embed.ru/embed/tmdb/movie?id=${id}`
            : `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${
                selectedSeason + 1
              }&e=${selectedEpisode + 1}`
        } `}
        frameBorder="0"
      ></iframe>

      {type === "tv" && (
        <ShowSeasons
          showId={id}
          seasons={seasons}
          selectedSeason={selectedSeason}
          setselectedSeason={setselectedSeason}
          selectedEpisode={selectedEpisode}
          setselectedEpisode={setselectedEpisode}
        />
      )}
    </div>
  );
};

export default Player;
