import React, { useEffect, useState, useMemo, useCallback } from "react";
import { io } from "socket.io-client";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import { useParams } from "react-router-dom";
import {
  getAllChatDoneByTheUser,
  getTheProfieMoreDetails,
  sendChatMessage,
} from "../../api/axiosService/userAuthService";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import ShowInterest from "./ShowInterest";
import ChatUi from "./ChatUi";
import DisPlayProfileDetails from "./DisPlayProfileDetails";

const ImageSlider = React.memo(
  ({ allImages, currentImageIndex, setCurrentImageIndex }) => {
    const nextImage = useCallback(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, [allImages.length, setCurrentImageIndex]);

    const prevImage = useCallback(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
      );
    }, [allImages.length, setCurrentImageIndex]);

    return (
      <div className="s1" style={{ position: "relative" }}>
        <img
          src={allImages[currentImageIndex]}
          loading="lazy"
          className="pro"
          alt="Profile"
        />

        {/* Image Indicators - Only show if multiple images */}
        {allImages.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "6px",
              zIndex: 2,
            }}
          >
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
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
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

// Separate component for profile details to prevent unnecessary re-renders
const ProfileDetails = React.memo(
  ({ profileData, calculatedAge, formatDate, setCurrentImageIndex }) => {
    return (
      <DisPlayProfileDetails
        profileData={profileData}
        calculatedAge={calculatedAge}
        setCurrentImageIndex={setCurrentImageIndex}
        formatDate={formatDate}
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
          setProfileData(response.data.data);
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
  }, [profileId]);

  // Get all images (profile + additional) - memoized to prevent recalculation
  const allImages = useMemo(() => {
    if (!profileData) return [];
    const images = [
      profileData.profileImage || "images/profiles/profile-large.jpg",
    ];
    if (profileData.additionalImages?.length > 0) {
      images.push(...profileData.additionalImages);
    }
    return images;
  }, [profileData]);

  // Auto-slider effect
  useEffect(() => {
    if (allImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [allImages.length]);

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
                <div className="pg-pro-big-im">
                  <ImageSlider
                    allImages={allImages}
                    currentImageIndex={currentImageIndex}
                    setCurrentImageIndex={setCurrentImageIndex}
                  />
                  <div className="s3">
                    <button
                      className="cta fol cta-chat"
                      onClick={getChatDetails}
                      disabled={chatLoading}
                    >
                      {chatLoading ? "Loading..." : "Chat now"}
                    </button>
                    <span
                      className="cta cta-sendint"
                      data-toggle="modal"
                      data-target="#sendInter"
                      onClick={handleSendInterest}
                      style={{ cursor: "pointer" }}
                    >
                      Send interest
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <ProfileDetails
              profileData={profileData}
              calculatedAge={calculatedAge}
              formatDate={formatDate}
              setCurrentImageIndex={setCurrentImageIndex}
            />
          </div>
        </div>
      </div>

      <ShowInterest />

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
