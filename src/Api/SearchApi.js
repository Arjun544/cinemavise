import axios from "axios";
const api = axios.create();

export const getSearch = async (keyword, page) =>
  await api.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${keyword}`
  );
