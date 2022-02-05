import { useState } from "react";

const ReviewContent = ({ content }) => {
  const [hasReadMore, setHasReadMore] = useState(true);
  return (
    <div className="flex flex-col items-start">
      <span
        className={`text-gray-600 dark:text-gray-300 line-clamp-${hasReadMore ? "3" : "none"}`}
      >
        {content}
      </span>
      <button
        onClick={() => setHasReadMore(!hasReadMore)}
        className="text-black dark:text-white text-sm font-semibold mt-2"
      >
        {hasReadMore ? "Read More" : "Read Less"}
      </button>
    </div>
  );
};

export default ReviewContent;
