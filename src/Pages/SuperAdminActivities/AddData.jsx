import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { toast, ToastContainer } from "react-toastify";

const AddData = () => {
  const [name, setName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [talukaName, setTalukaName] = useState("");
  const [cityName, setCityName] = useState("");
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [cities, setCities] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [talukaId, settalukaId] = useState("");
  const [orgId, setOrgId] = useState("");
  const [cityId, setCityId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDistricts();
  }, [districtId]);

  const fetchDistricts = async () => {
    try {
      const res = await makeRequest.get("/districts");
      setDistricts(res?.data?.data);

      setName("");
    } catch (error) {
      console.error("Error creating Taluka:", error.message);
      toast.error(error.message);
    }
  };
  const fetchCities = async (tId) => {
    console.log("TalukaId", talukaId);
    try {
      const res = await makeRequest.get(
        `/get-cities-by-district-id-and-taluka-id?districtId=${districtId}&talukaId=${tId}`
      );
      console.log("Cities", res?.data?.data);
      setCities(res?.data?.data);

      setName("");
    } catch (error) {
      console.error("Error creating Taluka:", error.message);
      toast.error(error.message);
    }
  };
  const fetchTalukas = async (Id) => {
    console.log("Fetchtalukas");
    try {
      const res = await makeRequest.get(
        `/get-taluka-by-district-id?districtId=${Id}`
      );

      setTalukas(res?.data?.data);
      setName("");
    } catch (error) {
      console.error("Error creating Taluka:", error.message);
      toast.error(error.message);
    }
  };

  const fetchOrgs = async (Id) => {
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
  const handleOrgSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    console.log("Setting Success", isLoading);
    setError("");
    try {
      console.log("DID", districtId);
      const res = await makeRequest.post("/superAdmin/create-organization", {
        talukaID: talukaId,
        districtID: districtId,
        cityID: cityId,
        name,
      });
      console.log("Organization created successfully:", res.data);
      toast.success(res?.data?.message);

      setName("");
    } catch (error) {
      console.error("Error creating Taluka:", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleRegionSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    console.log("Setting Success", isLoading);
    setError("");
    try {
      console.log("DID", districtId);
      const res = await makeRequest.post("/superAdmin/create-region", {
        talukaName,
        districtName,
        cityName,
      });
      console.log("Taluka created successfully:", res.data);
      toast.success(res?.data?.message);

      setName("");
    } catch (error) {
      console.error("Error creating Taluka:", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-9">




      {/*Organization*/}
      <div className="card">
        {/* <ToastContainer /> */}
        <div className="card-header">
          <p className="card-title">Create Organization</p>
        </div>
        <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
          <div className="mt-6">
            <form onSubmit={handleOrgSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="did"
                  className="block text-sm font-medium text-slate-900 dark:text-slate-50"
                >
                  District Name
                </label>
                <select
                  type="text"
                  id="did"
                  name="did"
                  onChange={(e) => {
                    setDistrictId(e.target.value);
                    fetchTalukas(e.target.value);
                  }}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
                >
                  <option value="" disabled selected>
                    Select District
                  </option>
                  {districts?.map((d) => (
                    <option value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="tid"
                  className="block text-sm font-medium text-slate-900 dark:text-slate-50"
                >
                  Taluka Name
                </label>
                <select
                  type="text"
                  id="tid"
                  name="tid"
                  onChange={(e) => {
                    settalukaId(e.target.value);
                    fetchCities(e.target.value);
                  }}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
                >
                  <option value="" disabled selected>
                    Select Taluka
                  </option>
                  {talukas?.map((d) => (
                    <option value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="cid"
                  className="block text-sm font-medium text-slate-900 dark:text-slate-50"
                >
                  City Name
                </label>
                <select
                  type="text"
                  id="cid"
                  name="cid"
                  onChange={(e) => setCityId(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
                >
                  <option value="" disabled selected>
                    Select City
                  </option>
                  {cities?.map((d) => (
                    <option value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="taluka"
                  className="block text-sm font-medium text-slate-900 dark:text-slate-50"
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  id="org"
                  name="org"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md text-white font-semibold ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"}`}
                disabled={isLoading}
              >
                {isLoading ? "Creating Organization..." : "Create Organization"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/*REGION*/}
      <div className="card">
        <div className="card-header">
          <p className="card-title">Create Region</p>
        </div>
        <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
          <div className="mt-6">
            <form onSubmit={handleRegionSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="did"
                  className="block text-sm font-medium text-slate-900 dark:text-slate-50"
                >
                  District Name
                </label>
                <input
                  type="text"
                  id="did"
                  name="did"
                  onChange={(e) => {
                    setDistrictName(e.target.value);

                  }}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
                />

              </div>
              <div>
                <label
                  htmlFor="tid"
                  className="block text-sm font-medium text-slate-900 dark:text-slate-50"
                >
                  Taluka Name
                </label>
                <input
                  type="text"
                  id="tid"
                  name="tid"
                  onChange={(e) => {

                    setTalukaName(
                      e.target.value
                    );

                  }}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
                />

              </div>

              <div>
                <label
                  htmlFor="cid"
                  className="block text-sm font-medium text-slate-900 dark:text-slate-50"
                >
                  City Name
                </label>
                <input
                  type="text"
                  id="cid"
                  name="cid"
                  onChange={(e) => {

                    setCityName(e.target.value);

                  }}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
                />

              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md text-white font-semibold ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"}`}
                disabled={isLoading}
              >
                {isLoading ? "Creating Region..." : "Create Region"}
              </button>
            </form>
          </div>
        </div>

        <ToastContainer />
      </div>

    </div>
  );
};

export default AddData;
