import React, { useState } from 'react';
import { makeRequest } from '../../axios';
makeRequest
const ProfilePicUpload = ({ title = "Upload Profile Picture" }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file.');
      return;
    }

    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('files', file);
    
    try {
      const response = await makeRequest.post(
        'https://api.studypulse.live/web/api/file-upload/profile-pic',
        formData
      );
      
      if (response.data.success) {
        setUploadedUrl(response.data.url);
        setError('');
      }
    } catch (err) {
      setError('An error occurred during the upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-center">{error}</div>}

        <div className="flex justify-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>

      {uploadedUrl && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold">Upload Successful!</h3>
          <img src={`https://api.studypulse.live/${uploadedUrl}`} alt="Uploaded Profile" className="mt-4 max-w-xs mx-auto rounded-full" />
        </div>
      )}
    </div>
  );
};

export default ProfilePicUpload;


import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

import React, { useState } from 'react';
import Modal from './Modal';  // Import Modal component
import ProfilePicUpload from './ProfilePicUpload';  // Import ProfilePicUpload component

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
      >
        Open Profile Picture Upload
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ProfilePicUpload title="Upload Your Profile Picture" />
      </Modal>
    </div>
  );
};

export default App;

