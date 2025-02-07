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
  ArcElement,
} from "chart.js";
import TeacherProfile from "../../../Pages/TeacherActivities/TeacherProfile1";
import { Home } from "lucide-react";
import { ToastContainer } from "react-toastify";

export default function TeacherDashboard() {
  const user = localStorage.getItem("user");
  const profileCompletion = JSON.parse(user)?.profileCompletion;
  const [assignments, setAssignments] = useState([]);
  const [curriculums, setCurriculums] = useState([]);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    ArcElement,
    Legend
  );
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setAssignments([
      { id: 1, title: "Math Assignment 1" },
      { id: 2, title: "Science Project" },
      { id: 3, title: "History Research Paper" },
      { id: 4, title: "English Essay" },
      { id: 5, title: "Art Portfolio" },
    ]);
    setCurriculums([
      { id: 1, title: "Math Curriculum" },
      { id: 2, title: "Science Curriculum" },
      { id: 3, title: "History Curriculum" },
      { id: 4, title: "English Curriculum" },
    ]);
  };

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
    const selectedClassData = classes.find(
      (classItem) => classItem.className === selectedClass
    );

    // Generate data for the Pie chart
    const pieData = {
      labels: selectedClassData?.subjects?.flatMap((subject) =>
        subject.chapters.map((chapter) => Object.keys(chapter)[0])
      ),
      datasets: [
        {
          label: "Chapters per Subject",
          data: selectedClassData?.subjects?.flatMap((subject) =>
            subject.chapters.map((chapter) => Object.values(chapter)[0])
          ),
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
        <h2 className="text-2xl font-bold text-center mb-4">
          Chapters Distribution per Subject
        </h2>

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
          <Doughnut
            style={{
              minHeight: "100%",
            }}
            data={pieData}
            options={options}
          />
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
  const dataStudent = {
    labels: ["Math", "Science", "History", "English", "Art"],
    datasets: [
      {
        label: "Active Students",
        data: [30, 40, 25, 50, 15],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Inactive Students",
        data: [10, 5, 20, 5, 10],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  const optionsStudent = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14 },
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "#f9f9f9",
        titleColor: "#333",
        bodyColor: "#555",
        borderColor: "#ddd",
        borderWidth: 1,
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
  const Dashboard = () => {
    const classes = [
      {
        className: "Class 1",
        subjects: [
          { name: "Math", passed: 40, failed: 10 },
          { name: "Science", passed: 35, failed: 15 },
          { name: "English", passed: 38, failed: 12 },
        ],
      },
      {
        className: "Class 2",
        subjects: [
          { name: "Math", passed: 50, failed: 5 },
          { name: "Science", passed: 48, failed: 7 },
          { name: "English", passed: 45, failed: 10 },
        ],
      },
    ];

    const [selectedClassIndex, setSelectedClassIndex] = useState(0);
    const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);

    const getPieChartData = (subject) => ({
      labels: ["Passed", "Failed"],
      datasets: [
        {
          data: [subject.passed, subject.failed],
          backgroundColor: ["#4CAF50", "#F44336"],
        },
      ],
    });

    const handleClassChange = (event) => {
      setSelectedClassIndex(event.target.value);
      setSelectedSubjectIndex(0);
    };

    const handleSubjectChange = (event) => {
      setSelectedSubjectIndex(event.target.value);
    };

    const selectedClass = classes[selectedClassIndex];
    const selectedSubject = selectedClass.subjects[selectedSubjectIndex];

    return (
      <div className="min-h-screen bg-white flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Class Performance
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <select
              id="classSelector"
              value={selectedClassIndex || ""}
              onChange={handleClassChange}
              className="w-full p-1 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value={""}>Select ClassName</option>
              {classes?.map((classData, index) => (
                <option key={index} value={index}>
                  {classData.className}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              id="subjectSelector"
              value={selectedSubjectIndex || ""}
              onChange={handleSubjectChange}
              className="w-full p-1 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="">Select Subject</option>
              {selectedClass?.subjects?.map((subject, index) => (
                <option key={index} value={index}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-gray-50 w-full p-6 rounded-lg shadow-md flex justify-center">
          <div className="text-center">
            <div className="flex justify-center">
              <Pie
                className="w-full min-h-full"
                data={getPieChartData(selectedSubject)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="bg-blue-200 min-h-screen py-8 px-4">
      {/* Profile and Header */}
      {!profileCompletion ? (
        <TeacherProfile />
      ) : (
        <>
          <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
            <Home className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
            Teacher Dashboard
          </p>

          {/* Stats Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                label: "Subjects Available",
                count: 67,
                icon: "fa-book",
                bg: "bg-blue-500",
              },
              {
                label: "Chapter Available",
                count: 45,
                icon: "fa-chalkboard-teacher",
                bg: "bg-green-500",
              },
              {
                label: "Assignment Count",
                count: 56,
                icon: "fa-pencil-alt",
                bg: "bg-yellow-500",
              },
              {
                label: "Chapter Curriculum Count",
                count: 45,
                icon: "fa-book-open",
                bg: "-500",
              },
              {
                label: "Total Classes",
                count: 45,
                icon: "fa-chalkboard",
                bg: "bg-teal-500",
              },
            ].map(({ label, count, icon, bg }, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg p-6 flex items-center justify-between hover:scale-105 transition-all"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">
                    {label}
                  </h2>
                  <p className="text-4xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`${bg} text-white p-4 rounded-full`}>
                  <i className={`fas ${icon} text-2xl`} />
                </div>
              </div>
            ))}
          </div>

          {/* Comments Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 mb-8 hover:scale-105 transition-all">
            <h2 className="text-xl font-semibold text-gray-800">
              Comments Received
            </h2>
            <p className="text-4xl font-bold text-gray-900 mb-3">67</p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-all">
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                Active vs Inactive Students
              </h2>
              <BarChart data={dataStudent} options={optionsStudent} />
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-all">
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                Student Pass/Fail Stats
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md flex justify-center">
                <Pie style={{ minHeight: "100%" }} data={data} />
              </div>
            </div>
          </div>

          {/* Recently Added Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-all">
              <HollowPieChart classes={classes} />
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-all">
              <p className="font-semibold text-xl text-gray-800">
                Recently Added Assignments
              </p>
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center p-2 border-b border-gray-200"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500 mr-4" />
                  <p className="text-gray-700">{assignment.title}</p>
                </div>
              ))}
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-all">
              <p className="font-semibold text-xl text-gray-800">
                Recently Added Curriculums
              </p>
              {curriculums.map((curriculum) => (
                <div
                  key={curriculum.id}
                  className="flex items-center p-2 border-b border-gray-200"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500 mr-4" />
                  <p className="text-gray-700">{curriculum.title}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
}
