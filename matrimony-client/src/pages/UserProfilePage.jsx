import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserSideBar from "../components/UserSideBar";
import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import { getUserProfile } from "../api/axiosService/userAuthService";
import profImage from "../assets/images/blue-circle-with-white-user_78370-4707.avif";
import LayoutComponent from "../components/layouts/LayoutComponent";

// Helper Components
const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "8px 0",
        fontSize: "0.95rem",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <span style={{ color: "#666", fontWeight: "500", minWidth: "200px" }}>
        {label}:
      </span>
      <span
        style={{
          color: "#333",
          fontWeight: "600",
          flex: 1,
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
    </div>
  );
};

const ProfileSection = ({ title, icon, children }) => (
  <div className="col-12 mb-3">
    <div
      style={{
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h4
        style={{
          marginBottom: "15px",
          fontSize: "1.2rem",
          fontWeight: "600",
          color: "#333",
          borderBottom: "2px solid #7c3aed",
          paddingBottom: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <i className={`fa ${icon}`} style={{ color: "#7c3aed" }}></i>
        {title}
      </h4>
      <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  </div>
);

const SocialLink = ({ icon, color, label, value }) => (
  <a
    href={value.startsWith("http") ? value : `https://${value}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      textDecoration: "none",
      padding: "8px 16px",
      borderRadius: "15px",
      background: "#f3f4f6",
      transition: "all 0.2s ease",
      fontSize: "0.9rem",
    }}
  >
    <i
      className={`fa ${icon}`}
      style={{ fontSize: "1.1rem", color: color }}
    ></i>
    <span style={{ color: "#333", fontWeight: "500" }}>{label}</span>
  </a>
);

const UserProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserProfile(userId);
      if (response.status === 200) {
        setUserInfo(response.data.data);
      }
    };
    fetchData();
  }, [userId]);

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
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

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      {/* Main Content Area */}
      <div style={{ paddingTop: "115px", paddingBottom: "40px" }}>
        <div className="db">
          <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
              {/* Sidebar - Left Column */}
              <div
                className="col-md-3 col-lg-2"
                style={{ paddingLeft: 0, marginLeft: "0px" }}
              >
                <UserSideBar />
              </div>

              {/* Profile Content - Right Column with Vertical Scroll */}
              <div
                className="col-md-9 col-lg-10"
                style={{
                  paddingLeft: "20px",
                  paddingRight: "15px",
                  height: "calc(100vh - 80px)",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <div className="row">
                  {/* Header with Edit Button */}
                  <div className="col-12">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <h2 className="db-tit" style={{ margin: 0 }}>
                        My Profile
                      </h2>
                      <Link
                        to={`/user/user-profile-edit-page/${userId}`}
                        className="btn btn-primary"
                        style={{
                          padding: "10px 24px",
                          fontSize: "14px",
                          borderRadius: "5px",
                          textDecoration: "none",
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          style={{ marginRight: "8px" }}
                        ></i>
                        Edit Profile
                      </Link>
                    </div>
                  </div>

                  {/* Profile Header Card */}
                  <div className="col-12 mb-4">
                    <div
                      className="db-profile"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "25px",
                        padding: "25px",
                        background: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      }}
                    >
                      <div
                        className="img overflow-hidden rounded-full flex items-center justify-center bg-gray-200"
                        style={{
                          width: "130px",
                          height: "130px",
                          minWidth: "130px",
                          minHeight: "130px",
                          border: "5px solid #7c3aed",
                          borderRadius: "50%",
                        }}
                      >
                        {userInfo?.profileImage ? (
                          <img
                            src={userInfo.profileImage}
                            loading="lazy"
                            alt="Profile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                              borderRadius: "50%",
                            }}
                            onError={(e) => {
                              e.target.src = profImage;
                            }}
                          />
                        ) : (
                          <img
                            src={profImage}
                            loading="lazy"
                            alt="Default Profile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </div>

                      <div className="profile-info" style={{ flex: 1 }}>
                        <div className="user-details">
                          <h3
                            style={{
                              margin: "0 0 15px 0",
                              fontSize: "2rem",
                              fontWeight: "700",
                              color: "#333",
                            }}
                          >
                            {userInfo?.userName || "User Name"}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                color: "#666",
                                fontSize: "1rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <i
                                className="fa fa-id-card"
                                style={{ color: "#7c3aed", width: "18px" }}
                              ></i>
                              <span style={{ fontWeight: "500" }}>
                                <strong style={{ color: "#333" }}>
                                  User ID:
                                </strong>{" "}
                                {userInfo?.userUniqueId || "Not provided"}
                              </span>
                            </p>

                            <p
                              style={{
                                margin: "0",
                                color: "#666",
                                fontSize: "1rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <i
                                className="fa fa-phone"
                                style={{ color: "#7c3aed", width: "18px" }}
                              ></i>
                              <span style={{ fontWeight: "500" }}>
                                {userInfo?.userMobile || "Not provided"}
                              </span>
                            </p>
                            <p
                              style={{
                                margin: "0",
                                color: "#666",
                                fontSize: "1rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <i
                                className="fa fa-envelope"
                                style={{ color: "#7c3aed", width: "18px" }}
                              ></i>
                              <span style={{ fontWeight: "500" }}>
                                {userInfo?.userEmail || "Not provided"}
                              </span>
                            </p>
                            <div
                              style={{
                                marginTop: "5px",
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                              }}
                            >
                              <span
                                className={`badge ${
                                  userInfo?.profileStatus === "Approved"
                                    ? "bg-success"
                                    : userInfo?.profileStatus === "Pending"
                                      ? "bg-warning text-dark"
                                      : "bg-secondary"
                                }`}
                                style={{
                                  padding: "8px 16px",
                                  fontSize: "0.9rem",
                                  fontWeight: "600",
                                  borderRadius: "20px",
                                }}
                              >
                                {userInfo?.profileStatus || "Pending"}
                              </span>
                              <span
                                className="badge bg-info"
                                style={{
                                  padding: "8px 16px",
                                  fontSize: "0.9rem",
                                  fontWeight: "600",
                                  borderRadius: "20px",
                                }}
                              >
                                {userInfo?.profileVisibility || "Private"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* About Me Section */}
                  {userInfo?.aboutMe && (
                    <div className="col-12 mb-3">
                      <div
                        style={{
                          padding: "20px",
                          background: "#fff",
                          borderRadius: "10px",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                        }}
                      >
                        <h4
                          style={{
                            marginBottom: "15px",
                            fontSize: "1.3rem",
                            fontWeight: "600",
                            color: "#333",
                            borderBottom: "2px solid #7c3aed",
                            paddingBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <i
                            className="fa fa-user-circle"
                            style={{ color: "#7c3aed" }}
                          ></i>
                          About Me
                        </h4>
                        <p
                          style={{
                            color: "#666",
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            whiteSpace: "pre-line",
                            margin: 0,
                          }}
                        >
                          {userInfo.aboutMe}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Basic Details Section */}
                  <ProfileSection title="Basic Details" icon="fa-info-circle">
                    {/* Profile Created By - Dropdown */}
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        padding: "8px 0",
                        fontSize: "0.95rem",
                        borderBottom: "1px solid #f0f0f0",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "#666",
                          fontWeight: "500",
                          minWidth: "200px",
                        }}
                      >
                        Profile Created By:
                      </span>
                      <select
                        value={userInfo?.profileCreatedFor || ""}
                        onChange={async (e) => {
                          const newValue = e.target.value;
                          // Update local state immediately for instant UI feedback
                          setUserInfo((prev) => ({
                            ...prev,
                            profileCreatedFor: newValue,
                          }));

                          // Call API to save the change
                          try {
                            const formData = new FormData();
                            formData.append("profileCreatedFor", newValue);

                            const { savePersonalInfo } =
                              await import("../api/axiosService/userAuthService");
                            const response = await savePersonalInfo(
                              formData,
                              userId,
                            );

                            if (response.status === 200) {
                              console.log(
                                "Profile Created By updated successfully",
                              );
                            }
                          } catch (error) {
                            console.error(
                              "Error updating Profile Created By:",
                              error,
                            );
                            // Revert on error
                            const response = await getUserProfile(userId);
                            if (response.status === 200) {
                              setUserInfo(response.data.data);
                            }
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "2px solid #e0e0e0",
                          fontSize: "0.95rem",
                          fontWeight: "600",
                          color: "#333",
                          background: "#fff",
                          cursor: "pointer",
                          outline: "none",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#667eea";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e0e0e0";
                        }}
                      >
                        <option value="">Select</option>
                        <option value="Self">Self</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Friend">Friend</option>
                        <option value="Relative">Relative</option>
                      </select>
                    </div>
                    <InfoRow label="Name" value={userInfo?.userName} />
                    <InfoRow
                      label="Age"
                      value={
                        userInfo?.dateOfBirth
                          ? `${calculateAge(
                              userInfo.dateOfBirth,
                            )} years / ${new Date(
                              userInfo.dateOfBirth,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}`
                          : null
                      }
                    />
                    <InfoRow label="Body Type" value={userInfo?.bodyType} />
                    <InfoRow
                      label="Physical Status"
                      value={userInfo?.physicalStatus}
                    />
                    <InfoRow label="Complexion" value={userInfo?.complexion} />
                    <InfoRow
                      label="Height"
                      value={userInfo?.height ? `${userInfo.height} cm` : null}
                    />
                    <InfoRow
                      label="Weight"
                      value={userInfo?.weight ? `${userInfo.weight} kg` : null}
                    />
                    <InfoRow
                      label="Marital Status"
                      value={userInfo?.maritalStatus}
                    />

                    {userInfo?.maritalStatus &&
                      userInfo.maritalStatus !== "Never Married" && (
                        <>
                          <InfoRow
                            label="Married Month & Year"
                            value={userInfo?.marriedMonthYear}
                          />
                          <InfoRow
                            label="Living Together Period"
                            value={userInfo?.livingTogetherPeriod}
                          />
                          <InfoRow
                            label="Child Status"
                            value={userInfo?.childStatus}
                          />
                          <InfoRow
                            label="No. of Children"
                            value={userInfo?.numberOfChildren}
                          />
                        </>
                      )}

                    {(userInfo?.maritalStatus === "Divorced" ||
                      userInfo?.maritalStatus === "Awaiting Divorce") && (
                      <>
                        <InfoRow
                          label="Divorced Month & Year"
                          value={userInfo?.divorcedMonthYear}
                        />
                        <InfoRow
                          label="Reason for Divorce"
                          value={userInfo?.reasonForDivorce}
                        />
                      </>
                    )}

                    <InfoRow
                      label="Eating Habits"
                      value={userInfo?.eatingHabits}
                    />
                    <InfoRow
                      label="Drinking Habits"
                      value={userInfo?.drinkingHabits}
                    />
                    <InfoRow
                      label="Smoking Habits"
                      value={userInfo?.smokingHabits}
                    />
                    <InfoRow
                      label="Mother Tongue"
                      value={userInfo?.motherTongue}
                    />
                    <InfoRow label="Caste" value={userInfo?.caste} />
                  </ProfileSection>

                  {/* Family Details Section */}
                  <ProfileSection title="Family Details" icon="fa-users">
                    <InfoRow
                      label="Father's Name"
                      value={userInfo?.fathersName}
                    />
                    <InfoRow
                      label="Mother's Name"
                      value={userInfo?.mothersName}
                    />
                    <InfoRow
                      label="Father's Occupation"
                      value={userInfo?.fathersOccupation}
                    />
                    <InfoRow
                      label="Father's Profession"
                      value={userInfo?.fathersProfession}
                    />
                    <InfoRow
                      label="Mother's Occupation"
                      value={userInfo?.mothersOccupation}
                    />
                    <InfoRow
                      label="Father's Native"
                      value={userInfo?.fathersNative}
                    />
                    <InfoRow
                      label="Mother's Native"
                      value={userInfo?.mothersNative}
                    />
                    <InfoRow
                      label="Family Value"
                      value={userInfo?.familyValue}
                    />
                    <InfoRow label="Family Type" value={userInfo?.familyType} />
                    <InfoRow
                      label="Family Status"
                      value={userInfo?.familyStatus}
                    />
                    <InfoRow
                      label="Residence Type"
                      value={userInfo?.residenceType}
                    />
                    <InfoRow
                      label="No. of Brothers"
                      value={userInfo?.numberOfBrothers}
                    />
                    <InfoRow
                      label="No. of Sisters"
                      value={userInfo?.numberOfSisters}
                    />
                  </ProfileSection>

                  {/* Religious Information Section */}
                  <ProfileSection
                    title="Religious Information"
                    icon="fa-praying-hands"
                  >
                    <InfoRow label="Religion" value={userInfo?.religion} />
                    <InfoRow
                      label="Denomination"
                      value={userInfo?.denomination}
                    />
                    <InfoRow label="Church" value={userInfo?.church} />
                    <InfoRow
                      label="Church Activity"
                      value={userInfo?.churchActivity}
                    />
                    <InfoRow
                      label="Pastor's Name"
                      value={userInfo?.pastorsName}
                    />
                    <InfoRow
                      label="Spirituality"
                      value={userInfo?.spirituality}
                    />
                    <InfoRow
                      label="Religious Detail"
                      value={userInfo?.religiousDetail}
                    />
                  </ProfileSection>

                  {/* Professional Information Section */}
                  <ProfileSection
                    title="Professional Information"
                    icon="fa-briefcase"
                  >
                    <InfoRow label="Education" value={userInfo?.education} />
                    <InfoRow
                      label="Additional Education"
                      value={userInfo?.additionalEducation}
                    />
                    <InfoRow
                      label="College/Institution"
                      value={userInfo?.college}
                    />
                    <InfoRow
                      label="Education in Detail"
                      value={userInfo?.educationDetail}
                    />
                    <InfoRow
                      label="Employment Type"
                      value={userInfo?.employmentType}
                    />
                    <InfoRow label="Occupation" value={userInfo?.occupation} />
                    <InfoRow label="Position" value={userInfo?.position} />
                    <InfoRow
                      label="Company Name"
                      value={userInfo?.companyName}
                    />
                    <InfoRow
                      label="Annual Income"
                      value={userInfo?.annualIncome}
                    />
                  </ProfileSection>

                  {/* Contact Information Section */}
                  <ProfileSection
                    title="Contact Information"
                    icon="fa-address-card"
                  >
                    <InfoRow
                      label="Mobile Number"
                      value={userInfo?.userMobile}
                    />
                    <InfoRow
                      label="Alternate Mobile"
                      value={userInfo?.alternateMobile}
                    />
                    <InfoRow
                      label="Landline"
                      value={userInfo?.landlineNumber}
                    />
                    <InfoRow label="Email" value={userInfo?.userEmail} />
                    <InfoRow
                      label="Current Address"
                      value={userInfo?.currentAddress}
                    />
                    <InfoRow
                      label="Permanent Address"
                      value={userInfo?.permanentAddress}
                    />
                    <InfoRow label="City" value={userInfo?.city} />
                    <InfoRow label="State" value={userInfo?.state} />
                    <InfoRow label="Pincode" value={userInfo?.pincode} />
                    <InfoRow label="Citizen Of" value={userInfo?.citizenOf} />
                    <InfoRow
                      label="Contact Person"
                      value={userInfo?.contactPersonName}
                    />
                    <InfoRow
                      label="Relationship"
                      value={userInfo?.relationship}
                    />
                  </ProfileSection>

                  {/* Lifestyle & Hobbies Section */}
                  <ProfileSection title="Lifestyle & Hobbies" icon="fa-guitar">
                    <InfoRow
                      label="Hobbies"
                      value={
                        Array.isArray(userInfo?.hobbies)
                          ? userInfo.hobbies.join(", ")
                          : userInfo?.hobbies
                      }
                    />
                    <InfoRow label="Interests" value={userInfo?.interests} />
                    <InfoRow label="Music" value={userInfo?.music} />
                    <InfoRow
                      label="Favourite Reads"
                      value={userInfo?.favouriteReads}
                    />
                    <InfoRow
                      label="Favourite Cuisines"
                      value={userInfo?.favouriteCuisines}
                    />
                    <InfoRow
                      label="Sports/Activities"
                      value={userInfo?.sportsActivities}
                    />
                    <InfoRow
                      label="Dress Styles"
                      value={userInfo?.dressStyles}
                    />
                  </ProfileSection>

                  {/* Social Media Section */}
                  <ProfileSection title="Social Media" icon="fa-share-alt">
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "12px",
                        padding: "10px 0",
                      }}
                    >
                      {userInfo?.whatsapp && (
                        <SocialLink
                          icon="fa-whatsapp"
                          color="#25D366"
                          label="WhatsApp"
                          value={userInfo.whatsapp}
                        />
                      )}
                      {userInfo?.facebook && (
                        <SocialLink
                          icon="fa-facebook"
                          color="#1877F2"
                          label="Facebook"
                          value={userInfo.facebook}
                        />
                      )}
                      {userInfo?.instagram && (
                        <SocialLink
                          icon="fa-instagram"
                          color="#E1306C"
                          label="Instagram"
                          value={userInfo.instagram}
                        />
                      )}
                      {userInfo?.x && (
                        <SocialLink
                          icon="fa-twitter"
                          color="#1DA1F2"
                          label="X (Twitter)"
                          value={userInfo.x}
                        />
                      )}
                      {userInfo?.linkedin && (
                        <SocialLink
                          icon="fa-linkedin"
                          color="#0A66C2"
                          label="LinkedIn"
                          value={userInfo.linkedin}
                        />
                      )}
                      {userInfo?.youtube && (
                        <SocialLink
                          icon="fa-youtube"
                          color="#FF0000"
                          label="YouTube"
                          value={userInfo.youtube}
                        />
                      )}
                    </div>
                  </ProfileSection>

                  {/* Partner Preferences Section */}
                  <ProfileSection title="Partner Preferences" icon="fa-heart">
                    <div style={{ marginBottom: "10px" }}>
                      <h5
                        style={{
                          color: "#7c3aed",
                          marginTop: "10px",
                          marginBottom: "15px",
                          fontWeight: "600",
                          fontSize: "1.05rem",
                        }}
                      >
                        Basic & Religious
                      </h5>
                    </div>
                    <InfoRow
                      label="Age Range"
                      value={
                        userInfo?.partnerAgeFrom && userInfo?.partnerAgeTo
                          ? `${userInfo.partnerAgeFrom} - ${userInfo.partnerAgeTo} Years`
                          : null
                      }
                    />
                    <InfoRow
                      label="Height"
                      value={
                        userInfo?.partnerHeight
                          ? `${userInfo.partnerHeight} cm`
                          : null
                      }
                    />
                    <InfoRow
                      label="Marital Status"
                      value={userInfo?.partnerMaritalStatus}
                    />
                    <InfoRow
                      label="Mother Tongue"
                      value={userInfo?.partnerMotherTongue}
                    />
                    <InfoRow label="Caste" value={userInfo?.partnerCaste} />
                    <InfoRow
                      label="Physical Status"
                      value={userInfo?.partnerPhysicalStatus}
                    />
                    <InfoRow
                      label="Eating Habits"
                      value={userInfo?.partnerEatingHabits}
                    />
                    <InfoRow
                      label="Drinking Habits"
                      value={userInfo?.partnerDrinkingHabits}
                    />
                    <InfoRow
                      label="Smoking Habits"
                      value={userInfo?.partnerSmokingHabits}
                    />
                    <InfoRow
                      label="Denomination"
                      value={userInfo?.partnerDenomination}
                    />
                    <InfoRow
                      label="Spirituality"
                      value={userInfo?.partnerSpirituality}
                    />

                    <div style={{ marginTop: "20px", marginBottom: "10px" }}>
                      <h5
                        style={{
                          color: "#7c3aed",
                          marginBottom: "15px",
                          fontWeight: "600",
                          fontSize: "1.05rem",
                        }}
                      >
                        Professional & Location
                      </h5>
                    </div>
                    <InfoRow
                      label="Education"
                      value={userInfo?.partnerEducation}
                    />
                    <InfoRow
                      label="Employment Type"
                      value={userInfo?.partnerEmploymentType}
                    />
                    <InfoRow
                      label="Occupation"
                      value={userInfo?.partnerOccupation}
                    />
                    <InfoRow
                      label="Annual Income"
                      value={userInfo?.partnerAnnualIncome}
                    />
                    <InfoRow label="Country" value={userInfo?.partnerCountry} />
                    <InfoRow label="State" value={userInfo?.partnerState} />
                    <InfoRow
                      label="District"
                      value={userInfo?.partnerDistrict}
                    />
                  </ProfileSection>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      <CopyRights />
    </div>
  );
};

export default UserProfilePage;
