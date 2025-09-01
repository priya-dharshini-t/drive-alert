import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150"); // Default avatar

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setProfile(storedProfile);
      const savedImage = localStorage.getItem("profileImage");
      if (savedImage) setProfileImage(savedImage);
    }
  }, []);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        localStorage.setItem("profileImage", e.target.result); // Save image separately
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h2>Driver Profile</h2>
      <div className="profile-card">
        {/* Profile Image Upload */}
        <label htmlFor="profile-upload">
          <img src={profileImage} alt="Profile" className="profile-pic" />
        </label>
        <input type="file" id="profile-upload" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />

        {profile ? (
          <div className="profile-details">
            <div className="profile-box"><b>Name:</b> {profile.fullName}</div>
            <div className="profile-box"><b>Age:</b> {profile.age}</div>
            <div className="profile-box"><b>Phone:</b> {profile.phone}</div>
            <div className="profile-box"><b>Email:</b> {profile.email}</div>
            <div className="profile-box"><b>Address:</b> {profile.address}</div>
            <div className="profile-box"><b>Emergency Person's Name:</b> {profile.emergency_person_name}</div>
            <div className="profile-box"><b>Emergency Person's Phone:</b> {profile.emergency_person_number}</div>
            <div className="profile-box"><b>Emergency Person's Email:</b> {profile.emergency_person_email}</div> 
          </div>
        ) : (
          <p>No profile found. Please register.</p>
        )}

        {/* 🚀 Edit Profile and Next Button */}
        <div className="profile-buttons">
          <button className="edit-btn" onClick={() => navigate("/register")}>Edit Profile</button>
          <button className="next-btn" onClick={() => navigate("/home")}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
