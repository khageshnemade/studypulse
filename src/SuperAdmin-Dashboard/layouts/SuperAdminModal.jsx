import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { User, LogOut, X } from "lucide-react";

const SuperAdminModal = ({ onClose }) => {

    const navigate = useNavigate();

   

    // Close modal on outside click
    const handleOutsideClick = (e) => {
        if (e.target.id === "modal-overlay") {
            onClose();
        }
    };
    const [showModal, setShowModal] = useState(false);
  
    const handleLogout = () => {
      localStorage.removeItem("user");
    localStorage.removeItem("student");
    console.log("logging out");
    navigate("/login");
      console.log("Logged out");
      setShowModal(false); // Close the modal after logging out
    };
    const handleProfile = () => {
        onClose();
        navigate('profile')
    }

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <div
            id="modal-overlay"
            className="fixed inset-0 z-[200] flex items-start justify-end bg-black bg-opacity-50"
        >
            <div
                className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-lg p-6 shadow-xl w-[250px] mt-16 mr-6 animate-fade-in"
                onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the overlay
            >
                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full shadow-md hover:bg-gray-300 hover:scale-110 transition-transform duration-300 animate-button-pop"
                >
                    <X className="text-gray-600 hover:text-gray-800" size={20} />
                </button>


                {/* Modal Content */}
                <ul className="space-y-4">
                    {/* <li>
                        <button
                            onClick={handleProfile}
                            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-full py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            <User className="mr-2" size={20} />
                            Profile
                        </button>
                    </li> */}
                      <li>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700 text-white w-full py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <LogOut className="mr-2" size={20} />
          Logout
        </button>
      </li>
                </ul>
              
            </div>
            {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
    );
};

export default SuperAdminModal;
