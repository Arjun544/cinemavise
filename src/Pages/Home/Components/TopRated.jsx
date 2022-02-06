import React, { useState } from "react";
import { useQuery } from "react-query";
import MovieItem from "../../../Components/MovieItem";
import ShowItem from "../../../Components/ShowItem";
import WhatsOnTrendingLoader from "../Loaders/WhatsOnTrendingLoader";
import { getMovies } from "../../../Api/MoviesApi";
import { getShows } from "../../../Api/TvApi";
import Masonry from "react-masonry-css";
import { useSnackbar } from "notistack";

const TopRated = ({ tabs }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    isLoading: isMoviesLoading,
    data: movies,
    isRefetching: isMovieFetching,
    isError: hasMoviesError,
  } = useQuery(
    ["topRatedMovies", currentPage],
    async () => {
      const response = await getMovies("top_rated", currentPage);
      return response.data.results;
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

  const {
    isLoading: isShowsLoading,
    data: shows,
    isRefetching: isShowFetching,
    isError: hasShowsError,
  } = useQuery(
    ["topRatedShows", currentPage],
    async () => {
      const response = await getShows("top_rated", currentPage);
      return response.data.results;
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

  const handleNextPage = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => prev + 1);
  };
  const handlePreviousPage = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => prev - 1);
  };

  if (hasMoviesError || hasShowsError) {
    enqueueSnackbar("Something went wrong", {
      variant: "error",
      autoHideDuration: 2000,
    });
  }

  return (
    <div className="flex flex-col w-full mt-6">
      <div className="flex justify-between mx-6">
        <div className="flex items-center gap-8">
          <span className="text-black dark:text-white text-xl tracking-wide">
            Top Rated
          </span>

          {/* Tabs */}
          <div className="flex items-center">
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
        </div>
      </div>
      {isMoviesLoading ||
      isShowsLoading ||
      isMovieFetching ||
      isShowFetching ? (
        <WhatsOnTrendingLoader />
      ) : (
        <div className="flex flex-col my-6 ml-6">
          <Masonry
            className=" flex animate-slide-fwd w-full "
            breakpointCols={{
              default: 4,
              3000: 8,
              2000: 6,
              1200: 3,
              1000: 2,
              500: 1,
            }}
          >
            {(() => {
              switch (selectedTab) {
                case 0:
                  return movies?.map((movie) => (
                    <MovieItem key={movie.id} movie={movie} isBottom={true} />
                  ));
                case 1:
                  return shows?.map((show) => (
                    <ShowItem key={show.id} show={show} isBottom={true} />
                  ));

                default:
                  return;
              }
            })()}
          </Masonry>
          {/* Pagination */}
          <div className="flex items-center justify-center my-6 gap-2">
            <button
              onClick={(e) => handlePreviousPage(e)}
              disabled={currentPage === 1}
              className="bg-black h-10 w-24 rounded-md text-sm text-white font-semibold tracking-wider disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-500 ease-in-out"
            >
              Previous
            </button>
            <button
              onClick={(e) => handleNextPage(e)}
              disabled={movies?.total_pages === currentPage}
              className="bg-black h-10 w-24 rounded-md text-sm text-white font-semibold tracking-wider transform disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed hover:scale-105 transition-all duration-500 ease-in-out"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopRated;
