import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BookOpen, FileText, Home, Layers, Users } from "lucide-react";
import { ToastContainer } from "react-toastify";
import TeacherProfile from "../../../Pages/TeacherActivities/TeacherProfile1";
import { makeRequest } from "../../../axios";
import TeacherSubjectLimits from "../../../Pages/TeacherActivities/TeacherSubjectLimits";

// Registering necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TeacherDashboard() {
  const iassignments = [
    { id: 1, title: "Math Assignment - Algebra" },
    { id: 2, title: "Science Assignment - Physics" },
    { id: 3, title: "History Assignment - Ancient Civilizations" },
  ];

  const icurriculums = [
    { id: 1, title: "Math Curriculum - Algebra 101" },
    { id: 2, title: "Science Curriculum - Basic Physics" },
    { id: 3, title: "History Curriculum - World War II" },
  ];
  const user = localStorage.getItem("user");
  const profileCompletion = JSON.parse(user)?.profileCompletion;
  const [dashboard, setData] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [curriculums, setCurriculums] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await makeRequest.get("/teacher/get-dashboard-details");
      setData(res?.data?.data || {});
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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
    const [selectedClass, setSelectedClass] = useState(classes[0]?.className || "");
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
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-red-500 to-red-300 text-white p-2 rounded-md font-serif text-center">Chapters Distribution</h2>
        <select
          className="border px-3 py-2 mb-4 rounded w-full sm:w-2/3 mx-auto"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
  
  {/* Available Subjects */}
  <div className="bg-red-500 rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer">
    {/* Title Row */}
    <div className="text-center mb-2">
      <h3 className="font-bold text-white text-xl font-serif">Available Subjects</h3>
    </div>

    {/* Icon and Count Row */}
    <div className="flex justify-center items-center gap-3 mb-3">
      <div className="bg-white text-blue-600 p-3 rounded-full shadow-lg">
        <BookOpen className="text-3xl" />
      </div>
      <p className="text-3xl font-extrabold text-white rounded-lg py-1">
        {dashboard.totalSubjectsCount}
      </p>
    </div>

    {/* Subtitle Row */}
    <div className="text-center text-sm text-white font-sans">
      <p>Number of subjects currently registered.</p>
    </div>
  </div>

  {/* Available Chapters */}
  <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer">
    {/* Title Row */}
    <div className="text-center mb-2">
      <h3 className="font-bold text-white text-xl font-serif">Available Chapters</h3>
    </div>

    {/* Icon and Count Row */}
    <div className="flex justify-center items-center gap-3 mb-3">
      <div className="bg-white text-green-700 p-3 rounded-full shadow-lg">
        <FileText className="text-3xl" />
      </div>
      <p className="text-3xl font-extrabold text-white rounded-lg py-1">
        {dashboard.totalChaptersCount}
      </p>
    </div>

    {/* Subtitle Row */}
    <div className="text-center text-sm text-white font-sans">
      <p>Number of chapters currently available.</p>
    </div>
  </div>

  {/* Available Assignments */}
  <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer">
    {/* Title Row */}
    <div className="text-center mb-2">
      <h3 className="font-bold text-white text-xl font-serif">Available Assignments</h3>
    </div>

    {/* Icon and Count Row */}
    <div className="flex justify-center items-center gap-3 mb-3">
      <div className="bg-white text-yellow-700 p-3 rounded-full shadow-lg">
        <Layers className="text-3xl" />
      </div>
      <p className="text-3xl font-extrabold text-white rounded-lg py-1">
        {dashboard.totalAssignmentsCount}
      </p>
    </div>

    {/* Subtitle Row */}
    <div className="text-center text-sm text-white font-sans">
      <p>Number of assignments available for completion.</p>
    </div>
  </div>

  {/* Available Classes */}
  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer">
    {/* Title Row */}
    <div className="text-center mb-2">
      <h3 className="font-bold text-white text-xl font-serif">Available Classes</h3>
    </div>

    {/* Icon and Count Row */}
    <div className="flex justify-center items-center gap-3 mb-3">
      <div className="bg-white text-purple-700 p-3 rounded-full shadow-lg">
        <Users className="text-3xl" />
      </div>
      <p className="text-3xl font-extrabold text-white rounded-lg py-1">
        {dashboard.totalClassesCount}
      </p>
    </div>

    {/* Subtitle Row */}
    <div className="text-center text-sm text-white font-sans">
      <p>Number of classes available for enrollment.</p>
    </div>
  </div>

  {/* Available Curriculums */}
  <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer">
    {/* Title Row */}
    <div className="text-center mb-2">
      <h3 className="font-bold text-white text-xl font-serif">Available Curriculums</h3>
    </div>

    {/* Icon and Count Row */}
    <div className="flex justify-center items-center gap-3 mb-3">
      <div className="bg-white text-red-700 p-3 rounded-full shadow-lg">
        <Users className="text-3xl" />
      </div>
      <p className="text-3xl font-extrabold text-white rounded-lg py-1">
        {dashboard.totalCurriculumsCount}
      </p>
    </div>

    {/* Subtitle Row */}
    <div className="text-center text-sm text-white font-sans">
      <p>Number of curriculums currently available.</p>
    </div>
  </div>

</div>







          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className=" rounded-lg p-6 shadow-sm">
              <HollowPieChart classes={classes} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
              <div className="rounded-lg p-6 shadow-sm">
              <p className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-500 to-purple-300 text-white p-2 rounded-md shadow-md font-serif">Recently Added Assignments</p>
                {iassignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center py-2 border-b border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-blue-500 mr-4" />
                    <p className="text-gray-700">{assignment.title}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg p-6 shadow-sm">
              <p className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-500 to-purple-300 text-white p-2 rounded-md shadow-md font-serif">Recently Added Curriculums</p>
                {icurriculums.map((curriculum) => (
                  <div key={curriculum.id} className="flex items-center py-2 border-b border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-green-500 mr-4" />
                    <p className="text-gray-700">{curriculum.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <TeacherSubjectLimits/>
    </div>
  );
}


