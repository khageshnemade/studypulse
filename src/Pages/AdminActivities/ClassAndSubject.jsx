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
            onClick={() => navigate(`/admin-dashboard/addClass`)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
}
