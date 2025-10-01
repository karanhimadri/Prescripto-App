
const Doctor = ({ doctorInfo, onClick }) => {
  return (
    <div onClick={onClick} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
      <img className="bg-blue-50 " src={doctorInfo?.profileImage} alt="" />
      <div className="p-4">
        <div className={`flex items-center gap-2 text-sm text-center ${doctorInfo?.available ? "text-green-500" : "text-gray-500"}`}>
          <p
            className={`${doctorInfo?.available ? "w-2 h-2 bg-green-500" : "w-2 h-2 bg-gray-500"} w-2 h-2 bg-green-500 rounded-full`}
          ></p>
          <p>Available</p>
        </div>
        <p className="text-gray-900 text-lg font-medium">{doctorInfo?.name}</p>
        <p className="text-gray-600 text-sm">{doctorInfo?.speciality}</p>
      </div>
    </div>
  );
};

export default Doctor;
