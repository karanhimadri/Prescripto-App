import React, { useState } from 'react'
import calculateAgeFromDateOfBirth from '../../utils/CalculateAgeFromDOB'
import slotDateFormat from '../../utils/SlotDateFormatter'
import { Check, X, User, ChevronLeft, ChevronRight } from 'lucide-react'
import Swal from 'sweetalert2'

function ShowAleartBar(func) {
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to cancel this appointment?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      func();
    }
  });
}

const DoctorAppointments = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Sample data - replace with your actual data
  const allData = [
    {
      id: 1,
      userImage: "/images/profile_pic.png",
      patientName: "John Doe",
      phoneNumber: "+91 9876543210",
      gender: "Male",
      date: "2025-06-25",
      time: "11:30 AM",
      dateOfBirth: "2005-01-08"
    },
    {
      id: 2,
      userImage: "/images/profile_pic.png",
      patientName: "Jane Smith",
      phoneNumber: "+91 9876543211",
      gender: "Female",
      date: "2025-06-26",
      time: "2:00 PM",
      dateOfBirth: "1990-03-15"
    },
    {
      id: 3,
      userImage: "/images/profile_pic.png",
      patientName: "Mike Johnson",
      phoneNumber: "+91 9876543212",
      gender: "Male",
      date: "2025-06-27",
      time: "9:00 AM",
      dateOfBirth: "1985-11-22"
    },
    // Add more sample data to demonstrate pagination
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 4,
      userImage: "/images/profile_pic.png",
      patientName: `Patient ${i + 4}`,
      phoneNumber: `+91 987654${3213 + i}`,
      gender: i % 2 === 0 ? "Male" : "Female",
      date: "2025-06-28",
      time: "10:00 AM",
      dateOfBirth: "1990-01-01"
    }))
  ]

  // Calculate pagination
  const totalPages = Math.ceil(allData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = allData.slice(startIndex, endIndex)

  const handleApprove = (appointmentId) => {
    console.log('Approved appointment:', appointmentId)
    // Add your approval logic here
  }

  const handleCancel = (appointmentId) => {
    // console.log('Cancelled appointment:', appointmentId)
    function log() {
      console.log("OK")
    }
    ShowAleartBar(log)

    // Add your cancellation logic here
  }

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const goToNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }


  return (
    <div className='w-full max-w-6xl m-5'>
      <div className='mb-4'>
        <h1 className='text-xl font-semibold text-gray-800'>All Appointments</h1>
        <p className='text-sm text-gray-600'>Total: {allData.length} appointments</p>
      </div>

      <div className='bg-white border rounded-lg shadow-sm'>
        {/* Header */}
        <div className='bg-gray-50 border-b px-4 py-3'>
          <div className='grid grid-cols-[0.5fr_2fr_1.5fr_1fr_1fr_1.5fr_1fr] gap-4 text-sm font-medium text-gray-700'>
            <p>#</p>
            <p>Patient</p>
            <p>Phone Number</p>
            <p>Gender</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Actions</p>
          </div>
        </div>

        {/* Appointment List */}
        <div className='divide-y'>
          {currentData.map((item, index) => (
            <div key={item.id} className='grid grid-cols-[0.5fr_2fr_1.5fr_1fr_1fr_1.5fr_1fr] gap-4 items-center px-4 py-3 hover:bg-gray-50 transition-colors text-sm'>

              {/* Index */}
              <span className='text-gray-600'>{startIndex + index + 1}</span>

              {/* Patient Info */}
              <div className='flex items-center gap-2'>
                <div className='relative'>
                  <img
                    className='w-8 h-8 rounded-full object-cover border'
                    src={item.userImage}
                    alt={item.patientName}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className='w-8 h-8 rounded-full bg-gray-200 hidden items-center justify-center'>
                    <User className='w-4 h-4 text-gray-500' />
                  </div>
                </div>
                <div>
                  <p className='font-medium text-gray-800'>{item.patientName}</p>
                </div>
              </div>

              {/* Phone Number */}
              <span className='text-gray-700'>{item.phoneNumber}</span>

              {/* Gender */}
              <div className='flex'>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.gender === 'Male'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-pink-100 text-pink-800 border border-pink-200'
                  }`}>
                  {item.gender}
                </span>
              </div>

              {/* Age */}
              <span className='text-gray-700'>{calculateAgeFromDateOfBirth(item.dateOfBirth)}y</span>

              {/* Date & Time */}
              <div className='text-gray-700'>
                <p className='font-medium'>{slotDateFormat(item.date)}</p>
                <p className='text-xs text-gray-500'>{item.time}</p>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-1'>
                <button
                  onClick={() => handleApprove(item.id)}
                  className='w-8 h-8 bg-green-50 hover:bg-green-100 border border-green-200 rounded-md flex items-center justify-center transition-colors'
                  title='Complete'
                >
                  <Check className='w-4 h-4 text-green-600' />
                </button>
                <button
                  onClick={() => handleCancel(item.id)}
                  className='w-8 h-8 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md flex items-center justify-center transition-colors'
                  title='Cancel'
                >
                  <X className='w-4 h-4 text-red-600' />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='border-t px-4 py-3 flex items-center justify-between'>
          <div className='text-sm text-gray-600'>
            Showing {startIndex + 1} to {Math.min(endIndex, allData.length)}
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className='p-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
            >
              <ChevronLeft className='w-4 h-4' />
            </button>

            <div className='flex gap-1'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded-md text-sm ${page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className='p-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
            >
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments