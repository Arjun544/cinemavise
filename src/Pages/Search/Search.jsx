import React, { useContext, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { RiSearch2Fill } from "react-icons/ri";
import Masonry from "react-masonry-css";
import { useQuery } from "react-query";
import { getSearch } from "../../Api/SearchApi";
import { SideBarContext } from "../Main";
import MovieItem from "../../Components/MovieItem";
import ShowItem from "../../Components/ShowItem";
import PersonItem from "../Home/Components/PersonItem";
import WhatsOnTrendingLoader from "../Home/Loaders/WhatsOnTrendingLoader";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { isSideBarExpanded, setisSideBarExpanded } =
    useContext(SideBarContext);

  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  const { isLoading, data, isRefetching } = useQuery(
    ["search", currentPage, searchQuery],
    async () => {
      const response = await getSearch(searchQuery, currentPage);
      return response.data;
    },
    {
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    setCurrentSearch(e.target.value);
  };

  const handleNextPage = async (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = async (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="relative flex flex-col px-6 pt-6 gap-10 w-screen h-screen bg-white dark:bg-gray-800 overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thin hover:scrollbar-thumb-black scrollbar-thumb-black scrollbar-track-slate-500 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500">
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
      {/* Search bar */}
      <div className="flex items-center w-full px-6 md:px-12 bg-white dark:bg-slate-800">
        <div className="flex h-14 w-full">
          <form
            action="submit"
            className="flex w-full items-center bg-slate-100 dark:bg-slate-700 rounded-lg px-4"
            onSubmit={(e) => handleSearch(e)}
          >
            <RiSearch2Fill className="text-slate-400" fontSize={25} />
            <input
              className="w-full h-full bg-slate-100 dark:bg-slate-700  pl-6 tracking-wider shadow-sm text-black rounded-lg  placeholder:text-slate-400 placeholder:text-sm focus:outline-none focus:shadow-outline dark:text-white"
              placeholder="Search movie & show"
              value={searchQuery}
              onChange={(e) => handleSearch(e)}
            ></input>
            {searchQuery.length > 0 && (
              <span
                onClick={() => setSearchQuery("")}
                className="flex items-center justify-center h-7 w-16 shadow-sm text-sm tracking-wider text-white rounded-lg bg-blue-500 hover:bg-blue-700 hover:bg-opacity-70 cursor-pointer"
              >
                Clear
              </span>
            )}
          </form>
        </div>
      </div>

      {/* If query characters are less than or is equal to 3 */}
      <div className="flex flex-col w-full h-full">
        {searchQuery.length < 3 && !data && (
          <div className="flex w-full h-full items-center justify-center">
            <span className="text-gray-600 dark:text-slate-300 font-semibold tracking-wider">
              Please enter something to search...
            </span>
          </div>
        )}

        {(isLoading || isRefetching) && searchQuery.length > 3 ? (
          <WhatsOnTrendingLoader />
        ) : (
          <div className="flex flex-col">
            {data && (
              <div className="flex items-center gap-1 mb-6">
                <span className="text-black tracking-wide">
                  Search results for
                </span>
                <span className="text-black font-semibold tracking-wide">
                  "{currentSearch}"
                </span>
              </div>
            )}

            {data?.results.length === 0 ? (
              <div className="flex w-full h-full items-center justify-center">
                <span className="text-gray-600 dark:text-slate-300 font-semibold tracking-wider">
                  No results found
                </span>
              </div>
            ) : (
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
                {!isLoading &&
                  data?.results.map((item) =>
                    item.media_type === "movie" ? (
                      <MovieItem key={item.id} movie={item} isBottom={true} />
                    ) : item.media_type === "tv" ? (
                      <ShowItem key={item.id} show={item} isBottom={true} />
                    ) : (
                      <PersonItem key={item.id} person={item} isBottom={true} />
                    )
                  )}
              </Masonry>
            )}

            {/* Pagination */}
            {data && data?.results.length !== 0 && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
