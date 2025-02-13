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
import { makeRequest } from "../../../axios";
import { BookOpen, FileText, Layers } from "lucide-react";

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
  const [dashboard, setData] = useState({});
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const res = await makeRequest.get("admin/get-dashboard-details");
    const data = res?.data?.data?.passFailedStudents || {};

    // Process the data
    setLabels(Object.keys(data));
    setDataset(Object.values(data));
    setData(res?.data?.data || {});
  };

  const PieChart = ({ labels, datasets }) => {
    const passedData = datasets.map(item => item.passed);
    const failedData = datasets.map(item => item.failed);

    const data = {
      labels,
      datasets: [
        {
          label: "Passed Students",
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: passedData,
        },
        {
          label: "Failed Students",
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          data: failedData,
        }
      ]
    };

    return (
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true }
          }
        }}
      />
    );
  };

  return (
    <div className="min-h-screen p-4">
      {/* Page Title */}
      {/* <p className="text-center text-2xl sm:text-3xl font-semibold bg-blue-400 p-4 rounded-2xl flex justify-center items-center mx-auto my-4 text-gray-700">
        <i className="text-xl sm:text-2xl h-8 sm:h-10 min-w-5 mr-4 animate-bounce fas fa-home" />
        Admin Dashboard
      </p> */}

   
   

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 p-8">
  <div className="bg-blue-100 shadow-lg rounded-lg p-6 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer outline outline-4 outline-gray-400">
    <div className="flex items-center gap-4">
      <div className="bg-blue-500 text-white p-4 rounded-full">
        <BookOpen className="text-2xl" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700">Teachers Registered</h3>
    </div>
    <p className="text-3xl font-bold text-blue-600 bg-white rounded-lg py-2 mt-2 text-center">{dashboard.totalTeachersCount}</p>
  </div>

  <div className="bg-green-100 shadow-lg rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer outline outline-4 outline-gray-400">
    <div className="flex items-center gap-4">
      <div className="bg-green-500 text-white p-4 rounded-full">
        <FileText className="text-2xl" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700">Students Registered</h3>
    </div>
    <p className="text-3xl font-bold text-green-600 bg-white rounded-lg py-2 mt-2 text-center">{dashboard.totalStudentCount}</p>
  </div>

  <div className="bg-yellow-100 shadow-lg rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer outline outline-4 outline-gray-400">
    <div className="flex items-center gap-4">
      <div className="bg-yellow-500 text-white p-4 rounded-full">
        <Layers className="text-2xl" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700">Classes Created</h3>
    </div>
    <p className="text-3xl font-bold text-yellow-600 bg-white rounded-lg py-2 mt-2 text-center">{dashboard.totalClassCount}</p>
  </div>

</div>


      {/* Recently Added Teachers & Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8 ">
        {[ 
          { title: "Recently Added Teachers", data: dashboard.recentlyAddedTeachers },
          { title: "Recently Added Students", data: dashboard.recentlyAddedStudents }
        ].map(({ title, data }, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-6 transform transition-transform duration-500 hover:scale-105 max-h-96 overflow-y-scroll outline outline-4 outline-gray-400">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 bg-slate-300 p-2">{title}</h2>
            <div className="space-y-4">
              {data?.map(person => (
                <div key={person._id || person.id} className="flex items-center p-4 border-b last:border-b-0 space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                    <img src={''} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-800">{person.firstName} {person.lastName}</p>
                    <p className="text-sm text-gray-500">{person.email}</p>
                    <p className="text-sm text-gray-500">{person.phoneNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
         <div className="bg-white shadow-lg rounded-xl p-6 duration-500 hover:scale-105 mb-8 outline outline-4 outline-gray-400">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Student Pass/Fail Stats</h2>
        <p className="text-gray-600 text-center mb-4">Visualization of Passed vs Failed Students</p>
        <div className="flex justify-center">
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
            <PieChart labels={labels} datasets={dataset} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

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

<div className="bg-white shadow-lg rounded-xl p-6 mt-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
<Dashboard />
</div>