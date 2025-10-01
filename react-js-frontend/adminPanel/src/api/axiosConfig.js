import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // set true only if using cookies/sessions
});

axiosInstance.interceptors.request.use(
  (config) => {

    const role = localStorage.getItem("role")
    let token = null;

    if (role === "DOCTOR") {
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
