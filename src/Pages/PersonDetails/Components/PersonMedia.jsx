import { RiMovie2Fill } from "react-icons/ri";
import Masonry from "react-masonry-css";
import { useQuery } from "react-query";
import { getPersonMedia } from "../../../Api/PersonApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PersonMedia = ({ personId }) => {
  const { isLoading, data, error } = useQuery(
    ["personMedia", personId],
    async () => {
      const response = await getPersonMedia(personId);
      return response.data.profiles;
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

  return (
    <div className=" flex flex-col my-6 mx-6 ml-10">
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={{
          default: 4,
          3000: 8,
          2000: 6,
          1200: 3,
          1000: 2,
          500: 1,
        }}
      >
        {data.map((item, index) => (
          <div key={item.id} className="w-72 h-full">
            <LazyLoadImage
              className=" w-full rounded-xl h-96 mb-10   object-cover transform hover:scale-95 transition-all duration-300 ease-in-out"
              src={`https://image.tmdb.org/t/p/original/${item.file_path}`}
              alt="movie poster"
              effect="blur"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default PersonMedia;
