import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function UpdateAdmin() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const location = useLocation();
  const admin = location.state || {};

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState({
    email: admin.admin.email,
    password: admin.admin.password,
    phoneNumber: admin.admin.phoneNumber,
    firstName: admin.admin.firstName,
    lastName: admin.admin.lastName,
  });


  useEffect(() => {
    if (admin && Object.keys(admin).length > 0) {
      setAdminData(admin);

    }
  }, [admin]);


  const updateAdminData = (name, value) => {
    console.log("Admin Data", name, value);
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleAdminUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await makeRequest.put(`https://api.studypulse.live/web/api/superAdmin/admin/${adminData.admin._id}`,
        {
          email: adminData.email,
          phoneNumber: adminData.phoneNumber,
          firstName: adminData.firstName,
          lastName: adminData.lastName,
          status: adminData.status,
          organisationID: adminData.orgId,
        }
      );
      console.log("Admin updated successfully:", response.data);
      toast.success("Admin updated successfully.", {
        autoClose: 1500
      })

      setTimeout(() => { navigate("/superadmin-dashboard/admins",{state:{orgId:adminData.admin.organizationID}}) }, 1700)

    } catch (err) {
      console.error("Error updating admin:", err);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/*Update Admin*/}
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Update Admin
          </h2>
        </div>
        <form onSubmit={handleAdminUpdate} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-900 dark:text-slate-50"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={adminData.email}
              onChange={(e) => updateAdminData(e.target.name, e.target.value)}
              required
              placeholder="Enter admin's email"
              className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-slate-900 dark:text-slate-50"
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={adminData.phoneNumber}
              onChange={(e) => updateAdminData(e.target.name, e.target.value)}
              required
              placeholder="Enter phone number"
              className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
            />
          </div>

          {/* First Name Field */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-slate-900 dark:text-slate-50"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={adminData.firstName}
              onChange={(e) => updateAdminData(e.target.name, e.target.value)}
              required
              placeholder="Enter first name"
              className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-slate-900 dark:text-slate-50"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={adminData.lastName}
              onChange={(e) => updateAdminData(e.target.name, e.target.value)}
              required
              placeholder="Enter last name"
              className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
            />
          </div>

          {/* Status Field */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-900 dark:text-slate-50"
            >
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={adminData.status}
              onChange={(e) => updateAdminData(e.target.name, e.target.value)}
              className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
            >
              <option selected disabled value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inActive">Inactive</option>
            </select>
          </div>



          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <div className="flex justify-between items-center space-x-4">
            {/* Back Link */}
            <button
      onClick={() => {
        navigate('/superadmin-dashboard/admins', {
          state: { orgId: admin.admin.organizationID }
        });
      }
    }
      className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition"
    >
      Back
    </button>

            {/* Update Admin Button */}
            <button
              type="submit"
              className={`w-full sm:w-3/4 py-3 text-white font-semibold rounded-lg ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-900"} focus:ring-2 focus:ring-blue-400`}
              disabled={isLoading}
            >
              {isLoading ? "Updating Admin..." : "Update Admin"}
            </button>


          </div>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
