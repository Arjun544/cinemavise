import React, { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { addMovieToFav, addMovieToWatchlist } from "../../../Api/UserApi.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

const UserMovieItem = ({ movie, refetch, isFromFav }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isFav, setIsFav] = useState(true);

  const handleRemove = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFav(!isFav);
    isFromFav
      ? await addMovieToFav(currentUser.token, movie.id, !isFav)
      : await addMovieToWatchlist(currentUser.token, movie.id, !isFav);
    await refetch();
    isFromFav
      ? enqueueSnackbar(`${movie.original_title} removed from favorite list`, {
          variant: "success",
          autoHideDuration: 2000,
        })
      : enqueueSnackbar(`${movie.original_title} removed from watch list`, {
          variant: "success",
          autoHideDuration: 2000,
        });
  };

  return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          navigate(`/movies/${movie.id}`);
        }}
        className="relative flex flex-col h-72 mb-4 w-full cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out"
      >
        <img
          className="w-full h-full object-cover blur-sm rounded-2xl"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt="movie poster"
        />

        <div className="absolute flex w-full h-full bg-opacity-20 rounded-2xl">
          <img
            className=" h-full p-4 rounded-3xl"
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt="movie poster"
          />
          <div className="flex flex-col my-4">
            <span className="text-white font-semibold text-2xl tracking-wider">
              {movie?.original_title}
            </span>
            <div className="flex gap-3">
              <span className="text-white text-sm tracking-wider">
                {movie?.release_date}
              </span>
            </div>
            <div className="flex items-center gap-3 my-4">
              <div className="flex h-10 w-10 bg-green-400 rounded-lg items-center justify-center">
                <span className="text-white text-sm tracking-wider">
                  {movie?.vote_average}
                </span>
              </div>

              {/* Fav */}
              <span
                onClick={(e) => handleRemove(e)}
                className=" text-white bg-red-400 text-sm px-3 py-2 tracking-wider font-semibold rounded-lg cursor-pointer hover:bg-red-500"
              >
                {isFromFav
                  ? " Remove from favorite list"
                  : "Remove from watch list"}
              </span>
            </div>

            {/* Overview */}
            <div className="flex flex-col gap-2 w-full mt-6">
              <span className="text-md tracking-wider text-slate-300">
                {movie?.tagline}
              </span>
              <span className="font-bold text-white">Overview</span>
              <span className="text-sm tracking-wider text-white">
                {movie?.overview}
              </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserMovieItem;
