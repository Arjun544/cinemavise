import Masonry from "react-masonry-css";
import { useQuery } from "react-query";
import { RiMovie2Fill } from "react-icons/ri";
import MovieItem from "../../../Components/MovieItem";
import { getPersonMovies } from "../../../Api/PersonApi";
import { useSnackbar } from "notistack";

const PersonMovies = ({ personId }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading, data, isError } = useQuery(
    ["personMovies", personId],
    async () => {
      const response = await getPersonMovies(personId);
      return response.data.cast;
    },
    { keepPreviousData: true }
  );

  if (isLoading) {
    return (
      <div className="flex w-screen h-full bg-white dark:bg-gray-800 items-center justify-center">
        <i>
          {
            <RiMovie2Fill
              className="animate-spin animate-ping my-10"
              fontSize={30}
              color="#000"
            />
          }
        </i>
      </div>
    );
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
        className=" flex animate-slide-fwd w-full"
        breakpointCols={{
          default: 4,
          3000: 8,
          2000: 6,
          1200: 3,
          1000: 2,
          500: 1,
        }}
      >
        {!isLoading &&
          data?.map((movie) => (
            <MovieItem key={movie.id} movie={movie} isBottom={true} />
          ))}
      </Masonry>
    </div>
  );
};

export default PersonMovies;
