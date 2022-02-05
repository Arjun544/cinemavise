import moment from "moment";
import { RiMovie2Fill } from "react-icons/ri";
import { useQuery } from "react-query";
import { getShowReviewsById } from "../../../Api/TvApi";
import ReviewContent from "./ReviewContent";

const ShowReview = ({ showId }) => {
  const { isLoading, data, error } = useQuery(
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
            className="flex h-fit w-full bg-white dark:bg-slate-700 rounded-2xl shadow-sm mb-6 gap-6 py-5 px-4"
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
