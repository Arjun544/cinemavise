import React, { useContext, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useQuery } from "react-query";
import { getFavMovies, getFavTv, getWatchlistMovies, getWatchlistTv } from "../../Api/UserApi";
import { tabs } from "../../Constants/constants";
import WhatsOnTrendingLoader from "../Home/Loaders/WhatsOnTrendingLoader";
import { SideBarContext } from "../Main";
import UserMovieItem from "./Components/UserMovieItem";
import UserTvItem from "./Components/UserTvItem";

const Watchlist = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { isSideBarExpanded, setisSideBarExpanded } =
    useContext(SideBarContext);
  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  const token = JSON.parse(localStorage.getItem("userInfo")).token;

  const {
    isMoviesLoading,
    data: movies,
    refetch: moviesRefetch,
    isMoviesFetching,
  } = useQuery(
    ["watchlistMovies"],
    async () => {
      const { data } = await getWatchlistMovies(token);
      return data.results;
    },
    {
      keepPreviousData: true,
    }
  );

  const {
    isTvLoading,
    data: tv,
    refetch: tvRefetch,
    isTvFetching,
  } = useQuery(
    ["watchlistTv"],
    async () => {
      const { data } = await getWatchlistTv(token);
      return data.results;
    },
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className="relative flex flex-col w-screen h-screen pt-8 px-8 bg-white dark:bg-gray-800 overflow-x-hidden overflow-y-scroll">
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

      {/* Tabs */}
      <div className="flex items-center justify-center">
        <div className="tabs tabs-boxed w-fit flex items-center justify-between">
          {tabs.map((tab, index) => (
            <span
              key={index}
              onClick={(e) => {
                e.preventDefault();
                switch (index) {
                  case 0:
                    setSelectedTab(0);
                    break;
                  case 1:
                    setSelectedTab(1);
                    break;
                  default:
                    break;
                }
              }}
              className={
                selectedTab === index
                  ? "tabs tab-active w-24 h-8 items-center bg-amber-400 cursor-pointer justify-center font-medium  text-white tracking-wide rounded-md transform hover:scale-95 transition duration-500 ease-in-out"
                  : "tabs w-24 h-10 items-center justify-center font-medium text-black hover:text-gray-500 cursor-pointer tracking-wide"
              }
            >
              <div className="flex items-center gap-2">
                <i>{tab.icon}</i>
                <span className="text-sm">{tab.name}</span>
              </div>
            </span>
          ))}
        </div>
      </div>

      <span className="text-black tracking-wide mt-6 lg:mb-0">
        {selectedTab === 0 ? "Watchlist movies" : "Watchlist tv"}
      </span>

      {/* Views */}

      {isMoviesLoading || isTvLoading || isTvFetching || isMoviesFetching ? (
        <WhatsOnTrendingLoader />
      ) : (
        (() => {
          switch (selectedTab) {
            case 0:
              return !movies?.length > 0 ? (
                <div className="flex items-center justify-center">
                  <span className="text-slate-500">
                    You haven't added any movie in watchlist
                  </span>
                </div>
              ) : (
                <div className="flex flex-col w-full mt-6">
                  {movies?.map((item) => (
                    <UserMovieItem
                      key={item.id}
                      movie={item}
                      refetch={moviesRefetch}
                      isFromFav={false}
                    />
                  ))}
                </div>
              );

            case 1:
              return !tv?.length > 0 ? (
                <div className="flex items-center justify-center">
                  <span className="text-slate-500">
                    You haven't added any favorite TV shows
                  </span>
                </div>
              ) : (
                <div className="flex flex-col w-full mt-6">
                  {tv?.map((item) => (
                    <UserTvItem
                      key={item.id}
                      tv={item}
                      refetch={tvRefetch}
                      isFromFav={false}
                    />
                  ))}
                </div>
              );

            default:
              return null;
          }
        })()
      )}
    </div>
  );
};

export default Watchlist;
