import React, { useState } from "react";
import { useContext } from "react";
import { apiContext } from "../api/ApiContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogIn = () => {

  const { loading, createAccountForPatient, logIn } = useContext(apiContext)

  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    setFormData((pre) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    setMessage("")

    if (state === "Sign Up") {
      const res = await createAccountForPatient(formData);
      if (res.success) {
        navigate("/patient-details")
      } else {
        setMessage(res.message)
      }
    } else {
      if (!formData.email || !formData.password) {
        toast.warn("Fields are required.")
        return
      }
      const res = await logIn({ email: formData.email, password: formData.password })
      if (res.success) {
        navigate("/")
      } else {
        setMessage(res.message)
      }
    }
  };


  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "create an account" : "log in"} to book
          appointment.
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              name="name"
              onChange={handleOnChange}
              value={formData.name}
              required
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            name="email"
            onChange={handleOnChange}
            value={formData.email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            name="password"
            onChange={handleOnChange}
            value={formData.password}
            required
          />
        </div>

        {/* For message showing */}
        <p className="text-red-600">{message}</p>

        <button
          className="bg-primary text-white w-full py-2 rounded-md text-base"
          onClick={onSubmitHandle}
          disabled={loading.createAccountForPatient}
        >
          {loading.createAccountForPatient ? (state === "Sign Up" ? "Creating Account..." : "Login...") : (state === "Sign Up" ? "Create Account" : "Login")}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default LogIn;
