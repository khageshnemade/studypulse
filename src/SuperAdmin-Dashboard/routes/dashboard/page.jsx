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
  const dispatch = useDispatch();

  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [cities, setCities] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [classes, setClasses] = useState([]);

  const [districtId, setDistrictId] = useState("");
  const [talukaId, setTalukaId] = useState("");
  const [cityId, setCityId] = useState("");
  const [orgId, setOrgId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [loading, setLoading] = useState(false);

  const idsFromRedux = useSelector(
    (state) => state.superAdmin.superAdminDetails
  );

  // Set local state from Redux on mount/update
  useEffect(() => {
    if (idsFromRedux) {
      setDistrictId(idsFromRedux.districtId || "");
      setTalukaId(idsFromRedux.talukaId || "");
      setCityId(idsFromRedux.cityId || "");
      setOrgId(idsFromRedux.orgId || "");
      setSelectedClassId(idsFromRedux.classId || "");
      setSelectedClass(idsFromRedux.class || "");
    }
  }, [idsFromRedux]);

  // Fetch hierarchy data
  useEffect(() => {
    fetchDistricts();
  }, []);
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
    if (orgId) {
      fetchClasses();
      setIds((prev) => ({ ...prev, orgId }));
    }
  }, [orgId]);

  // API fetches
  const fetchDistricts = async () => {
    try {
      setLoading(true);
      const res = await makeRequest.get("/districts");
      setDistricts(res?.data?.data);
    } catch (err) {
      toast.error("Failed to fetch districts");
    } finally {
      setLoading(false);
    }
  };

  const fetchTalukas = async () => {
    try {
      setLoading(true);
      const res = await makeRequest.get(
        `/get-taluka-by-district-id?districtId=${districtId}`
      );
      setTalukas(res?.data?.data);
    } catch (err) {
      toast.error("Failed to fetch talukas");
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      setLoading(true);
      const res = await makeRequest.get(
        `/get-cities-by-district-id-and-taluka-id?districtId=${districtId}&talukaId=${talukaId}`
      );
      setCities(res?.data?.data);
    } catch (err) {
      toast.error("Failed to fetch cities");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrgs = async () => {
    try {
      setLoading(true);
      const res = await makeRequest.get(
        `/get-org-by-district-taluka-city-id?districtId=${districtId}&talukaId=${talukaId}&cityId=${cityId}`
      );
      setOrgs(res?.data?.data);
    } catch (err) {
      toast.error("Failed to fetch organizations");
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
    } catch (err) {
      toast.error("Failed to fetch classes");
    }
  };

  // Prepare chart data
  const stats = classPerformance?.[selectedClass]
    ? classPerformance[selectedClass]
    : Object.values(classPerformance || {}).reduce(
        (acc, curr) => {
          acc.passed += curr.passed || 0;
          acc.failed += curr.failed || 0;
          return acc;
        },
        { passed: 0, failed: 0 }
      );

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
      <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-white p-2 rounded-md w-full text-center font-serif">
        {selectedClass
          ? `${selectedClass} Class Performance`
          : "Organization Performance"}
      </h2>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* District Dropdown */}
        <select
          name="district"
          value={districtId}
          onChange={(e) => {
            dispatch(setSuperAdminDetails({ districtId: e.target.value }));
            setDistrictId(e.target.value);
          }}
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm"
        >
          <option value="">Select District</option>
          {districts.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>

        {/* Taluka Dropdown */}
        <select
          name="taluka"
          value={talukaId}
          onChange={(e) => {
            dispatch(setSuperAdminDetails({ talukaId: e.target.value }));
            setTalukaId(e.target.value);
          }}
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm"
        >
          <option value="">Select Taluka</option>
          {talukas.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          name="city"
          value={cityId}
          onChange={(e) => {
            dispatch(setSuperAdminDetails({ cityId: e.target.value }));
            setCityId(e.target.value);
          }}
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm"
        >
          <option value="">Select City</option>
          {cities.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>

        {/* Organization Dropdown */}
        <select
          name="org"
          value={orgId}
          onChange={(e) => {
            dispatch(
              setSuperAdminDetails({
                orgId: e.target.value,
                classId: null,
                class: null,
              })
            );

            setIds((prev) => ({
              ...prev,
              orgId: e.target.value,
              classId: "",
            }));
            setSelectedClassId("");
            setSelectedClass("");
            setOrgId(e.target.value);
          }}
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm"
        >
          <option value="">Select Organization</option>
          {orgs.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>

        {/* Class Dropdown */}
        <select
          name="classSelect"
          value={selectedClassId}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedClassObj = classes.find(
              (cls) => cls._id === selectedId
            );
            const selectedClassName = selectedClassObj?.name || "";

            dispatch(
              setSuperAdminDetails({
                classId: selectedId,
                class: selectedClassName,
              })
            );

            setSelectedClassId(selectedId);
            setSelectedClass(selectedClassName);

            setIds((prev) => ({
              ...prev,
              classId: selectedId,
            }));
          }}
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm"
        >
          <option value="">Select Class</option>
          {classes.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div
        className="d-flex justify-content-center align-items-center mt-2"
        style={{ gap: "1rem" }}
      >
        <h2 className="mb-0" style={{ fontWeight: "bold" }}>
          {!orgId
            ? "All Organizations Data"
            : orgs.find((o) => o._id === orgId)?.name ||
              "Organization Not Found"}
        </h2>

        {selectedClassId && (
          <h2 className="mb-0" style={{ fontWeight: "bold" }}>
            {selectedClass}
          </h2>
        )}
      </div>

      {/* Chart */}
      <div className="w-full text-center mt-6">
        <div className="w-80 h-80 mx-auto">
          {stats ? (
            <Pie data={chartData} />
          ) : (
            <p className="text-gray-500">
              Please select Organization or Class to view performance.
            </p>
          )}
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
                className={`relative ${color} rounded-2xl p-4 flex flex-col justify-between transition-transform transform duration-500 hover:scale-105 cursor-pointer shadow-md overflow-hidden`}
              >
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>

                <div className="flex justify-center items-center gap-4 mb-2">
                  <div className="bg-white text-blue-600 p-3 rounded-full shadow-md">
                    {icon}
                  </div>
                  <p className="text-3xl font-bold text-white whitespace-nowrap">
                    {total}
                  </p>
                </div>

                {typeof activeCount !== "undefined" &&
                  typeof inactiveCount !== "undefined" && (
                    <div className="flex flex-col items-center text-white text-xs mt-2 space-y-1">
                      <span className="bg-white/20 px-2 py-0.5 rounded-full font-medium">
                        Active: {activeCount}
                      </span>
                      <span className="bg-white/20 px-2 py-0.5 rounded-full font-medium">
                        Inactive: {inactiveCount}
                      </span>
                    </div>
                  )}

                <div className="text-center text-white text-xs mt-2">
                  {description}
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Recently Added Teachers & Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-4">
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
            className="bg-white shadow rounded-lg p-4 transform transition-transform duration-300 hover:scale-[1.03] max-h-[700px] overflow-y-auto text-center"
          >
            <h2 className="text-lg font-bold mb-3 bg-gradient-to-r from-blue-500 to-blue-300 text-white p-2 rounded w-full font-serif">
              {title}
            </h2>

            <div className="space-y-3">
              {data?.map((person) => (
                <div
                  key={person._id || person.id}
                  className="flex items-center p-3 border-b last:border-b-0 space-x-3"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-base">
                    {person.firstName[0]}
                    {person.lastName[0]}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-800">
                      {person.firstName} {person.lastName}
                    </p>
                    <p className="text-xs text-gray-600">{person.email}</p>
                    <p className="text-xs text-gray-600">
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
          classPerformance={classPerformance.passFailedStudents || []}
          setIds={setIds}
        />

        <StudentList />
        <ToastContainer />
      </div>
    </div>
  );
}
