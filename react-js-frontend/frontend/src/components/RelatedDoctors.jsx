import React, { useContext, useEffect, useState } from "react";
import Doctor from "./Doctor";
import { useNavigate } from "react-router-dom";
import { doctors } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctorsData } = useContext(AppContext)
  const [relDocs, setRelDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctorsData?.length > 0 && speciality) {
      const relatedDoctors = doctorsData?.filter(
        (doc) => doc.speciality === speciality && doc.email !== docId
      );
      setRelDocs(relatedDoctors);
    }

  }, [doctorsData, docId, speciality]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDocs.map((item, index) => (
          <Doctor
            onClick={() => { navigate(`/appointment/${item.email}`); window.scrollTo(0, 0) }}
            key={index}
            doctorInfo={item}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
