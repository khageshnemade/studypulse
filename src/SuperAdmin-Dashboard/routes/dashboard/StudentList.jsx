import React, { useEffect, useState } from "react";
import makeRequest from "../../../axios";
import { toast } from "react-toastify";
import { setSuperAdminDetails } from "../../../redux/features/superAdminSlice";
import { useDispatch, useSelector } from "react-redux";
const StudentList = () => {
  // State for dropdown options
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [cities, setCities] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Selected values
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [resStatus, setResStatus] = useState("absent");

  // Students and pagination
  const [students, setStudents] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const dispatch = useDispatch();
  const { superAdminDetails } = useSelector((state) => state.superAdmin);
  console.log(superAdminDetails);
  useEffect(() => {
    if (superAdminDetails && Object.keys(superAdminDetails).length > 0) {
      setSelectedDistrict(superAdminDetails.districtId);
      setSelectedTaluka(superAdminDetails.talukaId);
      setSelectedCity(superAdminDetails.cityId);
      setSelectedOrganization(superAdminDetails.orgId);
      setSelectedClass(superAdminDetails.classId);
      setSelectedSubject(superAdminDetails.subjectId);
      setResStatus(superAdminDetails.status);
    }
  }, [superAdminDetails]);

  // Fetch districts on mount
  useEffect(() => {
    fetchDistricts();
  }, []);

  // Fetch talukas on district change
  useEffect(() => {
    if (selectedDistrict) {
      fetchTalukas(selectedDistrict);
      setSelectedTaluka("");
      setCities([]);
      setSelectedCity("");
      setOrganizations([]);
      setSelectedOrganization("");
      setClasses([]);
      setSelectedClass("");
      setSubjects([]);
      setSelectedSubject("");
      setStudents([]);
    } else {
      setTalukas([]);
      setSelectedTaluka("");
      setCities([]);
      setSelectedCity("");
      setOrganizations([]);
      setSelectedOrganization("");
      setClasses([]);
      setSelectedClass("");
      setSubjects([]);
      setSelectedSubject("");
      setStudents([]);
    }
  }, [selectedDistrict]);

  // Fetch cities on taluka change
  useEffect(() => {
    if (selectedDistrict && selectedTaluka) {
      fetchCities(selectedDistrict, selectedTaluka);
      setSelectedCity("");
      setOrganizations([]);
      setSelectedOrganization("");
      setClasses([]);
      setSelectedClass("");
      setSubjects([]);
      setSelectedSubject("");
      setStudents([]);
    } else {
      setCities([]);
      setSelectedCity("");
      setOrganizations([]);
      setSelectedOrganization("");
      setClasses([]);
      setSelectedClass("");
      setSubjects([]);
      setSelectedSubject("");
      setStudents([]);
    }
  }, [selectedTaluka, selectedDistrict]);

  // Fetch organizations on city change
  useEffect(() => {
    if (selectedDistrict && selectedTaluka && selectedCity) {
      fetchOrganizations(selectedDistrict, selectedTaluka, selectedCity);
      setSelectedOrganization("");
      setClasses([]);
      setSelectedClass("");
      setSubjects([]);
      setSelectedSubject("");
      setStudents([]);
    } else {
      setOrganizations([]);
      setSelectedOrganization("");
      setClasses([]);
      setSelectedClass("");
      setSubjects([]);
      setSelectedSubject("");
      setStudents([]);
    }
  }, [selectedCity, selectedTaluka, selectedDistrict]);

  // Fetch classes on organization change
  useEffect(() => {
    if (selectedOrganization) {
      fetchClasses(selectedOrganization);
      setSelectedClass("");
      setSubjects([]);
      setSelectedSubject("");
      setStudents([]);
    } else {
      setClasses([]);
      setSelectedClass("");
      setSubjects([]);
      setSelectedSubject("");
      setStudents([]);
    }
  }, [selectedOrganization]);

  // Fetch subjects on class change
  useEffect(() => {
    if (selectedClass) {
      fetchSubjects(selectedClass);
      setSelectedSubject("");
      setStudents([]);
    } else {
      setSubjects([]);
      setSelectedSubject("");
      setStudents([]);
    }
  }, [selectedClass]);

  // Fetch students when class and subject are selected
  useEffect(() => {
    if (selectedClass && selectedSubject && resStatus) {
      fetchStudents(selectedClass, selectedSubject, resStatus);
    } else {
      setStudents([]);
    }
  }, [selectedClass, selectedSubject, resStatus]);

  // API calls

  const fetchDistricts = async () => {
    try {
      const res = await makeRequest.get("/districts");
      setDistricts(res?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load districts");
    }
  };

  const fetchTalukas = async (districtId) => {
    try {
      const res = await makeRequest.get(
        `/get-taluka-by-district-id?districtId=${districtId}`
      );
      setTalukas(res?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load talukas");
    }
  };

  const fetchCities = async (districtId, talukaId) => {
    try {
      const res = await makeRequest.get(
        `/get-cities-by-district-id-and-taluka-id?districtId=${districtId}&talukaId=${talukaId}`
      );
      setCities(res?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load cities");
    }
  };

  const fetchOrganizations = async (districtId, talukaId, cityId) => {
    try {
      const res = await makeRequest.get(
        `/get-org-by-district-taluka-city-id?districtId=${districtId}&talukaId=${talukaId}&cityId=${cityId}`
      );
      setOrganizations(res?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load organizations");
    }
  };

  const fetchClasses = async (orgId) => {
    try {
      const res = await makeRequest.get(
        `/get-classes-by-org-id?organizationId=${orgId}`
      );
      setClasses(res?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load classes");
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      const res = await makeRequest.get(
        `/get-subjects-by-class-id?classId=${classId}`
      );
      setSubjects(res?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load subjects");
    }
  };

  const fetchStudents = async (classId, subjectId, resStatus) => {
    try {
      const res = await makeRequest.get(
        `superAdmin/get-students-results-by-class?classId=${classId}&subjectId=${subjectId}&page=1&limit=100&resultStatus=${resStatus}`
      );
      setStudents(res?.data?.data || []);
      setCurrentPage(1);
      setViewMore(false);
    } catch (error) {
      toast.error("Failed to load students");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(students.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const displayedStudents = viewMore
    ? students.slice(startIndex, startIndex + studentsPerPage)
    : students.slice(0, studentsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewMore = () => {
    setViewMore(true);
  };

  return (
    <div className="space-y-6 p-8 bg-gray-50 rounded-lg shadow-lg text-center">
      <h1 className="text-xl font-semibold mb-6">Student List</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        {/* District */}
        <select
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            dispatch(
              setSuperAdminDetails({
                districtId: e.target.value,
              })
            );
          }}
          className="min-w-[200px] px-4 py-3 border rounded-lg"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Taluka */}
        <select
          value={selectedTaluka}
          onChange={(e) => {
            setSelectedTaluka(e.target.value);
            dispatch(
              setSuperAdminDetails({
                talukaId: e.target.value,
              })
            );
          }}
          className="min-w-[200px] px-4 py-3 border rounded-lg"
          disabled={!selectedDistrict}
        >
          <option value="">Select Taluka</option>
          {talukas.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* City */}
        <select
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            dispatch(
              setSuperAdminDetails({
                cityId: e.target.value,
              })
            );
          }}
          className="min-w-[200px] px-4 py-3 border rounded-lg"
          disabled={!selectedTaluka}
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Organization */}
        <select
          value={selectedOrganization}
          onChange={(e) => {
            setSelectedOrganization(e.target.value);
            dispatch(
              setSuperAdminDetails({
                orgId: e.target.value,
              })
            );
          }}
          className="min-w-[200px] px-4 py-3 border rounded-lg"
          disabled={!selectedCity}
        >
          <option value="">Select Organization</option>
          {organizations.map((org) => (
            <option key={org._id} value={org._id}>
              {org.name}
            </option>
          ))}
        </select>

        {/* Class */}
        <select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            dispatch(
              setSuperAdminDetails({
                classId: e.target.value,
              })
            );
          }}
          className="min-w-[200px] px-4 py-3 border rounded-lg"
          disabled={!selectedOrganization}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>

        {/* Subject */}
        <select
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            dispatch(
              setSuperAdminDetails({
                subjectId: e.target.value,
              })
            );
          }}
          className="min-w-[200px] px-4 py-3 border rounded-lg"
          disabled={!selectedClass}
        >
          <option value="">Select Subject</option>
          {subjects.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={resStatus}
          onChange={(e) => {
            setResStatus(e.target.value);
            dispatch(
              setSuperAdminDetails({
                status: e.target.value,
              })
            );
          }}
          className="min-w-[200px] px-4 py-3 border rounded-lg"
          disabled={!selectedSubject}
        >
          <option value="">Select Status</option>
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
          <option value="absent">Absent</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
        {displayedStudents.length ? (
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Phone</th>
                <th className="px-6 py-4 text-left font-semibold">Marks</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedStudents.map((student, idx) => (
                <tr
                  key={student._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/${student.profilePic}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>
                      {student.firstName} {student.lastName}
                    </span>
                  </td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">{student.phoneNumber}</td>
                  <td className="px-6 py-4">{student.marks}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-medium ${
                        student.result === "Passed"
                          ? "text-green-600"
                          : student.result === "absent"
                            ? "text-orange-500"
                            : "text-red-600"
                      }`}
                    >
                      {student.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 p-4">
            No students found based on the selected filters.
          </p>
        )}
      </div>

      {/* Pagination */}
      {!viewMore && students.length > studentsPerPage && (
        <button
          onClick={handleViewMore}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View More
        </button>
      )}

      {viewMore && students.length > studentsPerPage && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
