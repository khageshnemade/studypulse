import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { makeRequest } from "../../axios";
import { setClassess } from "../../redux/features/classSlice";
import { toast, ToastContainer } from "react-toastify";
import { Layers3, Plus, PlusCircle } from "lucide-react";

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
    navigate(`/admin-dashboard/class_subject/subjects`, {
      state: { classId, className },
    });
  };

  return (
    <div>
      <div className="mx-auto p-6 shadow-lg rounded-lg overflow-x-auto">
        <p className="text-center text sm:text-xl md:text-2xl font-serif p-2 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto m-3 drop-shadow-lg border-[1.5px] border-blue-800">
          <Layers3 className="text sm:text-xl md:text-2xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce text-blue-600" />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Classes
          </span>
        </p>

        <div className="flex justify-end mb-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center space-x-2 text-xl"
            onClick={() => navigate(`/admin-dashboard/class_subject/addClass`)}
          >
            <PlusCircle className="h-5 w-5" /> {/* Add the Plus icon */}
            <span>Add Class</span>
          </button>
        </div>

        <table className="table-auto w-full border-collapse border whitespace-nowrap border-gray-300">
          <thead className="bg-teal-700 font-serif text-white">
            <tr>
            <th className="border border-gray-300 px-4 py-2 text-left ">
                Profile
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left ">
                Classes
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left ">
                Stream
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left ">
                Created At
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left ">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {classes.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-200 hover:text-gray-900 transition-all" // Adjust hover to ensure contrast
              >
                <td className="border border-gray-800 px-4 py-2">
                 <img src={`https://api.studypulse.live/`} alt="" />
                </td>
                <td className="border border-gray-800 px-4 py-2">
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
