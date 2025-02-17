import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Edit, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
export const UpdateStudent = ({ id, setShowUpdateStudent }) => {
  const studentsData = useSelector((state) => state?.students?.studentsData);
  console.log("All Students:", studentsData); // Log the fetched students
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [studentData, setStudentData] = useState({});
  const [userData, setUserData] = useState({});
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [docs, setDocs] = useState([]);
  const [fileName, setFileName] = useState("");
  const [newDocument, setNewDocument] = useState("");



  // Handle removing a document
  const handleRemoveDocument = (docToRemove) => {
    setDocs(docs.filter((doc) => doc !== docToRemove));
  };
  // Fetch student data and populate the form when the component mounts or ID changes
  useEffect(() => {
    if (studentsData && studentsData.length > 0) {
      const { studentData, ...udata } = studentsData?.find((s) => s._id === id);

      // Set states
      setStudentData(studentData);

      // Use a temporary log after setting the states
      console.log("studentData + udata", studentData);
      setDocs(studentData?.documents);
      setUserData(udata);
    }
  }, [studentsData, id]);

  // Handle changes in user data
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle changes in student data
  const handleStudentDataChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission to update student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("StudentData", studentData);
      // Make PUT request with only the updated fields

      const res = await makeRequest.put("/admin/update-student-data", {
        userData: {
          id: userData._id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
          address: studentData.address,
          dob: studentData.dob,
          status: userData.status,
        },
        studentData: {
          address: studentData.address,
          dob: studentData.dob,
          grade: studentData.grade,
          gender: studentData.gender,
          classId: studentData.classId || "",
          profilePic: studentData.profilePic || "",
          documents: docs || [],
        },
      });

      if (res.data?.message) {
        console.log("RESPONSE SUCCESS", res.data.message);
        toast.success(res?.data?.message);
        setShowUpdateStudent((prev) => {
          console.log("Previous", prev);

          if (prev) return false;
          else return true;
        });
        navigate("/admin-dashboard/students");
      } else {
        console.log("No message in response", res);
        toast.error("Unexpected response format.");
      }
    } catch (error) {
      toast.error(error.response.data.error); // Display error message
    }
  };

  const handleFileUpload = async (file) => {

    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await makeRequest.post(
        "https://api.studypulse.live/web/api/file-upload/profile-pic",
        formData
      );

      if (response.data.success) {
        setImageUrl(response.data.url); // Store the uploaded image URL
        setStudentData((prevData) => ({
          ...prevData,
          profilePic: response.data.url, // Update teacher data with the new image URL
        }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to upload image.");
    }
  };
  const handleDocUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await makeRequest.post(
        "https://api.studypulse.live/web/api/file-upload/profile-pic",
        formData
      );

      if (response.data.success) {
        setDocs([...docs, response?.data.url]);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to upload image.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Access the selected file
    if (selectedFile) {
      setFile(selectedFile); // Store the file in the state
      handleFileUpload(selectedFile); // Trigger the upload function
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-h-fit max-w-fit mx-auto">
      <div className="text-center">
        <img
          src={`https://api.studypulse.live/${studentData.profilePic}`}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="relative max-h-[90%] overflow-y-auto bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Update Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={studentData?.address}
                    onChange={handleStudentDataChange}
                  />
                </div>
              </div>


              <div className="flex-1">
                <label
                  htmlFor="profilePic"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <div className="mt-4">
                  <img src={`https://api.studypulse.live/${imageUrl}`} alt="Profile" className="w-24 h-24 rounded-full" />
                </div>
              )}



              <div className="flex-1">
                <label
                  htmlFor="filename"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add New Document
                </label>
                {/* Add a new document */}
                <div className="flex items-center mt-2 gap-2">
                  {/* Display the file name */}

                  <input
                    type="file"
                    id="filename"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={handleDocUpload}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" /> {/* Icon added here */}
                  </button>
                </div>
              </div>

              {/* List of documents with remove button */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700">
                  Current Documents:
                </h3>
                <ul className="mt-2 space-y-2">
                  {docs.map((doc, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg "
                    >
                      <span>{doc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDocument(doc)}
                        className="px-2 py-1 text-red-500 hover:underline whitespace-nowrap"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  type="text"
                  id="status"
                  name="status"
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.status}
                  onChange={handleUserDataChange}
                >
                  <option value="">Select a status</option>
                  <option value="active">Active</option>
                  <option value="inActive">Inactive</option>
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
      <div className="flex items-center justify-center min-h-screen">
        {/* Tab Navigation */}
        <div className="w-full max-w-lg px-4 sm:px-6 md:px-8 py-4">
          <button
            onClick={() => {
              setShowUpdateStudent(false);
            }}
            className="text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft />
          </button>
          <div className="mt-4 flex border-b">
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
              onClick={() => setActiveTab("studentData")}
              className={`flex-1 py-2 text-center font-semibold ${activeTab === "studentData"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
                }`}
            >
              Other Details
            </button>
          </div>

          {/* Data Content */}
          <div className="mt-4">
            {activeTab === "about" && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
                  About
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg shadow-sm">
                    <ul className="space-y-3 text-gray-600">
                      {[
                        { label: "First Name:", value: userData.firstName },
                        { label: "Last Name:", value: userData.lastName },
                        {
                          label: "Phone Number:",
                          value: userData.phoneNumber,
                        },
                        { label: "Address:", value: studentData.address },
                        { label: "Role:", value: userData.role },
                        { label: "Email Address:", value: userData.email },
                        { label: "City:", value: userData?.cityData?.name },
                        {
                          label: "Taluka:",
                          value: userData?.talukaData?.name,
                        },
                        {
                          label: "District:",
                          value: userData?.districtData?.name,
                        },
                      ].map((item, index) => (
                        <li key={index} className="grid grid-cols-[150px_1fr]">
                          <strong>{item.label}</strong>
                          <span className="text-sm">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "studentData" && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
                  Other Details
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg shadow-sm">
                    <ul className="space-y-3 text-gray-600">
                      {studentData ? (
                        [
                          { label: "Gender:", value: studentData.gender },
                          {
                            label: "Status:",
                            value: userData?.status || "N/A",
                          },
                          {
                            label: "DOB:",
                            value: new Date(studentData.dob).toLocaleDateString(),
                          },
                          {
                            label: "Documents:",
                            value: studentData.documents.length > 0 ? (
                              studentData.documents.map((doc, index) => (
                                <div key={index} className="mb-2">
                                  <Link
                                    to={`https://api.studypulse.live/${doc}`}
                                    target="_blank"
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                  >
                                    Document {index + 1}
                                  </Link>
                                </div>
                              ))
                            ) : (
                              "No documents available"
                            ),
                          },
                        ].map((item, index) => (
                          <li key={index} className="grid grid-cols-[150px_1fr]">
                            <strong>{item.label}</strong>
                            <span className="text-sm">{item.value || "N/A"}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-center text-gray-500">No student data available.</li>
                      )}

                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
