import { createContext } from "react";
import axiosInstance from "./axiosConfig";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const apiContext = createContext();

const ApiContextProvider = ({ children }) => {

  const { handleUserData, setTrackLoggrdIn, setDoctorsData, setAppointmentsData } = useContext(AppContext)

  const [loading, setLoading] = useState({
    createAccountForPatient: false,
    addOrUpdatePatientInfo: false,
  });

  const createAccountForPatient = async (formData) => {
    setLoading(prev => ({ ...prev, createAccountForPatient: true }));

    try {
      const response = await axiosInstance.post("/patient/create-account", formData);
      setLoading(prev => ({ ...prev, createAccountForPatient: false }));

      const data = response.data;

      if (data.status) {
        setTrackLoggrdIn(true)
        localStorage.setItem("role", "PATIENT");
        localStorage.setItem("pToken", data.token);

        const userData = {
          name: formData.name,
          email: formData.email
        }
        handleUserData(userData)
        setTimeout(async () => { await getPatientInfo(); }, 1000);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      setLoading(prev => ({ ...prev, createAccountForPatient: false }));
      return { success: false, message: error.message };
    }
  };

  const logIn = async (loginData) => {
    setLoading(prev => ({ ...prev, createAccountForPatient: true }));
    try {
      const response = await axiosInstance.post("/patient/login", loginData)
      setLoading(prev => ({ ...prev, createAccountForPatient: false }));

      const data = response.data;
      if (data.status) {
        setTrackLoggrdIn(true)
        localStorage.setItem("role", "PATIENT");
        localStorage.setItem("pToken", data.token);

        const userData = {
          name: data.name,
          email: data.email
        }
        handleUserData(userData)
        setTimeout(async () => { await getPatientInfo(); }, 1000);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }

    } catch (error) {
      setLoading(prev => ({ ...prev, createAccountForPatient: false }));
      return { success: false, message: error.message };
    }
  }

  const updatePatientProfile = async (formData) => {
    setLoading(prev => ({ ...prev, addOrUpdatePatientInfo: true }));

    try {
      const response = await axiosInstance.post(
        "/patient/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      if (data.status) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || "Update failed" };
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong";
      return { success: false, message };
    } finally {
      setLoading(prev => ({ ...prev, addOrUpdatePatientInfo: false }));
    }
  };

  const getPatientInfo = async () => {
    try {
      const response = await axiosInstance.get("/patient/me")
      const data = response.data;
      if (!data.success) {
        return;
      }
      setTrackLoggrdIn(true)
      handleUserData(data)
      console.log("INFOO ", data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const uploadPatientImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file)

    try {
      const response = await axiosInstance.post("/patient/upload-patient-image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const data = response.data;
      return { success: true, message: data.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const logout = () => {
    localStorage.clear();
    setTrackLoggrdIn(false)
  }

  const createPaymentOrder = async (amount) => {
    try {
      const response = await axiosInstance.post("/api/payment/create-order", {
        amount, // in rupees
      });
      const data = response.data;
      if (data) {
        return { status: true, order_id: data.id, amount: data.amount, currency: data.currency }
      } else {
        return { status: false, message: "Payment creation failed." }
      }
    } catch (error) {
      return { status: false, message: error.message }
    }
  }

  const verifyPayment = async (responseData) => {
    const response = await axiosInstance.post("/api/payment/verify", responseData)
    const data = response.data;

    if (data.status) {
      return { success: true, message: data.message }
    } else {
      return { success: false, message: data.message }
    }
  }

  const fetchAllDoctorsDetails = async () => {
    try {
      const response = await axiosInstance.get("/v1/all-doctors");
      setDoctorsData(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const bookAppointment = async (appointmentData) => {
    console.log(appointmentData)
    try {
      const response = await axiosInstance.post("/patient/book-appointment", appointmentData);
      const data = response.data;

      if (data.status) {
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const fetchAllAppointments = async () => {
    const response = await axiosInstance.get("/patient/all-appointments")
    const resData = response.data;

    if (!resData.status) {
      return { success: false, message: resData.message }
    }
    setAppointmentsData(resData.data)
    return { success: true, message: resData.message }
  }

  const cancelAppointment = async (appoId) => {
    try {
      const res = await axiosInstance.patch(`/patient/cancel-appointment/${appoId}`)
      const resData = res.data;
      return { success: resData.status, message: resData.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const values = {
    loading,
    logout,
    createAccountForPatient,
    logIn,
    updatePatientProfile,
    getPatientInfo,
    uploadPatientImage,
    createPaymentOrder,
    verifyPayment,
    fetchAllDoctorsDetails,
    bookAppointment,
    fetchAllAppointments,
    cancelAppointment
  }

  return <apiContext.Provider value={values}>
    {children}
  </apiContext.Provider>
}

export default ApiContextProvider;