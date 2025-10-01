import { useContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { apiContext } from "../api/ApiContextProvider";
import { toast } from 'react-toastify';
import { AppContext } from "../context/AppContext";
import formatDateToDayMonth from "../utils/FormatDateToDayMonth";

const MyAppointments = () => {

  const { createPaymentOrder, verifyPayment, fetchAllAppointments, cancelAppointment } = useContext(apiContext)
  const { user, appointmentsData } = useContext(AppContext)

  const [loadingIndex, setLoadingIndex] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(null)

  // Load Razorpay script when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (fees, index, appoId) => {
    setLoadingIndex(index)
    try {
      const res = await createPaymentOrder(fees)

      if (!res.status) {
        toast.error("Payment processing was failed.")
      }
      const { order_id, amount, currency } = res;

      const options = {
        key: "rzp_test_QqorfzSJrg2ZfN", // Your Razorpay Test Key
        amount: amount,
        currency: currency,
        name: "Prescripto",
        description: "Doctor Appointment Fee",
        order_id: order_id,
        handler: async function (response) {
          console.log("Payment successful:", response);
          // send payment response to backend for verification
          const paymentData = {
            appointmentId: appoId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature
          }
          const result = await verifyPayment(paymentData)
          if (!result.success) {
            toast.error(result.message)
            await fetchAllAppointments();
            return
          }
          toast.success(result.message)
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        theme: {
          color: "#2563eb",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

      setLoadingIndex(null)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleAppointmentCancelation = async (index, appoID) => {
    setCancelLoading(index)
    try {
      const response = await cancelAppointment(appoID);
      if (response.success) {
        await fetchAllAppointments();
        setCancelLoading(null)
        return;
      }
      toast.error(response.message);
      setCancelLoading(null)
    } catch (error) {
      toast.error(error.message);
      setCancelLoading(null)
    }
  }

  useEffect(() => {
    (async () => {
      if (appointmentsData?.length === 0) {
        await fetchAllAppointments();
      }
    })()
  }, [])

  return <div className="min-h-screen bg-gray-50 p-4">
    <div className="max-w-6xl mx-auto">
      <p className="flex items-center gap-1 pb-4 mt-2 text-xl font-semibold text-gray-800 border-b-2 border-indigo-200"
      >
        My Appointments <span className="text-sm text-gray-500">({appointmentsData?.length} appointments found)</span>
      </p>
      {appointmentsData?.length !== 0 ?
        <div className="mt-6 space-y-4">
          {appointmentsData?.map((item, index) => (
            <div
              className={`grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${item?.appointmentStatus === "CANCELED"
                ? "border-l-4 border-red-500"
                : item?.paymentStatus === "paid"
                  ? item?.appointmentStatus === "SCHEDULED"
                    ? "border-l-4 border-green-500"
                    : item?.appointmentStatus === "COMPLETED"
                      ? "border-l-4 border-blue-500"
                      : "bg-white border-l-4 border-yellow-500"
                  : "bg-white border-l-4 border-yellow-500"
                }`}
              key={index}
            >
              <div className="flex justify-center items-start">
                <img className="w-32 h-32 object-cover rounded-lg bg-indigo-100" src={item?.image} alt="Doctor" />
              </div>
              <div className="flex-1 text-sm space-y-2">
                <p className="text-lg font-bold text-gray-800">{item?.doctorName}</p>
                <p className="text-indigo-600 font-medium text-base">{item?.speciality}</p>
                <div className="mt-3">
                  <p className="text-gray-700 font-semibold mb-1">Address:</p>
                  <p className="text-gray-600 text-sm">{item?.addressLine1}</p>
                  <p className="text-gray-600 text-sm">{item?.addressLine2}</p>
                </div>
                <div className="mt-3 p-3 bg-gray-100 rounded-md">
                  <p className="text-sm">
                    <span className="text-gray-700 font-semibold">Date & Time: </span>
                    <span className="text-gray-800 font-medium">
                      {formatDateToDayMonth(item?.appointmentDate)}, {item?.appointmentTime}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {item?.paymentStatus === "paid" ?
                  <div className="flex flex-col gap-3 justify-center items-center">
                    {
                      item?.appointmentStatus === "SCHEDULED" &&
                      <button className="flex items-center justify-center gap-2 text-sm font-semibold text-green-700 border border-green-300 text-center sm:min-w-48 py-3 px-4 rounded-lg hover:bg-green-200 transition-all duration-300 cursor-default"
                      >
                        <IoMdCheckmarkCircleOutline size={18} />
                        Paid & Scheduled
                      </button>
                    }
                    {
                      item?.appointmentStatus === "CANCELED" &&
                      <button className="flex items-center justify-center gap-2 text-sm font-semibold text-red-700 border border-red-300 text-center hover:bg-red-200 sm:min-w-48 py-3 px-4 rounded-lg cursor-default"
                      >
                        Canceled
                      </button>
                    }
                    {
                      item.appointmentStatus === "COMPLETED" &&
                      <button className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-700 border border-blue-300 text-center sm:min-w-48 py-3 px-4 rounded-lg cursor-default"
                      >
                        <IoMdCheckmarkCircleOutline size={18} />
                        Completed
                      </button>
                    }
                  </div>
                  :
                  <>
                    {
                      item?.appointmentStatus === "CANCELED" ?
                        <div className="flex flex-col gap-3 justify-center items-center">
                          <button className="flex items-center justify-center gap-2 text-sm font-semibold text-red-700 border border-red-300 hover:bg-red-200 text-center sm:min-w-48 py-3 px-4 rounded-lg cursor-default"
                          >
                            Canceled
                          </button>
                        </div> :
                        <div className="flex flex-col gap-3 justify-center items-center">
                          <button
                            className="text-sm font-semibold text-center sm:min-w-48 py-3 px-4 border rounded-lg bg-primary text-white hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
                            onClick={() => handlePayment(item?.fees, index, item?.appointmentId)}
                          >
                            {loadingIndex === index ? (
                              <div className="flex items-center justify-center">
                                <AiOutlineLoading3Quarters size={15} className="animate-spin text-white" />
                              </div>
                            ) : "Pay Online"}
                          </button>
                          <button className="text-sm font-medium text-red-600 border border-red-300 text-center sm:min-w-48 py-3 px-4 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
                            onClick={() => handleAppointmentCancelation(index, item?.appointmentId)}
                          >
                            {cancelLoading === index ? (
                              <div className="flex items-center justify-center">
                                <AiOutlineLoading3Quarters size={15} className="animate-spin text-white" />
                              </div>
                            ) : "Cancel Appointment"}
                          </button>
                        </div>
                    }
                  </>
                }
              </div>
            </div>
          ))}
        </div> :
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-600">No appointments found.</h2>
          <p className="text-gray-500 mt-2">You haven't booked any appointments yet.</p>
        </div>
      }
    </div>
  </div>;
};

export default MyAppointments;
