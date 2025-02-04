import axios from "axios";
import { a } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

export default function TeacherSignup() {
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [cities, setCities] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [talukaId, settalukaId] = useState("");
  const [orgId, setOrgId] = useState("");
  const [cityId, setCityId] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    cityID: "",
    talukaID: "",
    districtID: "",
    organizationID: "",
  });
  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(
        "https://api.studypulse.live/web/api/districts"
      );
      setDistricts(response?.data?.data);
      console.log("Districts", districts);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchCities = async (tId) => {
    try {
      const res = await makeRequest.get(
        `/get-cities-by-district-id-and-taluka-id?districtId=${districtId}&talukaId=${tId}`
      );
      console.log("Cities", res?.data?.data);
      setCities(res?.data?.data);

      setName("");
    } catch (error) {
      console.error("Error creating Cities:", error.message);
    }
  };
  const fetchTalukas = async (Id) => {
    try {
      const res = await makeRequest.get(
        `/get-taluka-by-district-id?districtId=${Id}`
      );
      setTalukas(res?.data?.data);
    } catch (error) {
      console.error("Error creating Taluka:", error.message);
    }
  };

  const fetchOrgs = async (Id) => {
    setDistrictId(Id);
    console.log("FetchtOrgs");
    try {
      const res = await makeRequest.get(
        `/get-org-by-district-taluka-city-id?talukaId=${talukaId}&cityId=${Id}&districtId=${districtId}`
      );

      setOrgs(res?.data?.data);
      console.log("Organizations", res?.data?.data);
      setName("");
    } catch (error) {
      console.error("Error creating Taluka:", error.message);
      toast.error(error.message);
    }
  };
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://api.studypulse.live/web/api/teacher/signup",
        formData
      );
      setSuccess("Signup successful!");
      console.log("Response:", response.data);
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Teacher Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cityID" className="block text-gray-700 mb-1">
              City ID
            </label>
            <select
              type="text"
              id="cityID"
              name="cityID"
              value={formData.cityID}
              onChange={async (e) => {
                handleChange(e);
                setCityId(e.target.value);
                fetchOrgs(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            >
              <option value={""}>Select City</option>
              {cities?.map((c) => (
                <option value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="talukaID" className="block text-gray-700 mb-1">
              Taluka ID
            </label>
            <select
              type="text"
              id="talukaID"
              name="talukaID"
              value={formData.talukaID}
              onChange={async (e) => {
                handleChange(e);
                settalukaId(e.target.value);
                fetchCities(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            >
              <option>Select Taluka</option>
              {talukas?.map((t) => (
                <option value={t._id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="districtID" className="block text-gray-700 mb-1">
              District ID
            </label>
            <select
              type="text"
              id="districtID"
              name="districtID"
              value={formData.districtID}
              onChange={async (e) => {
                handleChange(e);
                setDistrictId(e.target.value);
                fetchTalukas(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            >
              <option>Select District</option>
              {districts?.map((d) => (
                <option value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="organizationID"
              className="block text-gray-700 mb-1"
            >
              Organization ID
            </label>
            <select
              type="text"
              id="organizationID"
              name="organizationID"
              value={formData.organizationID}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              required
            >
              <option>Select Organization</option>
              {orgs?.map((o) => (
                <option value={o._id}>{o.name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
