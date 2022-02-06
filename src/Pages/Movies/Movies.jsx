import React, { useContext, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Masonry from "react-masonry-css";
import { useQuery } from "react-query";
import { getFilterMovies } from "../../Api/MoviesApi";
import { SideBarContext } from "../Main";
import CustomDropDown from "../../Components/CustomDropDown";
import MovieItem from "../../Components/MovieItem";
import SimpleDropDown from "../../Components/SimpleDropDown";
import {
  genres,
  languages,
  movieSorts,
  years,
} from "../../Constants/constants";
import WhatsOnTrendingLoader from "../Home/Loaders/WhatsOnTrendingLoader";
import { useSnackbar } from "notistack";

const Movies = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setselectedYear] = useState("All");
  const [selectedGenres, setselectedGenres] = useState([]);
  const [selectedLang, setselectedLang] = useState({});
  const [selectedSort, setselectedSort] = useState(movieSorts[0]);

  const { isSideBarExpanded, setisSideBarExpanded } =
    useContext(SideBarContext);
  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  const { isLoading, data, isRefetching, isError } = useQuery(
    [
      "discoverMovies",
      currentPage,
      selectedYear,
      selectedGenres,
      selectedLang,
      selectedSort,
    ],
    async () => {
      const response = await getFilterMovies(
        currentPage,
        selectedYear === "All" ? "" : selectedYear,
        selectedGenres.map((item) => item),
        selectedLang === undefined ? null : selectedLang.iso_639_1,
        selectedSort.value
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
      {/* Filters */}
      <div className="flex flex-col w-full">
        <div className="flex gap-6 pt-12">
          <span className="text-black dark:text-white font-semibold">
            Genre:
          </span>
          <div className="flex flex-wrap items-center mt-1">
            {genres.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mr-3 mb-3">
                <input
                  type="checkbox"
                  value={false}
                  onChange={() => {
                    selectedGenres.includes(item.id)
                      ? setselectedGenres(
                          selectedGenres.filter((i) => i !== item.id)
                        )
                      : setselectedGenres([...selectedGenres, item.id]);
                  }}
                  className="form-checkbox text-indigo-600 bg-slate-200 dark:bg-slate-500 rounded-md outline-none border-0 cursor-pointer"
                />
                <span className="text-black dark:text-white text-sm mr-3">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-col lg:flex-row items-center justify-between my-4 lg:my-8">
        <span className="text-black dark:text-white tracking-wide mb-4 lg:mb-0">
          Filter results
        </span>

        <div className="flex flex-col items-center lg:flex-row">
          <SimpleDropDown
            hint={"Released"}
            items={years}
            selectedItem={selectedYear}
            setselectedItem={setselectedYear}
          />
          <CustomDropDown
            hint={"Language"}
            items={languages.map((item) => item)}
            selectedItem={selectedLang}
            setselectedItem={setselectedLang}
          />
          <CustomDropDown
            hint={"Sort by"}
            items={movieSorts.map((item) => item)}
            selectedItem={selectedSort}
            setselectedItem={setselectedSort}
          />
        </div>
      </div>
      {/* Filter results */}
      <div className="flex flex-col w-full h-full">
        {isLoading || isRefetching ? (
          <WhatsOnTrendingLoader />
        ) : !data.results.length > 0 ? (
          <div className="flex items-center justify-center">
            <span className="text-slate-500">Nothing found</span>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <Masonry
              className="flex animate-slide-fwd w-full mb-4"
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

export default Movies;
