import { createContext, useContext, useState } from "react";
import axiosInstance from "./axiosConfig";
import { AppContext } from "../context/AppContext";

export const apiContext = createContext();

const ApiContextProvider = ({ children }) => {

  const { setToken } = useContext(AppContext)

  const [loading, setLoading] = useState({
    createNewDoctor: false,
    login: false
  })

  const login = async (data) => {
    setLoading(prev => ({ ...prev, login: true }))
    try {
      const response = await axiosInstance.post("/v1/panel/login", data);
      const resData = response.data;

      if (resData.status) {
        localStorage.setItem("role", resData.role);

        if (resData.role === "ADMIN") {
          localStorage.setItem("aToken", resData.token);
          setToken(prev => ({ ...prev, aToken: resData.token }));
        } else if (resData.role === "DOCTOR") {
          localStorage.setItem("dToken", resData.token);
          setToken(prev => ({ ...prev, dToken: resData.token }));
        } else {
          setLoading(prev => ({ ...prev, login: false }))
          return { success: false, message: "Login failed." };
        }
        setLoading(prev => ({ ...prev, login: false }))
        return { success: true, message: resData.message };
      }

      setLoading(prev => ({ ...prev, login: false }))
      return { success: false, message: resData.message };
    } catch (error) {
      setLoading(prev => ({ ...prev, login: false }))

      return { success: false, message: error.message };
    }
  };

  const createNewDoctor = async (formData) => {
    setLoading(prev => ({ ...prev, createNewDoctor: true }))
    try {
      const response = await axiosInstance.post("/admin/create-doctor", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      const data = response.data;
      setLoading(prev => ({ ...prev, createNewDoctor: false }))
      return { success: data.status, message: data.message }
    } catch (error) {
      setLoading(prev => ({ ...prev, createNewDoctor: false }))
      return { success: false, message: error.message }
    }
  }

  const values = {
    loading,
    login,
    createNewDoctor,
  }

  return <apiContext.Provider value={values}>
    {children}
  </apiContext.Provider>
}

export default ApiContextProvider;