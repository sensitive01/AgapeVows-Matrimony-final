import React, { useEffect, useState, useMemo, useCallback } from "react";
import { io } from "socket.io-client";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import { useParams } from "react-router-dom";
import {
  getAllChatDoneByTheUser,
  getTheProfieMoreDetails,
  sendChatMessage,
  getInterestedProfile,
} from "../../api/axiosService/userAuthService";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import ShowInterest from "./ShowInterest";
import ChatUi from "./ChatUi";
import DisPlayProfileDetails from "./DisPlayProfileDetails";
import defaultProfileImg from "../../assets/images/blue-circle-with-white-user_78370-4707.avif";
import maleDefault from "../../assets/images/profiles/men1.jpg";
import femaleDefault from "../../assets/images/profiles/12.jpg";

const ImageSlider = React.memo(
  ({ allImages, currentImageIndex, setCurrentImageIndex, defaultImage, isAccepted }) => {
    const nextImage = useCallback(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, [allImages.length, setCurrentImageIndex]);

    const prevImage = useCallback(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
      );
    }, [allImages.length, setCurrentImageIndex]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    return (
      <>
        <div
          className="s1"
          style={{
            position: "relative",
            cursor: "pointer",
          }}
          onClick={toggleModal}
        >
          <img
            src={allImages[currentImageIndex]}
            loading="lazy"
            className="pro"
            alt="Profile"
            style={{
              width: "100%",
              display: "block",
            }}
            onError={(e) => {
              if (defaultImage) e.target.src = defaultImage;
            }}
          />

          {/* Zoom Indicator */}
          <div style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "rgba(0, 0, 0, 0.6)",
            color: "white",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            backdropFilter: "blur(4px)",
            zIndex: 5
          }}>
            <i className="fa fa-expand"></i> Click to Zoom
          </div>

          {/* Navigation Arrows */}
          {allImages.length > 1 && isAccepted && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.8)",
                  color: "#333",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  transition: "all 0.3s",
                }}
                className="slider-arrow"
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.8)",
                  color: "#333",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  transition: "all 0.3s",
                }}
                className="slider-arrow"
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </>
          )}

          {/* Image Indicators */}
          {allImages.length > 1 && isAccepted && (
            <div
              style={{
                position: "absolute",
                bottom: "15px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "8px",
                zIndex: 2,
                background: "rgba(0,0,0,0.3)",
                padding: "5px 10px",
                borderRadius: "15px"
              }}
            >
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    border: "none",
                    background:
                      index === currentImageIndex
                        ? "white"
                        : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    padding: 0
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Image Gallery Modal */}
        {isModalOpen && (
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
            onClick={toggleModal}
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
                onClick={toggleModal}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "-60px",
                      transform: "translateY(-50%)",
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "24px",
                    }}
                  >
                    <i className="fa fa-chevron-left"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-60px",
                      transform: "translateY(-50%)",
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "24px",
                    }}
                  >
                    <i className="fa fa-chevron-right"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
);

// Separate component for profile details to prevent unnecessary re-renders
const ProfileDetails = React.memo(
  ({ profileData, calculatedAge, formatDate, setCurrentImageIndex, isAccepted }) => {
    return (
      <DisPlayProfileDetails
        profileData={profileData}
        calculatedAge={calculatedAge}
        setCurrentImageIndex={setCurrentImageIndex}
        formatDate={formatDate}
        isAccepted={isAccepted}
      />
    );
  }
);

