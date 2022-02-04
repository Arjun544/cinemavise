import React from 'react'

const MovieDetailsLoader = () => {
    return (
      <div className="flex flex-col items-start w-full h-full bg-white ">
        <div className="flex items-start rounded-xl ml-14 mt-10 h-6 w-32 bg-slate-200 animate-pulse"></div>
        <div className="flex h-3/5 w-full my-10 gap-2 bg-slate-200 animate-pulse">
          <div className=" w-60 m-4 rounded-3xl bg-white animate-pulse"></div>
          <div className="flex flex-col my-4 mr-4 w-full">
            <div className=" w-60 h-6 rounded-3xl bg-white"></div>
            <div className=" w-72 mt-4 h-6 rounded-3xl bg-white"></div>
            <div className=" w-44 mt-4 h-6 rounded-3xl bg-white"></div>
            <div className=" w-44 mt-10 h-6 rounded-3xl bg-white"></div>
            <div className=" w-full mt-10 h-full rounded-3xl bg-white"></div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-around h-16 w-10/12 bg-slate-200 rounded-3xl animate-pulse">
            <div className="flex w-28 h-10 bg-amber-300 rounded-2xl"></div>
            <div className="flex w-28 h-10 bg-amber-300 rounded-2xl"></div>
            <div className="flex w-28 h-10 bg-amber-300 rounded-2xl"></div>
            <div className="flex w-28 h-10 bg-amber-300 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
}

export default MovieDetailsLoader
