import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const UpdateTeacher = ({ id, setShowUpdateTeacher }) => {
  const teachersData = useSelector((state) => state?.teachers?.teachersData);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [userData, setUserData] = useState({});
  const [teacherData, setTeacherData] = useState({ classId: [] });

  // Fetch teacher data and populate the form when the component mounts or ID changes
  useEffect(() => {
    if (teachersData && teachersData.length > 0) {
      const { teacherData, ...udata } =
        teachersData?.find((s) => s._id === id) || {};

      setTeacherData(teacherData || {});
      setUserData(udata);
      console.log("Teacher Dta",teacherData);
    }
  }, [teachersData, id]);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTeacherDataChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("UserData", userData);
      console.log("Teachdata", teacherData);

      // Make PUT request with only the updated fields
      const res = await makeRequest.put("/admin/update-teacher-data", {
        userData: {
          id: userData._id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber
          
        },
        teacherData: {
          totalYearsOfExperience: teacherData.totalYearsOfExperience,
          gender: teacherData.gender,
          profilePic: teacherData.profilePic,
          status: teacherData.status,
          address: teacherData.address,
        },
      });

      // Log response for debugging
      const message = res.data.message;
      console.log("Response Message:", message);

      // Check if the message exists and is valid
      if (message) {
        toast.success(message); // Display the success message from the response
        console.log("RESPONSE SUCCESS", message);

        // Optional: Close the update modal and navigate
        setShowUpdateTeacher(false);
        navigate("/admin-dashboard/teachers");
      } else {
        toast.error("Unexpected response format.");
      }
    } catch (error) {
      // Display error message if there's an issue with the request
      console.error(error);
      toast.error(error.response?.data?.error || "An error occurred.");
    }

  };

  return (

    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Profile Picture and Update Button */}
      <div className="text-center">
        <img
          src={`data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQEDBAYHAgj/xAA9EAABAwMBBQUFBAkFAQAAAAABAAIDBAUREwYSITFhB0FRcYEUUpGhsSIzwdEVMkJDYnJzgpIjJGOy4TT/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFAgEG/8QAIhEBAAICAgICAwEAAAAAAAAAAAECAxEEIRIxE0EiMjNh/9oADAMBAAIRAxEAPwDuKIiAiIgKiqrc8rIInyyuDI2NLnOPcAkizX11Nb6Z9RWStiiZzc76ea5/eO0Cplc6O0wiCPumlAc8+TeQ9cqB2mv019rjKS5tMw/6ER7h4nqf/FELD5XPvMzXH1DQw8aIjdmfVXq6VZzUXCpcfDULR8BwWC5znOy8lx8Scq62jqXUrqoQSaDTgybvBWVn2tae5lbiIj1DIp6+spSDT1dRHjluSkAei2Sz7d3Kjc1lwArIc8ScNeB0I4H1+K1NF3jz5Mc7rLm2OlvcO4Wi7Ud3pRUUUu+3k5p4Fh8CO5Z64hY7vUWWvZVUxJHKSPukb4Fdnt9ZDX0cVVTu3opWhzT+Hmt3icqM9e/bNz4fjn/GQiIriAREQEREBERAREQFpvadcjS2eKjY7D6t+HY9wcT88LclyztVnL77Sw5+zFTZx1c45/6hVeZea4Z0mwV3khp7STyW4bP7MgsZU3Juc8WQH6u/JYuxlobUyGvqGZjjOI2kcHO8fRbusKlPuWnMvDomOiMTmNMZG6W44Y8FoG0VmfaqnejBdTSH7DueD7pXQ281Wemhq4HQVEbZI3c2uClnH5xpz5ackRblcdiHFxdbagAH91N+YUQ7ZO8h+77Ow9RIMKvOG8T6dRes/aE8l0HsvuJdHVW2R2dzEsY6Hg4fHB9SoGv2TqKK1GqdKHzM+1JG0cA3vwV52AmMO1NKAeErHsPUYz9QFPxZtiz139o80RfHLroVVQKq+jZQiIgIiICIiAiIgoVybtMje/aqNjQSZIIw31JC60tS2wsftV1tl0Z+4dpyt8W8S0+hz8VU5lJvilPx51eHm30raKihpox9mNgHr3lZK9SjD15WTrXTQjt6Yr7ArDFkR9ylxubrzAquC9MCq4cFaiOlffbEnja9jmOGQ4EEeIWibL0T6XbiGlx91I/B/h3Tg/Rb9Ise0Wxrr5UXNwALYhCzx8SfoFDGLzy119O7X1jlsIVVQKq2GeIiICIiAiIgIiICjr2f9tH/AFW/ipFR18H+zafdkb9cfios/wDOUmL94R0w4g9FbV2XixpVpYtvbSr6emLIj7ljNWQwrvG8uymFenHgrTCqk8FaielaY7WpOay7R93Mf+Q/QLDeVmWb/wCVx8ZHfVdcf+rzN+jPREWgqCIiAiIgIiICIiAsK8M37dOBzDd4enFZq8SND2uYeThgrm0brMPazqdoDe3ogRyIVteaThAI3H7TCWHzHBeiMLDs1ag5q+wqwrjCvKyWhktKEq21yqSrEW6RaUeVIWcYt0J94F3xKiKqTche7vwQOp7lPUcelSxRe4wD5KxxO7zKHkdViF5ERX1QREQEREBERAREQFQqqII2vtbZ3Gandoz+8Bwd/MFCx1QdI6GYBkrXFp8CR4FbLWVDaalknfxaxuceK1mKHNOGVADnOy54PvE5KzeZWtZjXtd4s2mJ36X8YVQeKxtyeH7o6zPcecEeR/NPa2D7xkrD4GMn6Kgts0OVueoZEBkkudwa0cS5Y2tPJ9xEWD35fwHNe4oRGS4uL5Dze7mfyHRdeTnTOscLap0lTUDMkUhY1nNrOAPqePNTgUJYXbtZVxe8GSD5g/QKcWvxdfFEwzs+/kkREVhEIiICIiAmUWjdoe3TdnA2gtrI57tK3ew/iynZ3Pf49G9/kg3lQt12r2ftGf0jeaKAj9gzAuPk0cT8FwC4XCuupcbvcqytLuLmyzERn+wYb8ljQsgpxiCKOMfwNAQdkq+1ewxg/o+nuFee7cpzE0+sm6oCr7VL1OHCitNFRjkHzzumd57rQ0emfVc/1eqpq9UG72jbC7Vd0YL9cRPTPPCGOFsUbHdx4ZcfVxXQGkEAt4g8sLhGrnvW4bL7aextbSXLefDybKOJb5qjy8FrflVa4+WK/jLpCLGo6+kroxJSVEcrT7ruKyeOeSzZiY6le2uxxAs33fqhWjxKpNUsjj/1JGsYOZccLVb7ttQULHR0ThU1Hdu/qt8yu4pN51WHE28e7SbZX6ttE1MbPWNp6s/r70QkDmeBB645YKj6TtRv9OAKugt1bx4lj305PyetJrbjNXVL6ipfvSOPw6KxrdVsYMfx0iss7Lfztt1ii7Wre5o/SVpuFKccXRhs7fTdOfkFOUPaJsnWndZeoIXnhuVTXQHPTfAz6LhesqGUOGHcR4FSo30zTVVPVM36aeKZvvRvDh8leXy1FFDBM2amb7PO05bLTkxvb5FuF1ns128nr6ltjv0ofVuGaSrOBr45scBw3wOPDmPJB0xERBH3+609js1ZdKw4hpYjI4Z5+AHUnA9V8y1NfU19ZUV9e/frKp+pM7uz4DoBgDyXVe3u8ez2i3WdjsOrJjNKAf2I8ED1cW/4lcX1uqCQ1k1lH63VNbqgkNZNZR+t1TW6oJDWTWUfrdU1uqCTirJYHb0Mr4z4scQs0bRXYNwLjU4/qFa/rJrLmaVn3D2LTHqUvUXOrqjmoqppP5nkrH1Vgayay9iIj083Ms/VTVWBrJrdV6M/VTVWBrdU1uqDP1UM0jHNlgkMU0bg+KRvNjxxa70KwNbqmr1QfT+xO0DNptm6O5ANbM9u5URg/dyt4OHx4joQp5cN7Cr77LfqyySOxDXM14sngJW4BHq3H+K7kg+be2m7+37eVMLTmOgiZTt48N7G+75uA/tWi6ylO0C2Xe0bU17b3Hu1FRO+ZsjeLJGuOQWnvHd0wtb1SgkNVNVR+sVXWKDP1k1lH6pTVKCQ1k1lH6pTVKCQ1k1lH6pTVKCQ1k1lH6pTVKCQ1k1lH6pTVKCQ1k1lH6pTVKCQ1k1lH6pTVKCcs13ls94obnATv0lQ2XA/aAP2m+oyPVfXFHVRVtHBV0zw+CeNssbxxDmuGQfgV8Wte5zg1uXOJwGjmV9F7Dx7fW7ZS20n6Kot2KLDBU1hZIGZJaHNDDjAwMZ80G67VbM2nai2+xXimEsYO9G8HdfG7xae5fJW1FuhtN/rbfTOkdFTybjXSEFxGO/ACqiCKREQEREBERAREQEREBERAREQFUIiD6M7HNhrHTWmj2gdA+ouEjQ5j53bwhOAfsDAAPU5PVdV3QiIP//Z`}
          alt="Profile"
          className="w-28 h-28 mx-auto rounded-full border-4 border-gray-300 shadow-md"
        />
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Update
        </button>
      </div>

      {/* Update Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">


            <h2 className="text-2xl font-semibold mb-4">Update Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userData.firstName}
                    onChange={handleUserDataChange}
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userData.lastName}
                    onChange={handleUserDataChange}
                  />
                </div>
              </div>

              {/* Phone Number and Address */}
              <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userData.phoneNumber}
                    onChange={handleUserDataChange}
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={teacherData.address}
                    onChange={handleTeacherDataChange}
                  />
                </div>
              </div>

              {/* Experience and Gender */}
              <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="totalYearsOfExperience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Experience Years
                  </label>
                  <input
                    type="number"
                    id="totalYearsOfExperience"
                    name="totalYearsOfExperience"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={teacherData.totalYearsOfExperience}
                    onChange={handleTeacherDataChange}
                  />
                </div>

              
              </div>

              <div className="flex-1">
      <label
        htmlFor="gender"
        className="block text-sm font-medium text-gray-700"
      >
        Gender
      </label>
      <select
        id="gender"
        name="gender"
        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={teacherData.gender}
        onChange={handleTeacherDataChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>



              <div className="flex-1">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  type="text"
                  id="status"
                  name="status"
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={teacherData.status}
                  onChange={handleTeacherDataChange}
                >
                  <option value="">Select Status</option>
                  <option value="pending">pending</option>
                  <option value="rejected">rejected</option>
                  <option value="accepted">accepted</option>

                </select>
              </div>
              {/* Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Tabs for Data */}
      <div className="mt-8">
        <div className="flex border-b border-gray-300">
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-2 text-center font-semibold ${activeTab === "userData"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
              }`}
          >
            About
          </button>

          <button
            onClick={() => setActiveTab("qualificationData")}
            className={`flex-1 py-2 text-center font-semibold ${activeTab === "qualificationData"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
              }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab("experienceData")}
            className={`flex-1 py-2 text-center font-semibold ${activeTab === "experienceData"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
              }`}
          >
            Experience
          </button>
        </div>

        {/* Data Content */}
        <div className="mt-4">
          {activeTab === "about" && (

            <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">About</h2>

              {/* User and Teacher Information displayed in two rows */}
              <div className="grid grid-cols-2 gap-6">
                {/* User Information */}

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <ul className="space-y-4">
                    <li className="flex justify-between"><strong>First Name:</strong> <span className="text-gray-900">{userData.firstName}</span></li>
                    <li className="flex justify-between"><strong>Last Name:</strong> <span className="text-gray-900">{userData.lastName}</span></li>
                    <li className="flex justify-between"><strong>Phone Number:</strong> <span className="text-gray-900">{userData.phoneNumber}</span></li>
                    <li className="flex justify-between"><strong>Address:</strong> <span className="text-gray-900">{teacherData.address}</span></li>
                    <li className="flex justify-between"><strong>Role:</strong> <span className="text-gray-900">{userData.role}</span></li>
                    <li className="flex justify-between"><strong>Email Address:</strong> <span className="text-gray-900">{userData.email}</span></li>
                    <li className="flex justify-between"><strong>City:</strong> <span className="text-gray-900">{userData?.cityData?.name}</span></li>
                    <li className="flex justify-between"><strong>Taluka:</strong> <span className="text-gray-900">{userData?.talukaData?.name}</span></li>
                    <li className="flex justify-between"><strong>District:</strong> <span className="text-gray-900">{userData?.districtData?.name}</span></li>
                  </ul>
                </div>

                {/* Teacher Information Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <ul className="space-y-4">
                    <li className="flex justify-between"><strong>Total Years of Experience:</strong> <span className="text-gray-900">{teacherData.totalYearsOfExperience}</span></li>
                    <li className="flex justify-between"><strong>Gender:</strong> <span className="text-gray-900">{teacherData.gender}</span></li>
                    <li className="flex justify-between"><strong>Status:</strong> <span className="text-gray-900">{teacherData.status}</span></li>
                    {teacherData?.subjectData?.map((e, i) => (
                      <li key={i} className="flex justify-between"><strong>Subject-{i + 1}:</strong> <span className="text-gray-900">{e.name}</span></li>
                    ))}
                    {teacherData.classData?.map((e, i) => (
                      <li key={i} className="flex justify-between"><strong>Class-{i + 1}:</strong> <span className="text-gray-900">{e.name}</span></li>
                    ))}
                  </ul>
                </div>


              </div>
            </div>

          )}



          {activeTab === "qualificationData" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <h2 className="font-bold text-gray-700 col-span-full text-center">Education</h2>

              {teacherData?.qualification && Object.keys(teacherData?.qualification).map((key) => (
                <div key={key} className="bg-white shadow-lg rounded-lg p-6 mb-4">
                  <h3 className="text-xl text-center text-gray-800 mb-4 font-bold">{key.toUpperCase()}</h3>
                  <ul className="space-y-3 text-gray-600">
                    {Object.entries(teacherData?.qualification[key]).map(([field, value]) => (
                      <li key={field} className="flex justify-between items-center text-wrap">
                        <strong className="text-gray-700">{field.replace(/([A-Z])/g, ' $1')}: </strong>
                        <span className="text-gray-500">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>


          )}

          {activeTab === "experienceData" && (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
              <h2 className="font-bold text-gray-700 col-span-full text-center">Experience</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teacherData?.experience?.map((experience) => (
                  <div key={experience._id} className="bg-white rounded-lg shadow-lg p-4">
                    <h4 className="text-xl font-medium text-gray-700 mb-3">Experience</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <strong>Designation:</strong> {experience.designation}
                      </li>
                      <li>
                        <strong>Organization Name:</strong> {experience.organizationName}
                      </li>
                      <li>
                        <strong>Start Date:</strong> {new Date(experience.startDate).toLocaleDateString()}
                      </li>
                      <li>
                        <strong>End Date:</strong> {new Date(experience.endDate).toLocaleDateString()}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};





