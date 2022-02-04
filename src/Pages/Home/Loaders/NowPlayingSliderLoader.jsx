import React from "react";

const NowPlayingSliderLoader = () => {
  return (
    <div className="flex h-1/3 w-full items-center justify-center my-8 ">
      <div className="flex h-8 w-8 items-center justify-center bg-slate-100 rounded-full mx-4 tranform hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out"></div>
      <div className="flex w-full h-64 shadow-lg rounded-3xl animate-pulse bg-slate-200"></div>
      <div className="flex h-8 w-8 items-center justify-center bg-slate-100 rounded-full mx-4 tranform hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out"></div>
    </div>
  );
};

export default NowPlayingSliderLoader;
