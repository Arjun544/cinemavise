import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById, getMovieMediaById } from "../../Api/MoviesApi";
import {
  MdClose,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { SideBarContext } from "../Main";
import { Breadcrumb, Breadcrumbs } from "react-rainbow-components";
import MovieInfo from "./Components/MovieInfo";
import { useQuery } from "react-query";
import MovieMedia from "./Components/MovieMedia";
import MovieCast from "./Components/MovieCast";
import MovieSimilar from "./Components/MovieSimilar";
import MovieReview from "./Components/MovieReview";
import MovieDetailsLoader from "./Loaders/MovieDetailsLoader";
import { useSnackbar } from "notistack";

const tabs = ["Cast", "Media", "Similar", "Reviews"];

const MovieDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const params = useParams();
  const movieId = params.id;
  const { isSdeBarExpanded, setisSideBarExpanded } = useContext(SideBarContext);
  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  const {
    isLoading: isMovieLoading,
    isRefetching: isMovieBgLoading,
    data: movie,
    isError: hasMovieError
  } = useQuery(["movieById", movieId], async () => {
    const response = await getMovieById(movieId);
    return response.data;
  });

  const {
    isLoading: isMediaLoading,
    isRefetching: isMediaBgLoading,
    data: media,
    isError: hasMediaError
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

   if (hasMovieError || hasMediaError) {
     enqueueSnackbar("Something went wrong", {
       variant: "error",
       autoHideDuration: 2000,
     });
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
        <div className="flex flex-col items-start md:flex-row md:items-center justify-between pl-14 mt-10">
          <div className="flex items-center">
            <Breadcrumbs>
              <Link to={"/movies"}>
                <Breadcrumb label="Movies" />
              </Link>
              <Breadcrumb label={movie?.original_title} />
            </Breadcrumbs>
          </div>
          {/* Trailer playing icon */}
          {isTrailerPlaying && (
            <div
              onClick={() => setIsTrailerPlaying(!isTrailerPlaying)}
              className="flex items-center cursor-pointer mr-6"
            >
              <MdClose fontSize={24} />
              <span className="text-sm text-black">Close Trailer</span>
            </div>
          )}
        </div>

        <MovieInfo
          movie={movie}
          trailer={media?.filter(
            (item) =>
              item.type === "Trailer" && item.name === "Official Trailer"
          )}
          isTrailerPlaying={isTrailerPlaying}
          setIsTrailerPlaying={setIsTrailerPlaying}
        />
        {/* Tabs */}
        <div className="flex items-center mb-6 w-full justify-center">
          <div className="tabs tabs-boxed w-full mr-4 ml-2 md:mx-0 md:w-10/12 flex items-center justify-between h-16 rounded-3xl px-5 bg-slate-300 dark:bg-gray-700">
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
                    ? "tabs tab-active w-20 md:w-28 h-10 items-center bg-amber-400 cursor-pointer justify-center font-medium  text-white tracking-wide rounded-2xl transform hover:scale-95 transition duration-500 ease-in-out"
                    : "tabs w-20 md:w-28 h-10 items-center justify-center font-medium text-white hover:text-gray-500 cursor-pointer tracking-wide"
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
