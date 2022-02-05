import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { getMovies, getMoviesGenres, getNowPlayingMovies } from "../../../Api/MoviesApi";
import NowPlayingSliderLoader from "../Loaders/NowPlayingSliderLoader";

const NowPlayingSlider = ( ) => {
  const [current, setCurrent] = useState(0);
  const {
    isLoading: moviesLoading,
    data: nowPlayingMovies,
    error,
  } = useQuery(
    "nowPlayingMovies",
    async () => {
      const response = await getMovies("now_playing");
      return response.data.results;
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );
  const { isLoading: genresLoading, data: moviesGenres } = useQuery(
    "moviesGenres",
    async () => {
      const response = await getMoviesGenres();
      return response.data.genres;
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

  const nextSlide = () => {
    setCurrent(current === nowPlayingMovies.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? nowPlayingMovies.length - 1 : current - 1);
  };

  if (moviesLoading && genresLoading) {
    return (
      <NowPlayingSliderLoader/>
    );
  }
  return (
    <div className="relative z-10 flex w-full h-1/3 items-center justify-center my-8">
      <div
        onClick={() => prevSlide()}
        className="flex h-8 w-8 items-center justify-center bg-slate-100 dark:bg-slate-600 rounded-full mx-4 tranform hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out"
      >
        <MdOutlineKeyboardArrowLeft
          fontSize={26}
          className="fill-black dark:fill-white"
        />
      </div>
      {!moviesLoading &&
        !genresLoading &&
        nowPlayingMovies.map(
          (movie, index) =>
            current === index && (
              <div
                key={movie.id}
                className="flex w-3/4 md:w-full h-full items-center justify-center"
              >
                <Link
                  to={`/movies/${movie.id}`}
                  className="h-full w-full flex items-center justify-center"
                >
                  <div
                    className=" flex flex-col h-64 w-full justify-end p-6 bg-center bg-cover shadow-lg rounded-3xl cursor-pointer tranform hover:scale-95 transition-all duration-1000 ease-in-out"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                    }}
                  >
                    <span className="text-white font-bold tracking-wider ">
                      {movie.original_title}
                    </span>
                    {/* Genres */}
                    <div className="hidden md:visible md:flex md:mt-2">
                      {!genresLoading &&
                        moviesGenres
                          .map((genre) => genre)
                          .filter((item) => movie.genre_ids.includes(item.id))
                          .map((test) => (
                            <span
                              key={test.id}
                              className="text-white text-xs font-bold tracking-wider rounded-md bg-slate-100 bg-opacity-70 mr-2 px-4 py-1 shadow-md"
                            >
                              {test.name}
                            </span>
                          ))}
                    </div>
                  </div>
                </Link>
              </div>
            )
        )}
      <div
        onClick={() => nextSlide()}
        className="flex h-8 w-8 items-center justify-center bg-slate-100 dark:bg-slate-600 rounded-full mx-4 tranform hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out"
      >
        <MdOutlineKeyboardArrowRight
          fontSize={26}
          className="fill-black dark:fill-white"
        />
      </div>
    </div>
  );
};

export default NowPlayingSlider;