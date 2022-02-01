import "./App.css";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SideBar from "./Components/SideBar";
import Home from "./Pages/Home/Home";
import useDarkMode from "./Hooks/useDarkMode";
import Player from "./Pages/Player/Player";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";
import ShowDetails from "./Pages/ShowDetails/ShowDetails";
import PersonDetails from "./Pages/PersonDetails/PersonDetails";
import Search from "./Pages/Search/Search";
import Movies from "./Pages/Movies/Movies";
import Tv from "./Pages/Tv/Tv";
import Genres from "./Pages/Genres/Genres";
import GenreMovies from "./Pages/Genres/Components/GenreMovies";
import GenreTv from "./Pages/Genres/Components/GenreTv";
import Login from "./Pages/Login/Login";

export const SideBarContext = createContext(null);
export const SpotifyContext = createContext(null);

function App() {
  useDarkMode();
  const [isSideBarExpanded, setisSideBarExpanded] = useState(true);

  return (
    <SideBarContext.Provider
      value={{ isSideBarExpanded, setisSideBarExpanded }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <div className="flex h-screen w-screen">
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
        </Routes>
      </div>
    </SideBarContext.Provider>
  );
}

export default App;
