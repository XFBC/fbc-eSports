import axios from "axios";

export const api = axios.create({
  baseURL: "https://nlw-esports-serve-production.up.railway.app/",
});