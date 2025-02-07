import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { makeRequest } from "../../axios";
import { setClassess } from "../../redux/features/classSlice";
import { toast, ToastContainer } from "react-toastify";
import { Layers3 } from "lucide-react";

export default function Classes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const orgId = useSelector((state) => state.org.orgId);
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState("");
  const [stream, setStream] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);
  dispatch(setClassess(classes));
  const fetchClasses = async () => {
    try {
      const res = await makeRequest.get(
        `/get-classes-by-org-id?organizationId=${orgId}`
      );
      setClasses(res?.data?.data);
      setClasses(res?.data?.data);
      console.log("Classes: ", res?.data?.data);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };
  const showSubject = (classId, className) => {
    navigate(`/admin-dashboard/subjects`, { state: { classId, className } });
  };
  const deleteSubject = async(classId, className) => {
    try {
      const res = await makeRequest.post("/admin/delete-class", {classId});
      console.log("Class deleted successfully:");
      toast.success(res?.data?.message);

      res.status === 200 || res.status === 201 ? fetchClasses() : "";
      setIsLoading(false); // Reset loading state
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting class:", error.message);
      toast.error("Failed to delete Class,Please try to Login again");
    } finally {
      setIsLoading(false);
    }
  };
  const addClass = (classId) => {
    navigate(`/admin-dashboard/addClass`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const classData = { name, stream };

    setIsLoading(true);
    console.log("Setting Success", isLoading);
    setError("");
    try {
      const res = await makeRequest.post("/admin/create-class", classData);
      console.log("Class created successfully:");
      toast.success(res?.data?.message);

      res.status === 200 || res.status === 201 ? fetchClasses() : "";
      setIsLoading(false); // Reset loading state
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating class:", error.message);
      toast.error("Failed to fetch Streams,Please try to Login again");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="mx-auto p-6 shadow-lg rounded-lg overflow-x-auto">
        <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
          <Layers3 className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
          Classes
        </p>

        <div className="flex justify-end mb-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            Add Class
          </button>
        </div>

        <table className="table-auto w-full border-collapse border whitespace-nowrap border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                Classes
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                Stream
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                Created At
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-white">
            {classes.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 hover:text-gray-400 transition-all"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.stream}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 max-w-min">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-all mr-1"
                    onClick={() => showSubject(item._id, item.name)}
                  >
                      Subjects
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all ml-1"
                    onClick={() => deleteSubject(item._id, item.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add Class */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-[999]"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Create Class</h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the details to add a new class
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Class Name
                </label>
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
                <label
                  htmlFor="stream"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stream
                </label>
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
                className={`w-full py-3 px-4 rounded-md text-white font-semibold ${
                  isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Creating Class..." : "Create Class"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
