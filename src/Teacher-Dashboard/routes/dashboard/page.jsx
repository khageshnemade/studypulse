import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BookOpen, FileText, Home, Layers, Users } from "lucide-react";
import { ToastContainer } from "react-toastify";
import TeacherProfile from "../../../Pages/TeacherActivities/TeacherProfile1";
import { makeRequest } from "../../../axios";
import TeacherSubjectLimits from "../../../Pages/TeacherActivities/TeacherSubjectLimits";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTeacher } from "../../../redux/features/teacherx";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TeacherDashboard() {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("user");
  const profileCompletion = JSON.parse(user)?.profileCompletion;
  const [dashboard, setData] = useState({});
  const dispatch = useDispatch();
  const teacherData = useSelector((state) => state.currentTeacher.currentTeacher);
  useEffect(() => {
    fetchDashboardData();
    fetchteacherFullData();
  }, []);
const fetchteacherFullData=async()=>{
  try {
    const res = await makeRequest.get("/teacher/get-data");
   console.log(res?.data?.data);
   dispatch(setCurrentTeacher(res?.data?.data));
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    setLoading(false);
  }
}
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("/teacher/get-dashboard-details");
      setData(res?.data?.data || {});
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Process dashboard data for charts and stats
  const clas = Object.keys(dashboard?.chapterDistribution || {});
  const classes = clas.map((className) => ({
    className,
    subjects: dashboard?.chapterDistribution[className],
  }));
  // Pie chart component
  const HollowPieChart = ({ classes }) => {
    const [selectedClass, setSelectedClass] = useState(
      classes[0]?.className || ""
    );
    const handleClassChange = (e) => setSelectedClass(e.target.value);

    const selectedClassData = classes.find(
      (classItem) => classItem.className === selectedClass
    );

    // Corrected pieData construction
    const pieData = {
      labels: Object.keys(selectedClassData?.subjects || {}),
      datasets: [
        {
          label: "Chapters per Subject",
          data: Object.values(selectedClassData?.subjects || {}),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
          hoverOffset: 10,
        },
      ],
    };

    const options = {
      responsive: true,
      cutout: "70%",
      plugins: { legend: { position: "top" }, tooltip: { enabled: true } },
    };

    return (
      <div className="bg-white p-4">
        <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-red-500 to-red-300 text-white p-2 rounded-md font-serif text-center">
          Chapters Distribution
        </h2>
        <select
          className="border px-3 py-2 mb-4 rounded w-full max-w-3xl mx-auto"
          value={selectedClass}
          onChange={handleClassChange}
        >
          {classes.map((classItem, idx) => (
            <option key={idx} value={classItem.className}>
              {classItem.className}
            </option>
          ))}
        </select>

        <Doughnut data={pieData} options={options} />
      </div>
    );
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      {!profileCompletion ? (
        <TeacherProfile />
      ) : (
        <>
          {/* Loading Spinner */}
          {loading && (
            <div className="mb-2 flex justify-center items-center">
              <div className="animate-spin border-4 border-blue-500 border-t-transparent w-6 h-6 rounded-full"></div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
            {/* Available Subjects */}
            <div className="bg-blue-200 rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer shadow-lg" onClick={() => navigate("subjects")}>
              {/* Title Row */}
              <div className="text-center mb-2">
                <h3 className="font-bold text-gray-800 text-xl font-serif">
                  Available Subjects
                </h3>
              </div>

              {/* Icon and Count Row */}
              <div className="flex justify-center items-center gap-3 mb-3">
                <div className="bg-white text-blue-600 p-3 rounded-full shadow-md">
                  <BookOpen className="text-3xl" />
                </div>
                <p className="text-3xl font-extrabold text-gray-800 rounded-lg py-1">
                  {dashboard.totalSubjectsCount}
                </p>
              </div>

              {/* Subtitle Row */}
              <div className="text-center text-sm text-gray-600 font-sans">
                <p>Number of subjects currently registered.</p>
              </div>
            </div>

            {/* Available Chapters */}
            <div className="bg-gradient-to-r from-teal-200 to-teal-300 rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer shadow-lg" onClick={() => navigate("chapters")}>
              {/* Title Row */}
              <div className="text-center mb-2">
                <h3 className="font-bold text-gray-800 text-xl font-serif">
                  Available Chapters
                </h3>
              </div>

              {/* Icon and Count Row */}
              <div className="flex justify-center items-center gap-3 mb-3">
                <div className="bg-white text-teal-600 p-3 rounded-full shadow-md">
                  <FileText className="text-3xl" />
                </div>
                <p className="text-3xl font-extrabold text-gray-800 rounded-lg py-1">
                  {dashboard.totalChaptersCount}
                </p>
              </div>

              {/* Subtitle Row */}
              <div className="text-center text-sm text-gray-600 font-sans">
                <p>Number of chapters currently available.</p>
              </div>
            </div>

            {/* Available Assignments */}
            <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer shadow-lg"          onClick={() => navigate("chapters/assignments")}>
              {/* Title Row */}
              <div className="text-center mb-2">
                <h3 className="font-bold text-gray-800 text-xl font-serif">
                  Available Assignments
                </h3>
              </div>

              {/* Icon and Count Row */}
              <div className="flex justify-center items-center gap-3 mb-3">
                <div className="bg-white text-yellow-600 p-3 rounded-full shadow-md">
                  <Layers className="text-3xl" />
                </div>
                <p className="text-3xl font-extrabold text-gray-800 rounded-lg py-1">
                  {dashboard.totalAssignmentsCount}
                </p>
              </div>

              {/* Subtitle Row */}
              <div className="text-center text-sm text-gray-600 font-sans">
                <p>Number of assignments available for completion.</p>
              </div>
            </div>

            {/* Available Classes */}
            <div className="bg-gradient-to-r from-red-200 to-red-300 rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer shadow-lg" onClick={()=>navigate('cls')}>
              {/* Title Row */}
              <div className="text-center mb-2">
                <h3 className="font-bold text-gray-800 text-xl font-serif">
                  Available Classes
                </h3>
              </div>

              {/* Icon and Count Row */}
              <div className="flex justify-center items-center gap-3 mb-3">
                <div className="bg-white text-indigo-600 p-3 rounded-full shadow-md">
                  <Users className="text-3xl" />
                </div>
                <p className="text-3xl font-extrabold text-gray-800 rounded-lg py-1">
                  {dashboard.totalClassesCount}
                </p>
              </div>

              {/* Subtitle Row */}
              <div className="text-center text-sm text-gray-600 font-sans">
                <p>Number of classes available for enrollment.</p>
              </div>
            </div>

            {/* Available Curriculums */}
            <div className="bg-gradient-to-r from-pink-200 to-pink-300 rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer shadow-lg" onClick={()=>navigate('chapterCurrs')}>
              {/* Title Row */}
              <div className="text-center mb-2">
                <h3 className="font-bold text-gray-800 text-xl font-serif">
                  Available Curriculums
                </h3>
              </div>

              {/* Icon and Count Row */}
              <div className="flex justify-center items-center gap-3 mb-3">
                <div className="bg-white text-pink-600 p-3 rounded-full shadow-md">
                  <Users className="text-3xl" />
                </div>
                <p className="text-3xl font-extrabold text-gray-800 rounded-lg py-1">
                  {dashboard.totalCurriculumsCount}
                </p>
              </div>

              {/* Subtitle Row */}
              <div className="text-center text-sm text-gray-600 font-sans">
                <p>Number of curriculums currently available.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className=" rounded-lg p-6 shadow-sm">
              <HollowPieChart classes={classes} />
            </div>
            <TeacherSubjectLimits />
            <div className="rounded-lg p-6 shadow-sm">
              <p className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-500 to-purple-300 text-white p-2 rounded-md shadow-md font-serif">
                Recently Added Assignments
              </p>
              {dashboard?.recentAssignments?.map((assignment) => (
                <div
                  key={assignment._id}
                  className="flex flex-col py-2 border-b border-gray-200"
                >
                  <p className="text-gray-700 font-semibold text-lg">
                    {assignment?.title}
                  </p>
                  <p className="text-gray-900 font-bold text-sm">
                    {assignment.subjectId.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {assignment?.chapterId?.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-lg p-6 shadow-sm">
              <p className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-500 to-purple-300 text-white p-2 rounded-md shadow-md font-serif">
                Recently Added Curriculums
              </p>
              {dashboard?.recentChapterCurriculums?.map((curriculum) => (
                <div
                  key={curriculum._id}
                  className="flex flex-col py-2 border-b border-gray-200"
                >
                  <p className="text-gray-700 font-semibold text-lg">
                    {curriculum?.title}
                  </p>
                  <p className="text-gray-900 font-bold text-sm">
                    {curriculum.subjectId.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {curriculum.chapterId.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
