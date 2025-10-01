import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { apiContext } from '../api/ApiContextProvider.jsx';
import { useNavigate } from "react-router-dom";


const LogIn = () => {
  const { login, loading } = useContext(apiContext)
  const [state, setState] = useState("Admin")
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const data = { ...loginData, authority: state.toLowerCase() }
    const response = await login(data)
    if (response.success) {
      navigate("/")
      return
    }
    toast.error(response.message)
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:m-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
            value={loginData.email}
            required
            className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email"
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
            value={loginData.password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password"
            required
          />
        </div>
        <button
          className='bg-primary text-white w-full py-2 rounded-md text-base'
          disabled={loading.login}
        >
          {
            loading.login ? <div className="flex items-center justify-center">
              <AiOutlineLoading3Quarters size={15} className="animate-spin text-white text-4xl" />
            </div> : "Login"
          }
        </button>
        {state === "Admin" ?
          <p>
            Doctor Login?
            <span
              className='text-primary underline cursor-pointer'
              onClick={() => { setState("Doctor") }}
            >
              Click here
            </span>
          </p>
          :
          <p>
            Admin Login?
            <span
              className='text-primary underline cursor-pointer'
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        }
      </div>
    </form>
  )
}

export default LogIn
