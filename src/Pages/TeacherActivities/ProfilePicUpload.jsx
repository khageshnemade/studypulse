import React, { useState } from "react";
import { makeRequest } from "../../axios";

const ProfilePicUploadModal = ({ setUploadedImageUrl }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await makeRequest.post(
        "https://api.studypulse.live/web/api/file-upload/profile-pic",
        formData
      );
      console.log("response: ", response?.data.url);

      if (response) {
        setUploadedImageUrl(); // Pass URL to parent component
        setError("");
        closeModal();
      }
    } catch (err) {
      console.log("Logging error", err);

      setError("An error occurred during the upload.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
      >
        Upload Profile Picture
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              X
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">
              Upload Profile Picture
            </h2>

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
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicUploadModal;
