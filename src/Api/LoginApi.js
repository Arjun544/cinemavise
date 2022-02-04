import axios from "axios";
const api = axios.create();

export const getRequestToken = async () =>
  await api.get(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`
  );

export const createSession = async (token) =>
  await api.post(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`,
    {
      request_token: token,
    },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
