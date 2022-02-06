import { useSnackbar } from "notistack";
import { RiPlayFill } from "react-icons/ri";
import Masonry from "react-masonry-css";
import { useQuery } from "react-query";
import { getShowEpisodes } from "../../../Api/TvApi";
import WidgetLoader from "../../../Components/WidgetLoader";

const ShowSeasons = ({
  showId,
  seasons,
  selectedSeason,
  setselectedSeason,
  selectedEpisode,
  setselectedEpisode,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  
  const { isLoading, data, isError } = useQuery(
    ["showEpisodes", showId, selectedSeason],
    async () => {
      const response = await getShowEpisodes(
        showId,
        seasons[selectedSeason].season_number
      );
      return response.data.episodes;
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
    <div className="flex my-6 mx-10 gap-6 w-full pb-6">
      <div className="flex flex-col">
        {seasons.map((season, index) => (
          <div
            key={season?.id}
            onClick={() => setselectedSeason(index)}
            className={`flex items-center justify-around py-2 w-40 px-3 ${
              index === selectedSeason ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"
            } mb-2 rounded-lg  cursor-pointer`}
          >
            <span
              className={`text-black dark:text-white text-center text-sm  tracking-wider ${
                index !== selectedSeason && "hover:text-green-500"
              }`}
            >
              {season?.name}
            </span>
            <span className="text-black dark:text-white text-center text-xs  tracking-wider ">
              {season?.air_date.split("-", 1)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap flex-grow mr-20">
        <Masonry
          className="flex w-full animate-slide-fwd"
          breakpointCols={{
            default: 4,
            3000: 8,
            2000: 6,
            1200: 4,
            1000: 3,
            500: 1,
          }}
        >
          {data.map((episode, index) => (
            <div
              key={episode.id}
              onClick={() => setselectedEpisode(index)}
              className={`flex items-center h-10 gap-4 px-3 ${
                index === selectedEpisode
                  ? "bg-green-500 "
                  : "bg-slate-200 dark:bg-slate-700 hover:text-green-500"
              } mb-2 mr-2 rounded-lg text-black  cursor-pointer shadow-sm`}
            >
              <RiPlayFill />
              <span className=" text-sm dark:text-white">{episode.episode_number}</span>
              <span className="text-sm w-28 truncate dark:text-white">{episode.name}</span>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default ShowSeasons;
