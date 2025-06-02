import React, { useState, useEffect } from "react";
import axios from "axios";
import { Book, BookOpen } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Optional, for toast notifications
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { div } from "framer-motion/client";

const SubjectsList = () => {
  // State variables
  const navigate = useNavigate();
  const [classes, setClasses] = React.useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get(`/teacher/get-all-classes`);
      setClasses(res?.data?.data);
      console.log("Classes: ", res?.data?.data);
    } catch (error) {
      console.error("Request Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  // Fetch subjects from the API
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await makeRequest.get("/teacher/get-all-subjects");
        setSubjects(response.data.data); // Assuming data is in response.data.data
        console.log(response.data);

        console.log("Subject List returned", subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast.error(error?.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses()
    fetchSubjects();
  }, []);

  // Rendering the component
  return (
    <div className="container mx-auto p-6">
      <p className="text-center text sm:text-xl md:text-2xl font-serif p-2 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto m-3 drop-shadow-lg border-[1.5px] border-blue-800">
        <BookOpen className="text sm:text-xl md:text-2xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce text-blue-600" />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Subjects List
        </span>
      </p>
      {/* Loading Spinner */}
      {loading && (
        <div className="mt-2 flex justify-center items-center">
          <div className="animate-spin border-4 border-blue-500 border-t-transparent w-6 h-6 rounded-full"></div>
        </div>
      )}
      {loading ? (
        <div className="text-center py-4">
          <span className="text-xl">
            Please Select Class Name And ChapterName...
          </span>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg whitespace-nowrap overflow-x-auto">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-left">
                  Picture
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left">
                  Class Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left">
                  Chapters
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.length > 0 ? (
                subjects.map((subject) => {
                  const className =
                    classes.find((cls) => cls._id === subject.classId)?.name || "Class not found";

                  return (
                    <tr key={subject._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 border border-gray-300">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={
                            subject.image.startsWith('https://api.studypulse.live')
                              ? subject.image
                              : `https://api.studypulse.live/${subject.image}`
                          }
                          alt="Profile"
                        />
                      </td>
                      <td className="px-6 py-4 border border-gray-300">
                        {className}
                      </td>
                      <td className="px-6 py-4 border border-gray-300">
                        {subject.name}
                      </td>
                      <td className="px-6 py-4 border border-gray-300">
                        {subject?.chapterIds?.length > 0 ? (
                          <button
                            onClick={() =>
                              navigate("/teacher-dashboard/chapters", {
                                state: { subject },
                              })
                            }
                            className="bg-teal-400 text-white px-3 py-2 rounded-md w-full sm:w-auto hover:bg-teal-700 focus:outline-none transition duration-300"
                            title="Chapters"
                          >
                            <Book className="h-5 w-5 mr-2 inline" />
                          </button>
                        ) : (
                          "No chapters available"
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    No subjects found
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SubjectsList;
