import axios from 'axios';
import SERVER_DETAILS from '../../dev';

// const URI = SERVER_DETAILS.PRODUCTION_URL;
 const URI = SERVER_DETAILS.DEVELOPMENT_URL;

const axiosInstance = axios.create({
  baseURL: URI,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // set true only if using cookies/sessions
});

axiosInstance.interceptors.request.use(
  (config) => {

    const role = localStorage.getItem("role")
    let token = null;

    if (role === "PATIENT") {
      token = localStorage.getItem("pToken")
    } else if (role === "DOCTOR") {
      token = localStorage.getItem("dToken")
    } else if (role === "ADMIN") {
      token = localStorage.getItem("aToken")
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config;

  }, (error) => {
    return Promise.reject(error)
  }
)



export default axiosInstance;
