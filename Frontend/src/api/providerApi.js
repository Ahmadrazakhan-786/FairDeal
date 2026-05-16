import axios from "axios";

const API = axios.create({
  baseURL: "https://fairdeal-backend-rbz9.onrender.com/api",
});

export default API;