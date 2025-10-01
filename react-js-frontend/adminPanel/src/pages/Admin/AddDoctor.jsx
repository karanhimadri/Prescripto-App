import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { apiContext } from '../../api/ApiContextProvider.jsx';

const initialData = {
  name: "",
  email: "",
  password: "",
  experience: "1 Year",
  fees: 0,
  speciality: "General Physician",
  education: "",
  addLine1: "",
  addLine2: "",
  about: ""
}

const AddDoctor = () => {
  const { createNewDoctor, loading } = useContext(apiContext)
  const [docImg, setDocImg] = useState(null);
  const [doctorData, setDoctorData] = useState(initialData);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("doctor", new Blob([JSON.stringify(doctorData)], { type: "application/json" }));
    if (docImg) formData.append("file", docImg);

    try {
      const response = await createNewDoctor(formData)
      if (response.success) {
        toast.success(response.message)
        setDoctorData(initialData)
        setDocImg(null)
        return
      }
      toast.error(response.message)
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className='m-5 w-full'>
      <p className='my-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc_img">
            <img className='w-16 h-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Doctor_img" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc_img' hidden />
          <p>Upload Doctor <br /> Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Doctor Name</p>
              <input onChange={(e) => setDoctorData(prev => ({ ...prev, name: e.target.value }))} value={doctorData.name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e) => setDoctorData(prev => ({ ...prev, email: e.target.value }))} value={doctorData.email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={(e) => setDoctorData(prev => ({ ...prev, password: e.target.value }))} value={doctorData.password} className='border rounded px-3 py-2' type="text" placeholder='Password' required />
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e) => setDoctorData(prev => ({ ...prev, experience: e.target.value }))} value={doctorData.experience} className='border rounded px-3 py-2'>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e) => setDoctorData(prev => ({ ...prev, fees: Number(e.target.value) }))} value={doctorData.fees} className='border rounded px-3 py-2' type="number" placeholder='fees' required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e) => setDoctorData(prev => ({ ...prev, speciality: e.target.value }))} value={doctorData.speciality} className='border rounded px-3 py-2'>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e) => setDoctorData(prev => ({ ...prev, education: e.target.value }))} value={doctorData.education} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e) => setDoctorData(prev => ({ ...prev, addLine1: e.target.value }))} value={doctorData.addLine1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
              <input onChange={(e) => setDoctorData(prev => ({ ...prev, addLine2: e.target.value }))} value={doctorData.addLine2} className='border rounded px-3 py-2 mt-2' type="text" placeholder='Address 2' required />
            </div>
          </div>
        </div>
        <div>
          <p className='mt-4 mb-2 text-gray-600'>About Doctor</p>
          <textarea onChange={(e) => setDoctorData(prev => ({ ...prev, about: e.target.value }))} value={doctorData.about} className='w-full px-4 pt-2 border rounded' placeholder='write about doctor' rows={5} required />
        </div>
        <button
          className='bg-primary px-10 py-3 mt-4 text-white rounded-full mb-5'
          disabled={loading.createNewDoctor}
        >
          {
            loading.createNewDoctor ? <div className="flex items-center justify-center">
              <AiOutlineLoading3Quarters size={15} className="animate-spin text-white text-4xl" />
            </div> : "Add Doctor"
          }
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
