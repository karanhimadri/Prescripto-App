import { useCallback, useContext, useEffect, useMemo, useRef, useState, } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { getNext7DatesInKolkata, getAvailableHourlyTimeSlots, } from "../utils/GenerateDateTimeSlots";
import { apiContext } from "../api/ApiContextProvider";
import { toast } from 'react-toastify';

const Appointments = () => {
  const { docId } = useParams();
  const { doctorsData, user, trackLoggrdIn } = useContext(AppContext);
  const { bookAppointment, fetchAllAppointments } = useContext(apiContext);

  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [slotIndex, setSlotIndex] = useState({ daySlot: 0, timeSlot: -1 });
  const navigate = useNavigate();

  useEffect(() => {
    setDates(getNext7DatesInKolkata());
    setTimes(getAvailableHourlyTimeSlots());
  }, []);

  const docInfo = useMemo(() => {
    return doctorsData.find((doc) => doc?.email === docId);
  }, [docId, doctorsData]);

  const updateTimeSlots = (index, item) => {
    setSlotIndex((prev) => ({ ...prev, daySlot: index, timeSlot: -1 }));

    const todayDateStr = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    if (item.date === todayDateStr) {
      setTimes(getAvailableHourlyTimeSlots());
    } else {
      // All time slots (static) from 10 AM to 6 PM
      setTimes([
        "10:00 am", "11:00 am", "12:00 pm", "01:00 pm",
        "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm",
        "06:00 pm"
      ]);
    }
  };

  const handleAppointBooking = async (doctorId) => {
    if (slotIndex.timeSlot === -1) {
      alert("Please select a time slot before booking!");
      return;
    }
    if (!trackLoggrdIn) {
      navigate("/login")
      toast.error("Please create a account or login.")
      return
    }
    const selectedDate = dates[slotIndex.daySlot];
    const selectedTime = times[slotIndex.timeSlot];

    const appointmentData = { doctorId: doctorId, patientId: user?.email, appointmentDate: selectedDate.date, appointmentTime: selectedTime }
    const res = await bookAppointment(appointmentData)
    if (res.success) {
      await fetchAllAppointments();
      navigate("/my-appointments")
    } else {
      toast.error(res.message)
    }
  };

  const scrollContainerRef = useRef(null);

  const handleWheelScroll = useCallback((event) => {
    event.preventDefault();
    scrollContainerRef.current?.scrollBy({
      left: event.deltaY * 1,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheelScroll);

    return () => {
      container.removeEventListener("wheel", handleWheelScroll);
    };
  }, [handleWheelScroll]);

  return (
    docInfo && (
      <div>
        {/* ---------- Doctor Details ---------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo?.profileImage}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo?.education} - {docInfo?.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo?.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo?.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee: ₹
              <span className="text-gray-700">{docInfo?.fees}</span>
            </p>
            <div
              className={`mt-4 flex items-center gap-2 text-sm text-center ${docInfo?.available ? "text-green-500" : "text-gray-500"
                }`}
            >
              <p
                className={`w-2 h-2 rounded-full ${docInfo?.available ? "bg-green-500" : "bg-gray-500"
                  }`}
              ></p>
              <p>{docInfo?.available ? "Available" : "Not available"}</p>
            </div>
          </div>
        </div>

        {/* ---------- Booking Section ---------- */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>

          {/* Date Slots */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {dates.map((item, index) => (
              <div
                key={index}
                onClick={() => updateTimeSlots(index, item)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex.daySlot === index
                  ? "bg-primary text-white"
                  : "border border-gray-200"
                  }`}
              >
                <p>{item.shortWeekDay}</p>
                <p>{item.day}</p>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-3 w-full overflow-x-scroll m-4"
          >
            {times.length > 0 ? (
              times.map((item, index) => (
                <p
                  key={index}
                  onClick={() =>
                    setSlotIndex((prev) => ({ ...prev, timeSlot: index }))
                  }
                  className={`text-sm font-light px-5 py-2 rounded-full border cursor-pointer whitespace-nowrap ${slotIndex.timeSlot === index
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                    }`}
                >
                  {item}
                </p>
              ))
            ) : (
              <p className="text-sm text-red-500">
                No available slots for today.
              </p>
            )}
          </div>

          <button
            onClick={() => handleAppointBooking(docInfo?.email)}
            className={`bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 ${docInfo?.available ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            disabled={!docInfo?.available}
          >
            {docInfo?.available
              ? "Book Appointment"
              : "Doctor not available"}
          </button>
        </div>

        {/* ---------- Related Doctors ---------- */}
        <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
      </div>
    )
  );
};

export default Appointments;
