import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
//  import.meta.env.MODE === "development" ? : "/api"

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
    'Content-Type': 'application/json',
  },
	withCredentials: true,
});
