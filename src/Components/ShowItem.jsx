import React, { useState } from "react";
import { RiHeartFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ShowItem = ({ show, isBottom = false }) => {
  const [isHovered, setisHovered] = useState(false);
  return (
    <Link to={`/tv/${show.id}`}>
      <div
        key={show.id}
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
        className={`relative cursor-pointer ${isBottom && "mb-6"}`}
      >
        <div className="w-52 md:w-60 h-full ">
          <LazyLoadImage
            className=" w-full rounded-xl object-cover transform hover:scale-95 transition-all duration-300 ease-in-out"
            src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
            alt="show poster"
            effect="blur"
          />
          {isHovered && (
            <div className="absolute z-20 flex flex-col justify-between top-40 ml-28 px-4 py-4 rounded-xl h-48 w-96 bg-black">
              <div className="flex w-full justify-between">
                <span className="text-white tracking-wider">
                  {show?.original_name}
                </span>
                <RiHeartFill fontSize={20} />
              </div>

              <span className="text-white text-sm line-clamp-4">
                {show?.overview}
              </span>
              <div className="flex w-full items-center justify-between">
                <div className="flex h-8 w-8 bg-green-400 rounded-lg items-center justify-center">
                  <span className="text-white text-sm tracking-wider">
                    {show?.vote_average?.toFixed(1)}
                  </span>
                </div>
                <span className="text-white text-sm tracking-wider capitalize">
                  {show?.media_type}
                </span>
                <span className="text-white text-sm tracking-wider">
                  {show?.first_air_date}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShowItem;
