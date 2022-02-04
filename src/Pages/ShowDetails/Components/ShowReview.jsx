import moment from "moment";
import { RiMovie2Fill } from "react-icons/ri";
import { useQuery } from "react-query";
import { getShowReviewsById } from "../../../Api/TvApi";
import ReviewContent from "./ReviewContent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
    <div className="flex flex-col my-6 mx-6">
      {!isLoading &&
        data.map((review) => (
          <div
            key={review.id}
            className="flex h-fit w-full bg-white rounded-2xl shadow-sm mb-6 gap-6 py-5 px-4"
          >
            <LazyLoadImage
              className="rounded-full h-12 w-12"
              src={review.author_details.avatar_path.slice(1)}
              alt="author pic"
              effect="blur"
            />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-black">
                  {review.author_details.username}
                </span>
                <span className="text-black text-xs">
                  {moment(review.created_at).format("Do MMM YYYY")}
                </span>
              </div>
              <ReviewContent content={review.content} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShowReview;
