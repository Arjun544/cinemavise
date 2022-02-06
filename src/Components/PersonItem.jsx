import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PersonItem = ({ person, isBottom = false }) => {
  const [isHovered, setisHovered] = useState(false);

  return (
    <Link key={person.id} to={`/persons/${person.id}`}>
      <div
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
        className={` cursor-pointer relative ${isBottom && "mb-6"}`}
      >
        <div className="w-52 md:w-60 h-full">
          {person.profile_path === null ? (
            <div className="flex items-center justify-center h-80 w-full bg-slate-200 dark:bg-slate-700 rounded-xl transform hover:scale-95 transition-all duration-300 ease-in-out">
              <span className="text-black dark:text-white tracking-widest text-sm">
                No image
              </span>
            </div>
          ) : (
            <LazyLoadImage
              className=" w-full rounded-xl h-80 transform hover:scale-95 transition-all duration-300 ease-in-out"
              src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}
              alt="movie poster"
              effect="blur"
            />
          )}
          {isHovered && (
            <div className="absolute z-20 flex flex-col justify-between top-44 ml-36 px-4 py-2 rounded-xl h-32 w-64 bg-black">
              <span className="text-white tracking-wider">{person.name}</span>

              <span className="text-white text-sm line-clamp-4">
                {person.known_for_department}
              </span>
              <div className="flex w-full items-center justify-between">
                <div className="flex h-8 w-8 bg-green-400 rounded-lg items-center justify-center">
                  <span className="text-white text-sm tracking-wider">
                    {person.popularity.toFixed(0)}
                  </span>
                </div>

                <span className="text-white text-sm tracking-wider">
                  {(() => {
                    switch (person.gender) {
                      case 0:
                        return "Unknown";
                      case 1:
                        return "Female";
                      case 2:
                        return "Male";

                      default:
                        break;
                    }
                  })()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PersonItem;
