import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { baseAPI, getHeaders } from "../../../utils/apiConfig";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setExamId } from "../../../redux/features/examSlice";
import exam from '../../../../public/assets/images/no_exam.png';

const Exam = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExams = async () => {
    try {
      const response = await axios.get(`${baseAPI}/student/exams/`, {
        headers: getHeaders()
      });
      setExams(response.data);
      console.log(response.data);



      setLoading(false);
    } catch (err) {
      setError("Failed to fetch exams. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleStartExam = (examId) => {
    if (examId) {
      navigate(`${examId}`)
      dispatch(setExamId(examId));  // Dispatch only the selected exam ID

      console.log(examId);

    }

  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="h-full flex justify-center items-center flex-col text-center bg-gradient-to-r from-blue-100 to-blue-300 p-8">
        <motion.h1
          className="text-4xl font-bold text-center text-blue-700 mb-8"
          initial={{ opacity: 0, y: -50 }} // Starts from above with no opacity
          animate={{ opacity: 1, y: 0 }} // Moves to its normal position with full opacity
          transition={{ duration: 1, type: "spring", stiffness: 100 }} // Smooth transition
        >
          No Exam Available
        </motion.h1>
        <motion.img
          src={exam} // Replace with the actual sad image URL or import it
          alt="Exam Image"
          className="w-1/2 mb-6"
          initial={{ opacity: 0, scale: 0.5 }} // Starts small and invisible
          animate={{ opacity: 1, scale: 1 }} // Grows to full size and becomes visible
          transition={{ duration: 1, delay: 0.5 }} // Adds delay to sync with text animation
        />
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-r from-blue-100 to-blue-300 p-8">
      <motion.h1
        className="text-4xl font-bold text-center text-blue-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Upcoming Exams
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exams.map((exam, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 flex flex-col" // Added flex-col to ensure a column layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{exam.title}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Date : </strong> {new Date(exam.exam_datetime).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Time : </strong> {new Date(exam.exam_datetime).toLocaleTimeString()}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Exam Code : </strong> {exam.exam_code}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Duration : </strong> {Math.floor(exam.duration / 3600000)} hours
            </p>

            <div className="flex-grow"></div> {/* This will push the button to the bottom of the card */}

            <div className="relative group">
              <button
                onClick={() => handleStartExam(exam.Exam_id)}
                disabled={!exam.is_active}
                className={`w-full px-6 py-3 rounded-lg ${exam.is_active
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600'
                  : 'bg-gray-400 text-gray-800 cursor-not-allowed'
                  } h-[50px]`}
              >
                Start Exam
              </button>

              {/* Tooltip */}
              {!exam.is_active && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                  <div className="bg-gray-800 text-white text-sm px-2 py-1  rounded-lg shadow-lg opacity-90">
                    This exam is not active
                  </div>
                </div>
              )}
            </div>
          </motion.div>

        ))}
      </div>
    </div>
  );
};

export default Exam;




