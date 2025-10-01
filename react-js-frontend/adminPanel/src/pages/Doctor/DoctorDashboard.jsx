import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import LineChart from '../../components/LineChart'

const DoctorDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dashboardData = {
    totalEarnings: 2450,
    totalAppointments: 47,
    scheduledAppointments: 12,
    completedAppointments: 28,
    canceledAppointments: 7,
    todayAppointments: 5,
    totalPatients: 124,
    monthlyEarnings: 8950
  }

  const monthlyData = {
    0: { earnings: 7200, appointmentRate: 85, satisfaction: 4.7 },
    1: { earnings: 6800, appointmentRate: 82, satisfaction: 4.6 },
    2: { earnings: 8950, appointmentRate: 89, satisfaction: 4.8 },
    3: { earnings: 9200, appointmentRate: 91, satisfaction: 4.9 },
    4: { earnings: 8750, appointmentRate: 87, satisfaction: 4.8 },
    5: { earnings: 9450, appointmentRate: 93, satisfaction: 4.9 },
    6: { earnings: 8950, appointmentRate: 88, satisfaction: 4.8 },
    7: { earnings: 0, appointmentRate: 0, satisfaction: 0 },
    8: { earnings: 0, appointmentRate: 0, satisfaction: 0 },
    9: { earnings: 0, appointmentRate: 0, satisfaction: 0 },
    10: { earnings: 0, appointmentRate: 0, satisfaction: 0 },
    11: { earnings: 0, appointmentRate: 0, satisfaction: 0 },
  }

  const getCurrentMonthData = () => monthlyData[selectedMonth] || { earnings: 0, appointmentRate: 0, satisfaction: 0 }

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value))
  }

  const recentAppointments = [
    { id: 1, patient: "John Doe", time: "10:00 AM", status: "scheduled" },
    { id: 2, patient: "Sarah Wilson", time: "11:30 AM", status: "completed" },
    { id: 3, patient: "Mike Johnson", time: "2:00 PM", status: "scheduled" },
    { id: 4, patient: "Emma Brown", time: "3:30 PM", status: "canceled" }
  ]

  const StatCard = ({ icon, value, label, bgColor = "bg-white", textColor = "text-gray-600" }) => (
    <div className={`flex items-center gap-2 ${bgColor} p-3 min-w-44 rounded-lg border border-gray-200 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-md shadow-sm`}>
      <img className='w-8 h-8' src={icon} alt="" />
      <div>
        <p className={`text-lg font-bold ${textColor}`}>{value}</p>
        <p className='text-gray-500 text-xs'>{label}</p>
      </div>
    </div>
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'scheduled': return 'text-blue-600 bg-blue-100'
      case 'canceled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const earningsData = months.map((_, idx) => monthlyData[idx]?.earnings || 0)

  return (
    <div className='m-3 space-y-4'>
      {/* Header */}
      <div className='mb-4'>
        <h1 className='text-2xl font-bold text-gray-800 mb-1'>Doctor Dashboard</h1>
        <p className='text-gray-600 text-sm'>Welcome back! Here's your practice overview.</p>
      </div>

      {/* Main Statistics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4'>
        <StatCard icon={assets.earning_icon} value={`₹ ${dashboardData.totalEarnings}`} label="Total Earnings" bgColor="bg-gradient-to-r from-green-50 to-green-100" textColor="text-green-700" />
        <StatCard icon={assets.appointments_icon} value={dashboardData.totalAppointments} label="Total Appointments" bgColor="bg-gradient-to-r from-blue-50 to-blue-100" textColor="text-blue-700" />
        <StatCard icon={assets.patients_icon} value={dashboardData.totalPatients} label="Total Patients" bgColor="bg-gradient-to-r from-purple-50 to-purple-100" textColor="text-purple-700" />
        <StatCard icon={assets.appointment_icon} value={dashboardData.todayAppointments} label="Today's Appointments" bgColor="bg-gradient-to-r from-orange-50 to-orange-100" textColor="text-orange-700" />
      </div>

      {/* Appointment Status Breakdown */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mb-4'>
        <StatCard icon={assets.tick_icon} value={dashboardData.completedAppointments} label="Completed Appointments" bgColor="bg-green-50" textColor="text-green-600" />
        <StatCard icon={assets.pending_icon} value={dashboardData.scheduledAppointments} label="Scheduled Appointments" bgColor="bg-blue-50" textColor="text-blue-600" />
        <StatCard icon={assets.cancel_icon} value={dashboardData.canceledAppointments} label="Canceled Appointments" bgColor="bg-red-50" textColor="text-red-600" />
      </div>

      {/* Details Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {/* Recent Appointments */}
        <div className='bg-white rounded-lg border border-gray-200 p-4 shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2'>
            Recent Appointments
          </h3>
          <div className='space-y-2'>
            {recentAppointments.map(appointment => (
              <div key={appointment.id} className='flex items-center justify-between p-2 bg-gray-50 rounded-lg'>
                <div>
                  <p className='font-medium text-gray-800 text-sm'>{appointment.patient}</p>
                  <p className='text-xs text-gray-600'>{appointment.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Overview */}
        <div className='bg-white rounded-lg border border-gray-200 p-4 shadow-sm'>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
              Monthly Overview
            </h3>
            <div className='flex items-center gap-2'>
              <span className='px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full'>2025</span>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className='px-2 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='space-y-3'>
            <div className='flex justify-between items-center p-2 bg-green-50 rounded-lg'>
              <span className='text-gray-700 text-sm'>Monthly Earnings</span>
              <span className='text-lg font-bold text-green-600'>
                ₹ {getCurrentMonthData().earnings > 0 ? getCurrentMonthData().earnings : 'N/A'}
              </span>
            </div>
            <div className='flex justify-between items-center p-2 bg-blue-50 rounded-lg'>
              <span className='text-gray-700 text-sm'>Appointment Rate</span>
              <span className='text-lg font-bold text-blue-600'>
                {getCurrentMonthData().appointmentRate > 0 ? `${getCurrentMonthData().appointmentRate}%` : 'N/A'}
              </span>
            </div>
            <div className='flex justify-between items-center p-2 bg-purple-50 rounded-lg'>
              <span className='text-gray-700 text-sm'>Patient Satisfaction</span>
              <span className='text-lg font-bold text-purple-600'>
                {getCurrentMonthData().satisfaction > 0 ? `${getCurrentMonthData().satisfaction}/5` : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Compact Chart Section */}
        <div className='bg-white rounded-lg border border-gray-200 p-4 shadow-sm'>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
              Earnings Trend
            </h3>
            <div className='text-xs text-gray-500'>
              2025
            </div>
          </div>
          <div className='mb-3'>
            <p className='text-lg font-bold text-green-600'>
              ₹ {earningsData.reduce((sum, earning) => sum + earning, 0).toLocaleString()}
            </p>
            <p className='text-xs text-gray-500'>Total Year Earnings</p>
          </div>
          <LineChart 
            data={earningsData} 
            labels={months.map(month => month.slice(0, 3))} 
            title="Monthly Earnings"
            color="rgb(34, 197, 94)"
            height={180}
          />
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
