import { RiInstagramFill, RiMovie2Fill, RiTwitterFill } from "react-icons/ri";
import Masonry from "react-masonry-css";
import { useQuery } from "react-query";
import { getPersonMedia, getPersonSocials } from "../../../Api/PersonApi";

const PersonSocials = ({ personId }) => {
  const { isLoading, data, error } = useQuery(
    ["personSocials", personId],
    async () => {
      const response = await getPersonSocials(personId);
      return response.data;
    },
    { keepPreviousData: true }
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
    <div className=" flex my-6 mx-6 ml-10 gap-10">
      <a
        href={`https://twitter.com/${data?.instagram_id}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-3 px-4 py-2 tracking-wider rounded-lg mb-10 hover:bg-slate-200 hover:dark:bg-slate-600 cursor-pointer">
          <RiTwitterFill fontSize={25} fill="#00acee" />
          <span className="text-black dark:text-white">Twitter</span>
        </div>
      </a>

      <a
        href={`https://www.instagram.com/${data?.instagram_id}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-3 px-4 py-2 tracking-wider rounded-lg mb-10 hover:bg-slate-200 hover:dark:bg-slate-600 cursor-pointer">
          <RiInstagramFill fontSize={25} fill="#DD2A7B" />
          <span className="text-black dark:text-white">Instagram</span>
        </div>
      </a>
    </div>
  );
};

export default PersonSocials;
