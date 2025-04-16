import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import { setAdminDetails } from "../../../redux/features/adminSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
  Title,
  ArcElement,
} from "chart.js";
import { makeRequest } from "../../../axios";
import { BookOpen, FileText, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OnlineUsers from "../../../Pages/AdminActivities/OnlineUsers";
import AssignmentData from "./AssignmentData";

// Registering chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

function StudentPassedFailed({
  selectedClass,
  selectedSubject,
  selectedStatus,
  setSelectedClass,
  setSelectedSubject,
  setSelectedStatus,
  classes,
  subjects,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [statusCounts, setStatusCounts] = useState({
    pass: 0,
    fail: 0,
    absent: 0,
  });
  const [loadingResults, setLoadingResults] = useState(false);

  const getPieChartData = () => ({
    labels: ["Passed", "Failed", "Absent"],
    datasets: [
      {
        data: [statusCounts.pass, statusCounts.fail, statusCounts.absent],
        backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
      },
    ],
  });

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);

    dispatch(
      setAdminDetails({
        classId: event.target.value,
      })
    );
    setSelectedSubject("");
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    dispatch(
      setAdminDetails({
        subjectId: event.target.value,
      })
    );
  };

  const fetchStudentsResults = async (status) => {
    try {
      const res = await makeRequest.get(
        `/admin/get-students-results-by-class?classId=${selectedClass}&subjectId=${selectedSubject}&page=1&limit=1&resultStatus=${status}`
      );
      // Extracting totalRecords for the specific status
      return res?.data?.totalRecords || 0;
    } catch (error) {
      console.error(
        `Error fetching ${status} students:`,
        error.response?.data || error.message
      );
      return 0;
    }
  };

  const fetchAllStatusData = async () => {
    setLoadingResults(true);
    try {
      const [passCount, failCount, absentCount] = await Promise.all([
        fetchStudentsResults("pass"),
        fetchStudentsResults("fail"),
        fetchStudentsResults("absent"),
      ]);

      setStatusCounts({
        pass: passCount,
        fail: failCount,
        absent: absentCount,
      });
    } finally {
      setLoadingResults(false);
    }
  };

  useEffect(() => {
    if (selectedClass && selectedSubject) {
      fetchAllStatusData();
    }
  }, [selectedClass, selectedSubject]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    onClick: (event, chartElement) => {
      console.log("Chart clicked:", chartElement);
      if (chartElement.length > 0) {
        const clickedIndex = chartElement[0].index;
        const labels = ["pass", "fail", "absent"];
        const label = labels[clickedIndex];
        console.log("Selected label:", label);
        setSelectedStatus(label);

        dispatch(
          setAdminDetails({
            status: label,
          })
        );

        navigate("student");
      }
    },
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-green-500 to-teal-300 text-white p-2 rounded-md w-full text-center font-serif">
        Subjectwise Class Performance
      </h2>
      <div className="bg-white shadow rounded-xl p-6 transform transition-transform duration-300 hover:scale-105">
  {loadingResults && (
    <div className="mb-2 flex justify-center items-center">
      <div className="animate-spin border-4 border-blue-500 border-t-transparent w-6 h-6 rounded-full"></div>
    </div>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
    <div>
      <select
        id="classSelector"
        value={selectedClass || ""}
        onChange={handleClassChange}
        className="w-full p-1 border rounded-lg focus:ring focus:ring-blue-300"
      >
        <option value="">Select Class</option>
        {classes?.map((classData) => (
          <option key={classData._id} value={classData._id}>
            {classData.name}
          </option>
        ))}
      </select>
    </div>

    <div>
      <select
        id="subjectSelector"
        value={selectedSubject || ""}
        onChange={handleSubjectChange}
        className="w-full p-1 border rounded-lg focus:ring focus:ring-blue-300"
      >
        <option value="">Select Subject</option>
        {subjects?.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Show message if class or subject is not selected */}
  {(!selectedClass || !selectedSubject) && (
    <div className="text-center text-red-500 mb-4">
      <p>Please select both class and subject to view the stats.</p>
    </div>
  )}

  {/* Pie chart container, only renders when class and subject are selected */}
  {selectedClass && selectedSubject && (
    <div className="w-full p-6 rounded-lg flex justify-center">
      <Pie options={options} data={getPieChartData()} />
    </div>
  )}
</div>

    </div>
  );
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orgId = useSelector((state) => state.org.orgId);
  const classId = useSelector((state) => state.admin.adminDetails.classId);
  const subjectId = useSelector((state) => state.admin.adminDetails.subjectId);
  const status = useSelector((state) => state.admin.adminDetails.status);

  useEffect(() => {
    if (orgId) {
      fetchClasses();
    }
  }, [orgId]);

  useEffect(() => {
    if (selectedClass) {
      fetchSubjects(selectedClass);
    }
  }, [selectedClass]);

  useEffect(() => {
    setSelectedClass(classId);
    setSelectedSubject(subjectId);
    setSelectedStatus(status);
  }, [classId, subjectId]);

  useEffect(() => {
    fetchDashboardData();
    fetchOnlineUsers();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await makeRequest.get(
        `/get-classes-by-org-id?organizationId=${orgId}`
      );
      setClasses(res?.data?.data || []);
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response?.data || error.message
      );
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      const res = await makeRequest.get(
        `/get-subjects-by-class-id?classId=${classId}`
      );
      setSubjects(res?.data?.data || []);
    } catch (error) {
      console.error(
        "Error fetching subjects:",
        error.response?.data || error.message
      );
    }
  };

  const fetchDashboardData = async () => {
    try {
      const res = await makeRequest.get("admin/get-dashboard-details");
      setDashboard(res?.data?.data || {});
    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
    }
  };

  const fetchOnlineUsers = async () => {
    try {
      const res = await makeRequest.get(`/admin/get-online-users`);
      setUsers(res?.data?.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching online users:", error.message);
    }
  };

  // Student Passed/Failed Stats Component

  return (
    <div className="min-h-screen p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 p-8">
        {/* Teachers Registered Card */}
        <div className="bg-red-300 rounded-2xl p-2 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer"
          onClick={() => navigate("teachers")}>
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-white font-serif">
              Teachers Registered
            </h3>
          </div>
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <BookOpen className="text-4xl" />
            </div>
            <p className="text-2xl font-extrabold text-blue-600 rounded-lg py-1">
              {dashboard.totalTeachersCount}
            </p>
          </div>
          <div className="text-center  text-black font-sans">
            <p>Number of teachers currently registered.</p>
          </div>
        </div>
        {/* Students Registered Card */}
        <div
          className="bg-teal-400 rounded-2xl p-2 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer"
          onClick={() => navigate("students")}
        >
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-white font-serif">
              Students Registered
            </h3>
          </div>
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="bg-green-600 text-white p-3 rounded-full">
              <FileText className="text-2xl" />
            </div>
            <p className="text-2xl font-extrabold text-green-600 rounded-lg py-1">
              {dashboard.totalStudentCount}
            </p>
          </div>
          <div className="text-center text-md text-black font-sans">
            <p>Number of students currently registered.</p>
          </div>
        </div>
        {/* Classes Created Card */}
        <div className="bg-orange-400 rounded-2xl p-2 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer"
          onClick={() => navigate("classes")}>

          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-white font-serif">
              Classes Created
            </h3>
          </div>
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="bg-indigo-500 text-white p-2 rounded-full">
              {" "}
              <Layers className="text-2xl" />{" "}
            </div>{" "}
            <p className="text-2xl font-extrabold text-indigo-500 rounded-lg py-1">
              {" "}
              {dashboard.totalClassCount}{" "}
            </p>{" "}
          </div>{" "}
          <div className="text-center text-md text-black font-sans">
            {" "}
            <p>Number of classes currently created.</p>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      {/* Recently Added Teachers & Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-6">
        {[
          {
            title: "Recently Added Teachers",
            data: dashboard.recentlyAddedTeachers,
          },
          {
            title: "Recently Added Students",
            data: dashboard.recentlyAddedStudents,
          },
        ].map(({ title, data }, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-xl p-6 transform transition-transform duration-300 hover:scale-105 max-h-96 overflow-y-auto text-center"
          >
            <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-white p-2 rounded-md w-full text-center font-serif">
              {title}
            </h2>

            <div className="space-y-4">
              {data?.map((person) => (
                <div
                  key={person._id || person.id}
                  className="flex items-center p-4 border-b last:border-b-0 space-x-4"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                    {person.firstName[0]}{person.lastName[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800">
                      {person.firstName} {person.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{person.email}</p>
                    <p className="text-sm text-gray-600">
                      {person.phoneNumber}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-white shadow rounded-xl p-6 duration-300 hover:scale-105 mb-8">
          <StudentPassedFailed
            selectedClass={selectedClass}
            selectedSubject={selectedSubject}
            selectedStatus={selectedStatus}
            setSelectedClass={setSelectedClass}
            setSelectedSubject={setSelectedSubject}
            setSelectedStatus={setSelectedStatus}
            classes={classes}
            subjects={subjects}
          />
        </div>

        <div className="bg-white shadow rounded-xl p-6 duration-300 hover:scale-105 mb-8">
          <AssignmentData />
        </div>
        <div className="bg-white shadow rounded-xl p-6 duration-300 hover:scale-105 mb-8">
          <OnlineUsers users={users} />
        </div>
      </div>
    </div>
  );
}
