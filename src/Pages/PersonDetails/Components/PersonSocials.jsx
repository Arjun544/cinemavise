import { useSnackbar } from "notistack";
import { RiInstagramFill, RiTwitterFill } from "react-icons/ri";
import { useQuery } from "react-query";
import { getPersonSocials } from "../../../Api/PersonApi";
import WidgetLoader from "../../../Components/WidgetLoader";

const PersonSocials = ({ personId }) => {
  const { enqueueSnackbar } = useSnackbar();
  
  const { isLoading, data, isError } = useQuery(
    ["personSocials", personId],
    async () => {
      const response = await getPersonSocials(personId);
      return response.data;
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
