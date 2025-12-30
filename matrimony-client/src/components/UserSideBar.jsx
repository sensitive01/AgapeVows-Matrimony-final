import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/axiosService/userAuthService";
import profImage from "../assets/images/blue-circle-with-white-user_78370-4707.avif";

const UserSideBar = () => {
  const userId = localStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState(null);
  const currentPath = window.location.pathname;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // index of currently visible image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserProfile(userId);
      if (response.status === 200) {
        setUserInfo(response.data.data);
      }
    };
    fetchData();
  }, [userId]);

  // array of images: profile + additionalImages (if any)
  const images = [
    userInfo?.profileImage || profImage,
    ...(Array.isArray(userInfo?.additionalImages)
      ? userInfo.additionalImages
      : []),
  ];

  const handlePrev = () => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const navItems = [
    { path: "/user/user-dashboard-page", icon: "fa fa-tachometer", label: "Dashboard" },
    { path: "/user/user-profile-page", icon: "fa fa-male", label: "Profile" },
    { path: "/user/user-interest-page", icon: "fa fa-handshake-o", label: "Interests" },
    { path: "/user/user-chat-page", icon: "fa fa-commenting-o", label: "Chat list" },
    { path: "/user/short-listed-profiles-page", icon: "fa fa-bookmark", label: "Short listed Profiles" },
    { path: "/user/who-viewed-you-page", icon: "fa fa-eye", label: "Who Viewed You" },
    { path: "/user/blocked-profiles-page", icon: "fa fa-ban", label: "Blocked Profiles" },
    { path: "/user/ignored-profiles-page", icon: "fa fa-times-circle", label: "Ignored Profiles" },
    { path: "/user/user-plan-page", icon: "fa fa-money", label: "Plan" },
    { path: "/user/user-settings-page", icon: "fa fa-cog", label: "Setting" },
    { path: "/user/user-login", icon: "fa fa-sign-out", label: "Log out" },
  ];

  const styles = {
    sidebarSticky: {
      position: "sticky",
      top: "60px",
      marginTop: "-40px",
      width: "85%", // Reduced width from both sides
      marginLeft: "auto", // Centered
      marginRight: "auto", // Centered
      // height and overflow removed to eliminate scrolling and let it fit naturally
      background: "#fff",
      border: "1px solid #e9ecef",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
      zIndex: 40,
    },
    dbNav: {
      width: "100%",
    },
    dbNavPro: {
      width: "100%",
      padding: "5px", // Further reduced padding
      background: "#fff",
      borderBottom: "1px solid #e9ecef",
    },
    imageWrapper: {
      position: "relative",
      width: "100%",
    },
    dbNavProImg: {
      width: "100%",
      height: "auto",
      aspectRatio: "1",
      objectFit: "cover",
      borderRadius: "8px",
      border: "2px solid #e9ecef",
      display: "block",
    },
    arrowButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      border: "none",
      background: "rgba(0,0,0,0.45)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "16px",
      zIndex: 2,
    },
    arrowLeft: {
      left: "-10px",
    },
    arrowRight: {
      right: "-10px",
    },
    dbNavList: {
      padding: "0",
      background: "#fff",
    },
    ul: {
      listStyle: "none",
      margin: "0",
      padding: "0",
    },
    li: {
      borderBottom: "1px solid #f0f0f0",
    },
    liLast: {
      borderBottom: "none",
    },
    link: {
      display: "flex",
      alignItems: "center",
      padding: "5px 10px", // Minimal padding
      color: "#333",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "400",
      transition: "all 0.2s ease",
      position: "relative",
    },
    linkHover: {
      background: "#f8f9fa",
      color: "#667eea",
    },
    linkActive: {
      background: "#667eea",
      color: "#fff",
    },
    linkActiveBefore: {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      width: "4px",
      background: "#4c51bf",
    },
    icon: {
      width: "20px",
      marginRight: "12px",
      fontSize: "15px",
      textAlign: "center",
    },
    span: {
      flex: "1",
    },
  };

  return (
    <div style={styles.sidebarSticky}>
      <div style={styles.dbNav}>
        {/* Profile Image with Arrows */}
        <div style={styles.dbNavPro}>
          <div style={styles.imageWrapper}>
            <img
              src={images[currentImageIndex]}
              style={styles.dbNavProImg}
              alt="Profile"
            />

            {/* always render arrows; they will still work even with one image */}
            <button
              type="button"
              style={{ ...styles.arrowButton, ...styles.arrowLeft }}
              onClick={handlePrev}
            >
              <i className="fa fa-chevron-left" />
            </button>
            <button
              type="button"
              style={{ ...styles.arrowButton, ...styles.arrowRight }}
              onClick={handleNext}
            >
              <i className="fa fa-chevron-right" />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div style={styles.dbNavList}>
          <ul style={styles.ul}>
            {navItems.map((item, index) => {
              const isActive = currentPath === item.path;
              const isHovered = hoveredIndex === index;
              const isLast = index === navItems.length - 1;

              return (
                <li
                  key={index}
                  style={isLast ? styles.liLast : styles.li}
                >
                  <a
                    href={item.path}
                    style={{
                      ...styles.link,
                      ...(isActive && styles.linkActive),
                      ...(isHovered && !isActive && styles.linkHover),
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {isActive && (
                      <span style={styles.linkActiveBefore}></span>
                    )}

                    <i
                      className={item.icon}
                      aria-hidden="true"
                      style={styles.icon}
                    ></i>

                    <span style={styles.span}>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
