import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseAPI, getHeaders } from '../../../utils/apiConfig';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner'; // Importing the loader
import { motion } from 'framer-motion'; // Import Framer Motion

const Content = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // To show a loading indicator
  const [error, setError] = useState(null); // To handle errors

  const fetchAppliedScholarships = async () => {
    try {
      const response = await axios.get(`${baseAPI}/student/students-apps-scholar/`, {
        headers: getHeaders(),
      });
      if (Array.isArray(response.data)) {
        setScholarships(response.data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      console.error('Error while fetching applied scholarships:', err);
      setError('Failed to load scholarships. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    if (id) {
      navigate(`${id}`);
    } else {
      console.error('Invalid scholarship ID');
    }
  };

  useEffect(() => {
    fetchAppliedScholarships();
  }, []);

  return (
    <div className="h-full bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-6">
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        My Applied Scholarships
      </motion.h1>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <TailSpin color="#4fa94d" height={80} width={80} /> {/* Loader Component */}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 text-xl">{error}</div>
      ) : scholarships.length > 0 ? (
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {scholarships.map((scholarship, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{scholarship.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{scholarship.description}</p>
              </div>
              <motion.button
                onClick={() => handleViewDetails(scholarship.scholar_id)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-full py-2 mt-4 rounded-lg font-medium shadow-md hover:from-purple-500 hover:to-blue-500 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Content
              </motion.button>

            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="col-span-full text-center text-gray-500 text-xl">
          No scholarships applied yet.
        </div>
      )}
    </div>
  );
};

export default Content;
