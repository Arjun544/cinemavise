import React, { useContext, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useSnackbar } from "notistack";
import {
  MdClose,
  MdOutlineBookmark,
  MdOutlineBookmarkBorder,
} from "react-icons/md";
import { RiHeartFill, RiHeartLine, RiPlayFill } from "react-icons/ri";
import { calcTime } from "../../../Hooks/useCalcTime";
import { Link } from "react-router-dom";
import {
  addTvToFav,
  addTvToWatchlist,
  getTvStatus,
} from "../../../Api/UserApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { UserContext } from "../../../App";

const ShowInfo = ({ show, trailer, selectedSeason, selectedEpisode }) => {
   const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useContext(UserContext);
  const [isFav, setIsFav] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      const { data } = await getTvStatus(show.id, currentUser.token);
      setIsFav(data.favorite);
      setIsInWatchlist(data.watchlist);
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
      await addTvToFav(currentUser.token, show.id, !isFav);
      !isFav
        ? enqueueSnackbar(`${show.original_name} added to favorite list`, {
            variant: "success",
            autoHideDuration: 2000,
          })
        : enqueueSnackbar(`${show.original_name} removed from favorite list`, {
            variant: "error",
            autoHideDuration: 2000,
          });
    }
  };

  const handleAddToWatchlist = async () => {
    if (currentUser.isLogin === false) {
      enqueueSnackbar("Sign in required", {
        variant: "info",
        autoHideDuration: 2000,
      });
    } else {
      setIsInWatchlist(!isInWatchlist);
      await addTvToWatchlist(currentUser.token, show.id, !isInWatchlist);
      !isInWatchlist
        ? enqueueSnackbar(`${show.original_name} added to watch list`, {
            variant: "success",
            autoHideDuration: 2000,
          })
        : enqueueSnackbar(`${show.original_name} removed from watch list`, {
            variant: "error",
            autoHideDuration: 2000,
          });
    }
  };

  return (
    <div className="relative flex flex-col h-2/5 w-full my-10">
      <ReactTooltip />
      <LazyLoadImage
        className="w-full h-2/5 object-cover blur-sm"
        src={`https://image.tmdb.org/t/p/original/${show?.backdrop_path}`}
        alt="show poster"
        effect="blur"
      />

      {isTrailerPlaying && (
        <div className="absolute flex-col w-full h-full bg-black bg-opacity-70 z-40 ">
          <div
            onClick={() => setIsTrailerPlaying(!isTrailerPlaying)}
            className="flex flex-col gap-1 items-center absolute z-50 right-44 top-2.5 cursor-pointer"
          >
            <MdClose fontSize={24} color={'#fff'} />
            <span className=" text-white">Close Trailer</span>
          </div>
          <iframe
            className="rounded-2xl h-full w-full object-cover"
            src={`https://www.youtube.com/embed/${trailer?.[0].key}?autoplay=1&mute=1`}
            frameborder="0"
            title={trailer.name}
          ></iframe>
        </div>
      )}

      <div className="absolute flex w-full h-full bg-opacity-20">
        <LazyLoadImage
          className=" h-full p-4 pb-10 rounded-3xl"
          src={`https://image.tmdb.org/t/p/original/${show?.poster_path}`}
          alt="show poster"
          effect="blur"
          width={300}
        />
        <div className="flex flex-col my-4">
          <span className="text-white font-semibold text-2xl tracking-wider">
            {show?.original_name}
          </span>
          <div className="flex gap-3">
            <div className="flex gap-1">
              <span className="text-white text-sm tracking-wider">
                {show?.first_air_date}
              </span>
              <span className="text-white text-sm tracking-wider">
                ({show?.origin_country})
              </span>
            </div>
            <div className="flex gap-2">
              {show?.genres.map((genre, index) => (
                <span key={index} className="text-sm text-white">
                  {genre?.name}
                </span>
              ))}
            </div>
            <span className="text-white text-sm tracking-wider">
              {calcTime(show?.episode_run_time)}
            </span>
          </div>
          {/* Add ratings */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex h-10 w-10 bg-green-400 rounded-lg items-center justify-center">
              <span className="text-white text-sm tracking-wider">
                {show?.vote_average}
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
              className=" rounded-md  flex items-center justify-center cursor-pointer"
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

          {/* Play show & trailer */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => {
                trailer?.length === 0
                  ? enqueueSnackbar(
                      'No trailer available',
                      {
                        variant: "warning",
                        autoHideDuration: 2000,
                      }
                    )
                  : setIsTrailerPlaying(!isTrailerPlaying);
              }}
              className="flex h-10 px-3 gap-2 bg-red-500 rounded-lg items-center justify-center cursor-pointer tranform hover:scale-95 transition-all duration-1000 ease-in-out"
            >
              <RiPlayFill fontSize={22} fill="#fff" />
              <span className="text-xs tracking-wider text-white font-semibold">
                Play Trailer
              </span>
            </div>
            <Link
              to={`/watch/${show.id}`}
              state={{
                type: "tv",
                season: selectedSeason + 1,
                episode: selectedEpisode + 1,
              }}
            >
              <div className="flex h-10 px-3 gap-2 bg-green-500 rounded-lg items-center justify-center cursor-pointer tranform hover:scale-95 transition-all duration-1000 ease-in-out">
                <RiPlayFill fontSize={22} fill="#fff" />
                <span className="text-xs tracking-wider text-white font-semibold">
                  Watch Now
                </span>
              </div>
            </Link>
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-2 w-full mt-6">
            <span className="text-md tracking-wider text-slate-300">
              {show?.tagline}
            </span>
            <span className="font-bold text-white">Overview</span>
            <span className="text-sm tracking-wider text-white">
              {show?.overview}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowInfo;
