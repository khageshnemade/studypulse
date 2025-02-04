import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { makeRequest } from "../../axios";

import { Layers } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Cls() {
  const location = useLocation();
  const [classes, setClasses] = React.useState([]);
  const [orgId, setOrgId] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const userData = localStorage.getItem("user");
  const [organizationID, setOrganizationID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const parsedData = localStorage.getItem("user");
    console.log("Raw User Data from localStorage:", userData);

    if (userData) {
      try {
        console.log("Parsed organizationID:", parsedData?.organizationID);

        fetchClasses(parsedData?.organizationID);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    } else {
      console.warn("No user data found in localStorage");
    }
  }, []);
  // Only runs on initial mount

  const showStudents = (classId, className) => {
    navigate(`/teacher-dashboard/students`, { state: { classId, className } });
  };
  const fetchClasses = async (id) => {
    try {
      const res = await makeRequest.get(`/teacher/get-all-classes`);
      setClasses(res?.data?.data);
      setClasses(res?.data?.data);
      console.log("Classes: ", res?.data?.data);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };
  return (

    <>  <p className="text-center text-4xl font-semibold bg-purple-200 p-3 rounded-2xl flex w-4/6 justify-center items-center mx-auto text-gray-700 m-3 h-20">
      <div>
        <Layers className="text-2xl min-w-10 min-h-10 mr-4 animate-bounce" />
        </div> {/* Lucid Icon with Bounce Animation */}
      Classes
    </p>

      <div className="mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg overflow-x-auto">


        <table className="table-auto w-full border-collapse border border-gray-300 whitespace-nowrap">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Classes</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Stream</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Created At</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-all">
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.stream}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-gradient-to-r from-blue-300 to-purple-400 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-all"
                    onClick={() => showStudents(item._id, item.name)}
                  >
                    View Students
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Add Class (if needed) */}
        {/* <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
  
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Create Class</h2>
          <p className="text-sm text-gray-600 mt-1">Fill in the details to add a new class</p>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Class Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label htmlFor="stream" className="block text-sm font-medium text-gray-700">Stream</label>
            <select
              id="stream"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Stream</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
              <option value="Commerce">Commerce</option>
            </select>
          </div>
  
          {error && <p className="text-red-500 text-sm">{error}</p>}
  
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-md text-white font-semibold ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={isLoading}
          >
            {isLoading ? "Creating Class..." : "Create Class"}
          </button>
        </form>
      </div>
    </div> */}
        <ToastContainer />
      </div>
    </>
  );
}
