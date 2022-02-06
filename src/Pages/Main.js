import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Grow from "@material-ui/core/Grow";
import useDarkMode from "../Hooks/useDarkMode";
import SideBar from "../Components/SideBar";
import Home from "./Home/Home";
import Search from "./Search/Search";
import Player from "./Player/Player";
import Movies from "./Movies/Movies";
import MovieDetails from "./MovieDetails/MovieDetails";
import Tv from "./Tv/Tv";
import ShowDetails from "./ShowDetails/ShowDetails";
import PersonDetails from "./PersonDetails/PersonDetails";
import Genres from "./Genres/Genres";
import GenreMovies from "./Genres/Components/GenreMovies";
import GenreTv from "./Genres/Components/GenreTv";
import NoAccess from "./NoAccess";
import Favourite from "./Collection/Favourite";
import Watchlist from "./Collection/Watchlist";

export const SideBarContext = createContext(null);

const Main = () => {
  useDarkMode();
  const [isSideBarExpanded, setisSideBarExpanded] = useState(true);

  return (
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      TransitionComponent={Grow}
    >
      <SideBarContext.Provider
        value={{ isSideBarExpanded, setisSideBarExpanded }}
      >
        <div className="flex h-full w-full ">
          <SideBar isSideBarExpanded={isSideBarExpanded} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watch/:id" element={<Player />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/tv" element={<Tv />} />
            <Route path="/tv/:id" element={<ShowDetails />} />
            <Route path="/persons/:id" element={<PersonDetails />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genres/movies/:id" element={<GenreMovies />} />
            <Route path="/genres/tv/:id" element={<GenreTv />} />
            <Route path="/collections/favorite" element={<Favourite />} />
            <Route path="/collections/watchlist" element={<Watchlist />} />
            <Route path="/noAccess" element={<NoAccess />} />
          </Routes>
        </div>
      </SideBarContext.Provider>
    </SnackbarProvider>
  );
};

export default Main;
