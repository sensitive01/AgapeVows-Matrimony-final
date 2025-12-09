import React, { useState, useEffect } from "react";
import {
  Search,
  Phone,
  Mail,
  Facebook,
  Twitter,
  MessageCircle,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import logo from "../../../assets/images/agapevows - logo.webp";
import { getUserProfile } from "../../../api/axiosService/userAuthService";
import profileImg from "../../../assets/images/profiles/1.jpg";
import PreLoader from "../../PreLoader";

// ExploreDropdown Component
const ExploreDropdown = ({ isVisible }) => {
  const categories = [
    {
      title: "Browse profiles",
      subtitle: "1200+ VERIFIED PROFILES",
      buttonText: "MORE DETAILS",
      bgColor: "bg-gradient-to-br from-pink-500 to-purple-600",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop&crop=face",
      path: "/user/show-all-profiles/all-profiles",
    },
    {
      title: "Wedding page",
      subtitle: "MAKE RESERVATION",
      buttonText: "MORE DETAILS",
      bgColor: "bg-gradient-to-br from-purple-600 to-blue-600",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop",
      path: "/user/user-wedding-page",
    },
    {
      title: "All Services",
      subtitle: "LOREM IPSUM DUMMY",
      buttonText: "MORE DETAILS",
      bgColor: "bg-gradient-to-br from-green-500 to-teal-600",
      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=200&fit=crop",
      path: "/user/user-service-page",
    },
    {
      title: "Join Now",
      subtitle: "LOREM IPSUM DUMMY",
      buttonText: "MORE DETAILS",
      bgColor: "bg-gradient-to-br from-yellow-500 to-orange-600",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=200&fit=crop",
      path: "/user/user-sign-up",
    },
  ];

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div
      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-5xl bg-white shadow-2xl rounded-lg p-8 z-50 border border-gray-100 transition-all duration-300 ${
        isVisible
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-2"
      }`}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        EXPLORE CATEGORIES
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${category.bgColor} text-white rounded-lg p-6 min-h-48 flex flex-col justify-between relative overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer`}
            onClick={() => handleNavigate(category.path)}
          >
            <div className="absolute inset-0 opacity-30">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full transform translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full transform -translate-x-8 translate-y-8"></div>
            </div>

            <div className="relative z-10">
              <h4 className="text-lg font-bold mb-1">{category.title}</h4>
              <p className="text-xs opacity-90 mb-4">{category.subtitle}</p>
            </div>

            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors self-start relative z-10">
              {category.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Profile Dropdown Component
const ProfileDropdown = ({ isVisible, onLogout }) => {
  const profileLinks = [
    { label: "My Profile", path: "/user/user-profile-page" },
    // { label: "My Chatss", path: "/user/show-all-profiles/all-profile" },
    { label: "Change Password", path: "/reset-password/:userId" },
    { label: "User Settings", path: "/user/user-settings-page" }
  ];

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div
      className={`absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100 transition-all duration-300 ${
        isVisible
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-2"
      }`}
    >
      {profileLinks.map((link, index) => (
        <button
          key={index}
          onClick={() => handleNavigate(link.path)}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
        >
          {link.label}
        </button>
      ))}
      <hr className="my-1" />
      <button
        onClick={onLogout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};




const MainLayout = () => {
  const userId = localStorage.getItem("userId");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreDropdownVisible, setIsExploreDropdownVisible] =
    useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState(profileImg);

  useEffect(() => {
    setIsUserActive(Boolean(userId));

    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserProfile(userId);
      if (response.status === 200) {
        setUserName(response.data.data.userName || "User");
        setUserImage(response.data.data.profileImage);
      }
    };
    if (userId) {
      fetchData();
    }
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    setIsUserActive(false);
    window.location.href = "/";
  };

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <>
      {/* <PreLoader /> */}
      {/* Top Bar - Fixed Responsive */}
      <div className="bg-purple-600 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop & Tablet */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1 cursor-pointer hover:text-purple-200">
                <Search className="w-4 h-4" />
                <button onClick={() => handleNavigate("/about-us")}>ABOUT</button>
              </div>
              <button
                onClick={() => handleNavigate("/faq-page")}
                className="cursor-pointer hover:text-purple-200"
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavigate("/contact-page")}
                className="cursor-pointer hover:text-purple-200"
              >
                CONTACT
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 5312 5312</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>HELP@COMPANY.COM</span>
              </div>
              <div className="flex space-x-2">
                <Facebook className="w-4 h-4 cursor-pointer hover:text-purple-200" />
                <Twitter className="w-4 h-4 cursor-pointer hover:text-purple-200" />
                <MessageCircle className="w-4 h-4 cursor-pointer hover:text-purple-200" />
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Search className="w-4 h-4" />
              <button
                onClick={() => handleNavigate("/about")}
                className="text-xs hover:text-purple-200"
              >
                ABOUT
              </button>
              <button
                onClick={() => handleNavigate("/faq")}
                className="text-xs hover:text-purple-200"
              >
                FAQ
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4" />
              <div className="flex space-x-2">
                <Facebook className="w-3 h-3" />
                <Twitter className="w-3 h-3" />
                <MessageCircle className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md relative">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - YOUR EXACT IMPLEMENTATION */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleNavigate("/")}
            >
              <div className="text-2xl font-bold">
                <img
                  src={logo}
                  alt="agapevows_logo"
                  className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNavigate("/")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                HOME
              </button>
              <div
                className="relative"
                onMouseEnter={() => setIsExploreDropdownVisible(true)}
                onMouseLeave={() => setIsExploreDropdownVisible(false)}
              >
                <button className="text-gray-800 hover:text-purple-600 font-medium flex items-center py-2">
                  EXPLORE <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <ExploreDropdown isVisible={isExploreDropdownVisible} />
              </div>
              <button
                onClick={() => handleNavigate("/user/user-plan-selection")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                PLANS
              </button>
              <button
                onClick={() => handleNavigate("/success-stories")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                SUCCESS STORIES
              </button>
              <button
                onClick={() => handleNavigate("/help-support")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                HELP & SUPPORT
              </button>
              <button
                onClick={() => handleNavigate("/about-us")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                ABOUT US
              </button>
            </nav>

            {/* User Profile or Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isUserActive ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsProfileDropdownVisible(true)}
                  onMouseLeave={() => setIsProfileDropdownVisible(false)}
                >
                  <div className="flex items-center space-x-3 cursor-pointer">
                    <img
                      src={userImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="text-gray-800 font-medium">
                        {userName}
                      </div>
                      <div className="text-gray-500 text-sm flex items-center">
                        MY PROFILE <ChevronDown className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </div>
                  <ProfileDropdown
                    isVisible={isProfileDropdownVisible}
                    onLogout={handleLogOut}
                  />
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigate("/user/user-sign-up")}
                    className="text-gray-800 hover:text-purple-600 font-medium"
                  >
                    REGISTER
                  </button>
                  <button
                    onClick={() => handleNavigate("/user/user-login")}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    LOGIN
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t">
              <nav className="flex flex-col space-y-3 mt-4">
                <button
                  onClick={() => {
                    handleNavigate("/");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-800 hover:text-purple-600 font-medium text-left"
                >
                  HOME
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-800 hover:text-purple-600 font-medium text-left"
                >
                  EXPLORE
                </button>
                <button
                  onClick={() => {
                    handleNavigate("/user/user-plan-selection");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-800 hover:text-purple-600 font-medium text-left"
                >
                  PLANS
                </button>
                <button
                  onClick={() => {
                    handleNavigate("/success-stories");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-800 hover:text-purple-600 font-medium text-left"
                >
                  SUCCESS STORIES
                </button>
                <button
                  onClick={() => {
                    handleNavigate("/help-support");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-800 hover:text-purple-600 font-medium text-left"
                >
                  HELP & SUPPORT
                </button>
                <button
                  onClick={() => {
                    handleNavigate("/about-us");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-800 hover:text-purple-600 font-medium text-left"
                >
                  ABOUT US
                </button>
              </nav>

              {/* Mobile Profile or Auth */}
              <div className="mt-4 pt-4 border-t">
                {isUserActive ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={userImage}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="text-gray-800 font-medium text-sm">
                          {userName}
                        </div>
                        <div className="text-gray-500 text-xs">MY PROFILE</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleNavigate("/user/user-dashboard-page");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 py-2"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        handleNavigate("/user/show-all-profiles/all-profile");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 py-2"
                    >
                      My Chats
                    </button>
                    <button
                      onClick={() => {
                        handleNavigate("/user/user-change-password");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 py-2"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => {
                        handleNavigate("/user/user-settings-page");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 py-2"
                    >
                      User Settings
                    </button>
                    <button
                      onClick={() => {
                        handleLogOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-red-600 py-2"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleNavigate("/user/user-sign-up");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-800 hover:text-purple-600 font-medium py-2"
                    >
                      REGISTER
                    </button>
                    <button
                      onClick={() => {
                        handleNavigate("/user/user-login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      LOGIN
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default MainLayout;