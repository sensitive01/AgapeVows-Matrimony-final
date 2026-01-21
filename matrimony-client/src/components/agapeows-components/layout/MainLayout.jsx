import React, { useState, useEffect } from "react";
/* import { useLocation } from "react-router-dom"; */
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
  User,
} from "lucide-react";
import logo from "../../../assets/images/agapevows - logo.webp";
import { getUserProfile } from "../../../api/axiosService/userAuthService";
/* import profileImg from "../../../assets/images/profiles/1.jpg"; */ // Removed as we use generic icon now
import PreLoader from "../../PreLoader";
import GlobalSearchModal from "../../GlobalSearchModal";

// ExploreDropdown Component - Redesigned as List
const ExploreDropdown = ({ isVisible }) => {
  const categories = [
    {
      title: "Personalized Matrimony",
      path: "#",
    },
    {
      title: "NRI Matrimony",
      path: "#",
    },
    {
      title: "Churches - Partner with Us",
      path: "#",
    },
    {
      title: "Become a Matrimonial Advisor",
      path: "#",
    },
    {
      title: "Pre-Marital and Marital Counseling",
      path: "#",
    },
    {
      title: "Bridal Make-up",
      path: "/bridal-makeup",
    },
    {
      title: "Insurance Services",
      path: "/insurance-services",
    },
  ];

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div
      className={`absolute top-full left-0 mt-2 w-72 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100 transition-all duration-300 ${
        isVisible
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-2"
      }`}
    >
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleNavigate(category.path)}
          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors font-medium border-b border-gray-50 last:border-0"
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};

// Profile Dropdown Component
const ProfileDropdown = ({ isVisible, onLogout }) => {
  const profileLinks = [
    { label: "My Profile", path: "/user/user-profile-page" },
    // { label: "My Chatss", path: "/user/show-all-profiles/all-profile" },
    { label: "Change Password", path: "/reset-password/:userId" },
    { label: "User Settings", path: "/user/user-settings-page" },
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
  /* const location = useLocation(); */ // Removed unused var

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreDropdownVisible, setIsExploreDropdownVisible] =
    useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  /* import { User as UserIcon } from "lucide-react"; */
  // Need to add User to imports first.

  const [userImage, setUserImage] = useState(
    localStorage.getItem("userImage") || null,
  ); // Initialize from storage
  /* const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); */ // Removed unused var
  const [isUserActive, setIsUserActive] = useState(Boolean(userId));

  useEffect(() => {
    // setIsUserActive(Boolean(userId)); // Removed to prevent double check/re-render logic if handled in init.
    // Actually, keep it if userId changes dynamically? no, userId is const outside.
    // Ideally useEffect should react to something. But userId is from localstorage at render time.
    /* const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } */
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserProfile(userId);
      if (response.status === 200) {
        // Update with fresh data from server
        setUserName(response.data.data.userName || "User");
        setUserImage(response.data.data.profileImage || null);

        // Update storage to keep in sync
        if (response.data.data.userName)
          localStorage.setItem("userName", response.data.data.userName);
        if (response.data.data.profileImage)
          localStorage.setItem("userImage", response.data.data.profileImage);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

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
                {isUserActive && (
                  <div
                    onClick={() => handleNavigate("/user/find-matches")}
                    className="flex items-center space-x-1"
                  >
                    <Search className="w-4 h-4" />
                  </div>
                )}
                <button onClick={() => handleNavigate("/about-us")}>
                  ABOUT
                </button>
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
              {isUserActive && (
                <div
                  onClick={() => handleNavigate("/user/find-matches")}
                  className="cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </div>
              )}
              <button
                onClick={() => handleNavigate("/about")}
                className="text-xs hover:text-purple-200"
              >
                ABOUTs
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
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
          <div className="flex items-center gap-4 md:gap-8">
            {/* Logo - Aligned to Left */}
            <div
              className="flex items-center cursor-pointer shrink-0 mr-auto"
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
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {/* <button
                onClick={() => handleNavigate("/")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                HOME
              </button> */}
              <button
                onClick={() => handleNavigate("/about-us")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                ABOUT US
              </button>
              {isUserActive && (
                <button
                  onClick={() => handleNavigate("/user/find-matches")}
                  className="text-gray-800 hover:text-purple-600 font-medium"
                >
                  SEARCH
                </button>
              )}
              <div
                className="relative"
                onMouseEnter={() => setIsExploreDropdownVisible(true)}
                onMouseLeave={() => setIsExploreDropdownVisible(false)}
              >
                <button className="text-gray-800 hover:text-purple-600 font-medium flex items-center py-2">
                  SERVICES <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <ExploreDropdown
                  isVisible={isExploreDropdownVisible}
                  isUserActive={isUserActive}
                />
              </div>
              <button
                onClick={() => handleNavigate("/user/events-page")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                EVENTS
              </button>
              <button
                onClick={() => handleNavigate("/user/user-plan-selection")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                PLANS
              </button>
              {/* <button
                onClick={() => handleNavigate("/success-stories")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                SUCCESS STORIES
              </button> */}
              <button
                onClick={() => handleNavigate("/help-support")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                HELP & SUPPORT
              </button>
              {/* <button
                onClick={() => handleNavigate("/about-us")}
                className="text-gray-800 hover:text-purple-600 font-medium"
              >
                ABOUT US
              </button> */}
            </nav>

            {/* User Profile or Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3 justify-end">
              {isUserActive ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsProfileDropdownVisible(true)}
                  onMouseLeave={() => setIsProfileDropdownVisible(false)}
                >
                  <div className="flex items-center space-x-3 cursor-pointer">
                    {userImage ? (
                      <img
                        src={userImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <User className="w-6 h-6" />
                      </div>
                    )}
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
                  SERVICES
                </button>
                <button
                  onClick={() => {
                    handleNavigate("/user/events-page");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-800 hover:text-purple-600 font-medium text-left"
                >
                  EVENTS
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
                      {userImage ? (
                        <img
                          src={userImage}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                          <User className="w-5 h-5" />
                        </div>
                      )}
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
