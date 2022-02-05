import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Breadcrumb, Breadcrumbs } from "react-rainbow-components";
import { useQuery } from "react-query";
import { getPersonById } from "../../Api/PersonApi";
import PersonInfo from "./Components/PersonInfo";
import PersonMovies from "./Components/PersonMovies";
import PersonTv from "./Components/PersonTv";
import PersonMedia from "./Components/PersonMedia";
import MovieDetailsLoader from "../MovieDetails/Loaders/MovieDetailsLoader";
import PersonSocials from "./Components/PersonSocials";
import { SideBarContext } from "../Main";

const tabs = ["Movies", "Tv", "Media", "Socials"];

const PersonDetails = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const params = useParams();
  const personId = params.id;
  const { isSdeBarExpanded, setisSideBarExpanded } = useContext(SideBarContext);
  const sideBarToggle = () => {
    setisSideBarExpanded((presState) => !presState);
  };

  const {
    isLoading: isPersonDetailsLoading,
    isFetching: isBgLoading,
    data,
  } = useQuery(["personDetails", personId], async () => {
    const response = await getPersonById(personId);
    return response.data;
  });

  if (isPersonDetailsLoading && isBgLoading) {
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
            <Breadcrumb label={data?.name} />
          </Breadcrumbs>
        </div>
        <PersonInfo person={data} />
        {/* Tabs */}
        <div className="flex items-center mb-6 w-full justify-center">
          <div className="tabs tabs-boxed w-full mr-4 ml-2 md:mx-0 md:w-10/12 flex items-center justify-between h-16 rounded-3xl px-5 bg-slate-300 dark:bg-slate-700">
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
              return <PersonMovies personId={personId} />;
            case 1:
              return <PersonTv personId={personId} />;
            case 2:
              return <PersonMedia personId={personId} />;
            case 3:
              return <PersonSocials personId={personId} />;

            default:
              return;
          }
        })()}
      </div>
    </div>
  );
};

export default PersonDetails;
