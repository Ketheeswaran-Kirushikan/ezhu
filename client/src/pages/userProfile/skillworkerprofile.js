import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileNavbar from "../../components/profilePage/profileNavbar/ProfileNavbar";
import TopContainer from "../../components/profilePage/top-container/TopContainer";
import ProfilePost from "../../components/profilePage/profile-post/ProfilePost";
import ProfileAddPost from "../../components/profilePage/profile-add-post/ProfileAddPost";

const SkillWorkerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, token } = location.state || {};

  useEffect(() => {
    if (!userData || !token) {
      navigate("/login");
    }
  }, [userData, token, navigate]);

  if (!userData || !token) {
    return null;
  }

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10">
        <ProfileNavbar userData={userData} token={token} />{" "}
        {/* Pass token to ProfileNavbar */}
      </div>
      <TopContainer userData={userData} />
      <ProfileAddPost userData={userData} token={token} />{" "}
      {/* Pass token to ProfileAddPost */}
      <ProfilePost userData={userData} />
    </div>
  );
};

export default SkillWorkerProfile;
