import React from "react";
const PersonInfo = ({ person }) => {
  return (
    <div className="flex flex-col h-2/5 w-full my-10">
      <div className=" flex w-full h-full bg-sky-50 dark:bg-slate-700">
        <img
          className="hidden md:flex h-full p-4 rounded-3xl"
          src={`https://image.tmdb.org/t/p/original/${person?.profile_path}`}
          alt="profile profile"
        />
        <div className="flex flex-col my-4 px-4 md:px-0">
          <span className="text-black dark:text-white font-semibold text-lg md:text-2xl tracking-wider">
            {person?.name}
          </span>
          <div className="flex gap-3">
            <div className="flex gap-1">
              <span className="text-black dark:text-white text-xs md:text-sm tracking-wider">
                {person?.gender === "1" ? "Male" : "Female"}
              </span>
              <span className="text-black dark:text-white text-xs md:text-sm tracking-wider">
                ({person?.known_for_department})
              </span>
            </div>
            <span className="text-black dark:text-white text-xs md:text-sm tracking-wider">
              {person?.birthday}
            </span>
            <span className="text-black dark:text-white text-xs md:text-sm tracking-wider">
              {person.place_of_birth}
            </span>
          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="flex h-10 w-10 bg-green-400 rounded-lg items-center justify-center">
              <span className="text-black dark:text-white text-sm tracking-wider">
                {person?.popularity.toFixed(0)}
              </span>
            </div>
          </div>
          <span className="font-bold text-black dark:text-white">Overview</span>
          {/* Overview */}
          <div className="flex flex-col gap-2 w-full mt-3 pr-4 overflow-y-auto scrollbar scrollbar-thin hover:scrollbar-thumb-black scrollbar-thumb-black scrollbar-track-slate-500 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500">
            <span className="text-sm tracking-wider text-black dark:text-white">
              {person?.biography}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;
