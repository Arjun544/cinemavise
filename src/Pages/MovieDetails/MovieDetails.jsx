import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById, getMovieMediaById } from "../../Api/MoviesApi";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { SideBarContext } from "../Main";
import { Breadcrumb, Breadcrumbs } from "react-rainbow-components";
import MovieInfo from "./Components/MovieInfo";
import { RiMovie2Fill } from "react-icons/ri";
import { useQuery } from "react-query";
import MovieMedia from "./Components/MovieMedia";
import MovieCast from "./Components/MovieCast";
import MovieSimilar from "./Components/MovieSimilar";
import MovieReview from "./Components/MovieReview";
import MovieDetailsLoader from "./Loaders/MovieDetailsLoader";

const tabs = ["Cast", "Media", "Similar", "Reviews"];

const MovieDetails = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const params = useParams();
  const movieId = params.id;
  const { isSdeBarExpanded, setisSideBarExpanded } = useContext(SideBarContext);
  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  const {
    isLoading: isMovieLoading,
    isFetching: isMovieBgLoading,
    data: movie,
    error,
  } = useQuery(["movieById", movieId], async () => {
    const response = await getMovieById(movieId);
    return response.data;
  });

  const {
    isLoading: isMediaLoading,
    isFetching: isMediaBgLoading,
    data: media,
  } = useQuery(
    ["movieMediaById", movieId],
    async () => {
      const response = await getMovieMediaById(movieId);
      return response.data.results;
    },
    { keepPreviousData: true }
  );

  if (
    isMovieLoading &&
    isMediaLoading &&
    isMovieBgLoading &&
    isMediaBgLoading
  ) {
    return <MovieDetailsLoader />;
  }

  return (
    <div className="relative z-10 flex w-full min-h-screen bg-white dark:bg-gray-800 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thin hover:scrollbar-thumb-black scrollbar-thumb-black scrollbar-track-slate-500 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500">
      {/* Collapse sidebar icon */}
      <div
        onClick={sideBarToggle}
        className={`invisible lg:visible absolute z-30 top-10 ${
          isSdeBarExpanded ? "-left-3" : "left-3"
        } flex items-center justify-center h-6 w-6 bg-white dark:bg-gray-600 cursor-pointer hover:bg-gray-50 hover:dark:bg-gray-700 shadow-md rounded-full`}
      >
        <i>
          {isSdeBarExpanded ? (
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
      <div className="flex flex-col w-full h-full">
        <div className="flex pl-14 mt-10">
          <Breadcrumbs>
            <Link to={"/movies"}>
              <Breadcrumb label="Movies" />
            </Link>
            <Breadcrumb label={movie?.original_title} />
          </Breadcrumbs>
        </div>
        <MovieInfo
          movie={movie}
          trailer={media?.filter(
            (item) =>
              item.type === "Trailer" && item.name === "Official Trailer"
          )}
        />
        {/* Tabs */}
        <div className="flex items-center mb-6 w-full justify-center">
          <div className="tabs tabs-boxed w-10/12 flex items-center justify-between h-16 rounded-3xl px-5 bg-slate-300 dark:bg-gray-700">
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
                    case 2:
                      setSelectedTab(2);
                      break;
                    case 3:
                      setSelectedTab(3);
                      break;
                    default:
                      break;
                  }
                }}
                className={
                  selectedTab === index
                    ? "tabs tab-active w-28 h-10 items-center bg-amber-400 cursor-pointer justify-center font-medium  text-white tracking-wide rounded-2xl transform hover:scale-95 transition duration-500 ease-in-out"
                    : "tabs w-28 h-10 items-center justify-center font-medium text-white hover:text-gray-500 cursor-pointer tracking-wide"
                }
              >
                {tab}
              </span>
            ))}
          </div>
        </div>
        {/* Views */}
        {(() => {
          switch (selectedTab) {
            case 0:
              return <MovieCast movieId={movie?.id} />;
            case 1:
              return <MovieMedia media={media} />;
            case 2:
              return <MovieSimilar movieId={movie?.id} />;
            case 3:
              return <MovieReview movieId={movie?.id} />;

            default:
              return;
          }
        })()}
      </div>
    </div>
  );
};

export default MovieDetails;
