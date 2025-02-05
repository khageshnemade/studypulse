import React, { useState, useEffect } from "react";
import axios from "axios";
import { Book, BookOpen } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Optional, for toast notifications
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { div } from "framer-motion/client";

const SubjectsList = () => {
  // State variables
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch subjects from the API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await makeRequest.get("/teacher/get-all-subjects",);
        setSubjects(response.data.data);  // Assuming data is in response.data.data
        console.log("Subject List returned", subjects);

      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast.error("Failed to fetch subjects");
      } finally {
        setLoading(false);
      }
    };


    fetchSubjects();
  }, []);


  // Rendering the component
  return (
    <div className="container mx-auto p-6">
  <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-purple-200 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
    <BookOpen className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
  
    Subjects List
  </p>


       
      {loading ? (
        <div className="text-center py-4">
          <span className="text-xl">Please Select Class Name And ChapterName...</span>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
<table className="min-w-full table-auto bg-white shadow-lg rounded-lg whitespace-nowrap overflow-x-auto">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white ">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-left">Subject Name</th>
              <th className="px-6 py-3 text-sm font-semibold text-left">Subject Created Date</th>
              <th className="px-6 py-3 text-sm font-semibold text-left">Chapters</th>

            </tr>
          </thead>
          <tbody>
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <tr key={subject._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{subject.name}</td>
                  <td className="px-6 py-4">
                    {new Date(subject.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {subject?.chapterIds?.length > 0 ? (
                      <button
                        onClick={() => navigate('/teacher-dashboard/chapters', { state: { subject } })}
                        className="bg-gradient-to-r from-blue-300 to-purple-500 text-white px-4 py-2 rounded-md w-full sm:w-auto hover:bg-blue-800 focus:outline-none transition duration-300"
                        title="Chapters"
                      >
                        <Book className="h-5 w-5 mr-2 inline" /> 
                      </button>
                    ) : (
                      "No chapters available"
                    )}
                  </td>


                </tr>

              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center">No subjects found</td>
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
