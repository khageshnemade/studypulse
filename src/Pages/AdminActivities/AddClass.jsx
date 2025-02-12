import React, { useState } from "react";
import { makeRequest } from "../../axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const AddClass = () => {
  const [name, setName] = useState("");
  const [stream, setStream] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Store uploaded image URL
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await makeRequest.post(
        "https://api.studypulse.live/web/api/file-upload/profile-pic",
        formData
      );

      if (response.data.success) {
        setImageUrl(response.data.url); // Store the uploaded image URL
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to upload image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.error("Please upload a profile picture first.");
      return;
    }

    const classData = { name, stream, image: imageUrl };

    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.post("/admin/create-class", classData);
      toast.success(res?.data?.message, { autoClose: 1500 });

      setName("");
      setStream("");
      setImageUrl(""); // Reset the image URL
      setFile(null); // Clear the selected file
      setTimeout(() => {
        navigate("/admin-dashboard/class_subject");
      }, 1700);
    } catch (error) {
      toast.error("Failed to create class. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <ToastContainer />
      <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
        <PlusCircle className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
        Create Class
      </p>

      <div className="bg-white max-w-xl mx-auto p-4 rounded-lg transition-colors dark:bg-slate-950">
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Class Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                Class Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md"
              />
            </div>

            {/* Stream Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                Stream
              </label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md"
              >
                <option value="">Select a Stream</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
                <option value="Commerce">Commerce</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                Profile Picture
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              <button
                type="button"
                onClick={handleFileUpload}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload Image"}
              </button>
            </div>

            {/* Show Uploaded Image Preview */}
            {imageUrl && (
              <div className="mt-4 text-center">
                <p className="text-green-600 font-semibold">
                  Image Uploaded Successfully!
                </p>
                <img
                  src={`https://api.studypulse.live/${imageUrl}`}
                  alt="Uploaded Profile"
                  className="mt-2 max-w-xs mx-auto rounded-full"
                />
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Class..." : "Create Class"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
