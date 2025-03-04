import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { toast, ToastContainer } from "react-toastify";
import { PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSuperAdminDetails } from "../../redux/features/superAdminSlice";

export default function Organizations() {
  const [oname, setOname] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [cities, setCities] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [talukaId, settalukaId] = useState("");
  const [cityId, setCityId] = useState("");
  const dispatch = useDispatch();
  const {
    districtId: initialDistrictId,
    talukaId: initialTalukaId,
    cityId: initialCityId,
  } = useSelector((state) => state.superAdmin.superAdminDetails);

  const addOrganization = async () => {
    try {
      const { data, status } = await makeRequest.post(
        "/superAdmin/create-organization",
        {
          name: oname,
          cityID: cityId,
          talukaID: talukaId,
          districtID: districtId,
        }
      );
      if (status === 200 || status === 201) {
        toast.success("Organization added successfully!");
        setOrgs((prevOrgs) => [...prevOrgs, data.data]);
      }
    } catch (err) {
      console.err("Error creating org:", err);
    } finally {
      setIsModalOpen(false);
    }
  };
  useEffect(() => {
    fetchDistricts();
  }, []);
  useEffect(() => {
    if (districtId) fetchTalukas();
  }, [districtId]);
  useEffect(() => {
    if (talukaId) fetchCities();
  }, [talukaId]);
  useEffect(() => {
    if (cityId) fetchOrgs();
  }, [cityId]);

  useEffect(() => {
    setDistrictId(initialDistrictId);
    settalukaId(initialTalukaId);
    setCityId(initialCityId);
  }, [initialDistrictId, initialTalukaId, initialCityId]);

  const fetchDistricts = async () => {
    try {
      const res = await makeRequest.get("/districts");
      setDistricts(res?.data?.data);
    } catch (error) {
      console.error("Error fetching District:", error.message);
    }
  };
  const fetchCities = async () => {
    try {
      const res = await makeRequest.get(
        `/get-cities-by-district-id-and-taluka-id?districtId=${districtId}&talukaId=${talukaId}`
      );
      setCities(res?.data?.data);
    } catch (error) {
      console.error("Fetch Cities:", error.message);
      toast.error(error.message);
    }
  };
  const fetchTalukas = async () => {
    try {
      const res = await makeRequest.get(
        `/get-taluka-by-district-id?districtId=${districtId}`
      );
      setTalukas(res?.data?.data);
    } catch (error) {
      console.error("Fetch Taluka:", error.message);
      toast.error(error.message);
    }
  };

  const fetchOrgs = async () => {
    try {
      const res = await makeRequest.get(
        `/get-org-by-district-taluka-city-id?talukaId=${talukaId}&cityId=${cityId}&districtId=${districtId}`
      );
      setOrgs(res?.data?.data);
      console.log("Organizations", res?.data?.data);
    } catch (error) {
      setOrgs([]);
      console.error("Submit Orgs:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const Orgs = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
      <select
        name="district"
        id="district"
        value={districtId}
        onChange={(e) => {
          dispatch(setSuperAdminDetails({ districtId: e.target.value }));
          setDistrictId(e.target.value);
        }}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select District</option>
        {districts.map(({ _id, name }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </select>

      <select
        name="talukas"
        id="talukas"
        value={talukaId}
        onChange={(e) => {
          dispatch(setSuperAdminDetails({ talukaId: e.target.value }));
          settalukaId(e.target.value);
        }}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Taluka</option>
        {talukas.map(({ _id, name }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </select>

      <select
        name="city"
        value={cityId}
        onChange={(e) => {
          dispatch(setSuperAdminDetails({ cityId: e.target.value }));
          setCityId(e.target.value);
        }}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select City</option>
        {cities.map(({ _id, name }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
  return (
    <div className="p-4  shadow-lg">
      <ToastContainer />

      <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
        <PlusCircle className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
        Organizations
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Organization
      </button>

      <Orgs />
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-[999]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Add Organization
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addOrganization();
              }}
              className="space-y-4"
            >
              {/* Dropdowns for district, taluka, and city */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <select
                  name="district"
                  value={districtId}
                  onChange={(e) => {
                    dispatch(
                      setSuperAdminDetails({ districtId: e.target.value })
                    );
                    setDistrictId(e.target.value);
                  }}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select District</option>
                  {districts.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
                </select>

                <select
                  name="taluka"
                  value={talukaId}
                  onChange={(e) => {
                    dispatch(
                      setSuperAdminDetails({ talukaId: e.target.value })
                    );
                    settalukaId(e.target.value);
                  }}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Taluka</option>
                  {talukas.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
                </select>

                <select
                  name="city"
                  value={cityId}
                  onChange={(e) => {
                    dispatch(setSuperAdminDetails({ cityId: e.target.value }));
                    setCityId(e.target.value);
                  }}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select City</option>
                  {cities.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Organization name input */}
              <input
                type="text"
                name="name"
                placeholder="Organization Name"
                value={oname}
                onChange={(e) => setOname(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />

              {/* Action buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  onClick={() => {
                    // fetchOrgs();
                  }}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Organizations Table */}
      {orgs && orgs.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <h3 className="text-lg font-bold text-[30px] text-center text-gray-700 mb-4">
            Organizations
          </h3>
          <table className="min-w-full table-auto border-collapse whitespace-nowrap">
            <thead className="bg-gray-200 text-gray-700">
              <tr className="bg-gradient-to-r from-blue-400 to-purple-500">
                {["Name", "District", "Taluka", "City"].map((header) => (
                  <th
                    key={header}
                    className="border-b border-gray-800 px-4 py-2 text-left font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orgs.map(({ id, name, districtID, talukaID, cityID }) => (
                <tr
                  key={id}
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-700 transition-all"
                >
                  <td className="border-b border-gray-800 px-4 py-2">{name}</td>
                  <td className="border-b border-gray-800 px-4 py-2">
                    {districts.find((d) => d._id === districtID)?.name || "N/A"}
                  </td>
                  <td className="border-b border-gray-800 px-4 py-2">
                    {talukas.find((t) => t._id === talukaID)?.name || "N/A"}
                  </td>
                  <td className="border-b border-gray-800 px-4 py-2">
                    {cities.find((c) => c._id === cityID)?.name || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 text-center text-lg font-semibold text-gray-100">
          Please select district, taluka, and city to view the organizations.
        </div>
      )}
    </div>
  );
}
