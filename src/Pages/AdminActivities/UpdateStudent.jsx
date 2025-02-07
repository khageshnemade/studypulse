import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Edit, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const UpdateStudent = ({ id, setShowUpdateStudent }) => {
  const studentsData = useSelector((state) => state?.students?.studentsData);
  console.log("All Students:", studentsData); // Log the fetched students
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [studentData, setStudentData] = useState({});
  const [userData, setUserData] = useState({});

  const [docs, setDocs] = useState([]);
  const [fileName, setFileName] = useState("");

  const [newDocument, setNewDocument] = useState("");

  // Handle adding a new document
  const handleAddDocument = () => {
    setDocs([...docs, newDocument]);
  };

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDocument(file.name); // Save the file
      setFileName(file.name); // Show the file name
      alert("File changed", file.name);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <img
          src={`data:image/jpeg;base64,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`}
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

              {/* Dropdown to display all documents */}
              {/* <div className="flex-1">
                <label
                  htmlFor="doc"
                  className="block text-sm font-medium text-gray-700"
                >
                  Documents
                </label>
                <select
                  id="doc"
                  name="doc"
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSelectChange}
                >
                  <option value="">Select a document</option>
                  {studentData.documents.map((doc, index) => (
                    <option key={index} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* Add a new document */}
              <div className="flex items-center mt-2 gap-2">
                <input
                  type="file"
                  id="new-doc"
                  onChange={handleFileChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 ml-2">
                  {fileName || "No file selected"}
                </span>{" "}
                {/* Display the file name */}
                <button
                  type="button"
                  onClick={handleAddDocument}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> {/* Icon added here */}
                </button>
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
                      className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg"
                    >
                      <span>{doc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDocument(doc)}
                        className="px-2 py-1 text-red-500 hover:underline"
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
        <div className="mt-8 w-full">
        <button onClick={()=>{
        setShowUpdateStudent(false);
      }}><ArrowLeft/></button>
          <div className="flex text-center border-b border-gray-300">
            <button
              onClick={() => setActiveTab("about")}
              className={`flex-1 py-2 text-center font-semibold ${
                activeTab === "about"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              About
            </button>

            <button
              onClick={() => setActiveTab("studentData")}
              className={`flex-1 py-2 text-center font-semibold ${
                activeTab === "studentData"
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
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
                  About
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                  {/* User Information */}
                  <div className="p-6 rounded-lg shadow-md">
                    <ul className="space-y-4 text-gray-600">
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
                          <span>{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "studentData" && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
                  Other Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                  {/* Student Details */}
                  <div className="p-6 rounded-lg shadow-md">
                    <ul className="space-y-4 text-gray-600">
                      {studentData ? (
                        [
                          { label: "Gender:", value: studentData.gender },
                          {
                            label: "Status:",
                            value: userData?.status || "N/A",
                          },
                          ...(studentData.documents || []).map(
                            (doc, index) => ({
                              label: `Document-${index + 1}:`,
                              value: doc,
                            })
                          ),
                          {
                            label: "DOB:",
                            value: new Date(
                              studentData.dob
                            ).toLocaleDateString(),
                          },
                        ].map((item, index) => (
                          <li
                            key={index}
                            className="grid grid-cols-[150px_1fr]"
                          >
                            <strong>{item.label}</strong>
                            <span>{item.value || "N/A"}</span>
                          </li>
                        ))
                      ) : (
                        <li>No student data available.</li>
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
