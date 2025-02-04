import axios from 'axios';
import React, { useEffect, useState } from 'react';
import doggy from '../../../../public/assets/images/no-content.png';
import { useParams } from 'react-router-dom';
import { baseAPI } from '../../../utils/apiConfig';
import { motion } from 'framer-motion';
import pdf from '../../../../public/assets/images/pngpdf.png';

const Singlecontent = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [scholarship, setScholarship] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [selectedTab, setSelectedTab] = useState('All'); // State for selected tab

    const fetchScholarshipDetails = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        try {
            const response = await axios.get(`${baseAPI}/student/scholaship-material/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const formattedData = response.data.map((item) => ({
                materialTitle: item.material_title,
                materialType: item.material_type,
                description: item.description,
                pathUrl: item.path_url,
                file: item.file,
            }));

            setScholarship(formattedData);
            setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
            console.error('Error while fetching scholarship content:', error);
            setLoading(false); // Stop loader in case of error
        }
    };

    useEffect(() => {
        fetchScholarshipDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="spinner"></div>
            </div>
        );
    }

    // Check if scholarship content is empty
    if (scholarship.length === 0) {
        return (
            <div className="h-full flex justify-center items-center flex-col text-center bg-gradient-to-r from-blue-100 to-blue-300 p-8">
                <motion.h1
                    className="text-4xl font-bold text-center text-blue-700 mb-8"
                    initial={{ opacity: 0, y: -50 }} // Starts from above with no opacity
                    animate={{ opacity: 1, y: 0 }} // Moves to its normal position with full opacity
                    transition={{ duration: 1, type: "spring", stiffness: 100 }} // Smooth transition
                >
                    No Content Available
                </motion.h1>
                <motion.img
                    src={doggy} // Replace with the actual sad image URL or import it
                    alt="Sad Image"
                    className="w-1/2 mb-6"
                    initial={{ opacity: 0, scale: 0.5 }} // Starts small and invisible
                    animate={{ opacity: 1, scale: 1 }} // Grows to full size and becomes visible
                    transition={{ duration: 1, delay: 0.5 }} // Adds delay to sync with text animation
                />
            </div>
        );
    }

    // Filter based on selected tab
    const filteredScholarship = scholarship.filter((item) => {
        if (selectedTab === 'All') return true;
        return item.materialType === selectedTab;
    });

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8">
            <motion.h1
                className="text-4xl font-bold text-center text-blue-700 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Scholarship Materials
            </motion.h1>

            {/* Tabs for filtering */}
            <div className="mb-6 flex justify-center space-x-6">
                {['All', 'Syllabus', 'Content', 'Videos'].map((tab) => (
                    <motion.button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`w-32 px-6 py-2 text-base font-semibold ${selectedTab === tab
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-white text-blue-600'} rounded-lg shadow-md hover:shadow-xl transition duration-300`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {tab}
                    </motion.button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredScholarship.map((item, index) => (
                    <motion.div
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h2
                            className="text-2xl font-semibold text-gray-800 mb-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {item.materialTitle}
                        </motion.h2>
                        <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                        {/* File Display Logic */}
                        {item.file && item.file.endsWith(".pdf") ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <a href={item.file} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={pdf}
                                        alt="PDF Icon"
                                        className="w-36 h-36 mb-4 cursor-pointer"
                                        title="View PDF"
                                    />
                                </a>
                                <motion.a
                                    href={item.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    View PDF
                                </motion.a>
                            </motion.div>
                        ) : item.file && /\.(mp4|webm|ogg|avi|mov|flv|mkv)$/i.test(item.file)
                            ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <video
                                        controls
                                        width="100%"
                                        height="auto"
                                        className="border rounded-lg mb-4"
                                    >
                                        <source src={item.file} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <motion.a
                                        href={item.file}
                                        download
                                        className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Download Video
                                    </motion.a>
                                </motion.div>
                            ) : item.file && /\.(png|webp|jpg|jpeg|gif|bmp|svg|tiff)$/i.test(item.file) ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <img
                                        src={item.file}
                                        alt={`Image ${index}`}
                                        className="w-full h-auto rounded-lg mb-4"
                                    />
                                    <motion.a
                                        href={item.file}
                                        download
                                        className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Download Image
                                    </motion.a>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <p className="text-gray-500"></p>
                                </motion.div>
                            )}

                        {/* Path URL Logic */}
                        {!item.file && item.pathUrl && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="mt-4"
                            >
                                <p className="text-lg font-semibold text-gray-700 mb-2">
                                    URL:
                                    <p className="text-blue-600 underline text-center mb-2">
                                        <a href={item.pathUrl} target="_blank" rel="noopener noreferrer">
                                            {item.pathUrl}
                                        </a>
                                    </p>
                                </p>
                                <motion.a
                                    href={item.pathUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-teal-600 hover:to-green-600 mt-20"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Visit Now
                                </motion.a>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Singlecontent;
