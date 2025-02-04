import axios from "axios";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";

export default function Students() {
  const location = useLocation();
  const { classId, className } = location.state || {};
  // const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  useEffect(() => {
    if (classId) {
      fetchStudents(classId);
    }
  }, [classId]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const openModal = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  const fetchStudents = async (classId) => {
    if (!classId) {
      console.error("classId is missing");
      return;
    }

    try {
      const userData = localStorage.getItem("user");
      const parsedData = JSON.parse(userData);

      const response = await axios.get(
        "https://api.studypulse.live/web/api/teacher/get-all-students",
        {
          headers: {
            Authorization: `Bearer ${parsedData.token}`, // Pass token if required
          },
          params: {
            classId: classId,
            page: 1,
            limit: 100,
            isProfileComplete: true,
          },
        }
      );

      setStudents(response?.data?.data || []);
      console.log("Students Data:", response?.data?.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div>
        {/* <select value={selectedClassId} onChange={handleClassChange} className="w-full px-3 py-2 border rounded-lg">
        <option value="">Select Class</option>
        {classes.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select> */}
        {/* <h3 className="text-2xl font-semibold text-center mb-6">
       
       Students List - {classes.find((cls) => cls._id === selectedClassId)?.name}
     </h3> */}
      </div>
      <h1 className="text-2xl font-semibold text-center mb-6">Students List</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden whitespace-nowrap">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Profile Picture
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Documents
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                className="border-b hover:bg-blue-50 transition-colors duration-300"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {student.innerData.firstName} {student.innerData.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {student.innerData.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {student.innerData.phoneNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {student.gender}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {student.address}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <img
                    src={student.profilePic}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => openModal(student)}
                    className="bg-gradient-to-r from-blue-200 to-purple-400 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none"
                  >
                    View Documents
                  </button>
                </td>

                {selectedStudent && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-4 max-h-[90vh] overflow-y-auto">
                      <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-lg font-semibold">Documents</h2>
                        <button
                          onClick={closeModal}
                          className="text-gray-500 hover:text-gray-800 focus:outline-none"
                        >
                          ✖
                        </button>
                      </div>
                      <div className="mt-4">
                        {selectedStudent.documents.map((doc, index) => (
                          <div key={index} className="mb-2">
                            <a
                              href={doc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              Document {index + 1}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
