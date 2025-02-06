import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import the loader
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS
const apiUrl = import.meta.env.VITE_APP_API_URL;



function RegisterForm() {
  const [district, setDistrict] = useState([]);
  const [taluka, setTaluka] = useState([]);
  const [city, setCity] = useState([]);
  const [organization, setOrganization] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("");


  useEffect(() => {
    fetchDistrict()
  }, []);

  // Update taluka based on selected district
  useEffect(() => {
    console.log('====================================');
    console.log("District");
    console.log('====================================');
    if (selectedDistrict) {
      const fetchedTalukas = [
        { id: 1, name: 'Taluka 1', districtId: 1 },
        { id: 2, name: 'Taluka 2', districtId: 1 },
        { id: 3, name: 'Taluka 3', districtId: 2 },
        { id: 4, name: 'Taluka 4', districtId: 2 },
      ];

      const filteredTalukas = fetchedTalukas.filter(
        (taluka) => taluka.districtId === parseInt(selectedDistrict)
      );
      setTaluka(filteredTalukas);
    } else {
      setTaluka([]);
      setCity([]);
      setOrganization([]); // Reset Organization when district changes
    }
  }, [selectedDistrict]);

  // Update cities based on selected taluka
  useEffect(() => {
    console.log('====================================');
    console.log("Taluka");
    console.log('====================================');
    if (selectedTaluka) {
      const fetchedCities = [
        { id: 1, name: 'City 1', talukaId: 1 },
        { id: 2, name: 'City 2', talukaId: 1 },
        { id: 3, name: 'City 3', talukaId: 2 },
        { id: 4, name: 'City 4', talukaId: 2 },
      ];

      const filteredCities = fetchedCities.filter(
        (city) => city.talukaId === parseInt(selectedTaluka)
      );
      setCity(filteredCities);
    } else {
      setCity([]);
      setOrganization([]); // Reset Organization when taluka changes
    }
  }, [selectedTaluka]);

  // Update organizations based on selected city
  useEffect(() => {
    console.log('====================================');
    console.log("Hii");
    console.log('====================================');
    fetchDistrict()
    if (selectedCity) {
      const fetchedOrganizations = [
        { id: 1, name: 'Organization 1', cityId: 1 },
        { id: 2, name: 'Organization 2', cityId: 2 },
        { id: 3, name: 'Organization 3', cityId: 3 },
        { id: 4, name: 'Organization 4', cityId: 4 },
      ];

      const filteredOrganizations = fetchedOrganizations.filter(
        (organization) => organization.cityId === parseInt(selectedCity)
      );
      setOrganization(filteredOrganizations);
    } else {
      setOrganization([]);
    }
  }, [selectedCity]);



  // Fetch District data
  const fetchDistrict = async () => {
    try {
      const res = await axios.get(`${apiUrl}/districts`);
      setDistrict(res.data.data);
    } catch (error) {
      console.error("Error fetching district data:", error);
    }
  };

  // Fetch Taluka data based on districtId
  const fetchTaluka = async (districtId) => {
    try {
      const res = await axios.get(`${apiUrl}/get-taluka-by-district-id?districtId=${districtId}`);
      setTaluka(res.data.data);
    } catch (error) {
      console.error("Error fetching taluka data:", error);
    }
  };

  // Fetch City data based on districtId and talukaId
  const fetchCities = async (districtId, talukaId) => {
    try {
      const res = await axios.get(`${apiUrl}/get-cities-by-district-id-and-taluka-id?districtId=${districtId}&talukaId=${talukaId}`);
      setCity(res.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Fetch Organization data based on districtId, talukaId, and cityId
  const fetchOrganization = async (districtId, talukaId, cityId) => {
    try {
      const res = await axios.get(
        `${apiUrl}/get-org-by-district-taluka-city-id?districtId=${districtId}&talukaId=${talukaId}&cityId=${cityId}`
      );
      console.log("Organization Data:", res.data); // Check the response
      setOrganization(res.data.data); // Update state with organization data
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  };


  // Event handlers for dropdown selections
  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    setSelectedDistrict(selectedDistrictId);
    setSelectedTaluka(""); // Reset taluka selection
    setSelectedCity("");   // Reset city selection
    setSelectedOrganization(""); // Reset organization selection
    fetchTaluka(selectedDistrictId); // Fetch talukas for the selected district
  };

  const handleTalukaChange = (e) => {
    const selectedTalukaId = e.target.value;
    setSelectedTaluka(selectedTalukaId);
    setSelectedCity("");   // Reset city selection
    setSelectedOrganization(""); // Reset organization selection
    fetchCities(selectedDistrict, selectedTalukaId); // Fetch cities for the selected district and taluka
  };

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    setSelectedCity(selectedCityId);
    setSelectedOrganization(""); // Reset organization selection
    fetchOrganization(selectedDistrict, selectedTaluka, selectedCityId); // Fetch organization data
  };



  const handleOrganizationChange = (e) => {
    setSelectedOrganization(e.target.value);
  };




  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    cityID: "",
    talukaID: "",
    districtID: "",
    organizationID: ""
  })


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  // Loading state


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));


  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData.password !== formData.confirm) {
    //     toast.error("Passwords do not match!");  // Show error toast
    //     return;  // Prevent form submission if passwords don't match
    // }

    setLoading(true);  // Set loading to true when form is submitted


    // console.log(typeof formData.class_assigned,formData.class_assigned)
    //number to string
    try {
      const dataToSend = {
        ...formData,
        phoneNumber: formData.phoneNumber.replace(/\s+/g, ""), // Remove spaces from the phone number
        cityID: selectedCity,
        districtID: selectedDistrict,
        talukaID: selectedTaluka,
        organizationID: selectedOrganization
      };
      const response = await axios.post(`${apiUrl}/teacher/signup`, dataToSend);

      if (response.status === 200 || response.status === 201) {
        console.log("RD : ", response.data);

        // Clear form fields by resetting formData
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          cityID: "",
          talukaID: "",
          districtID: "",
          organizationID: ""
        });



        setTimeout(() => {
          navigate("/login");
        }, 3000);

        toast.success("Registration successful!");




      } else {
        toast.error("Registration failed. Please try again.");  // Display error toast on failure
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`);  // Display error toast with error message
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Hide loader after 3 seconds
    }

  }

  return (
    <>

      <form onSubmit={handleSubmit} className="account-form d-flex justify-content-center align-items-center flex-wrap">
        <div className="col-md-6 mb-1 d-flex justify-content-center align-items-center">
          <label className="col-md-4 new_label" htmlFor="firstName">First Name : </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            maxLength={150}
            minLength={1}
            className="form-control text-center col-md-8 border border-black focus:border-blue-700"
          />
        </div>

        <div className="col-md-6 mb-1 d-flex justify-content-center align-items-center">
          <label className="col-md-4 new_label" htmlFor="lastName">Last Name :</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            maxLength={150}
            minLength={1}
            className="form-control text-center col-md-8 border border-black focus:border-blue-700"
          />
        </div>

        <div className="col-md-6 mb-1 d-flex justify-content-center align-items-center">
          <label className="col-md-4 new_label" htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={254}
            className="form-control text-center col-md-8 border border-black focus:border-blue-700"
          />
        </div>

        <div className="col-md-6 mb-1 d-flex justify-content-center align-items-center">
          <label className="col-md-4 new_label" htmlFor="phoneNumber">Mobile :</label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            maxLength={10}
            pattern="\d{10}"
            inputMode="numeric"
            onInvalid={(e) => e.target.setCustomValidity('Please enter ten digits')}
            onInput={(e) => e.target.setCustomValidity('')} // Reset error message on valid input    
            className="form-control text-center col-md-8 border border-black focus:border-blue-700"
          />
        </div>

        <div className="col-md-6 mb-1 d-flex justify-content-center align-items-center">
          <label className="col-md-4 new_label" htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            maxLength={128}
            minLength={4}
            className="form-control text-center col-md-8 border border-black focus:border-blue-700"
          />
        </div>

        <div className="col-md-6 mb-1 d-flex justify-content-center align-items-center">
          <label className="col-md-4 new_label" htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            required
            className="form-control text-center col-md-8 border border-black focus:border-blue-700"
          />
        </div>

        {/* District Dropdown */}
        <div className="col-md-6 mb-1 d-flex justify-content-center align-items-center">
          <label className="col-md-4 new_label" htmlFor="district">
            District:
          </label>
          <select
            name="district"
            id="district"
            value={selectedDistrict}
            onChange={(e) => {
              handleDistrictChange(e);
              fetchTaluka(e.target.value); // Call fetchTaluka with the selected district ID
            }}
            required
            className="contact-form  border border-black focus:border-blue-700"
          >
            <option value="" disabled>
              Select District
            </option>
            {district.map((d) => {
              return (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* Taluka Dropdown - Show only if a district is selected */}
        <div className="col-md-6 mb-1 d-flex justify-content-center align-items-center">
          <label className="col-md-4 new_label" htmlFor="taluka">
            Taluka:
          </label>
          <select
            name="taluka"
            id="taluka"
            value={selectedTaluka}
            onChange={(e) => {
              handleTalukaChange(e);
            }}
            required
            className="contact-form  border border-black focus:border-blue-700"
            disabled={!selectedDistrict} // Disable Taluka if no district is selected
          >
            <option value="" disabled>
              Select Taluka
            </option>
            {taluka.map((t) => {
              return (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* City Dropdown */}
        <div className="col-md-6 mb-1 d-flex justify-content-center align-items-center">
          <label className="col-md-4 new_label" htmlFor="city">
            City:
          </label>
          <select
            name="city"
            id="city"
            value={selectedCity}
            onChange={(e) => {
              handleCityChange(e);
            }}
            required
            className="contact-form  border border-black focus:border-blue-700"
            disabled={!selectedTaluka} // Disable City if no taluka is selected
          >
            <option value="" disabled>
              Select City
            </option>
            {city.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Organization Dropdown */}
        <div className="col-md-6 mb-1 d-flex justify-content-center align-items-center">
          <label className="col-md-4 new_label" htmlFor="organization">
            Organization:
          </label>
          <select
            name="organization"
            id="organization"
            value={selectedOrganization}
            onChange={handleOrganizationChange}
            required
            className="contact-form  border border-black focus:border-blue-700"
            disabled={!selectedCity} // Disable Organization if no city is selected
          >
            <option value="" disabled>
              Select Organization
            </option>
            {organization.map((org) => (
              <option key={org._id} value={org._id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>



        {loading ? (
          <div className="d-flex justify-content-center align-items-center w-100">
            <ClipLoader color="#007bff" loading={loading} size={50} />
          </div>
        ) : (
          <div className="col-md-6 mt-4">
            <button type="submit" className="btn btn-primary w-100 mb">
              Register
            </button>
          </div>
        )}


        <div className="col-md-12 text-center pt-sm-4">
          <div>
            Already a member? <Link to="/login">Log In</Link>
          </div>
        </div>
      </form>
      <ToastContainer />


    </>


  );
}

export default RegisterForm;
