import React, { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import { setStudent } from "../../redux/features/studentSlice";
import { UpdateStudent } from "../AdminActivities/UpdateStudent";
import { toast, ToastContainer } from "react-toastify";
import { ArrowRight, ChevronDown, Trash2, Users2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setAdminDetails } from "../../redux/features/adminSlice";
import { useNavigate } from "react-router-dom";
const Table = () => {
  const [currentId, setCurrentId] = useState("");
  const dispatch = useDispatch();
  const [showUpdateStudent, setShowUpdateStudent] = useState(false);
  const [students, setStudents] = useState([]);
  const orgId = useSelector((state) => state.org.orgId);
const [pages,setPages]=useState();
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [profileComplete, setProfileComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {
    classId: initialClassId,
    page,
    isp,
  } = useSelector((state) => state.admin.adminDetails);
const navigate=useNavigate();
  useEffect(() => {
    console.log("OrgId", orgId);
    setClassId(initialClassId);
    setPageSize(page);
    setProfileComplete(isp);
  }, [classId, page]);

  const fetchStudents = async () => {
    setLoading(true);
    const url = `/admin/get-all-students?classId=${classId}&page=${currentPage}&limit=${pageSize}&isProfileComplete=${profileComplete}`; 
    try {
      const res = await makeRequest.get(url);
      setStudents(res?.data?.data);
      setPages(res?.data?.totalPages)
      dispatch(setStudent(res?.data?.data));
    } catch (error) {
      console.error("Error fetching students:", error?.response?.data?.message);
      toast.error("Please try to select Class.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    console.log("Student ", students, pageSize, currentPage);

    if (currentPage<pages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (classId) fetchStudents();
  }, [currentPage, classId, pageSize, profileComplete, showUpdateStudent, profileComplete]);

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
      fetchStudents();
    } catch (error) {
      console.error("Error updating status:", error.message);
      toast.error("Failed to update status");
    }
  };
  const handleToggle = () => {
    setProfileComplete(!profileComplete);
    dispatch(setAdminDetails({ isp: !profileComplete }));
  };
  return showUpdateStudent ? (
    <UpdateStudent id={currentId} setShowUpdateStudent={setShowUpdateStudent} />
  ) : (
    <div className="container mx-auto p-6">
    <div className="flex justify-between mb-4 gap-2">
      {/* Dropdown */}
      <select
        value={profileComplete}
        onChange={(e) => {
          handleToggle()
        }}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white w-1/3"
      >
        <option value={false}>Incomplete Profiles</option>
        <option value={true}>Completed Profiles</option>
      </select>
      <select
        id="classId"
        value={classId}
        onChange={(e) => {
          dispatch(setAdminDetails({ classId: e.target.value }));
          setCurrentPage(1)
          setClassId(e.target.value);
        }}
        disabled={profileComplete === false} // Disable if Incomplete Profiles
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white w-1/3"
      >
        <option value="" selected>
          {profileComplete === false ? "Not Required" : "Select Class"}
        </option>
        {profileComplete && classes.map((cls) => (
          <option key={cls._id} value={cls._id}>
            {cls.name}
          </option>
        ))}
      </select>
     
      <select
        id="pageSize"
        value={pageSize}
        onChange={(e) => {
          dispatch(setAdminDetails({ page: e.target.value }));
          setCurrentPage(1)

          setPageSize(Number(e.target.value));
        }}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white w-1/3"
      >
        <option value="1">1</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
       {/* Loading Spinner */}
       
    </div>
  
    {loading && (
        <div className="mt-2 mb-5 flex justify-center items-center">
          <div className="animate-spin border-4 border-blue-500 border-t-transparent w-6 h-6 rounded-full"></div>
        </div>
      )}
        <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
    {profileComplete ? "✅ Completed Profile Students" : "⚠️ Incomplete Profile Students"}
  </h2>
  
   
  
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md whitespace-nowrap">
        <thead className="bg-teal-700 font-serif text-white">
          <tr>
            <th className="px-4 py-2 border">Profile</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">City</th>
            {profileComplete && <th className="px-4 py-2 border">More</th>}
            {profileComplete && <th className="px-4 py-2 border">ScoreCard</th>}
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((row) => (
            <tr key={row._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">
                {row?.profilePic ? (
                  <img
                    src={
                      row.profilePic.startsWith("https://api.studypulse.live")
                        ? row.profilePic
                        : `https://api.studypulse.live/${row.profilePic}`
                    }
                    alt="Profile"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white text-2xl font-bold rounded-full">
                    {`${row.firstName[0]}${row.lastName[0]}`.toUpperCase()}
                  </div>
                )}
              </td>
  
              <td className="px-4 py-2 border">{row.firstName} {row.lastName}</td>
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
                      <ChevronDown />
                    </button>
                  </div>
                </td>
              )}
              {profileComplete && (
                <td className="border border-gray-300 px-4 py-2 max-w-min">
                  <div className="flex space-x-3 items-center">
                    <button
                      onClick={() => navigate('/admin-dashboard/studentsReport',{state:{studentId:row._id}})}
                      className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      <ChevronDown />
                    </button>
                  </div>
                </td>
              )}
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleStatusChange(row)}
                  className={`px-4 py-2 rounded-md text-white ${
                    row.status === "active"
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
      <div className="flex justify-between items-center mb-4">
      <div className="text-lg font-semibold">Page: {currentPage}</div>
    </div>
      <button
        onClick={handleNextPage}
        disabled={currentPage>=pages}
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
      <p className="text-center text sm:text-xl md:text-2xl font-serif p-2 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto m-3 drop-shadow-lg border-[1.5px] border-blue-800">
        <Users2 className="text sm:text-xl md:text-2xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce text-blue-600" />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Students
        </span>
      </p>

      <Table />
      <ToastContainer />
    </div>
  );
}
