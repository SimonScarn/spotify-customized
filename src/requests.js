import axios from "axios";

const localhost = "http://localhost:8000"
const BASE_URL = "https://spoti--server.herokuapp.com";

export const apiRequest = axios.create({
  baseURL: BASE_URL,
});
