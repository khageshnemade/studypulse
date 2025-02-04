import React, { useState } from "react";
import axios from "axios";
import { makeRequest } from "../../axios";
import AddSubject from "./AddSubject";
import { toast, ToastContainer } from "react-toastify";

const AddClass = ({ setAddClass }) => {
  const [name, setName] = useState("");
  const [stream, setStream] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const classData = { name, stream };

    setIsLoading(true);
    console.log("Setting Success", isLoading);
    setError("");
    try {
      const res = await makeRequest.post("/admin/create-class", classData);
      console.log("Class created successfully:");
      toast.success(res?.data?.message);
      console.log("Type", typeof res.data.data._id);
      setAddClass(res.data.data._id);
      setName("");
      setStream("");
    } catch (error) {
      console.error("Error creating class:", error.message);
      toast.error("Failed to fetch Streams,Please try to Login again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mx-auto">
      <ToastContainer />
      <div className="card-header">
        <p className="card-title">Create Class</p>
      </div>
      <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Class Name
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
                htmlFor="stream"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Stream
              </label>

              <select
                id="stream"
                name="stream"
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
              >
                <option value="">Select a Stream</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
                <option value="Commerce">Commerce</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-semibold ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"}`}
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
