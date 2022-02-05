import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { useQuery } from "react-query";
import { getShowSimilarById } from "../../../Api/TvApi";
import { RiMovie2Fill } from "react-icons/ri";
import ShowItem from "../../../Components/ShowItem";

const ShowSimilar = ({ showId }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, data, error } = useQuery(
    ["showSimilarById", currentPage, showId],
    async () => {
      const response = await getShowSimilarById(showId, currentPage);
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
    return (
      <div className="flex w-screen h-full bg-white dark:bg-gray-800 items-center justify-center">
        <i>
          {
            <RiMovie2Fill
              className="animate-spin animate-ping my-10 fill-black dark:fill-white"
              fontSize={30}
            />
          }
        </i>
      </div>
    );
  }

  return (
    <div className="flex flex-col my-6 mx-4">
      <Masonry
        className="flex animate-slide-fwd w-full"
        breakpointCols={{
          default: 4,
          3000: 8,
          2000: 6,
          1200: 3,
          1000: 2,
          500: 1,
        }}
      >
        {!isLoading && data.results.map((show) => <ShowItem show={show} isBottom={true} />)}
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

export default ShowSimilar;
