import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeRequest } from "../../axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { image } from "framer-motion/client";

const AddSubject = ({ addclass }) => {
  const [name, setName] = useState("");
  const [classI, setClassId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const orgId = useSelector((state) => state.org.orgId);
  const [classes, setClasses] = useState([]);
  const location = useLocation();
  const { classId, className } = location.state || {};
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Store uploaded image URL

  useEffect(() => {
    fetchClasses();
  }, [addclass]);
  console.log("Class", classId);
  const fetchClasses = async () => {
    try {
      const res = await makeRequest.get(
        `/get-classes-by-org-id?organizationId=${orgId}`
      );
      setClasses(res?.data?.data);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };

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
    const subjectData = { name, classId, image: imageUrl };

    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.post("/admin/create-subject", subjectData);
      console.log("Subject created successfully:", res.data);
      // Reset the form
      setName("");
      setClassId("");
      setImageUrl(""); // Reset the image URL
      setFile(null); // Clear the selected file
    } catch (err) {
      console.error("Error creating subject:", err.message);
      setError("Failed to create subject");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-title">Create Subject</p>
      </div>
      <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Subject Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
              />
            </div>
            <div>
              <label
                htmlFor="classId"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Class
              </label>
              <select
                type="text"
                id="classId"
                name="classId"
                disabled
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
              >
                <option value={classId}>{className}</option>
              </select>
            </div>

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

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-semibold ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"}`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Subject..." : "Create Subject"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
