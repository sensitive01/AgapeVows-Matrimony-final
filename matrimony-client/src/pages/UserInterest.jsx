import React, { useEffect, useState } from "react";

import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import {
  getInterestedProfile,
  handleChangeInterestStatus,
} from "../api/axiosService/userAuthService";

const UserInterest = () => {
  const userId = localStorage.getItem("userId");
  const [activeTab, setActiveTab] = useState("pending");
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({
    type: "",
    message: "",
    show: false,
  });

  // Show notification function
  const showNotification = (type, message) => {
    setNotification({ type, message, show: true });
    // Auto hide notification after 5 seconds
    setTimeout(() => {
      setNotification({ type: "", message: "", show: false });
    }, 5000);
  };

  // Hide notification function
  const hideNotification = () => {
    setNotification({ type: "", message: "", show: false });
  };

  // Fetch data based on status
  const fetchProfileData = async (status) => {
    setLoading(true);
    setError("");
    try {
      const response = await getInterestedProfile(userId, status);
      if (response.status === 200) {
        setActiveTab(status);
        setProfileData(response.data.data);
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (err) {
      setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (status) => {
    setActiveTab(status);
    fetchProfileData(status);
  };

  // Initial load
  useEffect(() => {
    fetchProfileData("pending");
  }, []);

  const handleAccept = async (profileId, status) => {
    try {
      const response = await handleChangeInterestStatus(
        userId,
        profileId,
        status,
      );

      if (response.status === 200) {
        showNotification("success", "Profile request accepted successfully!");
        // Switch to accepted tab and fetch data
        await fetchProfileData("accepted");
      } else {
        showNotification(
          "error",
          "Failed to accept the request. Please try again.",
        );
      }
    } catch (error) {
      showNotification("error", "Error accepting request: " + error.message);
    }
  };

  const handleReject = async (profileId, status) => {
    try {
      console.log("Rejecting profile:", profileId, status);
      const response = await handleChangeInterestStatus(
        userId,
        profileId,
        status,
      );

      if (response.status === 200) {
        showNotification("success", "Profile request rejected successfully!");
        // Switch to rejected tab and fetch data
        await fetchProfileData("rejected");
      } else {
        showNotification(
          "error",
          "Failed to reject the request. Please try again.",
        );
      }
    } catch (error) {
      showNotification("error", "Error rejecting request: " + error.message);
    }
  };

  // Render notification
  const renderNotification = () => {
    if (!notification.show) return null;

    return (
      <div
        className={`alert ${
          notification.type === "success" ? "alert-success" : "alert-danger"
        } alert-dismissible fade show`}
        role="alert"
      >
        {notification.message}
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={hideNotification}
        ></button>
      </div>
    );
  };

  // Render profile list
  const renderProfileList = () => {
    if (loading) {
      return <div className="text-center">Loading...</div>;
    }

    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }

    if (profileData.length === 0) {
      return (
        <div className="text-center">No profiles found for this category.</div>
      );
    }

    return (
      <div className="db-inte-prof-list">
        <ul>
          {profileData.map((profile) => (
            <li key={profile._id}>
              <div className="db-int-pro-1">
                <img
                  src={
                    profile.senderDetails.profileImage ||
                    "images/profiles/default.jpg"
                  }
                  alt={profile.senderDetails.userName}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                {/* You can add user plan badges here based on your logic */}
              </div>
              <div className="db-int-pro-2">
                <h5>{profile.senderDetails.userName}</h5>
                <ol className="poi">
                  <li>
                    City: <strong>{profile.senderDetails.city}</strong>
                  </li>
                  <li>
                    Age: <strong>{profile.senderDetails.age}</strong>
                  </li>
                  <li>
                    Height: <strong>{profile.senderDetails.height} cm</strong>
                  </li>
                  <li>
                    Job: <strong>{profile.senderDetails.jobType}</strong>
                  </li>
                </ol>
                <ol className="poi poi-date">
                  <li>
                    Request on: {new Date(profile.createdAt).toLocaleString()}
                  </li>
                  {profile.status === "accepted" && (
                    <li>
                      Accepted on:{" "}
                      {new Date(profile.updatedAt).toLocaleString()}
                    </li>
                  )}
                  {profile.status === "rejected" && (
                    <li>
                      Rejected on:{" "}
                      {new Date(profile.updatedAt).toLocaleString()}
                    </li>
                  )}
                </ol>
                {profile.message && (
                  <p className="profile-message">
                    <strong>Message:</strong> {profile.message}
                  </p>
                )}
                <a href="#" className="cta-5" target="_blank">
                  View full profile
                </a>
              </div>
              <div className="db-int-pro-3">
                {activeTab === "pending" && (
                  <>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => handleAccept(profile.senderId, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleReject(profile.senderId, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
                {activeTab === "accepted" && (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleReject(profile.senderId, "rejected")}
                  >
                    Reject
                  </button>
                )}
                {activeTab === "rejected" && (
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => handleAccept(profile.senderId, "accepted")}
                  >
                    Accept
                  </button>
                )}
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

      <div style={{ paddingTop: "115px", paddingBottom: "40px" }}>
        <div className="db">
          <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
              <div
                className="col-md-3 col-lg-2"
                style={{ paddingLeft: 0, marginLeft: "0px" }}
              >
                <UserSideBar />
              </div>

              <div
                className="col-md-9 col-lg-10"
                style={{ paddingLeft: "20px", paddingRight: "15px" }}
              >
                <div className="row">
                  <div className="col-md-12 db-sec-com">
                    <h2 className="db-tit">Interest request</h2>

                    {/* Notification Display */}
                    {renderNotification()}

                    <div className="db-pro-stat">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          data-bs-toggle="dropdown"
                        >
                          <i
                            className="fa fa-ellipsis-h"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              Edit profile
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              View profile
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              Plan change
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              Download invoice now
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="db-inte-main">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <button
                              className={`nav-link ${
                                activeTab === "pending" ? "active" : ""
                              }`}
                              type="button"
                              onClick={() => handleTabChange("pending")}
                            >
                              New requests
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              className={`nav-link ${
                                activeTab === "accepted" ? "active" : ""
                              }`}
                              type="button"
                              onClick={() => handleTabChange("accepted")}
                            >
                              Accept request
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              className={`nav-link ${
                                activeTab === "rejected" ? "active" : ""
                              }`}
                              type="button"
                              onClick={() => handleTabChange("rejected")}
                            >
                              Reject request
                            </button>
                          </li>
                        </ul>
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

export default UserInterest;
