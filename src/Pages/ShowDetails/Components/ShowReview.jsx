import moment from "moment";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { getShowReviewsById } from "../../../Api/TvApi";
import WidgetLoader from "../../../Components/WidgetLoader";
import ReviewContent from "./ReviewContent";

const ShowReview = ({ showId }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading, data, isError } = useQuery(
    ["ShowReviewById", showId],
    async () => {
      const response = await getShowReviewsById(showId);
      return response.data.results;
    },
    {
      keepPreviousData: true,
    }
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
    <div className="flex flex-col my-6 mx-6">
      {!isLoading && data.length === 0 ? (
        <div className="flex w-full h-full items-center justify-center">
          <span className="text-black dark:text-white tracking-wider ">
            No reviews
          </span>
        </div>
      ) : (
        data.map((review) => (
          <div
            key={review.id}
            className="flex h-fit w-full bg-slate-50 dark:bg-slate-700 rounded-2xl shadow-sm mb-6 gap-6 py-5 px-4"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-black dark:text-white">
                  {review.author_details.username}
                </span>
                <span className="text-black dark:text-white text-xs">
                  {moment(review.created_at).format("Do MMM YYYY")}
                </span>
              </div>
              <ReviewContent content={review.content} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowReview;
