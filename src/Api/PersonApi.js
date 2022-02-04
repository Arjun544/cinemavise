import axios from "axios";
const api = axios.create();

// List of all the person endpoints
export const getPopularPersons = async () =>
  await api.get(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );

export const getPersonById = async (id) =>
  await api.get(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`
  );

export const getPersonMovies = async (id) =>
  await api.get(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`
  );

export const getPersonTv = async (id) =>
  await api.get(
    `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${process.env.REACT_APP_API_KEY}`
  );

  export const getPersonMedia = async (id) =>
    await api.get(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`
    );

     export const getPersonSocials = async (id) =>
       await api.get(
         `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`
       );