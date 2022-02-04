import axios from "axios";
const api = axios.create();

// List of all the movies endpoints
export const getMovies = async (type, page = 1) =>
  await api.get(
    `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  );

  export const getFilterMovies = async (
    page,
    year,
    genres,
    lang = "en",
    sort
  ) =>
    await api.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&include_adult=false&include_video=true&year=${year}&with_genres=${genres}&with_original_language=${lang}&sort_by=${sort}`
    );

export const getMoviesGenres = () =>
  api.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

export const getMovieById = (id) =>
  api.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

export const getMovieCastById = (id) =>
  api.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

export const getMovieMediaById = (id) =>
  api.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

export const getMovieSimilarById = (id, page) =>
  api.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  );

export const getMovieReviewsById = (id) =>
  api.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
