import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:8000/links/",
});

export default axiosAPI;
