import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css"; // Add CSS for styling

const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    emergency_person_name: "",
    emergency_person_number: "",
    emergency_person_email: "",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(userDetails)); // Save to localStorage
    navigate("/profile"); // Redirect to Profile after successful registration
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" value={userDetails.fullName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={userDetails.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={userDetails.phone} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={userDetails.age} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={userDetails.address} onChange={handleChange} required />

          <input type="text" name="emergency_person_name" placeholder="Emergency Contact Name" value={userDetails.emergency_person_name} onChange={handleChange} required />
          <input type="tel" name="emergency_person_number" placeholder="Emergency Contact Number" value={userDetails.emergency_person_number} onChange={handleChange} required />
          <input type="email" name="emergency_person_email" placeholder="Emergency Contact Email" value={userDetails.emergency_person_email} onChange={handleChange} required />

          <button type="submit" className="button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
