import React, { useState } from 'react'
import calculateAgeFromDateOfBirth from '../../utils/CalculateAgeFromDOB';
import slotDateFormat from '../../utils/SlotDateFormatter';
import { assets } from '../../assets/assets';

const AllAppointments = () => {

  const [pages, setPages] = useState({ page: 1, size: 5 });

  const appointments = [
    {
      id: 1,
      image: "/images/profile_pic.png",
      name: "Imran Khan",
      dob: "2005-01-08",
      slotDate: "2025-04-29",
      slotTime: "10:30 AM",
      docImage: "/images/doc1.png",
      docName: "Stephen Rabada",
      amount: "150"
    },
    {
      id: 2,
      image: "/images/profile_pic.png",
      name: "Imran Khan",
      dob: "2005-01-08",
      slotDate: "2025-04-29",
      slotTime: "10:30 AM",
      docImage: "/images/doc1.png",
      docName: "Stephen Rabada",
      amount: "150"
    },
    {
      id: 3,
      image: "/images/profile_pic.png",
      name: "Imran Khan",
      dob: "2005-01-08",
      slotDate: "2025-04-29",
      slotTime: "10:30 AM",
      docImage: "/images/doc1.png",
      docName: "Stephen Rabada",
      amount: "150"
    },
    {
      id: 4,
      image: "/images/profile_pic.png",
      name: "Imran Khan",
      dob: "2005-01-08",
      slotDate: "2025-04-29",
      slotTime: "10:30 AM",
      docImage: "/images/doc1.png",
      docName: "Stephen Rabada",
      amount: "150"
    },
    {
      id: 5,
      image: "/images/profile_pic.png",
      name: "Imran Khan",
      dob: "2005-01-08",
      slotDate: "2025-04-29",
      slotTime: "10:30 AM",
      docImage: "/images/doc1.png",
      docName: "Stephen Rabada",
      amount: "150"
    }
  ];

  function handleNextPages() {
    const updatedPages = { ...pages, page: pages.page + 1 };
    setPages(updatedPages);

    console.log(updatedPages);
    // Now here call API with updated Pages
  }

  function handlePreviousPages() {
    if (pages.page === 1) return;
    const updatedPages = { ...pages, page: pages.page - 1 };
    setPages(updatedPages);

    console.log(updatedPages);
    // Now here call API with updated Pages
  }


  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg, font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm min-h-[60vh] mx-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.image} alt="" />
              <p>{item.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAgeFromDateOfBirth(item.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docImage} alt="" />
              <p>{item.docName}</p>
            </div>
            <p>₹{item.amount}</p>
            <img className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
          </div>
        ))}
      </div>
      <div className='flex items-center gap-3 justify-end pt-5'>
        <button className='p-2 border rounded border-gray-400 hover:bg-gray-200 transition-all duration-300'
          disabled={pages.page === 1}
          onClick={handlePreviousPages}>
          Previous
        </button>
        <input className='w-14 p-2 border border-gray-400 rounded' type="number" value={pages.size}
          onChange={(event) => setPages(prev => ({ ...prev, size: Number(event.target.value) }))} />
        <button className='p-2 border rounded border-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300' onClick={handleNextPages}>Next</button>
      </div>
    </div>
  )
}

export default AllAppointments