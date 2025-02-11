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
