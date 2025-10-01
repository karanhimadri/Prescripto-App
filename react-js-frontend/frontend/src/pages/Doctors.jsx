import React, { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Doctor from "../components/Doctor";
import { MdFilterListAlt } from "react-icons/md";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { doctorsData } = useContext(AppContext);
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(true);

  const specialistDoc = [
    "All",
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  // Properly decode the URL param
  const decodedSpeciality = decodeURIComponent(speciality || "All");

  // useMemo to memoize the filtered doctors
  const filterDoc = useMemo(() => {
    if (decodedSpeciality === "All") {
      return doctorsData;
    }
    return doctorsData?.filter(
      (doc) => doc.speciality === decodedSpeciality
    );
  }, [decodedSpeciality, doctorsData]);

  // When user selects a filter, encode it for the URL
  const handleFilter = (whichSpeciality) => {
    navigate(`/doctors/${encodeURIComponent(whichSpeciality)}`);
  };

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">

        <button
          className={`flex flex-row items-center gap-1 py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""
            }`}
          onClick={() => setShowFilter((pre) => !pre)}
        >
          <MdFilterListAlt /> Filters
        </button>

        {showFilter && (
          <div className="flex flex-col gap-4 text-sm text-gray-600">
            {specialistDoc.map((item, index) => (
              <p
                key={index}
                onClick={() => handleFilter(item)}
                className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${decodedSpeciality === item ? "bg-indigo-100 text-black" : ""
                  }`}
              >
                {item}
              </p>
            ))}
          </div>
        )}

        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc?.length === 0 ? (
            <h1 className="text-gray-600 text-center">
              Not available for now.
            </h1>
          ) : (
            filterDoc.map((item, index) => (
              <Doctor
                key={index}
                doctorInfo={item}
                onClick={() => {
                  navigate(`/appointment/${item.email}`);
                  scrollTo(0, 0);
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
