import React from "react";
import Masonry from "react-masonry-css";
import { useQuery } from "react-query";
import { RiMovie2Fill } from "react-icons/ri";
import { getPersonTv } from "../../../Api/PersonApi";
import ShowItem from "../../../Components/ShowItem";

const PersonTv = ({ personId }) => {

  const { isLoading, data, error } = useQuery(
    ["personTv", personId],
    async () => {
      const response = await getPersonTv(personId);
      return response.data.cast;
    },
    { keepPreviousData: true }
  );

  if (isLoading) {
    return (
      <div className="flex w-screen h-full bg-sky-50 dark:bg-gray-800 items-center justify-center">
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
          data?.map((show) => (
            <ShowItem key={show.id} show={show} isBottom={true} />
          ))}
      </Masonry>
    </div>
  );
};

export default PersonTv;
