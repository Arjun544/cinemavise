import React from "react";
import { useQuery } from "react-query";
import Masonry from "react-masonry-css";
import { getMovieCastById } from "../../../Api/MoviesApi";
import PersonItem from "../../../Components/PersonItem";
import { useSnackbar } from "notistack";
import WidgetLoader from "../../../Components/WidgetLoader";

const MovieCast = ({ movieId }) => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    isLoading,
    data: movieCast,
    isError,
  } = useQuery(
    ["movieCastById", movieId],
    async () => {
      const response = await getMovieCastById(movieId);
      return response.data.cast;
    },
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <WidgetLoader />;
  }

  if (isError) {
    enqueueSnackbar("Something went wrong", {
      variant: "error",
      autoHideDuration: 2000,
    });
  }

  return (
    <div className="flex flex-col my-6 ml-10">
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={{
          default: 3,
          3000: 6,
          1900: 5,
          1500: 4,
          1200: 3,
          1000: 2,
          500: 1,
        }}
      >
        {!isLoading &&
          movieCast.map((cast, index) => (
            <PersonItem key={cast.id} person={cast} isBottom={true} />
          ))}
      </Masonry>
    </div>
  );
};

export default MovieCast;
