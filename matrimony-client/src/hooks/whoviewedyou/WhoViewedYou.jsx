import React, { useEffect, useState } from "react";

import UserSideBar from "../../components/UserSideBar";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import { getWhoViewedYouData } from "../../api/axiosService/userAuthService";
import { useNavigate } from "react-router-dom";

const WhoViewedYou = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle view profile navigation
  const handleViewProfile = (profileId) => {
    navigate(`/profile-more-details/${profileId}`);
  };

  // Fetch who viewed you profiles
  const fetchWhoViewedYou = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getWhoViewedYouData(userId);
      if (response.status === 200) {
        setProfileData(response.data.data || []);
      } else {
        setError("Failed to fetch profile views");
      }
    } catch (err) {
      // setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWhoViewedYou();
  }, []);

  // Render profile list
  const renderProfileList = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }

    if (profileData.length === 0) {
      return (
        <div className="text-center py-5 text-muted">
          <i
            className="fa fa-eye"
            style={{ fontSize: "3rem", marginBottom: "1rem" }}
          ></i>
          <p>No profile views yet.</p>
        </div>
      );
    }

    return (
      <div className="db-inte-prof-list">
        <ul>
          {profileData.map((profile) => (
            <li key={profile._id}>
              <div className="db-int-pro-1">
                <img
                  src={profile.profileImage || "images/profiles/default.jpg"}
                  alt={profile.userName}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div className="db-int-pro-2">
                <h5>{profile.userName}</h5>
                <ol className="poi">
                  <li>
                    City: <strong>{profile.city}</strong>
                  </li>
                  <li>
                    Age: <strong>{profile.age}</strong>
                  </li>
                  <li>
                    Height: <strong>{profile.height} cm</strong>
                  </li>
                  <li>
                    Education: <strong>{profile.degree}</strong>
                  </li>
                </ol>
                <div className="d-flex gap-2 align-items-center">
                  <button
                    onClick={() => handleViewProfile(profile._id)}
                    className="cta-5"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "inherit",
                    }}
                  >
                    View full profile
                  </button>
                  {profile.viewedAt && (
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <i className="fa fa-clock-o me-1"></i>
                      {new Date(profile.viewedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="db">
          <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="row" style={{ marginLeft: 45, marginRight: 0 }}>
              <div
                className="col-md-4 col-lg-3"
                style={{ paddingLeft: 0, marginLeft: "-10px" }}
              >
                <UserSideBar />
              </div>

              <div
                className="col-md-8 col-lg-9"
                style={{ paddingLeft: "20px", paddingRight: "15px" }}
              >
                <div className="row">
                  <div className="col-md-12 db-sec-com">
                    <h2 className="db-tit">
                      <i className="fa fa-eye me-2"></i>
                      Who Viewed You
                    </h2>

                    <div className="db-pro-stat">
                      <div className="db-inte-main">
                        <div className="tab-content">
                          <div className="container tab-pane active">
                            <br />
                            {renderProfileList()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CopyRights />
    </div>
  );
};

export default WhoViewedYou;
