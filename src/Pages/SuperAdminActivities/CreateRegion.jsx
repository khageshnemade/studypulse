import React, { useState } from "react";
import { makeRequest } from "../../axios";
import { toast, ToastContainer } from "react-toastify";
import { Plus, PlusCircle } from "lucide-react";

export default function CreateRegion() {
  const [districtName, setDistrictName] = useState("");
  const [talukaName, setTalukaName] = useState("");
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");

  const createRegion = async (e) => {
    e.preventDefault();
    if (!districtName || !talukaName || !cityName) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await makeRequest.post("/superAdmin/create-region", {
        districtName,
        talukaName,
        cityName,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Region created successfully!");
      } else {
        toast.error("Failed to create region!");
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
        <PlusCircle className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
        Create New Region
      </p>
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <form onSubmit={createRegion} className="space-y-4">
          <div className="mb-4">
          <p className="text-center text-gray-700 bg-gray-100 p-3 rounded-lg shadow-md  mx-auto text-lg font-medium hover:shadow-xl transition-all duration-300 mb-4">
     
     Create District Taluka and City
   </p>
            <label htmlFor="districtName" className="block text-gray-700 mb-1">
              District Name
            </label>
            <input
              type="text"
              id="districtName"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>
         
          <div className="mb-4">
            <label htmlFor="talukaName" className="block text-gray-700 mb-1">
              Taluka Name
            </label>
            <input
              type="text"
              id="talukaName"
              value={talukaName}
              onChange={(e) => setTalukaName(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cityName" className="block text-gray-700 mb-1">
              City Name
            </label>
            <input
              type="text"
              id="cityName"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
