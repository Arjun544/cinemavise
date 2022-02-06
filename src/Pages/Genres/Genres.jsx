import React, { useContext, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getMoviesGenres } from "../../Api/MoviesApi";
import { getShowGenres } from "../../Api/TvApi";
import { SideBarContext } from "../Main";
import { tabs } from "../../Constants/constants";
import { useSnackbar } from "notistack";

const Genres = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { isSideBarExpanded, setisSideBarExpanded } =
    useContext(SideBarContext);
  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  const { data: movieGenres, error: hasMoviesError } = useQuery(
    ["movieGenres"],
    async () => {
      const response = await getMoviesGenres();
      return response.data.genres;
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

  const { data: tvGenres, error: hasTvError } = useQuery(
    ["tvGenres"],
    async () => {
      const response = await getShowGenres();
      return response.data.genres;
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

  if (hasMoviesError || hasTvError) {
    enqueueSnackbar("Something went wrong", {
      variant: "error",
      autoHideDuration: 2000,
    });
  }

  return (
    <div className="relative flex flex-col items-center w-screen h-screen pt-8 px-8 bg-white dark:bg-gray-800 overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thin hover:scrollbar-thumb-black scrollbar-thumb-black scrollbar-track-slate-500 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500">
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
      <div className="flex items-start justify-center">
        <div className="tabs tabs-boxed w-fit flex items-center justify-between">
          {tabs.map((tab, index) => (
            <span
              key={index}
              onClick={(e) => {
                e.preventDefault();
                switch (index) {
                  case 0:
                    setSelectedTab(0);
                    setSelectedGenres([]);
                    break;
                  case 1:
                    setSelectedTab(1);
                    setSelectedGenres([]);
                    break;
                  default:
                    break;
                }
              }}
              className={
                selectedTab === index
                  ? "tabs tab-active w-24 h-8 items-center justify-center bg-amber-400 cursor-pointer font-medium  text-white tracking-wide rounded-md transform hover:scale-95 transition duration-500 ease-in-out"
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
      <div className="flex flex-col w-full items-start justify-start gap-1">
        <span className="mt-4 text-black dark:text-white">{`${
          selectedTab === 0 ? "Movies genres" : "Tv genres"
        }`}</span>
        <span className="mb-12 text-xs text-slate-500 dark:text-slate-300">
          Select one or more than one genres
        </span>
      </div>

      {/* Views */}
      {(() => {
        switch (selectedTab) {
          case 0:
            return (
              <div className="grid grid-cols-3 md:grid-flow-row-5 md:grid-cols-5 gap-4 h-2/3 m:h-1/2 w-full">
                {movieGenres?.map((genre, index) => {
                  return (() => {
                    switch (index) {
                      case 0:
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              if (selectedGenres.includes(genre)) {
                                setSelectedGenres(
                                  selectedGenres.filter((i) => i !== genre)
                                );
                              } else {
                                setSelectedGenres([...selectedGenres, genre]);
                              }
                            }}
                            className={`row-span-2 md:row-span-2 flex items-center justify-center ${
                              selectedGenres.includes(genre)
                                ? " border-blue-300 dark:bg-slate-700 border-4"
                                : "bg-slate-200 dark:bg-slate-700"
                            } rounded-xl cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 shadow-sm hover:scale-105 transition-all duration-300 ease-in-out`}
                          >
                            <span className="text-black dark:text-white text-sm tracking-wider">
                              {genre.name}
                            </span>
                          </div>
                        );
                      case 7:
                      case 8:
                      case 14:
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              if (selectedGenres.includes(genre)) {
                                setSelectedGenres(
                                  selectedGenres.filter((i) => i !== genre)
                                );
                              } else {
                                setSelectedGenres([...selectedGenres, genre]);
                              }
                            }}
                            className={`row-span-2 md:row-span-2 flex items-center justify-center ${
                              selectedGenres.includes(genre)
                                ? " border-blue-300 dark:bg-slate-700 border-4"
                                : "bg-slate-200 dark:bg-slate-700"
                            } rounded-xl cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-600 shadow-sm hover:scale-105 transition-all duration-300 ease-in-out`}
                          >
                            <span className="text-black dark:text-white text-sm tracking-wider">
                              {genre.name}
                            </span>
                          </div>
                        );

                      default:
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              if (selectedGenres.includes(genre)) {
                                setSelectedGenres(
                                  selectedGenres.filter((i) => i !== genre)
                                );
                              } else {
                                setSelectedGenres([...selectedGenres, genre]);
                              }
                            }}
                            className={`row-span-1 md:row-span-1 flex items-center justify-center ${
                              selectedGenres.includes(genre)
                                ? " border-blue-300 dark:bg-slate-700 border-4"
                                : "bg-slate-200 dark:bg-slate-700"
                            } rounded-xl cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-600 shadow-sm hover:scale-105 transition-all duration-300 ease-in-out`}
                          >
                            <span className="text-black dark:text-white text-sm tracking-wider">
                              {genre.name}
                            </span>
                          </div>
                        );
                    }
                  })();
                })}
              </div>
            );
          case 1:
            return (
              <div className="grid grid-cols-3 md:grid-flow-row-5 md:grid-cols-5 gap-4 h-2/3 m:h-1/2 w-full">
                {tvGenres?.map((genre, index) => {
                  return (() => {
                    switch (index) {
                      case 0:
                      case 11:
                      case 14:
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              if (selectedGenres.includes(genre)) {
                                setSelectedGenres(
                                  selectedGenres.filter((i) => i !== genre)
                                );
                              } else {
                                setSelectedGenres([...selectedGenres, genre]);
                              }
                            }}
                            className={`row-span-2 col-span-2 md:row-span-2 md:col-span-1 flex items-center justify-center ${
                              selectedGenres.includes(genre)
                                ? " border-blue-300 dark:bg-slate-700 border-4"
                                : "bg-slate-200 dark:bg-slate-700"
                            } rounded-xl cursor-pointer hover:bg-slate-300 dark:bg-slate-600 shadow-sm hover:scale-105 transition-all duration-300 ease-in-out`}
                          >
                            <span className="text-black dark:text-white text-sm tracking-wider">
                              {genre.name}
                            </span>
                          </div>
                        );

                      case 8:
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              if (selectedGenres.includes(genre)) {
                                setSelectedGenres(
                                  selectedGenres.filter((i) => i !== genre)
                                );
                              } else {
                                setSelectedGenres([...selectedGenres, genre]);
                              }
                            }}
                            className={`row-span-2 md:row-span-1 flex items-center justify-center ${
                              selectedGenres.includes(genre)
                                ? " border-blue-300  dark:bg-slate-700 border-4"
                                : "bg-slate-200 dark:bg-slate-700"
                            } rounded-xl cursor-pointer hover:bg-slate-300 dark:bg-slate-600 shadow-sm hover:scale-105 transition-all duration-300 ease-in-out`}
                          >
                            <span className="text-black dark:text-white text-sm tracking-wider">
                              {genre.name}
                            </span>
                          </div>
                        );

                      default:
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              if (selectedGenres.includes(genre)) {
                                setSelectedGenres(
                                  selectedGenres.filter((i) => i !== genre)
                                );
                              } else {
                                setSelectedGenres([...selectedGenres, genre]);
                              }
                            }}
                            className={`row-span-1 md:row-span-1 flex items-center justify-center ${
                              selectedGenres.includes(genre)
                                ? " border-blue-300 dark:bg-slate-700 border-4"
                                : "bg-slate-200 dark:bg-slate-700"
                            } rounded-xl cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-600 shadow-sm hover:scale-105 transition-all duration-300 ease-in-out`}
                          >
                            <span className="text-black dark:text-white text-sm tracking-wider">
                              {genre.name}
                            </span>
                          </div>
                        );
                    }
                  })();
                })}
              </div>
            );
          default:
            return;
        }
      })()}
      <Link
        to={
          selectedTab === 0
            ? `/genres/movies/${selectedGenres.map((item) => item.name)}`
            : `/genres/tv/${selectedGenres.map((item) => item.name)}`
        }
        state={{ genres: selectedGenres.map((item) => item) }}
      >
        <button
          disabled={selectedGenres.length === 0}
          className="bg-black h-10 w-24 mt-12 rounded-md text-sm text-white font-semibold tracking-wider disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-500 ease-in-out"
        >
          Filter
        </button>
      </Link>
    </div>
  );
};

export default Genres;