const MoreDetails = () => {
  const userId = localStorage.getItem("userId");
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [chatLoading, setChatLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_ROUTE;

  // Socket.IO states
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io(baseUrl, {
      query: { userId },
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
      setSocket(newSocket);
    });

    // Listen for incoming messages
    newSocket.on("receive_message", (message) => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: message.id,
          text: message.text,
          sender: message.senderId === userId ? "user" : "profile",
          timestamp: new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          senderId: message.senderId,
        },
      ]);
    });

    // Listen for online users
    newSocket.on("users_online", (userIds) => {
      setOnlineUsers(userIds);
    });

    newSocket.on("user_joined", (joinedUserId) => {
      setOnlineUsers((prev) => [...prev, joinedUserId]);
    });

    newSocket.on("user_left", (leftUserId) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== leftUserId));
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTheProfieMoreDetails(profileId);


        if (response.status === 200) {
          let data = response.data.data;

          // Fetch interest status if logged in
          if (userId) {
            try {
              const pendingRes = await getInterestedProfile(userId, "pending");
              const acceptedRes = await getInterestedProfile(userId, "accepted");

              const pendingList = pendingRes.data?.data || [];
              const acceptedList = acceptedRes.data?.data || [];

              const isPending = pendingList.some(u => u._id === profileId);
              const isAccepted = acceptedList.some(u => u._id === profileId);

              if (isAccepted) {
                data.interestStatus = 'accepted';
              } else if (isPending) {
                data.interestStatus = 'pending';
              }
            } catch (statusErr) {
              console.error("Error fetching interest status:", statusErr);
            }
          }

          setProfileData(data);
        } else {
          setError("Failed to fetch profile data");
        }
      } catch (err) {
        setError("Error fetching profile data");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [profileId, userId]);

  // Get all images (profile + additional) - memoized to prevent recalculation
  const defaultImage = useMemo(() => {
    if (!profileData) return defaultProfileImg;
    return profileData.gender === "Male" || profileData.gender === "Groom"
      ? maleDefault
      : profileData.gender === "Female" || profileData.gender === "Bride"
        ? femaleDefault
        : defaultProfileImg;
  }, [profileData]);

  const allImages = useMemo(() => {
    if (!profileData) return [];
    const images = [profileData.profileImage || defaultImage];
    if (profileData.additionalImages?.length > 0) {
      images.push(...profileData.additionalImages);
    }
    return images;
  }, [profileData, defaultImage]);

  // Auto-slider effect removed as per user request (manual swipe only)
  // useEffect(() => {
  //   if (allImages.length > 1) {
  //     const interval = setInterval(() => {
  //       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  //     }, 3000); // Change image every 3 seconds
  //
  //     return () => clearInterval(interval);
  //   }
  // }, [allImages.length]);

  // Memoized calculated values
  const calculatedAge = useMemo(() => {
    if (!profileData?.dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(profileData.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }, [profileData?.dateOfBirth]);

  // Memoized format date function
  const formatDate = useCallback((dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, []);

  // Handle interest button click - triggers the existing modal
  const handleSendInterest = useCallback(() => {
    // Trigger the existing modal using jQuery if it's available
    if (window.$ && window.$("#sendInter").length) {
      window.$("#sendInter").modal("show");
    } else {
      // Fallback: dispatch a custom event or use native modal trigger
      const modal = document.getElementById("sendInter");
      if (modal) {
        modal.style.display = "block";
        modal.classList.add("show");
      }
    }
  }, []);

  // Handle chat submission
  const handleChatSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (newMessage.trim() === "") return;

      const messageData = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: newMessage,
        senderId: userId,
        recipientId: profileId,
        roomId: `chat_${[userId, profileId].sort().join("_")}`,
        timestamp: new Date().toISOString(),
      };

      const message = {
        id: messageData.id,
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setChatMessages((prev) => [...prev, message]);

      // Send via socket for real-time delivery
      if (socket) {
        socket.emit("send_message", messageData);
      }

      // Also send via API for persistence
      await sendChatMessage(userId, message, profileId);
      setNewMessage("");
    },
    [newMessage, userId, profileId, socket]
  );

  const getChatDetails = async () => {
    setChatLoading(true);

    try {
      // Join the chat room via socket
      if (socket) {
        const roomId = `chat_${[userId, profileId].sort().join("_")}`;
        socket.emit("join_chat_room", { roomId });
      }

      const response = await getAllChatDoneByTheUser(userId, profileId);

      if (response.status === 200) {
        console.log("Chat response:", response.data); // For debugging

        if (response.status === 200 && response.data.messages.length > 0) {
          // Transform the API messages to match your UI format
          const formattedMessages = response.data.messages.map(
            (msg, index) => ({
              id: msg._id || `msg_${Date.now()}_${index}`,
              text: msg.message,
              sender: msg.senderId === userId ? "user" : "profile",
              timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              senderId: msg.senderId,
            })
          );

          setChatMessages(formattedMessages);
        } else {
          setChatMessages([]);
          console.log("No messages found or empty response");
        }

        // Open the chat UI
        setIsChatOpen(true);
      } else {
        console.error("Failed to fetch chat messages:", response);
        setChatMessages([]);
        setIsChatOpen(true);
      }
    } catch (error) {
      console.error("Error fetching chat details:", error);
      setChatMessages([]);
      setIsChatOpen(true);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <LayoutComponent />
        <div className="loading-container">
          <p>Loading profile...</p>
        </div>
        <Footer />
        <CopyRights />
      </>
    );
  }

  if (error || !profileData) {
    return (
      <>
        <LayoutComponent />
        <div className="error-container">
          <p>{error || "Profile not found"}</p>
        </div>
        <Footer />
        <CopyRights />
      </>
    );
  }

  // Enhanced profile data with online status
  const enhancedProfileData = {
    ...profileData,
    userName: profileData.userName || profileData.name,
    receiverId: profileId,
    isOnline: onlineUsers.includes(profileId),
  };

  const isAccepted = profileData?.interestStatus === 'accepted';

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="profi-pg-container">
          <div className="profi-pg profi-ban">
            <div className="profile-image-sticky">
              <div className="profile">
                <div className="pg-pro-big-im" style={{
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  borderRadius: "15px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  marginBottom: "20px",
                  border: "1px solid #eee"
                }}>
                  <ImageSlider
                    allImages={allImages}
                    currentImageIndex={currentImageIndex}
                    setCurrentImageIndex={setCurrentImageIndex}
                    defaultImage={defaultImage}
                    isAccepted={isAccepted}
                  />
                  <div className="s3" style={{
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    backgroundColor: "#fff",
                  }}>
                    {isAccepted && (
                      <button
                        className="cta fol cta-chat"
                        onClick={getChatDetails}
                        disabled={chatLoading}
                        style={{ width: "100%", margin: 0 }}
                      >
                        {chatLoading ? "Loading..." : "Chat now"}
                      </button>
                    )}
                    {profileData?.interestStatus === "pending" ? (
                      <span
                        className="cta cta-sendint"
                        style={{
                          cursor: "default",
                          opacity: 0.8,
                          width: "100%",
                          textAlign: "center",
                          display: "block",
                          padding: "10px",
                          borderRadius: "5px"
                        }}
                      >
                        Request Sent
                      </span>
                    ) : profileData?.interestStatus === "accepted" ? (
                      <span
                        className="cta cta-sendint"
                        style={{
                          cursor: "default",
                          backgroundColor: "#4caf50",
                          borderColor: "#4caf50",
                          width: "100%",
                          textAlign: "center",
                          display: "block",
                          padding: "10px",
                          borderRadius: "5px"
                        }}
                      >
                        Request Accepted
                      </span>
                    ) : (
                      <span
                        className="cta cta-sendint"
                        data-bs-toggle="modal"
                        data-bs-target="#sendInter"
                        onClick={handleSendInterest}
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          textAlign: "center",
                          display: "block",
                          padding: "10px",
                          borderRadius: "5px",
                          backgroundColor: "#ff9800", // Explicit color if class fails
                          color: "white"
                        }}
                      >
                        Send interest
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <ProfileDetails
              profileData={profileData}
              calculatedAge={calculatedAge}
              formatDate={formatDate}
              setCurrentImageIndex={setCurrentImageIndex}
              isAccepted={isAccepted}
            />
          </div>
        </div>
      </div>

      <ShowInterest
        selectedUser={profileData}
        userId={userId}
        onSuccess={() => {
          setProfileData(prev => ({ ...prev, interestStatus: 'pending' }));
        }}
      />

      {isChatOpen && (
        <ChatUi
          setIsChatOpen={setIsChatOpen}
          handleChatSubmit={handleChatSubmit}
          profileData={enhancedProfileData}
          chatMessages={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          socket={socket}
          userId={userId}
        />
      )}

      <Footer />
      <CopyRights />
    </div>
  );
};

export default MoreDetails;
