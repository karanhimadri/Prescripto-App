import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom"
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { token, setToken } = useContext(AppContext)
  const [authority, setAuthority] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (token?.aToken) {
      setAuthority("Admin")
    } else if (token?.dToken) {
      setAuthority("Doctor")
    }
  }, [token])

  const handleLogout = () => {
    localStorage.clear();
    setToken(prev => ({ ...prev, aToken: "", dToken: "" }))
    navigate("/")
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white  '>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{authority}</p>
      </div>
      <button onClick={handleLogout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
