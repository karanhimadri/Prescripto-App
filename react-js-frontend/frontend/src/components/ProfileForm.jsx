import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { apiContext } from "../api/ApiContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const { updatePatientProfile } = useContext(apiContext)

  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addLine1: "",
    addLine2: "",
    gender: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Please enter a valid 10-digit phone number";

    if (!formData.addLine1.trim()) newErrors.addLine1 = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Create FormData for multipart submission
    const payload = new FormData();
    if (selectedFile) payload.append("image", selectedFile);
    payload.append("name", formData.name);
    payload.append("phone", formData.phone);
    payload.append("addLine1", formData.addLine1);
    payload.append("addLine2", formData.addLine2 || "");
    payload.append("gender", formData.gender || "");
    payload.append("dob", formData.dob || "");

    try {
      const res = await updatePatientProfile(payload);

      if (res?.message) {
        setIsSubmitting(false);
        toast.success(res.message);
        navigate("/");
      } else {
        toast.error("Failed to save profile. Try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("An error occurred while saving. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const imagePreview = selectedFile ? URL.createObjectURL(selectedFile) : assets.profile_pic;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded shadow text-sm space-y-6">
        <form onSubmit={handleSubmit}>
          {/* Profile Image */}
          <div className="flex flex-col items-start gap-6">
            <div>
              <img
                className="w-32 h-32 object-cover rounded-lg border"
                src={imagePreview}
                alt="Profile"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 block text-xs text-gray-600"
              />
            </div>
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Complete Your Profile</h2>
              <p className="text-gray-600 text-sm">Please fill in your details to continue</p>
            </div>
          </div>

          <hr className="my-6" />

          {/* Personal Info */}
          <div>
            <h3 className="text-gray-500 font-semibold mb-2">Personal Information</h3>
            <div className="grid grid-cols-[1fr_3fr] gap-y-4 gap-x-4 text-gray-700">

              <label className="font-medium">Full Name:</label>
              <div>
                <input
                  className={`bg-gray-100 px-2 py-1 rounded w-full ${errors.name ? "border border-red-500" : ""}`}
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <label className="font-medium">Phone:</label>
              <div>
                <input
                  className={`bg-gray-100 px-2 py-1 rounded w-full ${errors.phone ? "border border-red-500" : ""}`}
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <label className="font-medium">Address:</label>
              <div>
                <div className="space-y-2">
                  <input
                    className={`bg-gray-100 px-2 py-1 rounded w-full ${errors.addLine1 ? "border border-red-500" : ""}`}
                    value={formData.addLine1}
                    onChange={(e) => handleInputChange("addLine1", e.target.value)}
                    placeholder="Street address, building number"
                  />
                  <input
                    className="bg-gray-100 px-2 py-1 rounded w-full"
                    value={formData.addLine2}
                    onChange={(e) => handleInputChange("addLine2", e.target.value)}
                    placeholder="City, State, Postal Code"
                  />
                </div>
                {errors.addLine1 && <p className="text-xs text-red-600 mt-1">{errors.addLine1}</p>}
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* Basic Info */}
          <div>
            <h3 className="text-gray-500 font-semibold mb-2">Basic Information</h3>
            <div className="grid grid-cols-[1fr_3fr] gap-y-4 gap-x-4 text-gray-700">
              <label className="font-medium">Gender:</label>
              <select
                className="bg-gray-100 px-2 py-1 rounded w-32"
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <label className="font-medium">Date of Birth:</label>
              <input
                className="bg-gray-100 px-2 py-1 rounded w-40"
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
              />
            </div>
          </div>

          <div className="text-right mt-6">
            <button
              type="submit"
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Complete Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
