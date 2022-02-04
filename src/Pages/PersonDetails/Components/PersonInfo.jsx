import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PersonInfo = ({ person }) => {
  return (
    <div className="flex flex-col h-3/5 w-full my-10">
      <div className=" flex w-full h-full bg-sky-50">
        <LazyLoadImage
          className=" h-full p-4 rounded-3xl"
          src={`https://image.tmdb.org/t/p/original/${person?.profile_path}`}
          alt="profile profile"
          effect="blur"
        />
        <div className="flex flex-col my-4">
          <span className="text-black font-semibold text-2xl tracking-wider">
            {person?.name}
          </span>
          <div className="flex gap-3">
            <div className="flex gap-1">
              <span className="text-black text-sm tracking-wider">
                {person?.gender === "1" ? "Male" : "Female"}
              </span>
              <span className="text-black text-sm tracking-wider">
                ({person?.known_for_department})
              </span>
            </div>
            <span className="text-black text-sm tracking-wider">
              {person?.birthday}
            </span>
            <span className="text-black text-sm tracking-wider">
              {person.place_of_birth}
            </span>
          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="flex h-10 w-10 bg-green-400 rounded-lg items-center justify-center">
              <span className="text-black text-sm tracking-wider">
                {person?.popularity.toFixed(0)}
              </span>
            </div>
          </div>
          <span className="font-bold text-black">Overview</span>
          {/* Overview */}
          <div className="flex flex-col gap-2 w-full mt-3 pr-4 overflow-y-auto">
            <span className="text-sm tracking-wider text-black">
              {person?.biography}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;
