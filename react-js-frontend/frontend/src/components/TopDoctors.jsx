import Doctor from "./Doctor";
import { doctors } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctorsData } = useContext(AppContext)

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctorsData?.slice(0, 5).map((item, index) => (
          <Doctor onClick={() => { navigate(`/appointment/${item.email}`); scrollTo(0, 0) }} key={index} doctorInfo={item} />
        ))}
      </div>
      <button onClick={() => { navigate("/doctors"); scrollTo(0, 0) }} className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100">See More</button>
    </div>
  );
};

export default TopDoctors;
