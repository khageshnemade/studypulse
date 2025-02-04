import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import TeacherProfile from "../../../Pages/TeacherActivities/TeacherProfile1";
import { Home } from "lucide-react";

export default function TeacherDashboard() {
  const user = localStorage.getItem("user");
  const profileCompletion = JSON.parse(user)?.profileCompletion;
  const [assignments, setAssignments] = useState([])
  const [curriculums, setCurriculums] = useState([])
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement, Legend);
useEffect(() => {
  fetchData()
}, [])

  const fetchData = async () => {
    setAssignments([
      { id: 1, title: "Math Assignment 1" },
      { id: 2, title: "Science Project" },
      { id: 3, title: "History Research Paper" },
      { id: 4, title: "English Essay" },
      { id: 5, title: "Art Portfolio" },
    ])
    setCurriculums([
      { id: 1, title: "Math Curriculum" },
      { id: 2, title: "Science Curriculum" },
      { id: 3, title: "History Curriculum" },
      { id: 4, title: "English Curriculum" }])
  }

const PieChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Votes",
        data: [12, 19, 3, 5, 2, 3],
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
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      duration: 1500,
      easing: "easeInOutBounce",
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Pie Chart</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

const HollowPieChart = ({ classes }) => {
  const [selectedClass, setSelectedClass] = useState(classes[0]?.className); // Default to first class

  // Handle class selection
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  // Find the selected class from the classes array
  const selectedClassData = classes.find((classItem) => classItem.className === selectedClass);

  // Generate data for the Pie chart
  const pieData = {
    labels: selectedClassData?.subjects?.flatMap((subject) => subject.chapters.map((chapter) => Object.keys(chapter)[0])),
    datasets: [
      {
        label: "Chapters per Subject",
        data: selectedClassData?.subjects?.flatMap((subject) => subject.chapters.map((chapter) => Object.values(chapter)[0])),
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
    cutout: "70%", // Creates the hollow center effect
    plugins: {
      legend: {
        position: "top", // Position the legend at the top
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1500,
      easing: "easeInOutBounce",
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Chapters Distribution per Subject</h2>

      {/* Class Selection Dropdown */}
      <div className="mb-6 text-center">
        <label className="mr-2 text-lg font-semibold">Select Class: </label>
        <select
          className="border px-4 py-2 rounded"
          value={selectedClass}
          onChange={handleClassChange}
        >
          {classes.map((classItem, index) => (
            <option key={index} value={classItem.className}>
              {classItem.className}
            </option>
          ))}
        </select>
      </div>

      {/* Pie Chart for Selected Class */}
      <div className="flex justify-center min-h-80">
        <Doughnut style={
        {
          minHeight: '100%',
        }
        } data={pieData} options={options} />
      </div>
    </div>
  );
};

// Example usage with classes data:
const classes = [
  {
    className: "10th Grade",
    subjects: [
      {
        name: "10th Grade",
        chapters: [
          { Physics: 10 },
          { Chemistry: 11 },
          { Math: 21 },
          { Science: 23 },
        ],
      },
    ],
  },
  {
    className: "11th Grade",
    subjects: [
      {
        name: "11th Grade",
        chapters: [
          { Physics: 15 },
          { Chemistry: 19 },
          { Math: 22 },
          { Science: 23 },
        ],
      },
    ],
  },
];


return (
  <div className="bg-gradient-to-r from-blue-200 to-purple-600 min-h-screen py-8 px-4">
    {!profileCompletion && <TeacherProfile />}
    <p className="text-center text-4xl font-semibold bg-purple-200 p-3 rounded-2xl flex w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
  <Home className="text-2xl min-w-10 min-h-10 mr-4 animate-bounce" /> {/* Lucid Icon with Bounce Animation */}
  Teacher Dashboard
</p>
   

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
      {/* Subject Box */}
      <div className="bg-white shadow-xl rounded-lg p-6 flex items-center justify-between hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
        <div className="text-left">
          <h2 className="text-xl font-semibold text-gray-700">Subjects Available</h2>
          <p className="text-4xl font-bold text-gray-900">{67}</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-full">
          <i className="fas fa-book text-2xl"></i>
        </div>
      </div>

      {/* Chapter Available Box */}
      <div className="bg-white shadow-xl rounded-lg p-6 flex items-center justify-between hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
        <div className="text-left">
          <h2 className="text-xl font-semibold text-gray-700">Chapter Available</h2>
          <p className="text-4xl font-bold text-gray-900">{45}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-full">
          <i className="fas fa-chalkboard-teacher text-2xl"></i>
        </div>
      </div>

      {/* Assignment Count Box */}
      <div className="bg-white shadow-xl rounded-lg p-6 flex items-center justify-between hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
        <div className="text-left">
          <h2 className="text-xl font-semibold text-gray-700">Assignment Count</h2>
          <p className="text-4xl font-bold text-gray-900">{56}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-full">
          <i className="fas fa-pencil-alt text-2xl"></i>
        </div>
      </div>

      {/* Chapter Curriculum Box */}
      <div className="bg-white shadow-xl rounded-lg p-6 flex items-center justify-between hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
        <div className="text-left">
          <h2 className="text-xl font-semibold text-gray-700">Chapter Curriculum Count</h2>
          <p className="text-4xl font-bold text-gray-900">{45}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-full">
          <i className="fas fa-book-open text-2xl"></i>
        </div>
      </div>

      {/* Total Classes Box */}
      <div className="bg-white shadow-xl rounded-lg p-6 flex items-center justify-between hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
        <div className="text-left">
          <h2 className="text-xl font-semibold text-gray-700">Total Classes</h2>
          <p className="text-4xl font-bold text-gray-900">{45}</p>
        </div>
        <div className="bg-teal-500 text-white p-4 rounded-full">
          <i className="fas fa-chalkboard text-2xl"></i>
        </div>
      </div>
    </div>

    {/* Charts Section */}
    <div className="shadow-xl rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-4">
      {/* HollowPieChart */}
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
        <HollowPieChart classes={classes} />
      </div>

      {/* Recently Added Assignments */}
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
        <p className="font-semibold text-xl text-gray-800">Recently Added Assignments</p>
        {assignments.map((assignment) => (
          <div key={assignment.id} className="flex items-center p-2 border-b border-gray-200">
            <div className="w-10 h-10 rounded-full bg-blue-500 mr-4"></div>
            <p className="text-gray-700">{assignment.title}</p>
          </div>
        ))}
      </div>

      {/* Recently Added Curriculums */}
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
        <p className="font-semibold text-xl text-gray-800">Recently Added Curriculums</p>
        {curriculums.map((curriculum) => (
          <div key={curriculum.id} className="flex items-center p-2 border-b border-gray-200">
            <div className="w-10 h-10 rounded-full bg-green-500 mr-4"></div>
            <p className="text-gray-700">{curriculum.title}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
