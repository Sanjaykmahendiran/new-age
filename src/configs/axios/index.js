import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstancev2 = axios.create({
  baseURL: process.env.API_BASE_URL_RESUME_UPLOAD,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const axiosInstancev3 = axios.create({
  baseURL: process.env.API_BASE_URL_SUBMIT_INTERVIEW,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

const axiosInstancev4 = axios.create({
  baseURL: process.env.API_BASE_URL_RESUME_EVALUATE,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export { axiosInstance, axiosInstancev2, axiosInstancev3, axiosInstancev4, axios };