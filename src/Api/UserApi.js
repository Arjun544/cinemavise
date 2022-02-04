import axios from "axios";
const api = axios.create();

export const getUserDetails = async (id) =>
  await api.get(
    `https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${id}`
  );

export const getFavMovies = async (id) =>
  await api.get(
    `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${id}&language=en-US&sort_by=created_at.asc&page=1`
  );

export const getWatchlistMovies = async (id) =>
  await api.get(
    `https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${id}&language=en-US&sort_by=created_at.asc&page=1`
  );

export const getFavTv = async (id) =>
  await api.get(
    `https://api.themoviedb.org/3/account/{account_id}/favorite/tv?api_key=${process.env.REACT_APP_API_KEY}&session_id=${id}&language=en-US&sort_by=created_at.asc&page=1`
  );

export const getWatchlistTv = async (id) =>
  await api.get(
    `https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?api_key=${process.env.REACT_APP_API_KEY}&session_id=${id}&language=en-US&sort_by=created_at.asc&page=1`
  );

export const addMovieToFav = async (sessionId, movieId, isFav) =>
  await api.post(
    `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`,
    { media_type: "movie", media_id: movieId, favorite: isFav },
    { headers: { "Content-type": "application/json" } }
  );

export const addMovieToWatchlist = async (sessionId, movieId, watchlist) =>
  await api.post(
    `https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`,
    { media_type: "movie", media_id: movieId, watchlist: watchlist },
    { headers: { "Content-type": "application/json" } }
  );

export const getMovieStatus = async (movieId, sessionId) =>
  await api.get(
    `https://api.themoviedb.org/3/movie/${movieId}/account_states?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`
  );

export const addTvToFav = async (sessionId, tvId, isFav) =>
  await api.post(
    `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`,
    { media_type: "tv", media_id: tvId, favorite: isFav },
    { headers: { "Content-type": "application/json" } }
  );

export const addTvToWatchlist = async (sessionId, tvId, watchlist) =>
  await api.post(
    `https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`,
    { media_type: "tv", media_id: tvId, watchlist: watchlist },
    { headers: { "Content-type": "application/json" } }
  );

export const getTvStatus = async (tvId, sessionId) =>
  await api.get(
    `https://api.themoviedb.org/3/tv/${tvId}/account_states?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`
  );
