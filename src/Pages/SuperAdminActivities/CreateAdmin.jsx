import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { toast, ToastContainer } from "react-toastify";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateAdmin() {
  const [name, setName] = useState("");
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [cities, setCities] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [talukaId, settalukaId] = useState("");
  const [orgId, setOrgId] = useState("");
  const [cityId, setCityId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
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

  const updateAdminData = (name, value) => {
    console.log("Admin Data", name, value);
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await makeRequest.post("/superAdmin/admin/signup", {
        ...adminData,
        cityID: cityId,
        talukaID: talukaId,
        districtID: districtId,
        organizationID: orgId,
      });
      console.log("Adminn Data:", res.data);
      toast.success(res?.data?.message);

      if (res.status === 200 || res.status === 201) {
        setTimeout(() => {
          navigate("/superadmin-dashboard");
        }, 2000); // Delay navigation by 2 seconds
      }

      setName("");
    } catch (error) {
      console.error("Error creating Admin:", error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
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
    setDistrictId(Id);
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
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8">
        {/* Form Header */}
        <div>
          <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
            <UserPlus className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
            Create New Admin
          </p>

          <p className="mt-2 text-center text-sm text-slate-200">
            Fill in the details to add a new admin
          </p>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleAdminSubmit}
          className="mt-8 space-y-6 bg-white p-6 shadow-xl rounded-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Input Fields */}
            {[
              {
                label: "Email",
                name: "email",
                type: "email",
                autoComplete: "email",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                minLength: 6,
              },
              {
                label: "Phone Number",
                name: "phoneNumber",
                type: "tel",
                maxLength: "10",
                minLength: "10",
                title: "Phone number must be exactly 10 digits",
                placeholder: "Enter 10-digit phone number",
              },
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
            ].map((field) => (
              <div key={field.name} className="space-y-1">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}:
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={adminData[field.name]}
                  onChange={(e) =>
                    updateAdminData(e.target.name, e.target.value)
                  }
                  required
                  {...(field.minLength && { minLength: field.minLength })}
                  {...(field.maxLength && { maxLength: field.maxLength })}
                  {...(field.pattern && { pattern: field.pattern })}
                  {...(field.title && { title: field.title })}
                  {...(field.placeholder && { placeholder: field.placeholder })}
                  {...(field.autoComplete && {
                    autoComplete: field.autoComplete,
                  })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            ))}

            {/* Select Fields */}
            {[
              {
                id: "did",
                label: "District Name",
                options: districts,
                onChange: (e) => {
                  setDistrictId(e.target.value);
                  fetchTalukas(e.target.value);
                },
              },
              {
                id: "tid",
                label: "Taluka Name",
                options: talukas,
                onChange: (e) => {
                  settalukaId(e.target.value);
                  fetchCities(e.target.value);
                },
              },
              {
                id: "cid",
                label: "City Name",
                options: cities,
                onChange: (e) => {
                  fetchOrgs(e.target.value);
                  setCityId(e.target.value);
                },
              },
              {
                id: "oid",
                label: "Organization Name",
                options: orgs,
                onChange: (e) => setOrgId(e.target.value),
              },
            ].map(({ id, label, options, onChange }) => (
              <div key={id} className="space-y-1">
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {label}:
                </label>
                <select
                  id={id}
                  name={id}
                  onChange={onChange}
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled selected>
                    Select {label}
                  </option>
                  {options?.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-md text-white font-semibold ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"} transition`}
            disabled={isLoading}
          >
            {isLoading ? "Creating Admin..." : "Create Admin"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
