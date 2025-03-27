import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { toast, ToastContainer } from "react-toastify";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateAdmin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  const updateAdminData = (name, value) => {
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
      toast.error(error?.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDistricts = async () => {
    try {
      const res = await makeRequest.get("/districts");
      setDistricts(res?.data?.data);
      setTalukas([]);
      setCities([]);
      setName("");
    } catch (error) {
      console.error("Error : ", error.message);
      toast.error("Error: ", error.message);
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
      console.error("Error:", error?.message);
      toast.error("Please select Taluka Name");
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
      setCities([]);
    } catch (error) {
      console.error("Error :", error?.response.data.message);
      if (error?.response.data.message === "District id is required")
        toast.error("Please select district Name");
      else toast.error(error.message);
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
      console.error("Error No organizations are in this:", error.message);
      toast.error("Please select city Name or No organisation in this City");
      setOrgs([]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8">
        {/* Form Header */}
        <div>
          <p className="text-center text sm:text-xl md:text-2xl font-serif p-2 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto m-3 drop-shadow-lg border-[1.5px] border-blue-800">
            <UserPlus className="text sm:text-xl md:text-2xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce text-blue-600" />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Create New Admin
            </span>
          </p>

          <p className="mt-2 text-center text-lg text-gray-900">
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
  <div className="space-y-1">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Email:
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={adminData.email}
      onChange={(e) => updateAdminData(e.target.name, e.target.value)}
      required
      autoComplete="email"
      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>

  <div className="space-y-1 relative">
  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    Password:
  </label>
  <input
    type={isPasswordVisible ? "text" : "password"}
    id="password"
    name="password"
    value={adminData.password}
    onChange={(e) => updateAdminData(e.target.name, e.target.value)}
    required
    minLength={6}
    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  />
  <span
    onClick={togglePasswordVisibility}
    className="absolute top-[60%] right-3 transform -translate-y-1/2 cursor-pointer text-xl"
  >
    {isPasswordVisible ? "🔓" : "🔒"}
  </span>
</div>


  <div className="space-y-1">
    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
      Phone Number:
    </label>
    <input
      type="tel"
      id="phoneNumber"
      name="phoneNumber"
      value={adminData.phoneNumber}
      onChange={(e) => updateAdminData(e.target.name, e.target.value)}
      required
      maxLength="10"
      minLength="10"
      title="Phone number must be exactly 10 digits"
      placeholder="Enter 10-digit phone number"
      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>

  <div className="space-y-1">
    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
      First Name:
    </label>
    <input
      type="text"
      id="firstName"
      name="firstName"
      value={adminData.firstName}
      onChange={(e) => updateAdminData(e.target.name, e.target.value)}
      required
      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>

  <div className="space-y-1">
    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
      Last Name:
    </label>
    <input
      type="text"
      id="lastName"
      name="lastName"
      value={adminData.lastName}
      onChange={(e) => updateAdminData(e.target.name, e.target.value)}
      required
      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>

  {/* Select Fields */}
  <div className="space-y-1">
    <label htmlFor="did" className="block text-sm font-medium text-gray-700">
      District Name:
    </label>
    <select
      id="did"
      name="did"
      onChange={(e) => { setDistrictId(e.target.value); fetchTalukas(e.target.value); }}
      required
      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
      <option value="">Select District</option>
      {districts?.map((district) => (
        <option key={district._id} value={district._id}>
          {district.name}
        </option>
      ))}
    </select>
  </div>

  <div className="space-y-1">
    <label htmlFor="tid" className="block text-sm font-medium text-gray-700">
      Taluka Name:
    </label>
    <select
      id="tid"
      name="tid"
      onChange={(e) => { settalukaId(e.target.value); fetchCities(e.target.value); }}
      required
      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
      <option value="">Select Taluka</option>
      {talukas?.map((taluka) => (
        <option key={taluka._id} value={taluka._id}>
          {taluka.name}
        </option>
      ))}
    </select>
  </div>

  <div className="space-y-1">
    <label htmlFor="cid" className="block text-sm font-medium text-gray-700">
      City Name:
    </label>
    <select
      id="cid"
      name="cid"
      onChange={(e) => { fetchOrgs(e.target.value); setCityId(e.target.value); }}
      required
      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
      <option value="">Select City</option>
      {cities?.map((city) => (
        <option key={city._id} value={city._id}>
          {city.name}
        </option>
      ))}
    </select>
  </div>

  <div className="space-y-1">
    <label htmlFor="oid" className="block text-sm font-medium text-gray-700">
      Organization Name:
    </label>
    <select
      id="oid"
      name="oid"
      onChange={(e) => setOrgId(e.target.value)}
      required
      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
      <option value="">Select Organization</option>
      {orgs?.map((org) => (
        <option key={org._id} value={org._id}>
          {org.name}
        </option>
      ))}
    </select>
  </div>
</div>


          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-md text-white font-semibold ${isLoading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600 focus:ring-2 focus:ring-blue-400"} transition`}
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
