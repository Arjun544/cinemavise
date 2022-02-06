import React, { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { addTvToFav, addTvToWatchlist } from "../../../Api/UserApi.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App.js";

const UserTvItem = ({ tv, refetch, isFromFav }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isFav, setIsFav] = useState(true);

  const handleRemove = async (e) => {
    e.stopPropagation();
    setIsFav(!isFav);
    try {
      isFromFav
        ? await addTvToFav(currentUser.token, tv.id, !isFav)
        : await addTvToWatchlist(currentUser.token, tv.id, !isFav);
      await refetch();
    } catch (error) {
      console.log(error);
    }
    isFromFav
      ? enqueueSnackbar(`${tv.original_name} removed from favorite list`, {
          variant: "success",
          autoHideDuration: 2000,
        })
      : enqueueSnackbar(`${tv.original_name} removed from watch list`, {
          variant: "success",
          autoHideDuration: 2000,
        });
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/tv/${tv.id}`);
      }}
      className="relative flex flex-col h-72 mb-4 w-full cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out"
    >
      <img
        className="w-full h-full object-cover blur-sm rounded-2xl"
        src={`https://image.tmdb.org/t/p/original/${tv?.backdrop_path}`}
        alt="movie poster"
      />

      <div className="absolute flex w-full h-full bg-opacity-20 rounded-2xl">
        <img
          className="hidden md:flex h-full p-4 rounded-3xl"
          src={`https://image.tmdb.org/t/p/w300/${tv?.poster_path}`}
          alt="movie poster"
        />
        <div className="flex flex-col my-4 px-4 md:px-0">
          <span className="text-white font-semibold text-lg md:text-2xl tracking-wider">
            {tv?.original_name}
          </span>
          <div className="flex gap-3">
            <span className="text-white text-xs md:text-sm tracking-wider">
              {tv?.first_air_date}
            </span>
          </div>
          {/* Add ratings */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex h-10 w-10 bg-green-400 rounded-lg items-center justify-center">
              <span className="text-white text-sm tracking-wider">
                {tv?.vote_average}
              </span>
            </div>
            {/* fav */}
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
          <div className="flex flex-col gap-2 w-full mt-0 md:mt-6">
            <span className="hidden md:flex font-bold text-white">
              Overview
            </span>
            <span className="text-sm tracking-wider text-white">
              {tv?.overview}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTvItem;
