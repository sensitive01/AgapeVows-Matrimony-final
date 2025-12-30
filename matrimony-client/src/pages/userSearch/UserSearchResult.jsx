import React, { useEffect, useState, useCallback, useMemo } from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import ShowInterest from "./ShowInterest";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import { useLocation } from "react-router-dom";
import {
  fetchSearchedProfileData,
  saveTheProfileAsShortlisted,
} from "../../api/axiosService/userAuthService.js";
import defaultProfileImg from "../../assets/images/blue-circle-with-white-user_78370-4707.avif";
import maleDefault from "../../assets/images/profiles/men1.jpg";
import femaleDefault from "../../assets/images/profiles/12.jpg";

const UserCardImageSlider = ({ user }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const allImages = useMemo(() => {
    const defaultImg =
      user.gender === "Male" || user.gender === "Groom"
        ? maleDefault
        : user.gender === "Female" || user.gender === "Bride"
          ? femaleDefault
          : defaultProfileImg;

    const images = [user.profileImage || defaultImg];
    if (user.additionalImages && user.additionalImages.length > 0) {
      images.push(...user.additionalImages);
    }
    return images;
  }, [user]);

  const nextImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const openZoom = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsZoomOpen(true);
  };

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "220px" }}>
        <div
          onClick={openZoom}
          style={{ display: "block", height: "100%", cursor: "pointer" }}
        >
          <img
            src={allImages[currentImageIndex]}
            alt={user.userName}
            onError={(e) => {
              const defaultImg =
                user.gender === "Male" || user.gender === "Groom"
                  ? maleDefault
                  : user.gender === "Female" || user.gender === "Bride"
                    ? femaleDefault
                    : defaultProfileImg;
              e.target.src = defaultImg;
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>

        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: "absolute",
                top: "50%",
                left: "5px",
                transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <i
                className="fa fa-chevron-left"
                style={{ fontSize: "12px" }}
              ></i>
            </button>
            <button
              onClick={nextImage}
              style={{
                position: "absolute",
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <i
                className="fa fa-chevron-right"
                style={{ fontSize: "12px" }}
              ></i>
            </button>
          </>
        )}
      </div>

      {isZoomOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomOpen(false);
          }}
        >
          <div
            style={{ position: "relative", maxWidth: "90%", maxHeight: "90%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[currentImageIndex]}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
            <button
              onClick={() => setIsZoomOpen(false)}
              style={{
                position: "fixed",
                top: "20px",
                right: "30px",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "white",
                fontSize: "40px",
                cursor: "pointer",
                padding: "0 10px",
                borderRadius: "5px",
                zIndex: 100000,
              }}
            >
              &times;
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "-60px",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  &#10094;
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-60px",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const UserSearchResult = () => {
  const { state } = useLocation();

  console.log(state);
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    age: "",
    religion: "",
    location: "",
    availability: "all",
    profileType: "all",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChats, setActiveChats] = useState([]);

  // Function to fetch filtered data from API
  const fetchFilteredData = useCallback(
    async (filterParams) => {
      setLoading(true);
      try {
        // Combine initial search state with current filters
        const { formData, ...restState } = state || {};

        // Transform sidebar filters to match backend fields
        const transformedFilters = { ...filterParams };

        // Parse Age Range (e.g., "18-30")
        if (filterParams.age && filterParams.age.includes("-")) {
          const [min, max] = filterParams.age.split("-");
          transformedFilters.ageFrom = min;
          transformedFilters.ageTo = max;
          delete transformedFilters.age;
        }

        // Map Location to districtCity (matching backend expectation)
        if (filterParams.location) {
          transformedFilters.districtCity = filterParams.location;
          delete transformedFilters.location;
        }

        const requestData = {
          ...restState,
          ...(formData || {}),
          ...transformedFilters,
        };

        // Call your filter API endpoint
        const response = await fetchSearchedProfileData(requestData);

        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching filtered profiles:", error);
      } finally {
        setLoading(false);
      }
    },
    [state]
  );

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { formData, ...restState } = state || {};
        const requestData = {
          ...restState,
          ...(formData || {}),
        };

        const response = await fetchSearchedProfileData(requestData);
        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    if (state) {
      fetchData();
    }
  }, [state]);

  // Debounced filter effect - calls API when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only call API if at least one filter has a value
      const hasActiveFilters = Object.values(filters).some(
        (value) => value !== "" && value !== "all"
      );

      if (hasActiveFilters) {
        fetchFilteredData(filters);
      }
    }, 500); // 500ms delay to avoid too many API calls

    return () => clearTimeout(timeoutId);
  }, [filters, fetchFilteredData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (e) => {
    const availability = e.target.id.replace("exav", "");
    setFilters((prev) => ({
      ...prev,
      availability: availability,
    }));
  };

  const handleProfileTypeChange = (e) => {
    const profileType = e.target.id.replace("exver", "");
    setFilters((prev) => ({
      ...prev,
      profileType: profileType,
    }));
  };

  // Reset filters function
  const resetFilters = () => {
    setFilters({
      gender: "",
      age: "",
      religion: "",
      location: "",
      availability: "all",
      profileType: "all",
    });
    // Fetch original data when filters are reset
    fetchFilteredData({
      gender: "",
      age: "",
      religion: "",
      location: "",
      availability: "all",
      profileType: "all",
    });
  };

  const handleSendInterest = (user) => {
    setSelectedUser(user);
    console.log("Interest sent to:", user.userName);
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      const newMessage = {
        sender: "me",
        message: chatMessage,
        timestamp: new Date().toISOString(),
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage("");

      // Simulate reply after 1 second
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "them",
            message: "Thanks for your message! I'll reply soon.",
            timestamp: new Date().toISOString(),
          },
        ]);
      }, 1000);
    }
  };

  const openChat = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
    setChatMessages([]); // Clear previous chat when opening new one

    // Add to active chats if not already there
    if (!activeChats.some((chat) => chat._id === user._id)) {
      setActiveChats([...activeChats, user]);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const shortListProfile = async (user) => {
    const response = await saveTheProfileAsShortlisted(user._id, userId);
    if (response.status === 200) {
      alert(response.data.message);
      console.log("Profile saved as shortlisted");
    } else {
      console.error("Failed to save profile as shortlisted");
      alert(response.data.message);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="all-pro-head">
          <div className="container">
            <div className="row">
              <h1>Lakhs of Happy Marriages</h1>
              {/* <a href="#">
                Join now for Free{" "}
                <i className="fa fa-handshake-o" aria-hidden="true"></i>
              </a> */}
            </div>
          </div>
        </div>
        <div className="fil-mob fil-mob-act">
          <h4>
            Profile filters <i className="fa fa-filter" aria-hidden="true"></i>{" "}
          </h4>
        </div>
      </div>

      <section>
        <div className="all-weddpro all-jobs all-serexp chosenini">
          <div className="container">
            <div className="row">
              {/* Left Sidebar Filter - Removed as per user request */}
              <div className="d-none col-md-3 fil-mob-view">
              </div>
              <div className="col-md-12">
                <div className="short-all">
                  <div className="short-lhs">
                    Showing <b>{users.length}</b> profiles
                    {loading && <span className="ml-2">Loading...</span>}
                  </div>
                  <div className="short-rhs">
                    <ul>
                      <li>Sort by:</li>
                      <li>
                        <div className="form-group">
                          <select className="chosen-select">
                            <option value="">Most relative</option>
                            <option value="newest">Date listed: Newest</option>
                            <option value="oldest">Date listed: Oldest</option>
                          </select>
                        </div>
                      </li>
                      <li>
                        <div className="sort-grid sort-grid-1">
                          <i className="fa fa-th-large" aria-hidden="true"></i>
                        </div>
                      </li>
                      <li>
                        <div className="sort-grid sort-grid-2 act">
                          <i className="fa fa-bars" aria-hidden="true"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Loading Indicator */}
                {loading && (
                  <div className="text-center py-4">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}

                <div className="all-list-sh">
                  <ul>
                    {users.map((user) => (
                      <li key={user._id}>
                        <div
                          className={`all-pro-box ${Math.random() > 0.5 ? "user-avil-onli" : ""
                            }`}
                          data-useravil={
                            Math.random() > 0.5 ? "avilyes" : "avilno"
                          }
                          data-aviltxt={
                            Math.random() > 0.5 ? "Available online" : "Offline"
                          }
                        >
                          <div className="pro-img">
                            <UserCardImageSlider user={user} />
                            <div
                              className="pro-ave"
                              title="User currently available"
                            >
                              <span
                                className={`pro-ave-${Math.random() > 0.5 ? "yes" : "no"
                                  }`}
                              ></span>
                            </div>
                            <div className="pro-avl-status">
                              {Math.random() > 0.5 ? (
                                <h5>Available Online</h5>
                              ) : (
                                <>
                                  <h5>Last login 10 mins ago</h5>
                                  <span className="marqu">
                                    Last login 10 mins ago | I'll be available
                                    on 10:00 AM
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="pro-detail">
                            <h4>
                              <a href="#">{user.userName}</a>
                            </h4>
                            <div className="pro-bio">
                              <span>{user.degree || "Not specified"}</span>
                              <span>{user.jobType || "Not specified"}</span>
                              <span>
                                {user.age || "Not specified"} Years old
                              </span>
                              <span>
                                Height: {user.height || "Not specified"}Cms
                              </span>
                            </div>
                            <div className="links">
                              {/* <span
                                className="cta-chat"
                                onClick={() => openChat(user)}
                              >
                                Chat now
                              </span> */}
                              <a href={`https://wa.me/${user.whatsapp}`}>
                                WhatsApp
                              </a>
                              <a
                                href="#!"
                                className="cta cta-sendint"
                                data-bs-toggle="modal"
                                data-bs-target="#sendInter"
                                onClick={() => setSelectedUser(user)}
                              >
                                Send interest
                              </a>
                              <span
                                className="cta"
                                onClick={() => shortListProfile(user)}
                              >
                                Short List
                              </span>
                              <a href={`/profile-more-details/${user._id}`}>
                                More details
                              </a>
                            </div>
                          </div>
                          <span
                            className="enq-sav"
                            data-toggle="tooltip"
                            title="Click to save this profile."
                          >
                            <i
                              className="fa fa-thumbs-o-up"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* No Results Message */}
                {!loading && users.length === 0 && (
                  <div className="text-center py-4">
                    <h4>No profiles found</h4>
                    <p>Try adjusting your search filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Send Interest Modal */}
      {selectedUser && (
        <ShowInterest selectedUser={selectedUser} userId={userId} />
      )}

      {/* Enhanced Chat Box */}
      {isChatOpen && selectedUser && (
        <div
          className="chatbox"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "350px",
            height: "500px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <div
            className="chat-header"
            style={{
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={selectedUser.profileImage || "images/default-profile.jpg"}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                alt={selectedUser.userName}
              />
              <h4 style={{ margin: 0 }}>{selectedUser.userName}</h4>
            </div>
            <span
              className="comm-msg-pop-clo"
              onClick={closeChat}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: "#999",
              }}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          </div>

          <div
            className="chat-messages"
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
            }}
          >
            {chatMessages.length === 0 ? (
              <div
                className="chat-welcome"
                style={{
                  textAlign: "center",
                  color: "#999",
                  marginTop: "50%",
                }}
              >
                Start a new conversation with {selectedUser.userName}
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "10px",
                    textAlign: msg.sender === "me" ? "right" : "left",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      borderRadius:
                        msg.sender === "me"
                          ? "18px 18px 0 18px"
                          : "18px 18px 18px 0",
                      backgroundColor:
                        msg.sender === "me" ? "#007bff" : "#f1f1f1",
                      color: msg.sender === "me" ? "#fff" : "#333",
                      maxWidth: "80%",
                    }}
                  >
                    {msg.message}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#999",
                      marginTop: "4px",
                      textAlign: msg.sender === "me" ? "right" : "left",
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            className="chat-input"
            style={{
              padding: "10px",
              borderTop: "1px solid #eee",
              backgroundColor: "#f8f9fa",
            }}
          >
            <form onSubmit={handleChatSend} style={{ display: "flex" }}>
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "20px",
                  outline: "none",
                }}
                required
              />
              <button
                type="submit"
                style={{
                  marginLeft: "10px",
                  padding: "10px 15px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Active Chats Indicator */}
      {activeChats.length > 0 && !isChatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#007bff",
            color: "#fff",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 999,
          }}
          onClick={() => setIsChatOpen(true)}
        >
          <i
            className="fa fa-comments"
            aria-hidden="true"
            style={{ fontSize: "20px" }}
          ></i>
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "red",
              color: "#fff",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            {activeChats.length}
          </span>
        </div>
      )}

      <Footer />
      <CopyRights />
    </div>
  );
};

export default UserSearchResult;
