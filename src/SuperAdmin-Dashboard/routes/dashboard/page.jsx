import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
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
import { data } from "autoprefixer";
import { ToastContainer } from "react-toastify";
import { User, Users, School, Book, Home } from "lucide-react";
import { makeRequest } from "../../../axios";
import StudentList from "./StudentList";
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

export default function SuperAdminDashboard() {
  const reduxState = useSelector((state) => state); // Get entire state

  const teacherData = useSelector((state) => state?.teachers?.teachersData);
  const studentsData = useSelector((state) => state?.students?.studentsData);
  const classDta = useSelector((state) => state.class.classData);
  const [dashboard, setData] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClassses] = useState([]);

  useEffect(() => {
    setTeachers(teacherData);
    setStudents(studentsData);
    setClassses(classDta);
    fetchData();
    fetchDashboardData();
    console.log("Hello");

    console.log("Redux State:", reduxState);
    console.log("Classes: ", classes.length);
  }, [reduxState]);

  const fetchData = async () => {
    setStudents([
      { id: 1, title: "Alice Johnson" },
      { id: 2, title: "Bob Martin" },
      { id: 3, title: "Charlie Wilson" },
      { id: 4, title: "David Lee" },
      { id: 5, title: "Eva Harris" },
    ]);
    setTeachers([
      { _id: 1, title: "Mr. John Doe" },
      { _id: 2, title: "Ms. Jane Smith" },
      { _id: 3, title: "Dr. Michael Brown" },
      { _id: 4, title: "Prof. Sarah Williams" },
      { _id: 5, title: "Mrs. Emily Davis" },
    ]);
  };

  const fetchDashboardData = async () => {
    const res = await makeRequest.get("admin/get-dashboard-details");
    console.log("Dashboard Data: ", res?.data.data);
    setData(res?.data.data);
    res && console.log("Dashboard Data: ", dashboard);
  };

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

    const getPieChartData = (subject) => {
      if (!subject) {
        // If subject is undefined or null, return a default value or handle the error
        return {
          labels: ["Passed", "Failed"],
          datasets: [
            {
              data: [0, 0], // Default data in case of missing subject
              backgroundColor: ["#4CAF50", "#F44336"],
            },
          ],
        };
      }

      // If subject is defined, proceed with the normal logic
      return {
        labels: ["Passed", "Failed"],
        datasets: [
          {
            data: [subject.passed, subject.failed],
            backgroundColor: ["#4CAF50", "#F44336"],
          },
        ],
      };
    };

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
    <div className="min-h-screen py-8 px-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 mb-6">
        {[
          {
            title: "Teachers Registered",
            count: 100, // Static count for teachers
            color: "bg-gradient-to-r from-blue-500 to-blue-700",
            icon: <Book className="text-2xl" />,
            description: "Number of teachers registered in the system.",
          },
          {
            title: "Admins Registered",
            count: 5, // Static count for admins
            color: "bg-gradient-to-r from-purple-500 to-purple-700",
            icon: <User className="text-2xl" />,
            description: "Number of admin accounts created.",
          },
          {
            title: "Students Registered",
            count: 500, // Static count for students
            color: "bg-gradient-to-r from-green-500 to-green-700",
            icon: <Users className="text-2xl" />,
            description: "Total number of students registered.",
          },
          {
            title: "Classes Created",
            count: 30, // Static count for classes
            color: "bg-gradient-to-r from-yellow-500 to-yellow-700",
            icon: <School className="text-2xl" />,
            description: "Number of classes currently created.",
          },
        ].map(({ title, count, color, icon, description }, index) => (
          <div
            key={index}
            className={`${color} rounded-2xl p-3 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer`}
          >
            {/* Title Row */}
            <div className="text-center mb-4">
              <h3 className="font-bold text-white font-serif">{title}</h3>
            </div>

            {/* Icon and Count Row */}
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="bg-white text-blue-600 p-4 rounded-full shadow-lg">
                {icon}
              </div>
              <p className="text-2xl font-extrabold text-white rounded-lg py-2">
                {count}
              </p>
            </div>

            {/* Subtitle Row */}
            <div className="text-center text-lg text-white font-sans">
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recently Added Teachers & Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
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
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-white p-2 rounded-md shadow-md font-serif">
              {title}
            </h2>

            <div className="space-y-4">
              {data?.map((person) => (
                <div
                  key={person._id || person.id}
                  className="flex items-center p-4 border-b last:border-b-0 space-x-4"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={""}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Student Pass/Fail Stats */}
        <div className="bg-white shadow-lg rounded-xl p-6 mt-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-white p-2 rounded-md shadow-md font-serif text-center">
            Student Pass/Fail Stats
          </h2>
          <p className="text-gray-600 text-center mt-2 mb-4">
            Visualization of Passed vs Failed Students
          </p>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex justify-center">
            <Pie
              style={{ minHeight: "250px" }}
              data={data} // Replace with static chart data
            />
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 mt-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          <Dashboard />
        </div>

        <StudentList />
        <ToastContainer />
      </div>
    </div>
  );
}
