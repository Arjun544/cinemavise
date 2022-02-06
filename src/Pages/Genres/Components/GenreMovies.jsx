import React, { useContext, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Masonry from "react-masonry-css";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { SideBarContext } from "../../Main";
import MovieItem from "../../../Components/MovieItem";
import { movieSorts } from "../../../Constants/constants";
import { getFilterMovies } from "../../../Api/MoviesApi";
import WhatsOnTrendingLoader from "../../Home/Loaders/WhatsOnTrendingLoader";
import { useSnackbar } from "notistack";

const GenreMovies = () => {
  const location = useLocation();
  const { genres } = location.state;
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);

  const { isSideBarExpanded, setisSideBarExpanded } =
    useContext(SideBarContext);
  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  const { isLoading, data, isRefetching, isError } = useQuery(
    ["genreMovies", currentPage, genres],
    async () => {
      const response = await getFilterMovies(
        currentPage,
        "",
        genres.map((item) => item.id),
        "en",
        movieSorts[0]
      );

      return response.data;
    },
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleNextPage = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => prev + 1);
  };
  const handlePreviousPage = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => prev - 1);
  };

    if (isError) {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }

  return (
    <div className="relative flex flex-col pt-8 px-8 w-screen h-screen bg-white dark:bg-gray-800 overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thin hover:scrollbar-thumb-black scrollbar-thumb-black scrollbar-track-slate-500 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500">
      {/* Collapse sidebar icon */}
      <div
        onClick={sideBarToggle}
        className={`absolute z-50 top-10 left-3 flex items-center justify-center h-6 w-6 bg-white dark:bg-gray-600 cursor-pointer hover:bg-gray-50 hover:dark:bg-gray-700 shadow-md rounded-full`}
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
      {/* Breadcrumbs */}
      <div className="flex pl-8 mt-2 mb-10">
        <Link to={"/genres"} className="flex items-center gap-3 ">
          <div className=" hover:scale-90 transition-all duration-300 ease-in-out hover:mt-1 ">
            <span className="text-black text-sm tracking-widest dark:text-white hover:text-blue-600">
              Movie Genres
            </span>
          </div>
          <span className="text-black font-bold mt-1 tracking-widest dark:text-white ">
            {">"}
          </span>
          <span className="text-black mt-1 text-sm tracking-wider dark:text-white font-bold ">
            {genres.map((item) => item.name).join(", ")}
          </span>
        </Link>
      </div>
      <span className="text-black dark:text-white tracking-wide pb-4 lg:mb-0">
        Filter results
      </span>
      {/* Filter results */}
      <div className="flex flex-col w-full h-full">
        {isLoading || isRefetching ? (
          <WhatsOnTrendingLoader />
        ) : !data.results.length > 0 ? (
          <div className="flex items-center justify-center">
            <span className="text-slate-500 dark:text-slate-300">
              Nothing found
            </span>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <Masonry
              className="flex animate-slide-fwd w-full mb-4"
              breakpointCols={{
                default: 4,
                3000: 6,
                1900: 5,
                1500: 4,
                1200: 3,
                1000: 2,
                500: 1,
              }}
            >
              {!isLoading &&
                data?.results.map((item) => (
                  <MovieItem key={item.id} movie={item} isBottom={true} />
                ))}
            </Masonry>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={(e) => handlePreviousPage(e)}
                disabled={currentPage === 1}
                className="bg-black h-10 w-24 mb-10 rounded-md text-sm text-white font-semibold tracking-wider disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-500 ease-in-out"
              >
                Previous
              </button>
              <button
                onClick={(e) => handleNextPage(e)}
                disabled={data?.total_pages === currentPage}
                className="bg-black h-10 w-24 mb-10 rounded-md text-sm text-white font-semibold tracking-wider transform disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed hover:scale-105 transition-all duration-500 ease-in-out"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreMovies;
