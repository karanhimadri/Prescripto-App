import { useContext } from 'react';
import LogIn from './pages/LogIn';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AllAppointments from './pages/Admin/AllAppointments';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import { AppContext } from './context/AppContext.jsx';

const App = () => {
  const { token } = useContext(AppContext);

  const NAVBAR_HEIGHT = 64; // px
  const SIDEBAR_WIDTH = 240; // px

  return token?.aToken || token?.dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />

      {/* Fixed Navbar */}
      <div className='fixed top-0 left-0 w-full z-50 h-16'>
        <Navbar />
      </div>

      {/* Fixed Sidebar */}
      <div
        className='fixed top-16 left-0 h-[calc(100vh-64px)] w-[240px] border-r bg-white z-40'
      >
        <Sidebar />
      </div>

      {/* Scrollable Page Content */}
      <div
        className='ml-[240px] pt-16 h-[calc(100vh-64px)] overflow-y-auto p-6'
      >
        <Routes>
          {/* ADMIN Routes */}
          {token?.aToken && (
            <>
              <Route path='/' element={<Dashboard />} />
              <Route path='/all-appointments' element={<AllAppointments />} />
              <Route path='/add-doctor' element={<AddDoctor />} />
              <Route path='/doctors-list' element={<DoctorsList />} />
            </>
          )}

          {/* DOCTOR Routes */}
          {token?.dToken && (
            <>
              <Route path='/' element={<DoctorDashboard />} />
              <Route path='/doctor-appointments' element={<DoctorAppointments />} />
              <Route path='/doctor-profile' element={<DoctorProfile />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <LogIn />
      <ToastContainer />
    </div>
  );
};

export default App;
