import React, { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { setStudent } from "../../redux/features/studentSlice";
import { UpdateStudent } from "../AdminActivities/UpdateStudent";
import { toast, ToastContainer } from "react-toastify";
import { ArrowRight, Trash2, Users2 } from "lucide-react";

const Table = () => {
  const [currentId, setCurrentId] = useState("");
  const dispatch = useDispatch();
  const [showUpdateStudent, setShowUpdateStudent] = useState(false);
  const [students, setStudents] = useState([]);
  const orgId = useSelector((state) => state.org.orgId);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [profileComplete, setProfileComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchStudents = async (classId, pageSize, page, profileComplete) => {
    const url = `/admin/get-all-students?classId=${classId}&page=${page}&limit=${pageSize}&isProfileComplete=${profileComplete}`;
    try {
      const res = await makeRequest.get(url);
      setStudents(res?.data?.data);
      dispatch(setStudent(res?.data?.data));
    } catch (error) {
      console.error("Error fetching students:", error?.response?.data?.message);
      toast.error("Failed to fetch students. Please try again.");
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    console.log("Student ", students, pageSize, currentPage);

    if (students.length + 2 >= pageSize * currentPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (classId) {
      fetchStudents(classId, pageSize, currentPage, profileComplete);
    }
  }, [currentPage, classId, pageSize, profileComplete, showUpdateStudent]);

  const fetchClasses = async () => {
    try {
      const res = await makeRequest.get(
        `/get-classes-by-org-id?organizationId=${orgId}`
      );
      setClasses(res?.data?.data);
    } catch (error) {
      console.error("Error fetching classes:", error.message);
    }
  };

  const handleToggle = () => {
    setProfileComplete(!profileComplete);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleStatusChange = async (student) => {
    const updatedStatus = student?.status === "active" ? "inActive" : "active";
    try {
      await makeRequest.put("/admin/update-student-status", {
        status: updatedStatus,
        studentId: student?._id,
      });
      toast.success("Status updated successfully");
      fetchStudents(classId, pageSize, currentPage, profileComplete);
    } catch (error) {
      console.error("Error updating status:", error.message);
      toast.error("Failed to update status");
    }
  };

  return showUpdateStudent ? (
    <UpdateStudent id={currentId} setShowUpdateStudent={setShowUpdateStudent} />
  ) : (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-4">
        <select
          id="classId"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white w-1/3"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>

        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white w-1/3"
        >
          <option value="1">1</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-lg text-white ${profileComplete ? "bg-green-500" : "bg-red-500"}`}
        >
          {profileComplete
            ? "Show Incomplete Profiles"
            : "Show Completed Profiles"}
        </button>
        <div className="text-lg font-semibold">Page: {currentPage}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md whitespace-nowrap">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Profile</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">City</th>
              {profileComplete && <th className="px-4 py-2 border">Actions</th>}
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((row) => (
              <tr key={row._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={row?.studentData?.profilePic}
                    alt="Profile"
                  />
                </td>
                <td className="px-4 py-2 border">
                  {row.firstName} {row.lastName}
                </td>
                <td className="px-4 py-2 border">{row.email}</td>
                <td className="px-4 py-2 border">{row.phoneNumber}</td>
                <td className="px-4 py-2 border">{row?.cityData?.name}</td>
                {profileComplete && (
                  <td className="border border-gray-300 px-4 py-2 max-w-min">




                    <div className="flex space-x-3 items-center">
                      <button
                        onClick={() => {
                          setCurrentId(row._id);
                          setShowUpdateStudent(true);
                        }}
                        className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        <ArrowRight/>
                      </button>

                      {/* Delete Button */}
                      <button
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
                        onClick={() => deleteStudent(item._id, item.name)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>


                )}
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleStatusChange(row)}
                    className={`px-4 py-2 rounded-md text-white ${row.status === "active"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                      }`}
                  >
                    {row.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={students.length + 2 < pageSize * currentPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default function StudentData() {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
        <Users2 className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
        Students
      </p>
      <Table />
      <ToastContainer />
    </div>
  );
}
