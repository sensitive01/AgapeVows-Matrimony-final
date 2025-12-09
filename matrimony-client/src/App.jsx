import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import UserHomePage from "./pages/UserHomePage";
import UserLoginPage from "./pages/UserLoginPage";
import UserSignUp from "./pages/UserSignUp";
import UserWedding from "./pages/UserWedding";
import UserWeddingVideoPage from "./pages/UserWeddingVideoPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserProfileEditPage from "./pages/UserProfileEditPage";
import UserPlanPage from "./pages/UserPlanPage";
import UserInterest from "./pages/UserInterest";
import UserChatPage from "./pages/UserChatPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import UserServicePage from "./pages/UserServicePage";
import UserAllProfilePage from "./pages/allprofile/UserAllProfilePage";
import AboutPage from "./pages/aboutPage/AboutPage";
import FaqPage from "./pages/faq/FaqPage";
import ContactPage from "./pages/contact/ContactPage";
import EnquiryPage from "./pages/enquirypage/EnquiryPage";
import JoinNow from "./pages/joinnow/JoinNow";
import MoreDetails from "./pages/allprofile/MoreDetails";
import ForgotPassword from "./pages/forgotpassword/ForgotPasswordPage";
import ChangePassword from "./pages/changepassword/ChangePassword";
import UserPlanSelection from "./pages/userplanselection/UserPlanSelection";
import UserSearchResult from "./pages/userSearch/UserSearchResult";
import AgapeVowsApp from "./components/sample/AgapeVowsApp";
import HomePageComponent from "./components/agapeows-components/pages/HomePageComponent";
import ShortListedProfile from "./pages/shortlist/ShortListedProfile";
import WhoViewedYou from "./hooks/whoviewedyou/WhoViewedYou";
import BlockedProfile from "./pages/blockedprofile/BlockedProfile";
import IgnoredProfile from "./pages/ignoredprofile/IgnoredProfile";

// Component to handle page reloads
function ReloadHandler() {
  const location = useLocation();

  useEffect(() => {
    // Store the previous path to detect actual navigation
    const previousPath = sessionStorage.getItem("previousPath");
    const currentPath = location.pathname;

    // Only reload if we're navigating from a different path
    if (previousPath && previousPath !== currentPath) {
      sessionStorage.setItem("previousPath", currentPath);
      window.location.reload();
    } else if (!previousPath) {
      // First visit, just store the path
      sessionStorage.setItem("previousPath", currentPath);
    }
  }, [location.pathname]);
 
  return null;
}

function App() {
  return (
    <Router>
      {/* <ReloadHandler /> */}
      <Routes>
        {/* <Route path="/" element={<UserHomePage />} /> */}
        <Route path="/" element={<HomePageComponent />} />

        <Route path="/user/user-login" element={<UserLoginPage />} />
        <Route path="/user/user-sign-up" element={<UserSignUp />} />

        <Route path="/user/user-wedding-page" element={<UserWedding />} />
        <Route
          path="/user/user-wedding-video-page"
          element={<UserWeddingVideoPage />}
        />
        <Route path="/user/user-settings-page" element={<UserSettingsPage />} />
        <Route path="/user/user-profile-page" element={<UserProfilePage />} />
        <Route
          path="/user/user-profile-edit-page/:userId"
          element={<UserProfileEditPage />}
        />

        <Route
          path="/user/user-plan-selection"
          element={<UserPlanSelection />}
        />
        <Route path="/user/user-plan-page" element={<UserPlanPage />} />
        <Route path="/user/user-interest-page" element={<UserInterest />} />
        <Route path="/user/user-chat-page" element={<UserChatPage />} />
        <Route
          path="/user/user-dashboard-page"
          element={<UserDashboardPage />}
        />
        <Route path="/user/user-service-page" element={<UserServicePage />} />
        <Route
          path="/user/show-all-profiles/:searchContent"
          element={<UserAllProfilePage />}
        />
        <Route
          path="/user/short-listed-profiles-page"
          element={<ShortListedProfile />}
        />
        <Route
          path="/user/who-viewed-you-page"
          element={<WhoViewedYou />}
        />
        <Route
          path="/user/blocked-profiles-page"
          element={<BlockedProfile />}
        />
        <Route
          path="/user/ignored-profiles-page"
          element={<IgnoredProfile />}
        />

        <Route path="/show-searched-result" element={<UserSearchResult />} />
        <Route path="/reset-password/:userId" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/profile-more-details/:profileId"
          element={<MoreDetails />}
        />
        <Route path="/join-now-page" element={<JoinNow />} />
        <Route path="/enquiry-page" element={<EnquiryPage />} />
        <Route path="/contact-page" element={<ContactPage />} />
        <Route path="/faq-page" element={<FaqPage />} />
        <Route path="/about-us" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
