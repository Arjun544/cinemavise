import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { useQuery } from "react-query";
import { getMovieSimilarById } from "../../../Api/MoviesApi";
import MovieItem from "../../../Components/MovieItem";
import { useSnackbar } from "notistack";
import WidgetLoader from "../../../Components/WidgetLoader";

const MovieSimilar = ({ movieId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, data, isError } = useQuery(
    ["movieSimilarById", currentPage, movieId],
    async () => {
      const response = await getMovieSimilarById(movieId, currentPage);
      return response.data;
    },
    { keepPreviousData: true }
  );

  const handleNextPage = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => prev + 1);
  };
  const handlePreviousPage = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => prev - 1);
  };

  if (isLoading) {
    return <WidgetLoader />;
  }

  if (isError) {
    enqueueSnackbar("Something went wrong", {
      variant: "error",
      autoHideDuration: 2000,
    });
  }

  return (
    <div className="flex flex-col my-6 mx-6">
      <Masonry
        className=" flex animate-slide-fwd w-full"
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
          data.results.map((movie) => (
            <MovieItem key={movie.id} movie={movie} isBottom={true} />
          ))}
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
          disabled={data?.total_pages === currentPage}
          className="bg-black h-10 w-24 rounded-md text-sm text-white font-semibold tracking-wider transform disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed hover:scale-105 transition-all duration-500 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieSimilar;
