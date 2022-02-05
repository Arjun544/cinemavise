import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { getTrendings } from "../../../Api/TrendingApi";
import MovieItem from "../../../Components/MovieItem";
import ShowItem from "../../../Components/ShowItem";
import WhatsOnTrendingLoader from "../Loaders/WhatsOnTrendingLoader";
import SliderControllers from "../../../Components/SliderControllers";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const WhatsOnTrending = ({ tabs }) => {
  const slider = useRef(null);
  const [selectedTab, setSelectedTab] = useState(0);

  const {
    isMoviesLoading,
    data: movies,
    isFetching: isMovieFetching,
  } = useQuery(
    "trendingMovies",
    async () => {
      const response = await getTrendings("movie");
      return response.data.results;
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const {
    isShowsLoading,
    data: shows,
    isFetching: isShowFetching,
  } = useQuery(
    "treadingShows",
    async () => {
      const response = await getTrendings("tv");
      return response.data.results;
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 5.9,
    slidesToScroll: 5.9,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col w-full mt-6">
      <div className="flex justify-between mx-6">
        <div className="flex items-center gap-4 md:gap-8">
          <span className="text-black dark:text-white text-xl tracking-wide">
            Trending
          </span>

          {/* Tabs */}
          <div className="flex items-center w-full">
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
        <div className="flex items-center">
          <Link to={`${selectedTab === 0 ? "/movies" : "/tv"}`}>
            <span className="hidden md:visible md:flex text-sm tracking-wide text-slate-500 dark:text-white hover:text-black cursor-pointer">
              View all
            </span>
          </Link>
          <SliderControllers slider={slider} />
        </div>
      </div>
      {isMoviesLoading ||
      isShowsLoading ||
      isMovieFetching ||
      isShowFetching ? (
        <WhatsOnTrendingLoader />
      ) : (
        <div className="flex w-full h-full my-4 mx-6">
          {(() => {
            switch (selectedTab) {
              case 0:
                return (
                  <div className="relative flex w-full h-full">
                    <Slider
                      ref={slider}
                      {...settings}
                      className="flex w-full h-full"
                    >
                      {movies?.map((movie) => (
                        <MovieItem key={movie.id} movie={movie} />
                      ))}
                    </Slider>
                  </div>
                );
              case 1:
                return (
                  <div className="relative flex w-full h-full">
                    <Slider
                      ref={slider}
                      {...settings}
                      className="flex w-full h-full"
                    >
                      {shows?.map((show) => (
                        <ShowItem key={show.id} show={show} />
                      ))}
                    </Slider>
                  </div>
                );

              default:
                return;
            }
          })()}
        </div>
      )}
    </div>
  );
};

export default WhatsOnTrending;
