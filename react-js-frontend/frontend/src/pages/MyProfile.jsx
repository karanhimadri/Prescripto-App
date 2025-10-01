import { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { apiContext } from "../api/ApiContextProvider";

const MyProfile = () => {
  const { user } = useContext(AppContext);
  const { updatePatientProfile, loading, uploadPatientImage } = useContext(apiContext);

  const [userData, setUserData] = useState({
    name: "",
    image: assets.profile_pic,
    email: "",
    phone: "",
    addLine1: "",
    addLine2: "",
    gender: "",
    dob: "",
  });

  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        image: user.image || assets.profile_pic,
        email: user.email || "",
        phone: user.phone || "",
        addLine1: user.addLine1 || "",
        addLine2: user.addLine2 || "",
        gender: user.gender || "",
        dob: user.dob || "",
      });
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // store actual file for upload
      const imageUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = async () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }

    setMessage("");

    try {
      // Build FormData for multipart request
      const formDataToSend = new FormData();
      if (selectedFile) {
        formDataToSend.append("image", selectedFile);
      }
      formDataToSend.append("name", userData.name);
      formDataToSend.append("email", userData.email);
      formDataToSend.append("phone", userData.phone);
      formDataToSend.append("addLine1", userData.addLine1);
      formDataToSend.append("addLine2", userData.addLine2);
      formDataToSend.append("gender", userData.gender || "");
      formDataToSend.append("dob", userData.dob || "");

      const res = await updatePatientProfile(formDataToSend);

      if (res && res.message) {
        setMessage(res.message);
      }

      setIsEdit(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("An error occurred while saving.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow text-sm space-y-6">
      <div className="flex flex-col items-start gap-6">
        <div>
          <img
            className="w-32 h-32 object-cover rounded-lg border"
            src={userData.image}
            alt="Profile"
          />
          {isEdit && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block text-xs text-gray-600"
            />
          )}
        </div>

        <div className="flex-1 w-full">
          <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
        </div>
      </div>

      <hr />

      <div>
        <h3 className="text-gray-500 font-semibold mb-2">Contact Information</h3>
        <div className="grid grid-cols-[1fr_3fr] gap-y-4 gap-x-4 text-gray-700">
          <label className="font-medium">Email:</label>
          <p className="text-blue-500">{userData.email}</p>

          <label className="font-medium">Phone:</label>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              spellCheck={false}
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <label className="font-medium">Address:</label>
          {isEdit ? (
            <div className="space-y-2">
              <input
                className="bg-gray-100 px-2 py-1 rounded w-full"
                value={userData.addLine1}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, addLine1: e.target.value }))
                }
                spellCheck={false}
                type="text"
              />
              <input
                className="bg-gray-100 px-2 py-1 rounded w-full"
                value={userData.addLine2}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, addLine2: e.target.value }))
                }
                spellCheck={false}
                type="text"
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {userData.addLine1}
              <br />
              {userData.addLine2}
            </p>
          )}
        </div>
      </div>

      <hr />

      <div>
        <h3 className="text-gray-500 font-semibold mb-2">Basic Information</h3>
        <div className="grid grid-cols-[1fr_3fr] gap-y-4 gap-x-4 text-gray-700">
          <label className="font-medium">Gender:</label>
          {isEdit ? (
            <select
              className="bg-gray-100 px-2 py-1 rounded w-32"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}

          <label className="font-medium">Date of Birth:</label>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded w-40"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="text-right mt-6">
        <button
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
          onClick={handleSubmit}
          disabled={loading.addOrUpdatePatientInfo}
        >
          {loading.addOrUpdatePatientInfo
            ? "Please wait..."
            : isEdit
              ? "Save Information"
              : "Edit"}
        </button>
      </div>

      {message && (
        <p className="text-green-600 text-sm text-right mt-2">{message}</p>
      )}
    </div>
  );
};

export default MyProfile;
