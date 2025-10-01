import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Sidebar = () => {
  const { token } = useContext(AppContext);

  const adminLinks = [
    { to: '/', icon: assets.home_icon, label: 'Dashboard' },
    { to: '/all-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { to: '/add-doctor', icon: assets.add_icon, label: 'Add Doctor' },
    { to: '/doctors-list', icon: assets.people_icon, label: 'Doctors List' },
  ];

  const doctorLinks = [
    { to: '/', icon: assets.home_icon, label: 'Dashboard' },
    { to: '/doctor-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { to: '/doctor-profile', icon: assets.people_icon, label: 'Profile' },
  ];

  const linksToRender = token?.aToken ? adminLinks : token?.dToken ? doctorLinks : [];

  return (
    <div className='h-full bg-white border-r min-w-[60px] md:min-w-[240px] transition-all duration-300'>
      <ul className='text-[#515151] mt-5'>
        {linksToRender.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer transition-colors ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={link.icon} alt="" className="w-5 h-5" />
            <p className='hidden md:block'>{link.label}</p>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
