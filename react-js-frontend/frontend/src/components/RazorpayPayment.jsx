// src/components/RazorpayPayment.jsx

import { useEffect } from "react";
import axios from "axios";

const RazorpayPayment = () => {
  // Load Razorpay script when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []); 

  const handlePayment = async () => {
    try {
      // 1. Create order from backend
      const response = await axios.post("http://localhost:8080/api/payment/create-order", {
        amount: 500, // ₹500 (in rupees)
      });

      const { id: order_id, amount, currency } = response.data; 

      // 2. Razorpay options
      const options = {
        key: "rzp_test_QqorfzSJrg2ZfN", // Your Razorpay Test Key
        amount: amount,
        currency: currency,
        name: "Prescripto", // Your business or app name
        description: "Doctor Appointment Fee",
        order_id: order_id,
        handler: function (response) {
          console.log("Payment successful:", response);
          // TODO: send payment response to backend for verification
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#2563eb", // Tailwind blue-600
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Pay ₹500 Now
      </button>
    </div>
  );
};

export default RazorpayPayment;
