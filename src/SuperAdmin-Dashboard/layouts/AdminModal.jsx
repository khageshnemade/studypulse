import React, { useEffect, useState } from "react";
import { LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
         }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-[200] flex items-start justify-end bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mt-12 mr-4 bg-white rounded-md shadow-md w-full max-w-xs p-4 animate-fade-in"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Profile
        </h2>

        {/* Profile */}
        <div className="flex flex-col items-center space-y-2 mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-xl font-semibold flex items-center justify-center">
            {user.userName?.charAt(0)}
          </div>
          <h3 className="text-base font-medium text-gray-800">{user.userName}</h3>
          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
        </div>

        {/* Info */}
        <div className="space-y-2 text-xs text-gray-700">
          <div>
            <span className="font-medium">Email:</span>
            <p className="text-gray-600 break-all">{user?.email || "Not provided"}</p>
          </div>
          <div>
            <span className="font-medium">Profile Completion:</span>
            <p className="text-gray-600">
              {user.profileCompletion ? "Completed" : "Not Completed"}
            </p>
          </div>
          <div>
            <span className="font-medium">Role:</span>
            <p className="text-gray-600">{user.role}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-col space-y-2">
          <button
            onClick={() => {
              navigate("/admin-dashboard/update");
              onClose();
            }}
            className="w-full bg-blue-600 text-white py-1.5 px-3 rounded hover:bg-blue-700 text-sm transition"
          >
            Update Organization
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
