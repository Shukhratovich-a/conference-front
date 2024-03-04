import axios from "axios";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const axiosInstance = axios.create({
  baseURL: DOMAIN,
});

export default axiosInstance;
