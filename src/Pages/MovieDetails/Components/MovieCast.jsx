import React from "react";
import { RiMovie2Fill } from "react-icons/ri";
import { useQuery } from "react-query";
import Masonry from "react-masonry-css";
import { getMovieCastById } from "../../../Api/MoviesApi";
import PersonItem from "../../Home/Components/PersonItem";

const MovieCast = ({ movieId }) => {
  const {
    isLoading,
    data: movieCast,
    error,
  } = useQuery(["movieCastById", movieId], async () => {
    const response = await getMovieCastById(movieId);
    return response.data.cast;
  }, { keepPreviousData: true });

  if (isLoading) {
    return (
      <div className="flex w-screen h-full bg-white dark:bg-gray-800 items-center justify-center">
        <i>
          {
            <RiMovie2Fill
              className="animate-spin animate-ping my-10 fill-black dark:fill-white"
              fontSize={30}
            />
          }
        </i>
      </div>
    );
  }

  return (
    <div className="flex flex-col my-6 ml-10">
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={{
          default: 3,
          3000: 8,
          2000: 6,
          1200: 3,
          1000: 2,
          500: 1,
        }}
      >
        {!isLoading &&
          movieCast.map((cast, index) => (
            <PersonItem key={cast.id} person={cast} isBottom={true}/>
          ))}
      </Masonry>
    </div>
  );
};

export default MovieCast;
