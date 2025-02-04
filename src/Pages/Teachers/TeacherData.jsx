import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTheme } from "../../Dashboard/hooks/use-theme";
import {
  CreditCard,
  DollarSign,
  Package,
  PencilLine,
  Star,
  Trash,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useDispatch } from "react-redux";
import { setTeacher } from "../../redux/features/teacherSlice";
import { UpdateTeacher } from "../AdminActivities/UpdateTeacher";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const Table = () => {
  const user = localStorage.getItem("user");
  const token = JSON.parse(user)?.token;
  const [currentId, setCurrentId] = useState("");
  const dispatch = useDispatch();
  const [showUpdateTeacher, setShowUpdateTeacher] = useState(false);

  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    fetchTeachers();
  }, [showUpdateTeacher]);

  const fetchTeachers = async () => {
    try {
      const res = await makeRequest.get("/admin/get-all-teachers");
      setTeachers(res?.data?.data);
      const teachersData = res?.data?.data;
      dispatch(setTeacher(teachersData));
    } catch (error) {
      console.error("Request Error:", error?.response?.data?.message);
      toast.error("Failed to fetch teachers,Please try to Login again");
    }
  };

  const handleClick = async (row) => {
    try {
      // Toggle status between 'active' and 'inActive'
      const updatedStatus = row?.status === "active" ? "inActive" : "active";

      // Log the data to see what is being sent
      console.log(
        `Updating teacher status to: ${updatedStatus} for teacher ID: ${row?._id}`
      );

      // Make the API request to update the status
      const res = await makeRequest.put("/admin/update-teacher-status", {
        status: updatedStatus, // Send the updated status
        teacherId: row?._id, // Send the teacherId
      });

      toast.success("Updated Successfully");
      fetchTeachers();
    } catch (error) {
      // Log the error
      console.error(
        "Request Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  console.log("Id", currentId);

  return showUpdateTeacher ? (
    <UpdateTeacher id={currentId} setShowUpdateTeacher={setShowUpdateTeacher} />
  ) : (
    <div className="overflow-x-auto">
    <div className="w-full overflow-x-auto">
    <table className="min-w-full table-auto border-collapse whitespace-nowrap">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 border border-gray-300">Profile</th>
          <th className="px-4 py-2 border border-gray-300">Name</th>
          <th className="px-4 py-2 border border-gray-300">Email</th>
          <th className="px-4 py-2 border border-gray-300">Phone Number</th>
          <th className="px-4 py-2 border border-gray-300">Address</th>
          <th className="px-4 py-2 border border-gray-300">Experience</th>
          <th className="px-4 py-2 border border-gray-300">Action</th>
          <th className="px-4 py-2 border border-gray-300">Status</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((row, index) => (
          <tr key={index} className="bg-white hover:bg-gray-100">
            <td className="px-4 py-2 border border-gray-300">
              <img
                style={{ width: "40px", height: "40px" }}
                src={row?.teacherData?.profilePic}
                alt="User Pic"
              />
            </td>
            <td className="px-4 py-2 border border-gray-300">
              {row.firstName + " " + row.lastName}
            </td>
            <td className="px-4 py-2 border border-gray-300">{row.email}</td>
            <td className="px-4 py-2 border border-gray-300">
              {row.phoneNumber}
            </td>
            <td className="px-4 py-2 border border-gray-300">
              {row?.cityData?.name + ", " + row?.cityData?.name}
            </td>
            <td className="px-4 py-2 border border-gray-300">
              {row?.teacherData?.totalYearsOfExperience}
            </td>
            <td className="px-4 py-2 border border-gray-300">
              <button
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap"
                onClick={() => {
                  setCurrentId(row._id);
                  setShowUpdateTeacher(true);
                }}
              >
                View More
              </button>
            </td>
  
            <td className="p-3 border border-gray-300">
              <button
                className={`text-white rounded-md p-1 hover:bg-opacity-80 focus:outline-none focus:ring-2 
      ${row.status === "active" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} whitespace-nowrap`}
                onClick={() => handleClick(row)}
              >
                {row.status}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
  
  );
};
const TeacherData = () => {
  const { theme } = useTheme();
  console.log("Hello Admin");

  return (
    <div className="flex flex-col gap-y-4">
       <p className="text-center text-4xl font-semibold bg-purple-200 p-3 rounded-2xl flex w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
    <User className="text-2xl min-w-8 min-h-8 mr-3 animate-bounce" /> {/* Lucid Icon with Bounce Animation */}
  Teachers
  </p>

      <Table />

      <ToastContainer />
    </div>
  );
};

export default TeacherData;
<></>;
