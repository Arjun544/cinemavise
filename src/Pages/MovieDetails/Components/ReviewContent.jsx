import { useState } from "react";

const ReviewContent = ({ content }) => {
  const [hasReadMore, setHasReadMore] = useState(true);
  return (
    <div className="flex flex-col items-start">
      <span
        className={`text-gray-600 line-clamp-${hasReadMore ? "3" : "none"}`}
      >
        {content}
      </span>
      <button
        onClick={() => setHasReadMore(!hasReadMore)}
        className="text-black text-sm font-semibold mt-2"
      >
        {hasReadMore ? "Read More" : "Read Less"}
      </button>
    </div>
  );
};

export default ReviewContent;
