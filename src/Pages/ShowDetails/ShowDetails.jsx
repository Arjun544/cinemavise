import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MdClose,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { SideBarContext } from "../Main";
import ShowInfo from "./Components/ShowInfo";
import { useQuery } from "react-query";
import { getShowById, getShowMediaById } from "../../Api/TvApi";
import ShowCast from "./Components/ShowCast";
import ShowMedia from "./Components/ShowMedia";
import ShowSimilar from "./Components/ShowSimilar";
import ShowReview from "./Components/ShowReview";
import MovieDetailsLoader from "../MovieDetails/Loaders/MovieDetailsLoader";
import ShowSeasons from "./Components/ShowSeasons";
import { useSnackbar } from "notistack";

const tabs = ["Seasons", "Cast", "Media", "Similar", "Reviews"];

const ShowDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [selectedSeason, setselectedSeason] = useState(0);
  const [selectedEpisode, setselectedEpisode] = useState(0);
  const params = useParams();
  const showId = params.id;
  const { isSdeBarExpanded, setisSideBarExpanded } = useContext(SideBarContext);
  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  const {
    isLoading: isShowLoading,
    isRefetching: isShowBgLoading,
    data: show,
    isError: hasShowError,
  } = useQuery(["showById", showId], async () => {
    const response = await getShowById(showId);
    return response.data;
  });

  const {
    isLoading: isMediaLoading,
    isRefetching: isMediaBgLoading,
    data: media,
    isError: hasMediaError,
  } = useQuery(
    ["showMediaById", showId],
    async () => {
      const response = await getShowMediaById(showId);
      return response.data.results;
    },
    { keepPreviousData: true }
    );

  if (isShowLoading && isMediaLoading && isShowBgLoading && isMediaBgLoading) {
    return <MovieDetailsLoader />;
  }

  if (hasMediaError || hasShowError) {
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
        className={`absolute z-30 top-5 ${
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
        <div className="flex flex-col items-start md:flex-row md:items-center justify-between pl-4 md:pl-14 mt-5">
          {/* Breadcrumbs */}
          <div className="flex items-center">
            <Link to={"/tv"} className="flex items-center gap-3 ">
              <div className=" hover:scale-90 transition-all duration-300 ease-in-out hover:mt-1 ">
                <span className="text-black text-sm tracking-widest dark:text-white hover:text-blue-600">
                  Tv
                </span>
              </div>
              <span className="text-black font-bold mt-1 tracking-widest dark:text-white ">
                {">"}
              </span>
              <span className="text-black mt-1 text-sm tracking-wider dark:text-white font-bold ">
                {show?.original_name}
              </span>
            </Link>
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
        <ShowInfo
          show={show}
          trailer={media?.filter(
            (item) =>
              item.type === "Trailer" && item.name === "Official Trailer"
          )}
          selectedSeason={selectedSeason}
          selectedEpisode={selectedEpisode}
          isTrailerPlaying={isTrailerPlaying}
          setIsTrailerPlaying={setIsTrailerPlaying}
        />
        {/* Tabs */}
        <div className="flex items-center mb-6 w-full justify-center">
          <div className="tabs tabs-boxed w-full mr-4 ml-2 md:mx-0 md:w-10/12 flex items-center justify-between  h-16 rounded-3xl px-5 bg-slate-300 dark:bg-gray-700">
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
                    case 4:
                      setSelectedTab(4);
                      break;
                    default:
                      break;
                  }
                }}
                className={
                  selectedTab === index
                    ? "tabs tab-active w-16 md:w-28 h-10 items-center bg-amber-400 text-sm md:text-base cursor-pointer justify-center font-medium  text-white tracking-wide rounded-2xl transform hover:scale-95 transition duration-500 ease-in-out"
                    : "tabs w-16 md:w-28 h-10 items-center justify-center font-medium text-sm md:text-base text-white hover:text-gray-500 cursor-pointer tracking-wide"
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
              return (
                <ShowSeasons
                  showId={showId}
                  seasons={show?.seasons}
                  selectedSeason={selectedSeason}
                  setselectedSeason={setselectedSeason}
                  selectedEpisode={selectedEpisode}
                  setselectedEpisode={setselectedEpisode}
                />
              );
            case 1:
              return <ShowCast showId={showId} />;
            case 2:
              return <ShowMedia media={media} />;
            case 3:
              return <ShowSimilar showId={showId} />;
            case 4:
              return <ShowReview showId={showId} />;

            default:
              return;
          }
        })()}
      </div>
    </div>
  );
};

export default ShowDetails;
