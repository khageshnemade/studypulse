import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { Link, useLocation, useNavigate } from "react-router-dom"; // For navigation
import { Pencil, User2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [orgId, setOrgId] = useState("");
  const [adminId, setAdminId] = useState("");
  const navigate = useNavigate(); // Hook for navigation
  const { orgId: initialOrgId } = useLocation()?.state || {};

  const fetchOrgs = async () => {
    try {
      const res = await makeRequest.get(`/superAdmin/admin/get-all-org`);

      console.log("Fetching repositories");

      setOrgs(res?.data?.data);

      console.log("Organizations", res?.data?.data);
    } catch (error) {
      console.error("Error fetching Admins:", error.message);
      toast.error(error.response.data.message);
    }
  };

  const fetchAdmins = async (Id) => {
    try {
      const res = await makeRequest.get(
        `/superAdmin/admin/get-all-admin?organisationID=${orgId}`
      );

      console.log("Admins Are:", res?.data?.data);

      if (res?.data?.data) {
        setAdmins(res.data.data); // Set state properly
        const data = res.data.data.filter((a) => a.organizationID === orgId);

        if (data) {
          setAdminId(data._id); // Use the first element
        }
      }
    } catch (error) {
     
        setAdmins([])
       
      console.error("Admin Problem:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOrgs();
    setOrgId(initialOrgId || "");
  }, []);

  useEffect(() => {
    if (orgId) {
      fetchAdmins();
    }
  }, [orgId]);

  return (
    <div className="container mx-auto p-6 max-w-7xl bg-blue-400 min-h-screen">
      <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
        <User2 className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
        Admin List
      </p>

      <div className="flex justify-between items-center mb-6 max-w-lg mx-auto">
        <Link
          to="/superadmin-dashboard"
          className="text-lg font-semibold text-white hover:text-gray-200 transition"
        >
          Back
        </Link>

        <select
          id="org"
          name="org"
          onChange={(e) => setOrgId(e.target.value)}
          className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        >
          <option value="s">Select Organization</option>
          {orgs.map((org) => (
            <option key={org._id} value={org._id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>

      {admins.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {admins.map((admin) => (
            <div
              key={admin._id}
              className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-300"
            >
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {admin.firstName} {admin.lastName}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  Email: {admin.email}
                </p>
                <p className="text-gray-600 text-sm">
                  Phone: {admin.phoneNumber}
                </p>
                <p className="text-gray-700 font-medium mt-2">
                  Role: {admin.role}
                </p>
                <p
                  className={`text-sm font-semibold mt-2 ${
                    admin.status === "active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Status: {admin.status}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/superadmin-dashboard/updateAdmin`, {
                    state: { admin: admin },
                  })
                }
                className="w-full py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
              >
                <Pencil size={18} className="inline-block mr-2" />
                Update
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No admins found.</p>
      )}
      <ToastContainer />
    </div>
  );
}
