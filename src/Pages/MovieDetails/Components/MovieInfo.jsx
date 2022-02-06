import React, { useContext, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useSnackbar } from "notistack";
import {
  MdOutlineBookmark,
  MdOutlineBookmarkBorder,
} from "react-icons/md";
import { RiHeartFill, RiHeartLine, RiPlayFill } from "react-icons/ri";
import { calcTime } from "../../../Hooks/useCalcTime";
import { Link } from "react-router-dom";
import {
  addMovieToFav,
  addMovieToWatchlist,
  getMovieStatus,
} from "../../../Api/UserApi";
import "react-lazy-load-image-component/src/effects/blur.css";
import { UserContext } from "../../../App";

const MovieInfo = ({
  movie,
  trailer,
  isTrailerPlaying,
  setIsTrailerPlaying,
}) => {
  const { currentUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isFav, setIsFav] = useState(false);
  const [isInWatchlist, setisInWatchlist] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      const { data } = await getMovieStatus(movie.id, currentUser.token);
      setIsFav(data.favorite);
      setisInWatchlist(data.watchlist);
    };
    if (currentUser.isLogin === true) {
      getStatus();
    }
  }, []);

  const handleAddToFav = async () => {
    if (currentUser.isLogin === false) {
      enqueueSnackbar("Sign in required", {
        variant: "info",
        autoHideDuration: 2000,
      });
    } else {
      setIsFav(!isFav);
      await addMovieToFav(currentUser.token, movie.id, !isFav);
      !isFav
        ? enqueueSnackbar(`${movie.original_title} added to favorite list`, {
            variant: "success",
            autoHideDuration: 2000,
          })
        : enqueueSnackbar(
            `${movie.original_title} removed from favorite list`,
            {
              variant: "error",
              autoHideDuration: 2000,
            }
          );
    }
  };

  const handleAddToWatchlist = async () => {
    if (currentUser.isLogin === false) {
      enqueueSnackbar("Sign in required", {
        variant: "info",
        autoHideDuration: 2000,
      });
    } else {
      setisInWatchlist(!isInWatchlist);
      await addMovieToWatchlist(currentUser.token, movie.id, !isInWatchlist);
      !isInWatchlist
        ? enqueueSnackbar(`${movie.original_title} added to watch list`, {
            variant: "success",
            autoHideDuration: 2000,
          })
        : enqueueSnackbar(`${movie.original_title} removed from watch list`, {
            variant: "error",
            autoHideDuration: 2000,
          });
    }
  };

  return (
    <div className="relative flex flex-col md:h-2/5 w-full mt-5 mb-5">
      <ReactTooltip />
      <img
        className="w-full h-full object-cover blur-sm"
        src={`https://image.tmdb.org/t/p/w300/${movie?.backdrop_path}`}
        alt="movie poster"
      />

      {isTrailerPlaying && (
        <div className="absolute flex-col w-full h-full bg-black bg-opacity-70 z-40">
          <iframe
            className="rounded-2xl h-full w-full object-cover"
            src={`https://www.youtube.com/embed/${trailer?.[0].key}?autoplay=1&mute=1`}
            frameborder="0"
            title={trailer.name}
          ></iframe>
        </div>
      )}

      <div className="absolute flex w-full h-full bg-opacity-20">
        <img
          className="hidden md:flex h-full p-4 rounded-3xl"
          src={`https://image.tmdb.org/t/p/w342/${movie?.poster_path}`}
          alt="movie poster"
        />
        <div className="flex flex-col my-4 px-4 md:px-0">
          <span className="text-white font-semibold text-lg md:text-2xl tracking-wider">
            {movie?.original_title}
          </span>
          <div className="flex gap-3">
            <div className="flex gap-1">
              <span className="text-white text-xs md:text-sm tracking-wider">
                {movie?.release_date}
              </span>
              <span className="text-white text-xs md:text-sm tracking-wider">
                ({movie?.production_countries[0].iso_3166_1})
              </span>
            </div>
            <div className="flex gap-2">
              {movie?.genres.map((genre, index) => (
                <span key={index} className="text-xs md:text-sm text-white">
                  {genre.name}
                </span>
              ))}
            </div>
            <span className="text-white text-xs md:text-sm tracking-wider">
              {calcTime(movie?.runtime)}
            </span>
          </div>
          <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0">
            <div className="flex items-center gap-3 my-4">
              <div className="flex h-10 w-10 bg-green-400 rounded-lg items-center justify-center">
                <span className="text-white text-sm tracking-wider">
                  {movie?.vote_average}
                </span>
              </div>

              {/* Fav */}
              <div
                data-tip={
                  isFav ? "Remove from favorite list" : "Add to favorite list"
                }
                data-effect="solid"
                data-place="bottom"
                data-background-color="white"
                data-text-color="black"
                className=" rounded-md  flex items-center justify-center cursor-pointer"
              >
                <div
                  onClick={() => handleAddToFav()}
                  className="flex h-10 w-10 bg-slate-800 rounded-lg items-center justify-center cursor-pointer"
                >
                  {isFav ? (
                    <RiHeartFill fontSize={20} fill="#00da7f" />
                  ) : (
                    <RiHeartLine fontSize={20} fill="#fff" />
                  )}
                </div>
              </div>

              {/* Watch list */}
              <div
                data-tip={
                  isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
                }
                data-effect="solid"
                data-place="bottom"
                data-background-color="white"
                data-text-color="black"
                className=" rounded-md flex items-center justify-center cursor-pointer"
              >
                <div
                  onClick={() => handleAddToWatchlist()}
                  className="flex h-10 w-10 bg-slate-800 rounded-lg items-center justify-center cursor-pointer"
                >
                  {isInWatchlist ? (
                    <MdOutlineBookmark fontSize={20} fill="#00da7f" />
                  ) : (
                    <MdOutlineBookmarkBorder fontSize={20} fill="#fff" />
                  )}
                </div>
              </div>
            </div>
            {/* Play movie & trailer */}
            <div className="flex items-center gap-4">
              <div
                onClick={() => {
                  trailer?.length === 0
                    ? enqueueSnackbar("No trailer available", {
                        variant: "warning",
                        autoHideDuration: 2000,
                      })
                    : setIsTrailerPlaying(!isTrailerPlaying);
                }}
                className="flex h-10 px-3 gap-2 bg-red-500 rounded-lg items-center justify-center cursor-pointer tranform hover:scale-95 transition-all duration-1000 ease-in-out"
              >
                <RiPlayFill fontSize={22} fill="#fff" />
                <span className="hidden md:flex text-xs tracking-wider text-white font-semibold">
                  Play Trailer
                </span>
                <span className="flex md:hidden text-xs tracking-wider text-white font-semibold">
                  Trailer
                </span>
              </div>
              <Link to={`/watch/${movie?.id}`} state={{ type: "movie" }}>
                <div className="flex h-10 px-3 gap-2 bg-green-500 rounded-lg items-center justify-center cursor-pointer tranform hover:scale-95 transition-all duration-1000 ease-in-out">
                  <RiPlayFill fontSize={22} fill="#fff" />
                  <span className="hidden md:flex text-xs tracking-wider text-white font-semibold">
                    Watch Now
                  </span>
                  <span className="flex md:hidden text-xs tracking-wider text-white font-semibold">
                    Watch
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-2 w-full mt-0 md:mt-6">
            <span className="text-md tracking-wider text-slate-300">
              {movie?.tagline}
            </span>
            <span className="hidden md:flex font-bold text-white">
              Overview
            </span>
            <span className="text-sm tracking-wider text-white line-clamp-3 md:line-clamp-4 lg:line-clamp-none">
              {movie?.overview}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
