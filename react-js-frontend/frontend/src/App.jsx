import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import LogIn from "./pages/LogIn";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Navbar from "./components/Navbar";
import Appointments from "./pages/Appointments";
import Footer from "./components/Footer";
import { apiContext } from "./api/ApiContextProvider";
import { useContext, useEffect } from "react";
import RazorpayPayment from "./components/RazorpayPayment";
import { ToastContainer } from 'react-toastify';
import { AppContext } from "./context/AppContext";
import ProfileForm from "./components/ProfileForm";


function App() {
  const { getPatientInfo, fetchAllDoctorsDetails } = useContext(apiContext)
  const { doctorsData } = useContext(AppContext)

  useEffect(() => {
    (async () => {
      try {
        await getPatientInfo();
        if (doctorsData.length === 0) {
          await fetchAllDoctorsDetails();
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    })();
  }, []);

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/patient-details" element={<ProfileForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/appointment/:docId" element={<Appointments />} />
        <Route path="/payment" element={<RazorpayPayment />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
