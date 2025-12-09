import React, { useEffect, useState } from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import { useParams } from "react-router-dom";
import { getTheProfieMoreDetails } from "../../api/axiosService/userAuthService";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import RelatedProfiles from "./RelatedProfiles";
import ShowInterest from "./ShowInterest";

const MoreDetails = () => {
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Handle chat submission
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage("");

    // Simulate reply after 1 second
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text: "Thanks for your message!",
        sender: "profile",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages((prev) => [...prev, reply]);
    }, 1000);
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

  const calculatedAge = calculateAge(profileData.dateOfBirth);

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="profi-pg-container">
          {" "}
          {/* Added container class */}
          <div className="profi-pg profi-ban">
            <div className="profile-image-sticky">
              {" "}
              {/* Sticky image container */}
              <div className="profile">
                <div className="pg-pro-big-im">
                  <div className="s1">
                    <img
                      src={
                        profileData.profileImage ||
                        "images/profiles/profile-large.jpg"
                      }
                      loading="lazy"
                      className="pro"
                      alt={profileData.userName || "Profile"}
                    />
                  </div>
                  <div className="s3">
                    <button
                      className="cta fol cta-chat"
                      onClick={() => setIsChatOpen(!isChatOpen)}
                    >
                      Chat now
                    </button>
                    <span
                      className="cta cta-sendint"
                      data-toggle="modal"
                      data-target="#sendInter"
                    >
                      Send interest
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-details-scrollable">
              {" "}
              {/* Scrollable details container */}
              <div className="profi-pg profi-bio">
                <div className="lhs">
                  <div className="pro-pg-intro">
                    <h1>{profileData.userName || "Name not available"}</h1>
                    <div className="pro-info-status">
                      <span className="stat-1">
                        <b>100</b> viewers
                      </span>
                      <span className="stat-2">
                        <b>Available</b> online
                      </span>
                    </div>
                    <ul>
                      <li>
                        <div>
                          <img
                            src="images/icon/pro-city.png"
                            loading="lazy"
                            alt=""
                          />
                          <span>
                            City:{" "}
                            <strong>
                              {profileData.city || "Not specified"}
                            </strong>
                          </span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <img
                            src="images/icon/pro-age.png"
                            loading="lazy"
                            alt=""
                          />
                          <span>
                            Age:{" "}
                            <strong>
                              {calculatedAge ||
                                profileData.age ||
                                "Not specified"}
                            </strong>
                          </span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <img
                            src="images/icon/pro-city.png"
                            loading="lazy"
                            alt=""
                          />
                          <span>
                            Height:{" "}
                            <strong>
                              {profileData.height
                                ? `${profileData.height}cm`
                                : "Not specified"}
                            </strong>
                          </span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <img
                            src="images/icon/pro-city.png"
                            loading="lazy"
                            alt=""
                          />
                          <span>
                            Job:{" "}
                            <strong>
                              {profileData.jobType || "Not specified"}
                            </strong>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* PROFILE ABOUT */}
                  <div className="pr-bio-c pr-bio-abo">
                    <h3>About</h3>
                    <p>
                      {profileData.aboutMe ||
                        "No information provided about this profile."}
                    </p>
                  </div>

                  <div className="pr-bio-c pr-bio-gal" id="gallery">
                    <h3>Photo gallery</h3>
                    <div id="image-gallery">
                      {profileData.additionalImages &&
                      profileData.additionalImages.length > 0 ? (
                        profileData.additionalImages.map((image, index) => (
                          <div key={index} className="pro-gal-imag">
                            <div className="img-wrapper">
                              <a href="#!">
                                <img
                                  src={image}
                                  className="img-responsive"
                                  alt={`Gallery image ${index + 1}`}
                                />
                              </a>
                              <div className="img-overlay">
                                <i
                                  className="fa fa-arrows-alt"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No additional images available</p>
                      )}
                    </div>
                  </div>
                  {/* END PROFILE ABOUT */}
                  {/* PROFILE ABOUT */}
                  <div className="pr-bio-c pr-bio-conta">
                    <h3>Contact info</h3>
                    <ul>
                      <li>
                        <span>
                          <i className="fa fa-mobile" aria-hidden="true" />
                          <b>Phone:</b>
                          {profileData.userMobile || "Not provided"}
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-envelope-o" aria-hidden="true" />
                          <b>Email:</b>
                          {profileData.userEmail || "Not provided"}
                        </span>
                      </li>
                      <li>
                        <span>
                          <i
                            className="fa fa fa-map-marker"
                            aria-hidden="true"
                          />
                          <b>Address: </b>
                          {profileData.address || "Not provided"}
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* END PROFILE ABOUT */}
                  {/* PROFILE ABOUT */}
                  <div className="pr-bio-c pr-bio-info">
                    <h3>Personal information</h3>
                    <ul>
                      <li>
                        <b>Name:</b> {profileData.userName || "Not provided"}
                      </li>
                      <li>
                        <b>Father's name:</b>{" "}
                        {profileData.fathersName || "Not provided"}
                      </li>
                      <li>
                        <b>Mother's name:</b>{" "}
                        {profileData.mothersName || "Not provided"}
                      </li>
                      <li>
                        <b>Age:</b>{" "}
                        {calculatedAge || profileData.age || "Not provided"}
                      </li>
                      <li>
                        <b>Date of birth:</b>{" "}
                        {formatDate(profileData.dateOfBirth) || "Not provided"}
                      </li>
                      <li>
                        <b>Height:</b>{" "}
                        {profileData.height
                          ? `${profileData.height}cm`
                          : "Not provided"}
                      </li>
                      <li>
                        <b>Weight:</b>{" "}
                        {profileData.weight
                          ? `${profileData.weight}kg`
                          : "Not provided"}
                      </li>
                      <li>
                        <b>Degree:</b> {profileData.degree || "Not provided"}
                      </li>
                      <li>
                        <b>Gender:</b> {profileData.gender || "Not provided"}
                      </li>
                      <li>
                        <b>College:</b> {profileData.college || "Not provided"}
                      </li>
                      <li>
                        <b>School:</b> {profileData.school || "Not provided"}
                      </li>
                      <li>
                        <b>Job Type:</b> {profileData.jobType || "Not provided"}
                      </li>
                      <li>
                        <b>Company:</b>{" "}
                        {profileData.companyName || "Not provided"}
                      </li>
                      <li>
                        <b>Job Experience:</b>{" "}
                        {profileData.jobExperience
                          ? `${profileData.jobExperience} years`
                          : "Not provided"}
                      </li>
                      <li>
                        <b>Salary:</b>{" "}
                        {profileData.salary
                          ? `₹${profileData.salary}`
                          : "Not provided"}
                      </li>
                    </ul>
                  </div>
                  {/* END PROFILE ABOUT */}
                  {/* PROFILE ABOUT */}
                  <div className="pr-bio-c pr-bio-hob">
                    <h3>Hobbies</h3>
                    <ul>
                      {profileData.hobbies && profileData.hobbies.length > 0 ? (
                        profileData.hobbies.map((hobby, index) => (
                          <li key={index}>
                            <span>{hobby}</span>
                          </li>
                        ))
                      ) : (
                        <li>
                          <span>No hobbies listed</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  {/* END PROFILE ABOUT */}
                  {/* PROFILE ABOUT */}
                  <div className="pr-bio-c menu-pop-soci pr-bio-soc">
                    <h3>Social media</h3>
                    <ul>
                      {profileData.facebook && (
                        <li>
                          <a
                            href={profileData.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa fa-facebook" aria-hidden="true" />
                          </a>
                        </li>
                      )}
                      {profileData.x && (
                        <li>
                          <a
                            href={profileData.x}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa fa-twitter" aria-hidden="true" />
                          </a>
                        </li>
                      )}
                      {profileData.whatsapp && (
                        <li>
                          <a
                            href={`https://wa.me/${profileData.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa fa-whatsapp" aria-hidden="true" />
                          </a>
                        </li>
                      )}
                      {profileData.linkedin && (
                        <li>
                          <a
                            href={profileData.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa fa-linkedin" aria-hidden="true" />
                          </a>
                        </li>
                      )}
                      {profileData.youtube && (
                        <li>
                          <a
                            href={profileData.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i
                              className="fa fa-youtube-play"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      )}
                      {profileData.instagram && (
                        <li>
                          <a
                            href={profileData.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa fa-instagram" aria-hidden="true" />
                          </a>
                        </li>
                      )}
                    </ul>
                    {!profileData.facebook &&
                      !profileData.x &&
                      !profileData.whatsapp &&
                      !profileData.linkedin &&
                      !profileData.youtube &&
                      !profileData.instagram && (
                        <p>No social media links provided</p>
                      )}
                  </div>
                  {/* END PROFILE ABOUT */}
                </div>
                {/* PROFILE lHS */}
                <div className="rhs">
                  {/* HELP BOX */}
                  <div className="prof-rhs-help">
                    <div className="inn">
                      <h3>Tell us your Needs</h3>
                      <p>
                        Tell us what kind of service or experts you are looking.
                      </p>
                      <a href="sign-up.html">Register for free</a>
                    </div>
                  </div>
                  <RelatedProfiles />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShowInterest />

      {isChatOpen && (
        <div className="chatbox active">
          <span
            className="comm-msg-pop-clo"
            onClick={() => setIsChatOpen(false)}
          >
            <i className="fa fa-times" aria-hidden="true" />
          </span>
          <div className="inn">
            <form onSubmit={handleChatSubmit}>
              <div className="s1">
                <img
                  src={profileData.profileImage || "images/profiles/2.jpg"}
                  className="intephoto2"
                  alt=""
                />
                <h4>
                  <b>{profileData.userName || "User"},</b>
                </h4>
                <span className="avlsta avilyes">Available online</span>
              </div>
              <div className="s2 chat-box-messages">
                {chatMessages.length === 0 ? (
                  <span className="chat-wel">Start a new chat!!! now</span>
                ) : (
                  <div className="chat-con">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`chat-${
                          message.sender === "user" ? "rhs" : "lhs"
                        }`}
                      >
                        {message.text}
                        <span className="message-time">
                          {message.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="s3">
                <input
                  type="text"
                  name="chat_message"
                  placeholder="Type a message here.."
                  required
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button id="chat_send1" name="chat_send" type="submit">
                  Send <i className="fa fa-paper-plane-o" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <CopyRights />
    </div>
  );
};

export default MoreDetails;
