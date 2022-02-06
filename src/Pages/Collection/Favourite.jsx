import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useQuery } from "react-query";
import { getFavMovies, getFavTv } from "../../Api/UserApi";
import { UserContext } from "../../App";
import { tabs } from "../../Constants/constants";
import WhatsOnTrendingLoader from "../Home/Loaders/WhatsOnTrendingLoader";
import { SideBarContext } from "../Main";
import UserMovieItem from "./Components/UserMovieItem";
import UserTvItem from "./Components/UserTvItem";

const Favourite = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {currentUser} = useContext(UserContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const { isSideBarExpanded, setisSideBarExpanded } =
    useContext(SideBarContext);
  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  const {
    isLoading: isMoviesLoading,
    data: movies,
    refetch: moviesRefetch,
    isRefetching: isMoviesFetching,
    isError: hasMoviesError,
  } = useQuery(
    ["favMovies"],
    async () => {
      const { data } = await getFavMovies(currentUser.token);
      return data.results;
    },
    {
      keepPreviousData: true,
    }
  );

  const {
    isLoading: isTvLoading,
    data: tv,
    refetch: tvRefetch,
    isRefetching: isTvFetching,
    isError: hasTvError,
  } = useQuery(
    ["favTv"],
    async () => {
      const { data } = await getFavTv(currentUser.token);
      return data.results;
    },
    {
      keepPreviousData: true,
    }
  );

  if (hasMoviesError || hasTvError) {
    enqueueSnackbar("Something went wrong", {
      variant: "error",
      autoHideDuration: 2000,
    });
  }

  return (
    <div className="relative flex flex-col w-screen h-screen pt-8 px-8 bg-white dark:bg-gray-800 overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thin hover:scrollbar-thumb-black scrollbar-thumb-black scrollbar-track-slate-500 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500">
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
                  ? "tabs tab-active w-24 h-8 items-center bg-amber-400 cursor-pointer justify-center font-medium  text-white dark:text-white tracking-wide rounded-md transform hover:scale-95 transition duration-500 ease-in-out"
                  : "tabs w-24 h-10 items-center justify-center font-medium text-black dark:text-white hover:text-gray-500 cursor-pointer tracking-wide"
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

      <span className="text-black dark:text-white tracking-wide mt-6 lg:mb-0">
        {selectedTab === 0 ? "Favorite movies" : "Favorite tv"}
      </span>

      {/* Views */}

      {isMoviesLoading || isMoviesFetching || isTvLoading || isTvFetching ? (
        <WhatsOnTrendingLoader />
      ) : (
        (() => {
          switch (selectedTab) {
            case 0:
              return !movies?.length > 0 ? (
                <div className="flex items-center justify-center">
                  <span className="text-slate-500 dark:text-slate-300">
                    You haven't added any favorite movies
                  </span>
                </div>
              ) : (
                <div className="flex flex-col w-full mt-6">
                  {movies?.map((item) => (
                    <UserMovieItem
                      key={item.id}
                      movie={item}
                      refetch={moviesRefetch}
                      isFromFav={true}
                    />
                  ))}
                </div>
              );

            case 1:
              return !tv?.length > 0 ? (
                <div className="flex items-center justify-center">
                  <span className="text-slate-500 dark:text-slate-300">
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
                      isFromFav={true}
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

export default Favourite;
