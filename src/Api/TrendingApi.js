import axios from "axios";
const api = axios.create();

// List of all the movies endpoints
export const getTrendings = async (type) =>
  await api.get(
    `https://api.themoviedb.org/3/trending/${type}/day?api_key=${process.env.REACT_APP_API_KEY}&page=1`
  );
