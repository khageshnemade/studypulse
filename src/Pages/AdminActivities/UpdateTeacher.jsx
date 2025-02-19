import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const UpdateTeacher = ({ id, setShowUpdateTeacher }) => {
  const teachersData = useSelector((state) => state?.teachers?.teachersData);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [userData, setUserData] = useState({});
  const [teacherData, setTeacherData] = useState({ classId: [] });
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // Fetch teacher data and populate the form when the component mounts or ID changes
  useEffect(() => {
    if (teachersData && teachersData.length > 0) {
      const { teacherData, ...udata } =
        teachersData?.find((s) => s._id === id) || {};

      setTeacherData(teacherData || {});
      setUserData(udata);
      console.log("Teacher Dta", teacherData);
    }
  }, [teachersData, id]);

  const handleFileUpload = async (file) => {
  
      console.log("File Upload",file);
      if (!file) {
        toast.error("Please select a file before uploading.");
        return;
      }
    
      const formData = new FormData();
      formData.append("files", file); // Ensure 'file' is not null or undefined
    
      console.log("Form Data before upload:", formData);
    
      try {
        const response = await makeRequest.post(
          "https://api.studypulse.live/web/api/file-upload/profile-pic",
          formData
        );
    
        console.log("API response:", response);
    
        if (response.data.success) {
          setImageUrl(response.data.url); // Store the uploaded image URL
          setTeacherData((prevData) => ({
            ...prevData,
            profilePic: response.data.url, // Update teacher data with the new image URL
          }));
          toast.success("Image uploaded successfully!");
        } else {
          toast.error("Image upload failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during file upload:", error);
        toast.error("Failed to upload image.");
      }
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Access the selected file
    if (selectedFile) {
      setFile(selectedFile); 
      handleFileUpload(selectedFile);
   
    }
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTeacherDataChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("UserData", userData);
      console.log("Teachdata", teacherData);

      // Make PUT request with only the updated fields
      const res = await makeRequest.put("/admin/update-teacher-data", {
        userData: {
          id: userData._id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
        },
        teacherData: {
          totalYearsOfExperience: teacherData.totalYearsOfExperience,
          gender: teacherData.gender,
          profilePic: `https://api.studypulse.live/${teacherData.profilePic}`,
          status: teacherData.status,
          address: teacherData.address,
        },
      });

      // Log response for debugging
      const message = res.data.message;
      console.log("Response Message:", message);

      // Check if the message exists and is valid
      if (message) {
        toast.success(message); // Display the success message from the response
        console.log("RESPONSE SUCCESS", message);

        // Optional: Close the update modal and navigate
        setShowUpdateTeacher(false);
        navigate("/admin-dashboard/teachers");
      } else {
        toast.error("Unexpected response format.");
      }
    } catch (error) {
      // Display error message if there's an issue with the request
      console.error(error);
      toast.error(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={() => {
          setShowUpdateTeacher(false);
        }}
      >
        <ArrowLeft />
      </button>
      {/* Profile Picture and Update Button */}
      <div className="text-center">
        <img
          src={`${teacherData.profilePic}`}
          alt="Profile"
          className="w-28 h-28 mx-auto rounded-full border-4 border-gray-300 shadow-md"
        />
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Update
        </button>
      </div>

      {/* Update Form Modal */}
      {showForm && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] overflow-auto">
    <div className="relative max-h-[90%] overflow-y-auto bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Update Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.firstName}
              onChange={handleUserDataChange}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.lastName}
              onChange={handleUserDataChange}
            />
          </div>
        </div>

        {/* Phone Number and Address */}
        <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.phoneNumber}
              onChange={handleUserDataChange}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={teacherData.address}
              onChange={handleTeacherDataChange}
            />
          </div>
        </div>

        {/* Profile Picture */}
        <div className="mb-4 flex flex-col sm:space-x-4">
          <div className="flex-1 block">
            <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleFileChange}
            />
          </div>

          {imageUrl && (
            <div className="mt-4 w-full ">
              {/* This will force the image to be on a new line */}
              <img
                src={`https://api.studypulse.live/${imageUrl}`}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto"
              />
            </div>
          )}
        </div>

        {/* Experience and Gender */}
        <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="totalYearsOfExperience" className="block text-sm font-medium text-gray-700">
              Experience Years
            </label>
            <input
              type="number"
              id="totalYearsOfExperience"
              name="totalYearsOfExperience"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={teacherData.totalYearsOfExperience}
              onChange={handleTeacherDataChange}
            />
          </div>
        </div>

        {/* Gender and Status */}
        <div className="flex-1">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={teacherData.gender}
            onChange={handleTeacherDataChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={teacherData.status}
            onChange={handleTeacherDataChange}
          >
            <option value="">Select Status</option>
            <option value="pending">pending</option>
            <option value="rejected">rejected</option>
            <option value="accepted">accepted</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Tabs for Data */}
      <div className="mt-8">
        <div className="flex border-b border-gray-300">
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-2 text-center font-semibold ${activeTab === "about"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
              }`}
          >
            About
          </button>

          <button
            onClick={() => setActiveTab("qualificationData")}
            className={`flex-1 py-2 text-center font-semibold ${activeTab === "qualificationData"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
              }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab("experienceData")}
            className={`flex-1 py-2 text-center font-semibold ${activeTab === "experienceData"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
              }`}
          >
            Experience
          </button>
        </div>

        {/* Data Content */}
        <div className="mt-4">
          {activeTab === "about" && (
            <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
                About
              </h2>


              {/* User and Teacher Information displayed in two rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* User Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <ul className="space-y-4">
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">First Name:</strong>{" "}
                      <span className="text-gray-900">
                        {userData.firstName}
                      </span>
                    </li>
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">Last Name:</strong>{" "}
                      <span className="text-gray-900">{userData.lastName}</span>
                    </li>
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">Phone Number:</strong>{" "}
                      <span className="text-gray-900">
                        {userData.phoneNumber}
                      </span>
                    </li>
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">Address:</strong>{" "}
                      <span className="text-gray-900">
                        {teacherData.address}
                      </span>
                    </li>
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">Role:</strong>{" "}
                      <span className="text-gray-900">{userData.role}</span>
                    </li>
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">Email Address:</strong>{" "}
                      <span className="text-gray-900">{userData.email}</span>
                    </li>
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">City:</strong>{" "}
                      <span className="text-gray-900">
                        {userData?.cityData?.name}
                      </span>
                    </li>
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">Taluka:</strong>{" "}
                      <span className="text-gray-900">
                        {userData?.talukaData?.name}
                      </span>
                    </li>
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">District:</strong>{" "}
                      <span className="text-gray-900">
                        {userData?.districtData?.name}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Teacher Information Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <ul className="space-y-4">
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">
                        Total Years of Experience:
                      </strong>{" "}
                      <span className="text-gray-900">
                        {teacherData.totalYearsOfExperience}
                      </span>
                    </li>
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">Gender:</strong>{" "}
                      <span className="text-gray-900">
                        {teacherData.gender}
                      </span>
                    </li>
                    <li className="grid grid-cols-[150px_1fr]">
                      <strong className="w-40">Status:</strong>{" "}
                      <span className="text-gray-900">
                        {teacherData.status}
                      </span>
                    </li>
                    {teacherData?.subjectData?.map((e, i) => (
                      <li key={i} className="grid grid-cols-[150px_1fr]">
                        <strong className="w-40">Subject-{i + 1}:</strong>{" "}
                        <span className="text-gray-900">{e.name}</span>
                      </li>
                    ))}
                    {teacherData.classData?.map((e, i) => (
                      <li key={i} className="grid grid-cols-[150px_1fr]">
                        <strong className="w-40">Class-{i + 1}:</strong>{" "}
                        <span className="text-gray-900">{e.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "qualificationData" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <h2 className="font-bold text-gray-700 col-span-full text-center">
                Education
              </h2>

              {teacherData?.qualification &&
                Object.keys(teacherData?.qualification).map((key) => (
                  <div
                    key={key}
                    className="bg-white shadow-lg rounded-lg p-6 mb-4"
                  >
                    <h3 className="text-xl text-center text-gray-800 mb-4 font-bold">
                      {key.toUpperCase()}
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      {Object.entries(teacherData?.qualification[key]).map(
                        ([field, value]) => (
                          <li
                            key={field}
                            className="grid grid-cols-[150px_1fr] text-wrap"
                          >

                            <strong className="text-gray-700">
                              {field.replace(/([A-Z])/g, " $1")}:{" "}
                            </strong>
                            <span className="text-gray-500">{value}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "experienceData" && (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
              <h2 className="font-bold text-gray-700 col-span-full text-center mb-6">
                Experience
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                {teacherData?.experience?.map((experience) => (
                  <div
                    key={experience._id}
                    className="bg-white rounded-lg shadow-lg p-4"
                  >
                    <h4 className="text-xl font-medium text-gray-700 mb-3">
                      Experience
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="grid grid-cols-[180px_1fr]">
                        <strong>Designation:</strong> {experience.designation}
                      </li>
                      <li className="grid grid-cols-[180px_1fr]">
                        <strong>Organization Name:</strong>{" "}
                        {experience.organizationName}
                      </li>
                      <li className="grid grid-cols-[180px_1fr]">
                        <strong>Start Date:</strong>{" "}
                        {new Date(experience.startDate).toLocaleDateString()}
                      </li>
                      <li className="grid grid-cols-[180px_1fr]">
                        <strong>End Date:</strong>{" "}
                        {new Date(experience.endDate).toLocaleDateString()}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
