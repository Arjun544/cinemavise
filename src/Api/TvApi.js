import axios from "axios";
const api = axios.create();

// List of all the shows endpoints
export const getShows = async (type, page = 1) =>
  await api.get(
    `https://api.themoviedb.org/3/tv/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  );

export const getFilterTv = async (page, year, genres, lang = "en", sort) =>
  await api.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&first_air_date_year=${year}&with_genres=${genres}&with_original_language=${lang}&sort_by=${sort}`
  );

export const getShowGenres = () =>
  api.get(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

export const getShowById = (id) =>
  api.get(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

export const getShowCastById = (id) =>
  api.get(
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

export const getShowMediaById = (id) =>
  api.get(
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

export const getShowSimilarById = (id, page) =>
  api.get(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  );

export const getShowReviewsById = (id) =>
  api.get(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );

export const getShowEpisodes = (id, seasonNum) =>
  api.get(
    `https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

  export const getShowEpisodedetails = (id, seasonNum, episodeNum) =>
    api.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}/episode/${episodeNum}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
