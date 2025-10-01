import { createContext } from "react";
import { useState } from "react";
import { assets } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "" || assets.profile_pic,
    phone: "",
    addLine1: "",
    addLine2: "",
    gender: "",
    dob: ""
  })

  const [trackLoggrdIn, setTrackLoggrdIn] = useState(false);
  const [doctorsData, setDoctorsData] = useState([])
  const handleUserData = (userInfo) => {
    setUser(prev => ({
      ...prev,
      name: userInfo.name ?? prev.name,
      email: userInfo.email ?? prev.email,
      image: userInfo.profileImage ?? prev.image,
      phone: userInfo.phone ?? prev.phone,
      addLine1: userInfo.addLine1 ?? prev.addLine1,
      addLine2: userInfo.addLine2 ?? prev.addLine2,
      gender: userInfo.gender ?? prev.gender,
      dob: userInfo.dob ?? prev.dob,
    }));
  };
  const [appointmentsData, setAppointmentsData] = useState([]);

  const value = {
    user,
    trackLoggrdIn,
    doctorsData,
    appointmentsData,
    handleUserData,
    setTrackLoggrdIn,
    setDoctorsData,
    setAppointmentsData,
  }

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
}

export default AppContextProvider