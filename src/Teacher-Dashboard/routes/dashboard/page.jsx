import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BookOpen, FileText, Home, Layers, Users } from "lucide-react";
import { ToastContainer } from "react-toastify";
import TeacherProfile from "../../../Pages/TeacherActivities/TeacherProfile1";
import { makeRequest } from "../../../axios";

// Registering necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TeacherDashboard() {
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
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Chapters Distribution</h2>
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
           {/* <p className="text-center text-2xl sm:text-3xl font-semibold bg-blue-400 p-4 rounded-2xl flex justify-center items-center mx-auto my-4 text-gray-700">
        <i className="text-xl sm:text-2xl h-8 sm:h-10 min-w-5 mr-4 animate-bounce fas fa-home" />
        Teacher Dashboard
      </p> */}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Subjects Available', count: dashboard.totalSubjectsCount, bg: 'bg-blue-500', icon: <BookOpen className="text-2xl" /> },
          { label: 'Chapters Available', count: dashboard.totalChaptersCount, bg: 'bg-green-500', icon: <FileText className="text-2xl" /> },
          { label: 'Assignments', count: dashboard.totalAssignmentsCount, bg: 'bg-yellow-500', icon: <Layers className="text-2xl" /> },
          { label: 'Curriculums', count: dashboard.totalCurriculumsCount, bg: 'bg-orange-500', icon: <FileText className="text-2xl" /> },
          { label: 'Classes', count: dashboard.totalClassesCount, bg: 'bg-teal-500', icon: <Users className="text-2xl" /> },
        ].map(({ label, count, bg, icon }, index) => (
          <div
            key={index}
            className={`bg-white shadow-xl rounded-lg p-6 flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer`}
          >
            <div>
              <h3 className="text-lg font-semibold">{label}</h3>
              <p className="text-2xl font-bold">{count}</p>
            </div>
            <div className={`${bg} text-white p-4 rounded-full`}>
              {icon}
            </div>
          </div>
        ))}
      </div> */}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
  <div className="bg-blue-400 shadow-xl rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer outline outline-2 outline-gray-300">
    <div className="flex flex-col items-center gap-4 mb-4">
      <div className="bg-white text-blue-600 p-3 rounded-full shadow-md">
        <BookOpen className="text-3xl" />
      </div>
      <h3 className="text-xl font-semibold text-center text-white">Available Subjects</h3>
    </div>
    <p className="text-3xl sm:text-4xl font-bold text-white bg-blue-600 rounded-lg py-3 text-center">{dashboard.totalSubjectsCount}</p>
  </div>


    <div className="bg-green-400 shadow-xl rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer outline outline-2 outline-gray-300">
      <div className="flex flex-col items-center gap-4 mb-4">
        <div className="bg-white text-green-600 p-3 rounded-full shadow-md">
          <FileText className="text-3xl" />
        </div>
        <h3 className="text-xl text-center font-semibold text-white">Available Chapters</h3>
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-white bg-green-600 rounded-lg py-3 text-center">{dashboard.totalChaptersCount}</p>
    </div>

    <div className="bg-yellow-400  shadow-xl rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer outline outline-2 outline-gray-300">
      <div className="flex flex-col items-center gap-4 mb-4">
        <div className="bg-white text-yellow-600 p-3 rounded-full shadow-md">
          <Layers className="text-3xl" />
        </div>
        <h3 className="text-xl text-center font-semibold text-white">Available Assignments</h3>
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-white bg-yellow-600 rounded-lg py-3 text-center">{dashboard.totalAssignmentsCount}</p>
    </div>

    <div className="bg-purple-400 shadow-xl rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer outline outline-2 outline-gray-300">
      <div className="flex flex-col items-center gap-4 mb-4">
        <div className="bg-white text-purple-600 p-3 rounded-full shadow-md">
          <Users className="text-3xl" />
        </div>
        <h3 className="text-xl text-center font-semibold text-white">Available Classes</h3>
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-white bg-purple-600 rounded-lg py-3 text-center">{dashboard.totalClassesCount}</p>
    </div>

    <div className="bg-red-400 shadow-xl rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer outline outline-2 outline-gray-300">
      <div className="flex flex-col items-center gap-4 mb-4">
        <div className="bg-white text-red-600 p-3 rounded-full shadow-md">
          <Users className="text-3xl" />
        </div>
        <h3 className="text-xl text-center font-semibold text-white">Available Curriculums</h3>
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-white bg-red-600 rounded-lg py-3 text-center">{dashboard.totalCurriculumsCount}</p>
    </div>
  </div>



          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ">
            <div className="bg-white shadow-lg rounded-lg p-6 outline outline-3 outline-gray-400">
              <HollowPieChart classes={classes} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
              <div className="bg-white shadow-lg rounded-lg p-6 outline outline-3 outline-gray-400">
                <p className="font-semibold text-xl">Recently Added Assignments</p>
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center py-2 border-b border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-blue-500 mr-4" />
                    <p className="text-gray-700">{assignment.title}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6 outline outline-3 outline-gray-400">
                <p className="font-semibold text-xl">Recently Added Curriculums</p>
                {curriculums.map((curriculum) => (
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

    </div>
  );
}


const BarChart = ({ data, options }) => (
  <div className="p-4 bg-white shadow-lg rounded-lg !min-h-48">
    <Bar data={data} options={options} />
  </div>
);
const data = {
  labels: ["Class1", "Class2", "Class3", "Class4", "Class5", "Class6"],
  datasets: [
    {
      label: "Passed Students",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
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
    },
    {
      label: "Failed Students",
      data: [10, 20, 12, 12, 32, 12],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
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
    },
  ],
};