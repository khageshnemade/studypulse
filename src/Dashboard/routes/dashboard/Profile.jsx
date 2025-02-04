import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseAPI, getHeaders } from "../../../utils/apiConfig";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileStart, fetchProfileSuccess, updateProfile } from "../../../redux/features/profileSlice";

const Profile = () => {
    // const [profileData, setProfileData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch()
    const { profileData = {}, loading, error } = useSelector((state) => state.profile);






    // Class Assigned
    const [class_assigned, setClass_assigned] = useState([])

    const selectClass = async (e) => {
        const result = await fetch(`${baseAPI}/admin/get_class`);
        const data = await result.json()
        setClass_assigned(data)

    }

    const fetchProfileData = async () => {
        dispatch(fetchProfileStart())
        try {
            const response = await axios.get(`${baseAPI}/student/profiledetails/`, {
                headers: getHeaders()
            })
            dispatch(fetchProfileSuccess(response.data[0]))



        } catch (err) {
            console.error("Error fetching profile data:", err);
            dispatch(fetchProfileFailure(err.message));
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put(
                `${baseAPI}/student/profiledetails/`,
                profileData,
                { headers: getHeaders() }
            );
            console.log("Profile updated:", response.data);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateProfile({ [name]: value }))
    };

    useEffect(() => {
        fetchProfileData();
        selectClass()
    }, [dispatch]);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600 mt-10">{error}</div>;
    }

    return (
        <>
            {/* <h1 className="text-3xl font-extrabold text-center text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Profile
            </h1>      */}
            <div className="min-h-screen bg-gray-100 flex items-start justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">

                    <div className="flex flex-col space-y-10">
                        {/* Dynamic Avatar */}
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                                {profileData?.first_name?.[0]?.toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {profileData?.first_name} {profileData?.last_name}
                                </h2>
                                <p className="text-gray-500">{profileData?.email}</p>
                            </div>
                        </div>

                        {/* Profile Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={profileData.first_name}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                    className="w-full p-3 border rounded-lg"
                                    disabled={!isEditing}
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={profileData.last_name}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                    className="w-full p-3 border rounded-lg"
                                    disabled={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">Class</label>
                                <select
                                    name="class_assigned"
                                    value={profileData.class_assigned || ""}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg"
                                    disabled={!isEditing}
                                >
                                    <option value="" disabled >Select Class</option>
                                    {class_assigned.map((cls) => {
                                        return (
                                            <>
                                                <option key={cls.id} value={cls.id}> {cls.grade}th  </option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>


                            <div>
                                <label className="block font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full p-3 border rounded-lg"
                                    disabled={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={profileData.gender}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg"
                                    disabled={!isEditing}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>


                            <div>
                                <label className="block font-semibold mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={profileData.dob}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg"
                                    disabled={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">Mobile</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={profileData.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter your mobile number"
                                    className="w-full p-3 border rounded-lg"
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="flex justify-end space-x-4 mt-10">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleUpdateProfile}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        Update Profile
                                    </button>
                                )}
                            </div>


                        </div>

                        {/* Action Buttons */}

                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
