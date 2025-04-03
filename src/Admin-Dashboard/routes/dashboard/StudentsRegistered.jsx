import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import makeRequest from "../../../axios";

export default function StudentsRegistered() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const orgId = useSelector((state) => state.org.orgId);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (orgId) {
      fetchClasses();
    }
  }, [orgId]);

  useEffect(() => {
    if (selectedClass) {
      fetchSubjects(selectedClass);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass && selectedSubject && selectedStatus) {
      fetchStudentsResults();
    }
  }, [selectedClass, selectedSubject, selectedStatus]);

  const fetchClasses = async () => {
    try {
      const res = await makeRequest.get(
        `/get-classes-by-org-id?organizationId=${orgId}`
      );
      setClasses(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching classes:", error.response?.data || error.message);
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      const res = await makeRequest.get(
        `/get-subjects-by-class-id?classId=${classId}`
      );
      setSubjects(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching subjects:", error.response?.data || error.message);
    }
  };

  const fetchStudentsResults = async () => {
    try {
      const res = await makeRequest.get(
        `/admin/get-students-results-by-class?classId=${selectedClass}&subjectId=${selectedSubject}&page=1&limit=30&resultStatus=${selectedStatus}`
      );
      setStudents(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching students results:", error.response?.data || error.message);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6">
      <button
        onClick={handleGoBack}
        className="mb-4 p-2 text-white bg-blue-500 rounded-lg flex items-center"
      >
        <ArrowLeft className="mr-2" />
        Go Back
      </button>

      <div className="mb-4 flex space-x-4">
        {/* Class Selection */}
        <div className="w-1/3">
          <label className="block text-lg font-semibold mb-2">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-1 border rounded-lg"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Selection */}
        <div className="w-1/3">
          <label className="block text-lg font-semibold mb-2">Select Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-1 border rounded-lg"
            disabled={!selectedClass}
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Selection */}
        <div className="w-1/3">
          <label className="block text-lg font-semibold mb-2">Select Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-1 border rounded-lg"
          >
            <option value="">Select Status</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
            <option value="absent">Absent</option>
          </select>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Phone</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Marks</th>
            <th className="border p-3">Profile</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-100 transition-all">
                <td className="border p-3">{student.firstName} {student.lastName}</td>
                <td className="border p-3">{student.email}</td>
                <td className="border p-3">{student.phoneNumber}</td>
                <td className="border p-3">{student.result}</td>
                <td className="border p-3">{student.marks}</td>
                <td className="border p-3">
                  <img src={student.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border p-3 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
