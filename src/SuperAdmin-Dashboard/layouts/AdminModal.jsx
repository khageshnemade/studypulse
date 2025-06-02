import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LogOut, X } from "lucide-react";

const AdminModal = ({ onClose }) => {
  // Close modal on outside click
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user object from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
    
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-[200] flex items-start justify-end bg-black bg-opacity-50"
    >
      <div
        className="relative  p-6 max-w-[40%] md:w-[400px] animate-fade-in"
        onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the overlay
      >
        {/* Modal Content */}
        <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
            Profile Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl font-semibold">
                {user.userName?.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {user.userName}
              </h3>
              <p className="text-gray-600">{user.role}</p>
            </div>

            <div className="flex flex-col space-y-4">
              <div>
                <span className="font-semibold text-gray-700">Email:</span>
                <p className="text-gray-600">{user?.user
                }</p>
              </div>

              <div>
                <span className="font-semibold text-gray-700">
                  Profile Completion:
                </span>
                <p className="text-gray-600">
                  {user.profileCompletion ? "Completed" : "Not Completed"}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Role:</span>
                <p className="text-gray-600">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
