import React, { useEffect, useState, useRef } from "react";

import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import {
  savePersonalInfo,
  getUserInfo,
} from "../api/axiosService/userAuthService";
import { useParams, useNavigate } from "react-router-dom";
import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";

// BasicInfomation Component (same as before)
const BasicInfomation = ({
  profileImagePreview,
  handleProfileImageChange,
  handleAdditionalImagesChange,
  additionalImagePreviews = [],
  removeAdditionalImage,
}) => {
  const profileImageInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);

  const handleEditIconClick = () => {
    profileImageInputRef.current?.click();
  };

  const handleChooseFilesClick = () => {
    additionalImagesInputRef.current?.click();
  };

  const imagePreviews = Array.isArray(additionalImagePreviews)
    ? additionalImagePreviews
    : [];

  const styles = {
    sectionContainer: {
      padding: "32px",
      background: "#fff",
      borderRadius: "8px",
      marginBottom: "24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    sectionHeader: {
      marginBottom: "8px",
      fontSize: "11px",
      fontWeight: "700",
      color: "#6b7280",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    sectionTitle: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "32px",
      marginTop: "0",
    },
    divider: {
      height: "1px",
      background: "#e5e7eb",
      margin: "32px 0",
    },
    contentRow: {
      display: "flex",
      gap: "60px",
      alignItems: "flex-start",
    },
    leftColumn: {
      flex: "0 0 auto",
    },
    rightColumn: {
      flex: "1",
    },
    profileImageContainer: {
      position: "relative",
      width: "160px",
      height: "160px",
    },
    profileImage: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #e5e7eb",
      background: "#f9fafb",
    },
    profileImagePlaceholder: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      background: "#f3f4f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "3px solid #e5e7eb",
      color: "#9ca3af",
      fontSize: "14px",
      fontWeight: "500",
    },
    editIconOverlay: {
      position: "absolute",
      bottom: "4px",
      right: "4px",
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      background: "#667eea",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
      transition: "all 0.3s ease",
      border: "4px solid #fff",
      zIndex: 10,
    },
    editIconOverlayHover: {
      background: "#5568d3",
      transform: "scale(1.05)",
      boxShadow: "0 6px 16px rgba(102, 126, 234, 0.5)",
    },
    editIcon: {
      color: "#fff",
      fontSize: "18px",
    },
    hiddenInput: {
      display: "none",
    },
    label: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "12px",
      display: "block",
    },
    additionalImagesContainer: {
      marginTop: "0",
    },
    chooseFilesButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "11px 24px",
      background: "#fff",
      border: "2px solid #d1d5db",
      borderRadius: "6px",
      color: "#374151",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    chooseFilesButtonHover: {
      background: "#f9fafb",
      borderColor: "#667eea",
      color: "#667eea",
    },
    selectedFileName: {
      display: "inline-block",
      marginLeft: "16px",
      fontSize: "14px",
      color: "#6b7280",
      fontWeight: "500",
    },
    imagePreviewsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      gap: "16px",
      marginTop: "20px",
    },
    imagePreviewItem: {
      position: "relative",
      width: "100%",
      paddingBottom: "100%",
      borderRadius: "8px",
      overflow: "hidden",
      border: "2px solid #e5e7eb",
      background: "#f9fafb",
    },
    imagePreview: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    removeButton: {
      position: "absolute",
      top: "6px",
      right: "6px",
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: "#ef4444",
      border: "2px solid #fff",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    },
    removeButtonHover: {
      background: "#dc2626",
      transform: "scale(1.1)",
    },
  };

  const [isEditHovered, setIsEditHovered] = React.useState(false);
  const [isChooseFilesHovered, setIsChooseFilesHovered] = React.useState(false);
  const [hoveredRemoveIndex, setHoveredRemoveIndex] = React.useState(null);

  return (
    <div style={styles.sectionContainer}>
      <div style={styles.sectionHeader}>PROFILE</div>
      <h2 style={styles.sectionTitle}>Upload Profile & Album Photos</h2>

      <div style={styles.divider}></div>

      <div style={styles.contentRow}>
        <div style={styles.leftColumn}>
          <label style={styles.label}>Profile Picture:</label>
          <div style={styles.profileImageContainer}>
            {profileImagePreview ? (
              <img
                src={profileImagePreview}
                alt="Profile Preview"
                style={styles.profileImage}
              />
            ) : (
              <div style={styles.profileImagePlaceholder}>No Image</div>
            )}

            <div
              style={{
                ...styles.editIconOverlay,
                ...(isEditHovered && styles.editIconOverlayHover),
              }}
              onClick={handleEditIconClick}
              onMouseEnter={() => setIsEditHovered(true)}
              onMouseLeave={() => setIsEditHovered(false)}
              title="Change profile picture"
            >
              <i className="fa fa-pencil" style={styles.editIcon}></i>
            </div>

            <input
              ref={profileImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={styles.hiddenInput}
            />
          </div>
        </div>

        <div style={styles.rightColumn}>
          <label style={styles.label}>Additional Images:</label>
          <div style={styles.additionalImagesContainer}>
            <button
              type="button"
              style={{
                ...styles.chooseFilesButton,
                ...(isChooseFilesHovered && styles.chooseFilesButtonHover),
              }}
              onClick={handleChooseFilesClick}
              onMouseEnter={() => setIsChooseFilesHovered(true)}
              onMouseLeave={() => setIsChooseFilesHovered(false)}
            >
              <i className="fa fa-upload"></i>
              Choose Files
            </button>

            {imagePreviews.length > 0 && (
              <span style={styles.selectedFileName}>
                {imagePreviews.length} file(s) selected
              </span>
            )}

            <input
              ref={additionalImagesInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImagesChange}
              style={styles.hiddenInput}
            />

            {imagePreviews.length > 0 && (
              <div style={styles.imagePreviewsGrid}>
                {imagePreviews.map((preview, index) => (
                  <div key={index} style={styles.imagePreviewItem}>
                    <img
                      src={preview.url}
                      alt={`Additional ${index + 1}`}
                      style={styles.imagePreview}
                    />
                    <button
                      type="button"
                      style={{
                        ...styles.removeButton,
                        ...(hoveredRemoveIndex === index &&
                          styles.removeButtonHover),
                      }}
                      onClick={() => removeAdditionalImage(index)}
                      onMouseEnter={() => setHoveredRemoveIndex(index)}
                      onMouseLeave={() => setHoveredRemoveIndex(null)}
                      title="Remove image"
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Form Section Component
const FormSection = ({ title, children }) => (
  <div
    style={{
      padding: "32px",
      background: "#fff",
      borderRadius: "8px",
      marginBottom: "24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    }}
  >
    <div
      style={{
        marginBottom: "8px",
        fontSize: "11px",
        fontWeight: "700",
        color: "#6b7280",
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}
    >
      SECTION
    </div>
    <h2
      style={{
        fontSize: "28px",
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: "32px",
        marginTop: "0",
      }}
    >
      {title}
    </h2>
    <div
      style={{ height: "1px", background: "#e5e7eb", margin: "0 0 32px 0" }}
    ></div>
    {children}
  </div>
);

// Reusable Form Input Component
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  options,
  required,
  placeholder,
}) => (
  <div>
    <label
      style={{
        fontSize: "14px",
        fontWeight: "600",
        color: "#374151",
        marginBottom: "8px",
        display: "block",
      }}
    >
      {label}
      {required && (
        <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
      )}
    </label>
    {type === "select" ? (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 20px" }}>
        {options.map((option) => (
          <label
            key={option}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "14px",
              color: "#374151",
            }}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              required={required}
              style={{
                width: "16px",
                height: "16px",
                marginRight: "8px",
                accentColor: "#667eea",
                cursor: "pointer",
              }}
            />
            {option}
          </label>
        ))}
      </div>
    ) : type === "textarea" ? (
      <textarea
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={4}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "2px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#374151",
          background: "#fff",
          resize: "vertical",
          transition: "border-color 0.2s ease",
        }}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "2px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#374151",
          background: "#fff",
          transition: "border-color 0.2s ease",
        }}
      />
    )}
  </div>
);

// NEW: Checkbox Group Component for Hobbies
const CheckboxGroup = ({ label, name, options, selectedValues, onChange }) => {
  const handleCheckboxChange = (option) => {
    const updatedValues = selectedValues.includes(option)
      ? selectedValues.filter((item) => item !== option)
      : [...selectedValues, option];

    onChange({
      target: {
        name: name,
        value: updatedValues,
      },
    });
  };

  return (
    <div>
      <label
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "12px",
          display: "block",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "12px",
        }}
      >
        {options.map((option) => (
          <label
            key={option}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "6px",
              transition: "background 0.2s ease",
              background: selectedValues.includes(option)
                ? "#f0f4ff"
                : "transparent",
            }}
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
                accentColor: "#667eea",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                color: "#374151",
              }}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// Main UserProfileEditPage Component
const UserProfileEditPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Basic Details
    profileCreatedFor: "",
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    age: "",
    bodyType: "",
    physicalStatus: "",
    complexion: "",
    height: "",
    weight: "",
    maritalStatus: "",
    marriedMonthYear: "",
    livingTogetherPeriod: "",
    divorcedMonthYear: "",
    reasonForDivorce: "",
    childStatus: "",
    numberOfChildren: "",
    eatingHabits: "",
    drinkingHabits: "",
    smokingHabits: "",
    motherTongue: "",
    caste: "",

    // Family Details
    fathersName: "",
    mothersName: "",
    fathersOccupation: "",
    fathersProfession: "",
    mothersOccupation: "",
    fathersNative: "",
    mothersNative: "",
    familyValue: "",
    familyType: "",
    familyStatus: "",
    residenceType: "",
    numberOfBrothers: "",
    numberOfSisters: "",

    // Religious Information
    denomination: "",
    church: "",
    churchActivity: "",
    pastorsName: "",
    spirituality: "",
    religiousDetail: "",

    // Contact Information
    alternateMobile: "",
    landlineNumber: "",
    currentAddress: "",
    permanentAddress: "",
    contactPersonName: "",
    relationship: "",
    citizenOf: "",
    city: "",
    state: "",
    pincode: "",

    // Professional Information
    education: "",
    additionalEducation: "",
    college: "",
    educationDetail: "",
    employmentType: "",
    occupation: "",
    position: "",
    companyName: "",
    annualIncome: "",

    // Lifestyle
    hobbies: [],
    interests: "",
    music: "",
    favouriteReads: "",
    favouriteCuisines: "",
    sportsActivities: "",
    dressStyles: "",

    // Social Media
    whatsapp: "",
    facebook: "",
    instagram: "",
    x: "",
    youtube: "",
    linkedin: "",

    // Partner Preferences - Basic & Religion
    partnerAgeFrom: "",
    partnerAgeTo: "",
    partnerHeight: "",
    partnerMaritalStatus: "",
    partnerMotherTongue: "",
    partnerCaste: "",
    partnerPhysicalStatus: "",
    partnerEatingHabits: "",
    partnerDrinkingHabits: "",
    partnerSmokingHabits: "",
    partnerDenomination: "",
    partnerSpirituality: "",

    // Partner Preferences - Professional
    partnerEducation: "",
    partnerEmploymentType: "",
    partnerOccupation: "",
    partnerAnnualIncome: "",

    // Partner Preferences - Location
    partnerCountry: "",
    partnerState: "",
    partnerDistrict: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [existingAdditionalImages, setExistingAdditionalImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Hobbies options for checkboxes
  const hobbiesOptions = [
    "Reading",
    "Sports",
    "Music",
    "Traveling",
    "Cooking",
    "Photography",
    "Dancing",
    "Gaming",
    "Painting",
    "Writing",
    "Gardening",
    "Yoga",
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserInfo(userId);
        if (response.status === 200) {
          const userData = response.data.data;

          const loadedData = {
            profileCreatedFor: userData.profileCreatedFor || "",
            name: userData.userName || "",
            email: userData.userEmail || "",
            phone: userData.userMobile || "",
            dateOfBirth: userData.dateOfBirth
              ? userData.dateOfBirth.split("T")[0]
              : "",
            age: userData.age ? userData.age.toString() : "",
            bodyType: userData.bodyType || "",
            physicalStatus: userData.physicalStatus || "",
            complexion: userData.complexion || "",
            height: userData.height || "",
            weight: userData.weight || "",
            maritalStatus: userData.maritalStatus || "",
            marriedMonthYear: userData.marriedMonthYear || "",
            livingTogetherPeriod: userData.livingTogetherPeriod || "",
            divorcedMonthYear: userData.divorcedMonthYear || "",
            reasonForDivorce: userData.reasonForDivorce || "",
            childStatus: userData.childStatus || "",
            numberOfChildren: userData.numberOfChildren || "",
            eatingHabits: userData.eatingHabits || "",
            drinkingHabits: userData.drinkingHabits || "",
            smokingHabits: userData.smokingHabits || "",
            motherTongue: userData.motherTongue || "",
            caste: userData.caste || "",
            fathersName: userData.fathersName || "",
            mothersName: userData.mothersName || "",
            fathersOccupation: userData.fathersOccupation || "",
            fathersProfession: userData.fathersProfession || "",
            mothersOccupation: userData.mothersOccupation || "",
            fathersNative: userData.fathersNative || "",
            mothersNative: userData.mothersNative || "",
            familyValue: userData.familyValue || "",
            familyType: userData.familyType || "",
            familyStatus: userData.familyStatus || "",
            residenceType: userData.residenceType || "",
            numberOfBrothers: userData.numberOfBrothers || "",
            numberOfSisters: userData.numberOfSisters || "",
            denomination: userData.denomination || "",
            church: userData.church || "",
            churchActivity: userData.churchActivity || "",
            pastorsName: userData.pastorsName || "",
            spirituality: userData.spirituality || "",
            religiousDetail: userData.religiousDetail || "",
            alternateMobile: userData.alternateMobile || "",
            landlineNumber: userData.landlineNumber || "",
            currentAddress: userData.currentAddress || "",
            permanentAddress: userData.permanentAddress || "",
            contactPersonName: userData.contactPersonName || "",
            relationship: userData.relationship || "",
            citizenOf: userData.citizenOf || "",
            city: userData.city || "",
            state: userData.state || "",
            pincode: userData.pincode || "",
            education: userData.education || "",
            additionalEducation: userData.additionalEducation || "",
            college: userData.college || "",
            educationDetail: userData.educationDetail || "",
            employmentType: userData.employmentType || "",
            occupation: userData.occupation || "",
            position: userData.position || "",
            companyName: userData.companyName || "",
            annualIncome: userData.annualIncome || "",
            hobbies: Array.isArray(userData.hobbies) ? userData.hobbies : [],
            interests: userData.interests || "",
            music: userData.music || "",
            favouriteReads: userData.favouriteReads || "",
            favouriteCuisines: userData.favouriteCuisines || "",
            sportsActivities: userData.sportsActivities || "",
            dressStyles: userData.dressStyles || "",
            whatsapp: userData.whatsapp || "",
            facebook: userData.facebook || "",
            instagram: userData.instagram || "",
            x: userData.x || "",
            youtube: userData.youtube || "",
            linkedin: userData.linkedin || "",
            partnerAgeFrom: userData.partnerAgeFrom || "",
            partnerAgeTo: userData.partnerAgeTo || "",
            partnerHeight: userData.partnerHeight || "",
            partnerMaritalStatus: userData.partnerMaritalStatus || "",
            partnerMotherTongue: userData.partnerMotherTongue || "",
            partnerCaste: userData.partnerCaste || "",
            partnerPhysicalStatus: userData.partnerPhysicalStatus || "",
            partnerEatingHabits: userData.partnerEatingHabits || "",
            partnerDrinkingHabits: userData.partnerDrinkingHabits || "",
            partnerSmokingHabits: userData.partnerSmokingHabits || "",
            partnerDenomination: userData.partnerDenomination || "",
            partnerSpirituality: userData.partnerSpirituality || "",
            partnerEducation: userData.partnerEducation || "",
            partnerEmploymentType: userData.partnerEmploymentType || "",
            partnerOccupation: userData.partnerOccupation || "",
            partnerAnnualIncome: userData.partnerAnnualIncome || "",
            partnerCountry: userData.partnerCountry || "",
            partnerState: userData.partnerState || "",
            partnerDistrict: userData.partnerDistrict || "",
          };

          setFormData(loadedData);

          if (userData.profileImage) {
            setProfileImagePreview(userData.profileImage);
          }

          if (
            userData.additionalImages &&
            userData.additionalImages.length > 0
          ) {
            const existingImages = userData.additionalImages.map((url) => ({
              url,
              isExisting: true,
            }));
            setAdditionalImagePreviews(existingImages);
            setExistingAdditionalImages(userData.additionalImages);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Error loading user data. Please try again.");
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setHasUnsavedChanges(true);

    const updatedData = { ...formData, [name]: value };

    if (name === "dateOfBirth") {
      updatedData.age = calculateAge(value).toString();
    }

    setFormData(updatedData);
  };

  const handleHobbiesChange = (e) => {
    setHasUnsavedChanges(true);

    // For checkbox group
    if (Array.isArray(e.target.value)) {
      setFormData((prev) => ({
        ...prev,
        hobbies: e.target.value,
      }));
    } else {
      // For text input (backward compatibility)
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        hobbies: value
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
      }));
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHasUnsavedChanges(true);
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setHasUnsavedChanges(true);
      setAdditionalImageFiles((prev) => [...prev, ...files]);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAdditionalImagePreviews((prev) => [
            ...prev,
            {
              url: reader.result,
              file: file,
              isExisting: false,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index) => {
    setHasUnsavedChanges(true);
    const imageToRemove = additionalImagePreviews[index];
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index));

    if (imageToRemove.isExisting) {
      setExistingAdditionalImages((prev) =>
        prev.filter((url) => url !== imageToRemove.url)
      );
    } else if (imageToRemove.file) {
      setAdditionalImageFiles((prev) =>
        prev.filter((file) => file !== imageToRemove.file)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitFormData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === "hobbies") {
          if (Array.isArray(formData[key]) && formData[key].length > 0) {
            formData[key].forEach((hobby, index) => {
              submitFormData.append(`hobbies[${index}]`, hobby);
            });
          } else {
            submitFormData.append("hobbies", "");
          }
        } else {
          const value = formData[key];
          submitFormData.append(key, value || "");
        }
      });

      // Append profile image if changed
      if (profileImageFile) {
        submitFormData.append("profileImage", profileImageFile);
      }

      // Append new additional images
      if (additionalImageFiles.length > 0) {
        additionalImageFiles.forEach((file) => {
          submitFormData.append("additionalImages", file);
        });
      }

      // Append existing additional images that weren't removed
      if (existingAdditionalImages.length > 0) {
        existingAdditionalImages.forEach((url, index) => {
          submitFormData.append(`existingAdditionalImages[${index}]`, url);
        });
      }

      console.log("Submitting form data...");
      console.log(
        "Form data to submit:",
        Object.fromEntries(submitFormData.entries())
      );

      const response = await savePersonalInfo(submitFormData, userId);

      console.log("Response:", response);

      if (response.status === 200 || response.data?.success) {
        setHasUnsavedChanges(false);
        alert("Profile updated successfully!");

        // Small delay before navigation to ensure alert is seen
        setTimeout(() => {
          navigate(`/user/user-profile-page`);
        }, 500);
      } else {
        const errorMessage =
          response.data?.message || "Error updating profile. Please try again.";
        alert(errorMessage);
        console.error("Update failed:", response);
      }
    } catch (error) {
      console.error("Error details:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error updating profile. Please try again.";
      alert(errorMessage);

      if (error.response) {
        console.error("Response error:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Warn user about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "50px", paddingBottom: "40px" }}>
        <div
          style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}
        >
          {hasUnsavedChanges && (
            <div
              style={{
                background: "#fef3c7",
                border: "1px solid #f59e0b",
                borderRadius: "6px",
                padding: "12px 16px",
                marginBottom: "16px",
                fontSize: "14px",
                color: "#92400e",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="fa fa-exclamation-triangle"></i>
              You have unsaved changes. Please submit the form to save your
              changes.
            </div>
          )}

          <div
            style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}
          >
            {/* Sidebar */}
            <div
              className="col-md-3 col-lg-2"
              style={{ paddingLeft: 0, marginLeft: "0px" }}
            >
              <UserSideBar />
            </div>
            {/* Main Content */}
            <div style={{ flex: 1 }}>
              <form onSubmit={handleSubmit}>
                {/* Profile Image Upload Section */}
                <BasicInfomation
                  profileImagePreview={profileImagePreview}
                  handleProfileImageChange={handleProfileImageChange}
                  handleAdditionalImagesChange={handleAdditionalImagesChange}
                  additionalImagePreviews={additionalImagePreviews}
                  removeAdditionalImage={removeAdditionalImage}
                />

                {/* Basic Details Section */}
                <FormSection title="Basic Details">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px",
                    }}
                  >
                    <FormInput
                      label="Profile Created For"
                      name="profileCreatedFor"
                      type="select"
                      value={formData.profileCreatedFor}
                      onChange={handleInputChange}
                      options={[
                        "Self",
                        "Son",
                        "Daughter",
                        "Brother",
                        "Sister",
                        "Friend",
                        "Relative",
                      ]}
                    />
                    <FormInput
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <FormInput
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Calculated automatically"
                    />
                    <FormInput
                      label="Body Type"
                      name="bodyType"
                      type="select"
                      value={formData.bodyType}
                      onChange={handleInputChange}
                      options={["Slim", "Average", "Athletic", "Heavy"]}
                    />
                    <FormInput
                      label="Physical Status"
                      name="physicalStatus"
                      type="select"
                      value={formData.physicalStatus}
                      onChange={handleInputChange}
                      options={["Normal", "Physically Challenged"]}
                    />
                    <FormInput
                      label="Complexion"
                      name="complexion"
                      type="select"
                      value={formData.complexion}
                      onChange={handleInputChange}
                      options={[
                        "Very Fair",
                        "Fair",
                        "Wheatish",
                        "Dark",
                        "Very Dark",
                      ]}
                    />
                    <FormInput
                      label="Height (cm)"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Weight (kg)"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Marital Status"
                      name="maritalStatus"
                      type="select"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      options={[
                        "Never Married",
                        "Divorced",
                        "Widowed",
                        "Awaiting Divorce",
                      ]}
                    />
                    {formData.maritalStatus &&
                      formData.maritalStatus !== "Never Married" && (
                        <>
                          <FormInput
                            label="Married Month & Year"
                            name="marriedMonthYear"
                            value={formData.marriedMonthYear}
                            onChange={handleInputChange}
                          />
                          <FormInput
                            label="Living Together Period"
                            name="livingTogetherPeriod"
                            value={formData.livingTogetherPeriod}
                            onChange={handleInputChange}
                          />
                        </>
                      )}

                    {(formData.maritalStatus === "Divorced" ||
                      formData.maritalStatus === "Awaiting Divorce") && (
                        <>
                          <FormInput
                            label="Divorced Month & Year"
                            name="divorcedMonthYear"
                            value={formData.divorcedMonthYear}
                            onChange={handleInputChange}
                          />
                          <div style={{ gridColumn: "1 / -1" }}>
                            <FormInput
                              label="Reason for Divorce"
                              name="reasonForDivorce"
                              type="textarea"
                              value={formData.reasonForDivorce}
                              onChange={handleInputChange}
                            />
                          </div>
                        </>
                      )}

                    {formData.maritalStatus &&
                      formData.maritalStatus !== "Never Married" && (
                        <>
                          <FormInput
                            label="Child Status"
                            name="childStatus"
                            type="select"
                            value={formData.childStatus}
                            onChange={handleInputChange}
                            options={[
                              "No Children",
                              "Have Children - Living Together",
                              "Have Children - Not Living Together",
                            ]}
                          />
                          <FormInput
                            label="Number of Children"
                            name="numberOfChildren"
                            value={formData.numberOfChildren}
                            onChange={handleInputChange}
                          />
                        </>
                      )}
                    <FormInput
                      label="Eating Habits"
                      name="eatingHabits"
                      type="select"
                      value={formData.eatingHabits}
                      onChange={handleInputChange}
                      options={["Vegetarian", "Non-Vegetarian", "Eggetarian"]}
                    />
                    <FormInput
                      label="Drinking Habits"
                      name="drinkingHabits"
                      type="select"
                      value={formData.drinkingHabits}
                      onChange={handleInputChange}
                      options={[
                        "Never Drinks",
                        "Drinks Socially",
                        "Drinks Regularly",
                      ]}
                    />
                    <FormInput
                      label="Smoking Habits"
                      name="smokingHabits"
                      type="select"
                      value={formData.smokingHabits}
                      onChange={handleInputChange}
                      options={[
                        "Never Smokes",
                        "Smokes Occasionally",
                        "Smokes Regularly",
                      ]}
                    />
                    <FormInput
                      label="Mother Tongue"
                      name="motherTongue"
                      value={formData.motherTongue}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Caste"
                      name="caste"
                      value={formData.caste}
                      onChange={handleInputChange}
                    />
                  </div>
                </FormSection>

                {/* Family Details Section */}
                <FormSection title="Family Details">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px",
                    }}
                  >
                    <FormInput
                      label="Father's Name"
                      name="fathersName"
                      value={formData.fathersName}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Mother's Name"
                      name="mothersName"
                      value={formData.mothersName}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Father's Occupation"
                      name="fathersOccupation"
                      value={formData.fathersOccupation}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Father's Profession"
                      name="fathersProfession"
                      value={formData.fathersProfession}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Mother's Occupation"
                      name="mothersOccupation"
                      value={formData.mothersOccupation}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Father's Native"
                      name="fathersNative"
                      value={formData.fathersNative}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Mother's Native"
                      name="mothersNative"
                      value={formData.mothersNative}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Family Value"
                      name="familyValue"
                      type="select"
                      value={formData.familyValue}
                      onChange={handleInputChange}
                      options={[
                        "Orthodox",
                        "Traditional",
                        "Moderate",
                        "Liberal",
                      ]}
                    />
                    <FormInput
                      label="Family Type"
                      name="familyType"
                      type="select"
                      value={formData.familyType}
                      onChange={handleInputChange}
                      options={["Joint Family", "Nuclear Family"]}
                    />
                    <FormInput
                      label="Family Status"
                      name="familyStatus"
                      type="select"
                      value={formData.familyStatus}
                      onChange={handleInputChange}
                      options={[
                        "Middle Class",
                        "Upper Middle Class",
                        "High Class",
                      ]}
                    />
                    <FormInput
                      label="Residence Type"
                      name="residenceType"
                      type="select"
                      value={formData.residenceType}
                      onChange={handleInputChange}
                      options={["Own House", "Rented House", "Company Lease"]}
                    />
                    <FormInput
                      label="Number of Brothers"
                      name="numberOfBrothers"
                      value={formData.numberOfBrothers}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Number of Sisters"
                      name="numberOfSisters"
                      value={formData.numberOfSisters}
                      onChange={handleInputChange}
                    />
                  </div>
                </FormSection>

                {/* Religious Information Section */}
                <FormSection title="Religious Information">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px",
                    }}
                  >
                    <FormInput
                      label="Denomination"
                      name="denomination"
                      type="select"
                      value={formData.denomination}
                      onChange={handleInputChange}
                      options={[
                        "Catholic",
                        "Protestant",
                        "Orthodox",
                        "Pentecostal",
                        "Other",
                      ]}
                    />
                    <FormInput
                      label="Church"
                      name="church"
                      value={formData.church}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Church Activity"
                      name="churchActivity"
                      value={formData.churchActivity}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Pastor's Name"
                      name="pastorsName"
                      value={formData.pastorsName}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Spirituality"
                      name="spirituality"
                      type="select"
                      value={formData.spirituality}
                      onChange={handleInputChange}
                      options={[
                        "Very Religious",
                        "Religious",
                        "Moderately Religious",
                        "Not Religious",
                      ]}
                    />
                    <div style={{ gridColumn: "1 / -1" }}>
                      <FormInput
                        label="Religious Detail"
                        name="religiousDetail"
                        type="textarea"
                        value={formData.religiousDetail}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </FormSection>

                {/* Contact Information Section */}
                <FormSection title="Contact Information">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px",
                    }}
                  >
                    <FormInput
                      label="Mobile Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <FormInput
                      label="Alternate Mobile Number"
                      name="alternateMobile"
                      type="tel"
                      value={formData.alternateMobile}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <FormInput
                      label="Landline Number"
                      name="landlineNumber"
                      value={formData.landlineNumber}
                      onChange={handleInputChange}
                    />
                    <div style={{ gridColumn: "1 / -1" }}>
                      <FormInput
                        label="Current Address"
                        name="currentAddress"
                        type="textarea"
                        value={formData.currentAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <FormInput
                        label="Permanent Address"
                        name="permanentAddress"
                        type="textarea"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                    <FormInput
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Citizen Of"
                      name="citizenOf"
                      value={formData.citizenOf}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Contact Person Name"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Relationship"
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleInputChange}
                    />
                  </div>
                </FormSection>

                {/* Professional Information Section */}
                <FormSection title="Professional Information">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px",
                    }}
                  >
                    <FormInput
                      label="Education"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Additional Education"
                      name="additionalEducation"
                      value={formData.additionalEducation}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="College"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                    />
                    <div style={{ gridColumn: "1 / -1" }}>
                      <FormInput
                        label="Education in Detail"
                        name="educationDetail"
                        type="textarea"
                        value={formData.educationDetail}
                        onChange={handleInputChange}
                      />
                    </div>
                    <FormInput
                      label="Employment Type"
                      name="employmentType"
                      type="select"
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      options={[
                        "Private Sector",
                        "Government",
                        "Self Employed",
                        "Business",
                        "Not Working",
                      ]}
                    />
                    <FormInput
                      label="Occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Company Name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Annual Income"
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleInputChange}
                      placeholder="e.g., 5-10 Lakhs"
                    />
                  </div>
                </FormSection>

                {/* Lifestyle Section with Checkboxes */}
                <FormSection title="Lifestyle">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "20px",
                    }}
                  >
                    {/* Hobbies as Checkboxes */}
                    <div style={{ gridColumn: "1 / -1" }}>
                      <CheckboxGroup
                        label="Hobbies"
                        name="hobbies"
                        options={hobbiesOptions}
                        selectedValues={
                          Array.isArray(formData.hobbies)
                            ? formData.hobbies
                            : []
                        }
                        onChange={handleHobbiesChange}
                      />
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                      }}
                    >
                      <FormInput
                        label="Interests"
                        name="interests"
                        value={formData.interests}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Music"
                        name="music"
                        value={formData.music}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Favourite Reads"
                        name="favouriteReads"
                        value={formData.favouriteReads}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Favourite Cuisines"
                        name="favouriteCuisines"
                        value={formData.favouriteCuisines}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Sports Activities"
                        name="sportsActivities"
                        value={formData.sportsActivities}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Dress Styles"
                        name="dressStyles"
                        value={formData.dressStyles}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </FormSection>

                {/* Social Media Section */}
                <FormSection title="Social Media">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px",
                    }}
                  >
                    <FormInput
                      label="WhatsApp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Facebook"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="X (Twitter)"
                      name="x"
                      value={formData.x}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="YouTube"
                      name="youtube"
                      value={formData.youtube}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="LinkedIn"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                    />
                  </div>
                </FormSection>

                {/* Partner Preferences - Basic & Religion */}
                <FormSection title="Partner Preferences - Basic & Religion">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px",
                    }}
                  >
                    <FormInput
                      label="Partner Age From"
                      name="partnerAgeFrom"
                      value={formData.partnerAgeFrom}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Partner Age To"
                      name="partnerAgeTo"
                      value={formData.partnerAgeTo}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Partner Height"
                      name="partnerHeight"
                      value={formData.partnerHeight}
                      onChange={handleInputChange}
                      placeholder="e.g., 160-180 cm"
                    />
                    <FormInput
                      label="Partner Marital Status"
                      name="partnerMaritalStatus"
                      type="select"
                      value={formData.partnerMaritalStatus}
                      onChange={handleInputChange}
                      options={["Never Married", "Divorced", "Widowed", "Any"]}
                    />
                    <FormInput
                      label="Partner Mother Tongue"
                      name="partnerMotherTongue"
                      value={formData.partnerMotherTongue}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Partner Caste"
                      name="partnerCaste"
                      value={formData.partnerCaste}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Partner Physical Status"
                      name="partnerPhysicalStatus"
                      type="select"
                      value={formData.partnerPhysicalStatus}
                      onChange={handleInputChange}
                      options={["Normal", "Physically Challenged", "Any"]}
                    />
                    <FormInput
                      label="Partner Eating Habits"
                      name="partnerEatingHabits"
                      type="select"
                      value={formData.partnerEatingHabits}
                      onChange={handleInputChange}
                      options={[
                        "Vegetarian",
                        "Non-Vegetarian",
                        "Eggetarian",
                        "Any",
                      ]}
                    />
                    <FormInput
                      label="Partner Drinking Habits"
                      name="partnerDrinkingHabits"
                      type="select"
                      value={formData.partnerDrinkingHabits}
                      onChange={handleInputChange}
                      options={[
                        "Never Drinks",
                        "Drinks Socially",
                        "Drinks Regularly",
                        "Any",
                      ]}
                    />
                    <FormInput
                      label="Partner Smoking Habits"
                      name="partnerSmokingHabits"
                      type="select"
                      value={formData.partnerSmokingHabits}
                      onChange={handleInputChange}
                      options={[
                        "Never Smokes",
                        "Smokes Occasionally",
                        "Smokes Regularly",
                        "Any",
                      ]}
                    />
                    <FormInput
                      label="Partner Denomination"
                      name="partnerDenomination"
                      type="select"
                      value={formData.partnerDenomination}
                      onChange={handleInputChange}
                      options={[
                        "Catholic",
                        "Protestant",
                        "Orthodox",
                        "Pentecostal",
                        "Other",
                        "Any",
                      ]}
                    />
                    <FormInput
                      label="Partner Spirituality"
                      name="partnerSpirituality"
                      type="select"
                      value={formData.partnerSpirituality}
                      onChange={handleInputChange}
                      options={[
                        "Very Religious",
                        "Religious",
                        "Moderately Religious",
                        "Not Religious",
                        "Any",
                      ]}
                    />
                  </div>
                </FormSection>

                {/* Partner Preferences - Professional */}
                <FormSection title="Partner Preferences - Professional">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px",
                    }}
                  >
                    <FormInput
                      label="Partner Education"
                      name="partnerEducation"
                      value={formData.partnerEducation}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Partner Employment Type"
                      name="partnerEmploymentType"
                      type="select"
                      value={formData.partnerEmploymentType}
                      onChange={handleInputChange}
                      options={[
                        "Private Sector",
                        "Government",
                        "Self Employed",
                        "Business",
                        "Not Working",
                        "Any",
                      ]}
                    />
                    <FormInput
                      label="Partner Occupation"
                      name="partnerOccupation"
                      value={formData.partnerOccupation}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label="Partner Annual Income"
                      name="partnerAnnualIncome"
                      value={formData.partnerAnnualIncome}
                      onChange={handleInputChange}
                      placeholder="e.g., 5-10 Lakhs"
                    />
                  </div>
                </FormSection>

                {/* Partner Preferences - Location */}
                <FormSection title="Partner Preferences - Location">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px",
                    }}
                  >
                    <FormInput
                      label="Partner Country"
                      name="partnerCountry"
                      value={formData.partnerCountry}
                      onChange={handleInputChange}
                      placeholder="Any"
                    />
                    <FormInput
                      label="Partner State"
                      name="partnerState"
                      value={formData.partnerState}
                      onChange={handleInputChange}
                      placeholder="Any"
                    />
                    <FormInput
                      label="Partner Residing District"
                      name="partnerDistrict"
                      value={formData.partnerDistrict}
                      onChange={handleInputChange}
                      placeholder="Any"
                    />
                  </div>
                </FormSection>

                {/* Submit Button */}
                <div
                  style={{
                    background: "#fff",
                    padding: "20px 24px",
                    borderRadius: "8px",
                    marginTop: "24px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    disabled={isSubmitting}
                    style={{
                      padding: "12px 32px",
                      background: "#fff",
                      color: "#374151",
                      border: "2px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: "12px 32px",
                      background: isSubmitting ? "#9ca3af" : "#667eea",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.target.style.background = "#5568d3";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.target.style.background = "#667eea";
                      }
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CopyRights />
    </div>
  );
};

export default UserProfileEditPage;
