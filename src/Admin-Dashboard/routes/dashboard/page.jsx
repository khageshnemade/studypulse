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
import { Home } from "lucide-react";
import { makeRequest } from "../../../axios";

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

export default function AdminDashboard() {
  const teacherData = useSelector((state) => state?.teachers?.teachersData);
  const studentsData = useSelector((state) => state?.students?.studentsData);
  const classDta = useSelector((state) => state.class.classData);
const[dashboard,setData] = useState({})
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClassses] = useState([]);

  useEffect(() => {
    setTeachers(teacherData);
    setStudents(studentsData);
    setClassses(classDta);
    fetchData();
    fetchDashboardData()
    console.log("Classes: ", classes.length);
  }, []);

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

  const dataTeacher = {
    labels: ["Math", "Science", "History", "English", "Art"],
    datasets: [
      {
        label: "Active Teachers",
        data: [30, 40, 25, 50, 15],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Inactive Teachers",
        data: [10, 5, 20, 5, 10],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const optionsTeacher = {
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

  const fetchDashboardData=async()=>{
    const res=await makeRequest.get('admin/get-dashboard-details')
    console.log("Dashboard Data: ", res?.data.data);
    setData(res?.data.data)
    res&&console.log("Dashboard Data: ",dashboard);

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
              value={selectedClassIndex || ''}
              onChange={handleClassChange}
              className="w-full p-1 border rounded-lg focus:ring focus:ring-blue-300"
            ><option value={''}>Select ClassName</option>
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
              value={selectedSubjectIndex || ''}
              onChange={handleSubjectChange}
              className="w-full p-1 border rounded-lg focus:ring focus:ring-blue-300"
            ><option value="">Select Subject</option>
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
              <Pie className="w-full min-h-full" data={getPieChartData(selectedSubject)} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 to-purple-600 min-h-screen py-8 px-4">
      {/* Page Title */}
      <p className="text-center text-4xl font-semibold items-center bg-purple-200 p-3 rounded-2xl flex w-4/6 justify-center mx-auto text-gray-700 m-3">
    <Home className="text-2xl min-w-8 min-h-8 mr-3 animate-bounce " /> {/* Lucid Icon with Bounce Animation */}
    Admin Dashboard
  </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {[
          { title: "Teachers Registered", count: dashboard.totalTeachersCount, color: "bg-gradient-to-r from-blue-500 to-blue-700", icon: "fas fa-user" },
          { title: "Students Registered", count: dashboard.totalStudentCount, color: "bg-gradient-to-r from-green-500 to-green-700", icon: "fas fa-users" },
          { title: "Classes Created", count: dashboard.totalClassCount, color: "bg-gradient-to-r from-yellow-500 to-yellow-700", icon: "fas fa-school" },
        ].map(({ title, count, color, icon }, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center items-center mb-6">
              <div className={`${color} p-4 rounded-full`}>
                <i className={`${icon} text-3xl text-white`} />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-4xl font-bold text-gray-900 mt-4">{count}</p>
          </div>
        ))}
      </div>




      {/* Comments Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 mt-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
        <h2 className="text-xl font-semibold text-gray-800">Comments Received</h2>
        <p className="text-4xl font-bold text-gray-900 mb-3">{67}</p>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Active vs Inactive Students</h2>
          <BarChart data={dataStudent} options={optionsStudent} />
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Active vs Inactive Teachers</h2>
          <BarChart data={dataTeacher} options={optionsTeacher} />
        </div>
      </div>

      {/* Recently Added Teachers & Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {[{ title: "Recently Added Teachers", data: dashboard.recentlyAddedTeachers }, { title: "Recently Added Students", data: dashboard.recentlyAddedStudents }]?.map(
          ({ title, data }, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
              {data?.map((person) => (
                <div key={person._id || person.id} className="flex items-center p-3 border-b last:border-b-0">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4">
                    <img src={""} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <p className="text-gray-800 text-sm">{person.firstName+' '+person.lastName}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      {/* Student Pass/Fail Stats */}
      <div className="bg-white shadow-lg rounded-xl p-6 mt-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Student Pass/Fail Stats</h2>
        <p className="text-gray-600 text-center mt-2 mb-4">Visualization of Passed vs Failed Students</p>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md flex justify-center">
          <Pie style={{
            minHeight: '250px',
          }} data={data} />
        </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 mt-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
        <Dashboard /></div>
        <ToastContainer/>
         </div>
    



    </div>
  );


}
