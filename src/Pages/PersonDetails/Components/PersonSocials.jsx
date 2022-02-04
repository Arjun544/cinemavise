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
    <div className=" flex my-6 mx-6 ml-10 gap-10">
      <a
        href={`https://twitter.com/${data?.instagram_id}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-3 px-4 py-2 tracking-wider rounded-lg mb-10 hover:bg-slate-200 cursor-pointer">
          <RiTwitterFill fontSize={25} fill="#00acee" />
          <span className="text-black">Twitter</span>
        </div>
      </a>

      <a
        href={`https://www.instagram.com/${data?.instagram_id}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-3 px-4 py-2 tracking-wider rounded-lg mb-10 hover:bg-slate-200 cursor-pointer">
          <RiInstagramFill fontSize={25} fill="#DD2A7B" />
          <span className="text-black">Instagram</span>
        </div>
      </a>
    </div>
  );
};

export default PersonSocials;
