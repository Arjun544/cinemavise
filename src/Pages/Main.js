import { createContext, lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Grow from "@material-ui/core/Grow";
import useDarkMode from "../Hooks/useDarkMode";
import SideBar from "../Components/SideBar";
import WidgetLoader from "../Components/WidgetLoader";
import NoAccess from "./NoAccess";
import NotFound from "./NotFound";

const Home = lazy(() => import("./Home/Home"));
const Search = lazy(() => import("./Search/Search"));
const Player = lazy(() => import("./Player/Player"));
const Movies = lazy(() => import("./Movies/Movies"));
const MovieDetails = lazy(() => import("./MovieDetails/MovieDetails"));
const Tv = lazy(() => import("./Tv/Tv"));
const ShowDetails = lazy(() => import("./ShowDetails/ShowDetails"));
const PersonDetails = lazy(() => import("./PersonDetails/PersonDetails"));
const Genres = lazy(() => import("./Genres/Genres"));
const GenreMovies = lazy(() => import("./Genres/Components/GenreMovies"));
const GenreTv = lazy(() => import("./Genres/Components/GenreTv"));
const Favourite = lazy(() => import("./Collection/Favourite"));
const Watchlist = lazy(() => import("./Collection/Watchlist"));

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
            <Route
              path="/"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/search"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <Search />
                </Suspense>
              }
            />
            <Route
              path="/watch/:id"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <Player />
                </Suspense>
              }
            />
            <Route
              path="/movies"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <Movies />
                </Suspense>
              }
            />
            <Route
              path="/movies/:id"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <MovieDetails />
                </Suspense>
              }
            />
            <Route
              path="/tv"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <Tv />
                </Suspense>
              }
            />
            <Route
              path="/tv/:id"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <ShowDetails />
                </Suspense>
              }
            />
            <Route
              path="/persons/:id"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <PersonDetails />
                </Suspense>
              }
            />
            <Route
              path="/genres"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <Genres />
                </Suspense>
              }
            />
            <Route
              path="/genres/movies/:id"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <GenreMovies />
                </Suspense>
              }
            />
            <Route
              path="/genres/tv/:id"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <GenreTv />
                </Suspense>
              }
            />
            <Route
              path="/collections/favorite"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <Favourite />
                </Suspense>
              }
            />
            <Route
              path="/collections/watchlist"
              element={
                <Suspense fallback={<WidgetLoader />}>
                  <Watchlist />
                </Suspense>
              }
            />
            <Route path="/noAccess" element={<NoAccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SideBarContext.Provider>
    </SnackbarProvider>
  );
};

export default Main;
