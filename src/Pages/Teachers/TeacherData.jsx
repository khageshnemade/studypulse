import { ChevronDown, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { setTeacher } from "../../redux/features/teacherSlice";
import { makeRequest } from "../../axios";
import { UpdateTeacher } from "../AdminActivities/UpdateTeacher";
import "react-toastify/dist/ReactToastify.css";

export const Table = () => {
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const dispatch = useDispatch();
  const [showUpdateTeacher, setShowUpdateTeacher] = useState(false);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, [showUpdateTeacher]);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("/admin/get-all-teachers");
      setTeachers(res?.data?.data);
      dispatch(setTeacher(res?.data?.data));
    } catch (error) {
      toast.error("Failed to fetch teachers, Please try to login again");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (row) => {
    const updatedStatus = row?.status === "active" ? "inActive" : "active";
    try {
      await makeRequest.put("/admin/update-teacher-status", {
        status: updatedStatus,
        teacherId: row?._id,
      });
      toast.success("Updated Successfully");
      fetchTeachers();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return showUpdateTeacher ? (
    <UpdateTeacher id={currentId} setShowUpdateTeacher={setShowUpdateTeacher} />
  ) : (
    <div className="overflow-x-auto">
      {/* Loading Spinner */}
      {loading && (
        <div className="m-2 flex justify-center items-center">
          <div className="animate-spin border-4 border-blue-500 border-t-transparent w-6 h-6 rounded-full"></div>
        </div>
      )}
      <table className="min-w-full bg-white rounded-lg shadow-md whitespace-nowrap">
        {" "}
        <thead className="bg-teal-700 text-white">
          <tr>
            <th className="px-4 py-2">Profile</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Experience</th>
            <th className="px-4 py-2">More</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((row, index) => (
            <tr key={index} className="bg-white hover:bg-gray-100">
              <td className="px-4 py-2">
                {row?.profilePic ? (
                  <img
                  src={
                    row.profilePic.startsWith('https://api.studypulse.live')
                      ? row.profilePic
                      : `https://api.studypulse.live/${row.profilePic}`
                  }
                    alt="Profile"
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white text-2xl rounded-full">
                    {`${row.firstName[0]}${row.lastName[0]}`.toUpperCase()}
                  </div>
                )}
              </td>
              <td className="px-4 py-2">{`${row.firstName} ${row.lastName}`}</td>
              <td className="px-4 py-2">{row.email}</td>
              <td className="px-4 py-2">{row.phoneNumber}</td>
              <td className="px-4 py-2">{`${row?.cityData?.name}, ${row?.cityData?.name}`}</td>
              <td className="px-4 py-2">
                {row?.teacherData?.totalYearsOfExperience}
              </td>
              <td className="px-4 py-2">
                <button
                  className="p-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => {
                    setCurrentId(row._id);
                    setShowUpdateTeacher(true);
                  }}
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </td>
              <td className="p-3">
                <button
                  className={`text-white p-1 rounded-md ${
                    row.status === "active" ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => handleClick(row)}
                >
                  {row.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

const TeacherData = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-center text sm:text-xl md:text-2xl font-serif p-2 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto m-3 drop-shadow-lg border-[1.5px] border-blue-800">
        <User className="text sm:text-xl md:text-2xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce text-blue-600" />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Teachers
        </span>
      </p>

      <Table />
    </div>
  );
};

export default TeacherData;
