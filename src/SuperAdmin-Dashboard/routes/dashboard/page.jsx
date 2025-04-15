import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuperAdminDetails } from "../../../redux/features/superAdminSlice";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { toast, ToastContainer } from "react-toastify";
import { User, Users, School, Book, Home } from "lucide-react";
import { makeRequest } from "../../../axios";
import StudentList from "./StudentList";
const DashboardChart = ({ classPerformance, setIds }) => {
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [classes, setClasses] = useState([]);
  const [cities, setCities] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [talukaId, settalukaId] = useState("");
  const [cityId, setCityId] = useState("");
  const [orgId, setOrgId] = useState("");
  const dispatch = useDispatch();
  console.log("Received in chart:", classPerformance); // Try this
  const idsFromRedux = useSelector((state) => state.superAdmin.superAdminDetails);
  
useEffect(() => {
 if(idsFromRedux){
  setDistrictId(idsFromRedux.districtId)
 settalukaId(idsFromRedux.talukaId)
 setCityId(idsFromRedux.cityId)
 setOrgId(idsFromRedux.orgId)
 setSelectedClassId(idsFromRedux.classId)
 setSelectedClass(idsFromRedux.class)
 }
}, [idsFromRedux])

  useEffect(() => {
    if (districtId) fetchTalukas();
  }, [districtId]);
  useEffect(() => {
    if (talukaId) fetchCities();
  }, [talukaId]);
  useEffect(() => {
    if (cityId) fetchOrgs();
  }, [cityId]);
  useEffect(() => {
    if (orgId) fetchClasses();
    setIds((prev) => ({
      ...prev,
      orgId: orgId,
    }));
  }, [orgId]);
  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("/districts");
      setDistricts(res?.data?.data);
    } catch (error) {
      console.error("Error fetching District:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get(
        `/get-cities-by-district-id-and-taluka-id?districtId=${districtId}&talukaId=${talukaId}`
      );
      setCities(res?.data?.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchTalukas = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get(
        `/get-taluka-by-district-id?districtId=${districtId}`
      );
      setTalukas(res?.data?.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchClasses = async () => {
    try {
      const res = await makeRequest.get(
        `/get-classes-by-org-id?organizationId=${orgId}`
      );
      setClasses(res?.data?.data || []);
    } catch (error) {
      toast.error(
        "Error fetching classes:",
        error.response?.data || error.message
      );
    }
  };
  const fetchOrgs = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get(
        `/get-org-by-district-taluka-city-id?talukaId=${talukaId}&cityId=${cityId}&districtId=${districtId}`
      );
      setOrgs(res?.data?.data);
      console.log("Organizations", res?.data?.data);
    } catch (error) {
      setOrgs([]);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const classKeys = Object.keys(classPerformance || {});
  const [selectedClassId, setSelectedClassId] = useState("");

  // State to store selected class name (for display)
  const [selectedClass, setSelectedClass] = useState("");
  const stats = classPerformance?.[selectedClass];
  console.log("selected class",selectedClass);
console.log("Stats",stats);
  const chartData = {
    labels: ["Passed", "Failed"],
    datasets: [
      {
        data: stats ? [stats.passed, stats.failed] : [0, 0],
        backgroundColor: ["#4ade80", "#f87171"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 transform transition-transform duration-300 hover:scale-105 max-h-[800px] overflow-y-auto text-center">
      <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-white p-2 rounded-md w-full text-center font-serif">
        {selectedClass} Class Performance
      </h2>

      {/* Dropdown */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
        <select
          name="district"
          id="district"
          value={districtId}
          onChange={(e) => {
            dispatch(setSuperAdminDetails({ districtId: e.target.value }));
            setDistrictId(e.target.value);
          }}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select District</option>
          {districts.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>

        <select
          name="talukas"
          id="talukas"
          value={talukaId}
          onChange={(e) => {
            dispatch(setSuperAdminDetails({ talukaId: e.target.value }));
            settalukaId(e.target.value);
          }}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Taluka</option>
          {talukas.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>

        <select
          name="city"
          value={cityId}
          onChange={(e) => {
            dispatch(setSuperAdminDetails({ cityId: e.target.value }));
            setCityId(e.target.value);
          }}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select City</option>
          {cities.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>

        <select
          name="org"
          value={orgId}
          onChange={(e) => {
            dispatch(setSuperAdminDetails({ orgId: e.target.value }));
            setOrgId(e.target.value);
          }}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Organization</option>
          {orgs.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>

        <select
          id="classSelect"
          value={selectedClassId}
          onChange={(e) => {
            const selectedId = e.target.value;
            dispatch(setSuperAdminDetails({ classId: e.target.value }));
            const selectedClassObj = classes.find(
              (cls) => cls._id === selectedId
            );

            setSelectedClassId(selectedId); // control the select by ID
            setSelectedClass(selectedClassObj?.name || ""); 
            dispatch(setSuperAdminDetails({ class: selectedClassObj?.name }));
            setIds((prev) => ({
              ...prev,
              classId: selectedId,
            }));
          }}
          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="w-full text-center">
        <div className="w-80 h-80 mx-auto">
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default function SuperAdminDashboard() {
  const [ids, setIds] = useState({ orgId: "", classId: "" });
  const [dashboard, setData] = useState([]);
  const [classPerformance, setClassPerformance] = useState({});

  useEffect(() => {
    fetchDashboardData();
    getClassPerformance();
  }, [ids]);
  useEffect(() => {
    console.log("Class Performance", classPerformance.passFailedStudents);
  }, [classPerformance]);

  const fetchDashboardData = async () => {
    try {
      const res = await makeRequest.get("superAdmin/get-dashboard-details");
      setData(res?.data.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Failed to load dashboard data. Please try again.");
    }
  };

  const getClassPerformance = async () => {
    try {
      const res = await makeRequest.get(
        `superAdmin/get-dashboard-class-performance?organizationID=${ids.orgId}&classId=${ids.classId}`
      );
      console.log("Setting classPerformance:", res.data);
      setClassPerformance(res?.data?.data); // Expect this to have .passFailedStudents
    } catch (error) {
      console.error("Failed to fetch class performance:", error);
      toast.error("Failed to load class performance data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Teachers Registered",
            activeCount: dashboard.totalActiveTeachersCount,
            inactiveCount: dashboard.totalInActiveTeachersCount,
            color: "bg-gradient-to-r from-blue-500 to-blue-700",
            icon: <Book className="text-2xl" />,
            description: "Number of teachers registered in the system.",
          },
          {
            title: "Admins Registered",
            activeCount: dashboard.totalActiveOrgCount,
            inactiveCount: dashboard.totalInActiveOrgCount,
            color: "bg-gradient-to-r from-purple-500 to-purple-700",
            icon: <User className="text-2xl" />,
            description: "Number of Organizations and Admins.",
          },
          {
            title: "Students Registered",
            activeCount: dashboard.totalActiveStudentsCount,
            inactiveCount: dashboard.totalInActiveStudentsCount,
            color: "bg-gradient-to-r from-green-500 to-green-700",
            icon: <Users className="text-2xl" />,
            description: "Total number of students registered.",
          },
          {
            title: "Classes Created",
            count: dashboard.totalClassCount,
            color: "bg-gradient-to-r from-yellow-500 to-yellow-700",
            icon: <School className="text-2xl" />,
            description: "Number of classes currently created.",
          },
        ].map(
          (
            {
              title,
              activeCount,
              inactiveCount,
              count,
              color,
              icon,
              description,
            },
            index
          ) => {
            const total = count ?? activeCount + inactiveCount;
            return (
              <div
                key={index}
                className={`group relative ${color} rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer shadow-md overflow-hidden`}
              >
                {/* Title */}
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>

                {/* Icon and Count */}
                <div className="flex justify-center items-center gap-4 mb-2">
                  <div className="bg-white text-blue-600 p-3 rounded-full shadow-md">
                    {icon}
                  </div>
                  <p className="text-3xl font-bold text-white">{total}</p>
                </div>

                {/* Hidden hover content */}
                {typeof activeCount !== "undefined" &&
                  typeof inactiveCount !== "undefined" && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm space-y-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
                        Active: {activeCount}
                      </span>
                      <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
                        Inactive: {inactiveCount}
                      </span>
                    </div>
                  )}

                {/* Description (always visible) */}
                <div className="text-center text-white text-xs mt-2">
                  {description}
                </div>
              </div>
            );
          }
        )}
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
            className="bg-white shadow rounded-xl p-6 transform transition-transform duration-300 hover:scale-105 max-h-[800px] overflow-y-auto text-center"
          >
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-white p-2 rounded-md w-full text-center font-serif">
              {title}
            </h2>

            <div className="space-y-4">
              {data?.map((person) => (
                <div
                  key={person._id || person.id}
                  className="flex items-center p-4 border-b last:border-b-0 space-x-4"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                    {person.firstName[0]}
                    {person.lastName[0]}
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
        <DashboardChart
          classPerformance={classPerformance.passFailedStudents||[]}
          setIds={setIds}
        />

        <StudentList />
        <ToastContainer />
      </div>
    </div>
  );
}
