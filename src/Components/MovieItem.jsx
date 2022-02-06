import React, { useState } from "react";
import { RiHeartFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MovieItem = ({ movie, isBottom = false }) => {
  const [isHovered, setisHovered] = useState(false);
  return (
    <Link to={`/movies/${movie.id}`}>
      <div
        key={movie.id}
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
        className={`flex cursor-pointer relative ${isBottom && "mb-3"} `}
      >
        <div className="w-52 md:w-60 h-full">
          {movie.poster_path === null ? (
            <div className="flex items-center justify-center h-80 w-full bg-slate-200 dark:bg-slate-700 rounded-xl transform hover:scale-95 transition-all duration-300 ease-in-out">
              <span className="text-black dark:text-white tracking-widest text-sm">
                No image
              </span>
            </div>
          ) : (
            <LazyLoadImage
              className="w-full rounded-xl transform hover:scale-95 transition-all duration-300 ease-in-out"
              src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              alt="movie poster"
              effect="blur"
            />
          )}
          {isHovered && (
            <div className="absolute z-20 flex flex-col justify-between top-40 ml-4 px-4 py-4 rounded-xl h-36 md:h-48 w-96 bg-black">
              <span className="text-white tracking-wider">
                {movie?.original_title}
              </span>

              <span className="text-white text-sm line-clamp-2 md:line-clamp-4">
                {movie?.overview}
              </span>
              <div className="flex w-full items-center justify-between">
                <div className="flex h-8 w-8 bg-green-400 rounded-lg items-center justify-center">
                  <span className="text-white text-sm tracking-wider">
                    {movie?.vote_average.toFixed(1)}
                  </span>
                </div>
                <span className="text-white text-sm tracking-wider capitalize">
                  {movie?.media_type}
                </span>
                <span className="text-white text-sm tracking-wider">
                  {movie?.release_date}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
