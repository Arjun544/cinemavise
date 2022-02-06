import { useContext, useEffect, useState } from "react";
import { RiMovie2Fill } from "react-icons/ri";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createSession, getRequestToken } from "../../Api/LoginApi";
import { getUserDetails } from "../../Api/UserApi";
import { UserContext } from "../../App";
import ParticlesContainer from "./Components/ParticlesContainer";
import SocialButton from "./Components/SocialButton";

const Register = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const hasParamsToken = params.has("request_token") ? true : false;

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      // get session id
      const { data } = await createSession(params.get("request_token"));
      const userData = await getUserDetails(data.session_id);
      console.log(userData.data);
      setCurrentUser({
        isLogin: true,
        token: data.session_id,
        username: userData.data.username,
      });
      setIsLoading(false);

      navigate("/");
    };
    if (params.has("request_token")) {
      getSession();
    }
  }, [hasParamsToken]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await getRequestToken();

      window.open(
        `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:3000/login`,
        "_self",
        "toolbar=0,status=0,width=1000,height=600, top=100"
      );

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex ">
      <div className="flex h-screen w-1/2">
        <ParticlesContainer />
      </div>

      <div className="flex flex-col absolute right-0 left-0 top-0 bottom-0 m-auto h-1/2 w-4/5 lg:w-1/3 gap-10 bg-[#5d618f] bg-opacity-80 rounded-3xl items-center justify-center">
        {isLoading ? (
          <i>
            {
              <RiMovie2Fill
                className="animate-spin animate-ping my-10"
                fontSize={30}
                color="#fff"
              />
            }
          </i>
        ) : (
          <>
            <div className="flex gap-1 items-center">
              <div className="flex p-2  dark:bg-white items-center justify-center rounded-xl">
                <i>{<RiMovie2Fill fontSize={28} color="#fff" />}</i>
              </div>

              <span className=" text-amber-400 text-lg font-bold tracking-wider">
                CinemaVise
              </span>
            </div>
            <SocialButton
              onPressed={handleLogin}
              img={"Tmdb.svg"}
              text={"Sign in with"}
            />

            <Link to="/">
              <span className="font-semibold  text-white tracking-wider cursor-pointer hover:text-gray-400">
                Skip
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
