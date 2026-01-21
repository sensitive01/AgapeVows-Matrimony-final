/* Existing imports */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import MainLayout from "./agapeows-components/layout/MainLayout";

import { getUserProfile } from "../api/axiosService/userAuthService";

/**
 * Global Search Page
 * Plus Search by AGWID ID
 */

// Helper to generate height options (in 6-inch increments)
const generateHeightOptions = () => {
  const options = [];
  for (let ft = 4; ft <= 7; ft++) {
    options.push({
      value: `${ft}.0`,
      label: `${ft}ft`,
    });
    options.push({
      value: `${ft}.6`,
      label: `${ft}ft 6in`,
    });
  }
  options.push({ value: "8.0", label: "8ft" });
  return options;
};

const heightOptions = generateHeightOptions();

// Sample Data for Dropdowns
const CASTES = [
  "Brahmin",
  "Nair",
  "Ezhava",
  "Christian - RC",
  "Muslim - Sunni",
  "Other",
];
const DENOMINATIONS = [
  "Orthodox",
  "Jacobite",
  "Marthoma",
  "Pentecost",
  "Catholic",
  "CSI",
  "Other",
];
const MOTHER_TONGUES = [
  "Malayalam",
  "English",
  "Tamil",
  "Hindi",
  "Kannada",
  "Telugu",
  "Other",
];
const EDUCATIONS = [
  "B.Tech",
  "MBBS",
  "Degree",
  "Masters",
  "Ph.D",
  "Diploma",
  "Plus Two",
  "SSLC",
];
const OCCUPATIONS = [
  "Software Engineer",
  "Doctor",
  "Teacher",
  "Business",
  "Nurse",
  "Engineer",
  "Student",
  "Not Working",
];
const COUNTRIES = ["India", "USA", "UK", "Canada", "UAE", "Australia"];
const STATES = [
  "Kerala",
  "Tamil Nadu",
  "Karnataka",
  "Maharashtra",
  "Delhi",
  "Texas",
  "Dubai",
  "London",
]; // Mixed sample
const DISTRICTS = [
  "Ernakulam",
  "Trivandrum",
  "Kozhikode",
  "Thrissur",
  "Kottayam",
  "Other",
];

const GlobalSearchModal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("quick");
  const [bnrId, setBnrId] = useState("");

  const userId = localStorage.getItem("userId");

  // Search Form State
  const [formData, setFormData] = useState({
    // Quick Search
    ageFrom: "18",
    ageTo: "30",
    caste: "",
    maritalStatus: [], // changed to array for multiple selection
    denomination: "",
    gender: "", // Initialize gender
    // Regular Search (adds)
    heightFrom: "",
    heightTo: "",
    motherTongue: "",
    // Advanced Search (adds)
    physicalStatus: [],
    education: "",
    occupation: "",
    annualIncomeFrom: "",
    annualIncomeTo: "",
    country: "",
    state: "",
    districtCity: "",
    familyStatus: [],
    showWithPhoto: false,
    dontShowIgnored: false,
    dontShowViewed: false,
    dontShowShortlisted: false,
    numberOfChildren: "", // Added for child status
    childrenStatus: "",
  });

  const handleMaritalStatusChange = (status) => {
    setFormData((prev) => {
      let newStatus = [...(prev.maritalStatus || [])];

      if (status === "Any") {
        if (newStatus.includes("Any")) {
          // If Any is already there and clicked, deselect all? Or just remove Any?
          // Usually toggle. If unchecking Any, clear all.
          return { ...prev, maritalStatus: [] };
        } else {
          // Select Any, clear others or selecting Any implies all?
          // Requirement: "When 'Any' option is selected, all other option should be selected automatically and blocked."
          // So we will just set ["Any", "Never Married", "Separated", ...]
          const allStatuses = [
            "Any",
            "Never Married",
            "Separated",
            "Divorced",
            "Widow / Widower",
            "Awaiting Divorce",
            "Annulled",
          ];
          return { ...prev, maritalStatus: allStatuses };
        }
      } else {
        // Normal toggle
        if (newStatus.includes("Any")) {
          // If Any is selected, others are blocked. So do nothing or user has to uncheck Any first.
          // Implied "blocked" means user cannot uncheck them individually while Any is active?
          // Or clicking them removes Any?
          // "Blocked" usually means disabled UI.
          // If I try to change a specific one while Any is on, I should probably do nothing or uncheck Any.
          // Let's assume user must uncheck Any to change others.
          return prev;
        }

        if (newStatus.includes(status)) {
          newStatus = newStatus.filter((s) => s !== status);
        } else {
          newStatus.push(status);
        }
        return { ...prev, maritalStatus: newStatus };
      }
    });
  };

  const handlePhysicalStatusChange = (status) => {
    setFormData((prev) => {
      let newStatus = [...(prev.physicalStatus || [])];

      if (status === "Doesn't Matter") {
        if (newStatus.includes("Doesn't Matter")) {
          // If "Doesn't Matter" is already selected and clicked again, deselect all
          return { ...prev, physicalStatus: [] };
        } else {
          // Select "Doesn't Matter" and automatically select all other options
          const allStatuses = [
            "Doesn't Matter",
            "Normal",
            "Physically Challenged",
          ];
          return { ...prev, physicalStatus: allStatuses };
        }
      } else {
        // Normal toggle for other options
        if (newStatus.includes("Doesn't Matter")) {
          // If "Doesn't Matter" is selected, others are blocked. Do nothing.
          return prev;
        }

        if (newStatus.includes(status)) {
          newStatus = newStatus.filter((s) => s !== status);
        } else {
          newStatus.push(status);
        }
        return { ...prev, physicalStatus: newStatus };
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const response = await getUserProfile(userId);
        if (response.status === 200) {
          const user = response.data.data;
          let searchGender = "";
          if (user.gender === "Male" || user.gender === "Groom") {
            searchGender = "Female";
          } else if (user.gender === "Female" || user.gender === "Bride") {
            searchGender = "Male";
          }
          if (searchGender) {
            setFormData((prev) => ({ ...prev, gender: searchGender }));
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    // Navigate to search results with data
    navigate("/show-searched-result", {
      state: {
        searchType: activeTab,
        formData: formData,
      },
    });
  };

  const handleBnrSearch = () => {
    if (!bnrId.trim()) {
      alert("Please enter an AGWID ID");
      return;
    }
    navigate("/show-searched-result", {
      state: {
        searchType: "bnr",
        bnrId: bnrId,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <MainLayout />
      </div>

      <div className="pt-8">
        <div className="db">
          <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
              <div
                className="col-md-12 col-lg-12"
                style={{ paddingLeft: "15px", paddingRight: "15px" }}
              >
                {/* Main Content - Single Section */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-3 md:p-4">
                    {/* Heading */}
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                      <Search className="w-5 h-5 text-purple-600" />
                      <h1 className="text-xl font-bold text-gray-900">
                        Find Your Match
                      </h1>
                    </div>

                    {/* Search by AGWID ID */}
                    <div className="flex justify-center mb-3">
                      <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                          Search by AGWID ID:
                        </span>
                        <input
                          type="text"
                          className="w-full flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          placeholder="Enter ID"
                          value={bnrId}
                          onChange={(e) => setBnrId(e.target.value)}
                        />
                        <button
                          onClick={handleBnrSearch}
                          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors"
                        >
                          Search
                        </button>
                      </div>
                    </div>

                    <div className="relative mb-3">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">OR</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 border-b border-gray-200 mb-3">
                      <button
                        className={`py-3 text-center text-xs md:text-sm font-medium transition-all px-1 h-full flex items-center justify-center ${
                          activeTab === "quick"
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveTab("quick")}
                      >
                        Quick Search
                      </button>
                      <button
                        className={`py-3 text-center text-xs md:text-sm font-medium transition-all px-1 h-full flex items-center justify-center ${
                          activeTab === "regular"
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveTab("regular")}
                      >
                        Regular Search
                      </button>
                      <button
                        className={`py-3 text-center text-xs md:text-sm font-medium transition-all px-1 h-full flex items-center justify-center ${
                          activeTab === "advanced"
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveTab("advanced")}
                      >
                        Advanced Search
                      </button>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-b-lg text-sm">
                      {/* Quick Search Fields */}
                      {activeTab === "quick" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 pb-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                            <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                              Age
                            </label>
                            <div className="flex items-center gap-2 w-full md:w-2/3">
                              <select
                                className="form-select w-full border border-gray-300 rounded px-2 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                value={formData.ageFrom}
                                onChange={(e) =>
                                  handleInputChange("ageFrom", e.target.value)
                                }
                              >
                                {[...Array(40)].map((_, i) => (
                                  <option key={i} value={18 + i}>
                                    {18 + i}
                                  </option>
                                ))}
                              </select>
                              <span className="text-xs">To</span>
                              <select
                                className="form-select w-full border border-gray-300 rounded px-2 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                value={formData.ageTo}
                                onChange={(e) =>
                                  handleInputChange("ageTo", e.target.value)
                                }
                              >
                                {[...Array(40)].map((_, i) => (
                                  <option key={i} value={21 + i}>
                                    {21 + i}
                                  </option>
                                ))}
                              </select>
                              <span className="text-xs text-gray-500 hidden sm:inline">
                                Years
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                            <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                              Marital Status
                            </label>
                            <input
                              type="text"
                              className="w-full md:w-2/3 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                              placeholder="Select"
                              value={formData.maritalStatus}
                              onChange={(e) =>
                                handleInputChange(
                                  "maritalStatus",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                            <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                              Denomination
                            </label>
                            <input
                              type="text"
                              className="w-full md:w-2/3 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                              placeholder="Select"
                              value={formData.denomination}
                              onChange={(e) =>
                                handleInputChange(
                                  "denomination",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      )}

                      {/* Regular Search Fields */}
                      {activeTab === "regular" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                            {/* Age */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                              <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                                Age
                              </label>
                              <div className="flex items-center gap-2 w-full md:w-2/3">
                                <select
                                  className="w-full border border-gray-300 rounded p-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                                  value={formData.ageFrom}
                                  onChange={(e) =>
                                    handleInputChange("ageFrom", e.target.value)
                                  }
                                >
                                  {[...Array(40)].map((_, i) => (
                                    <option key={i} value={18 + i}>
                                      {18 + i}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-sm">To</span>
                                <select
                                  className="w-full border border-gray-300 rounded p-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                                  value={formData.ageTo}
                                  onChange={(e) =>
                                    handleInputChange("ageTo", e.target.value)
                                  }
                                >
                                  {[...Array(40)].map((_, i) => (
                                    <option key={i} value={21 + i}>
                                      {21 + i}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-xs md:text-sm text-gray-500 hidden sm:inline">
                                  Years
                                </span>
                              </div>
                            </div>

                            {/* Height */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                              <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                                Height
                              </label>
                              <div className="flex items-center gap-2 w-full md:w-2/3">
                                <select
                                  className="w-full border border-gray-300 rounded px-2 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={formData.heightFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "heightFrom",
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="">Select</option>
                                  {heightOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-xs">To</span>
                                <select
                                  className="w-full border border-gray-300 rounded px-2 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={formData.heightTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "heightTo",
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="">Select</option>
                                  {heightOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Mother Tongue */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                              <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                                Mother Tongue
                              </label>
                              <select
                                className="w-full md:w-2/3 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                value={formData.motherTongue}
                                onChange={(e) =>
                                  handleInputChange(
                                    "motherTongue",
                                    e.target.value,
                                  )
                                }
                              >
                                <option value="">Select</option>
                                {MOTHER_TONGUES.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Marital Status Checkboxes */}
                          <div className="flex flex-col md:flex-row items-start mt-4 gap-2 md:gap-0">
                            <label className="w-full md:w-1/6 text-gray-700 font-medium pt-0 md:pt-1 text-xs md:text-sm">
                              Marital Status
                            </label>
                            <div className="w-full md:w-5/6 flex flex-wrap gap-3 md:gap-4 pt-0 md:pt-1">
                              {[
                                "Any",
                                "Never Married",
                                "Separated",
                                "Divorced",
                                "Widow / Widower",
                                "Awaiting Divorce",
                                "Annulled",
                              ].map((status) => (
                                <label
                                  key={status}
                                  className={`flex items-center gap-2 cursor-pointer ${formData.maritalStatus.includes("Any") && status !== "Any" ? "opacity-50" : ""}`}
                                >
                                  <input
                                    type="checkbox"
                                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                    checked={(
                                      formData.maritalStatus || []
                                    ).includes(status)}
                                    onChange={() =>
                                      handleMaritalStatusChange(status)
                                    }
                                    disabled={
                                      formData.maritalStatus.includes("Any") &&
                                      status !== "Any"
                                    }
                                  />
                                  <span className="text-gray-700 text-xs md:text-sm">
                                    {status}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Child Status - Conditional Display */}
                          {formData.maritalStatus &&
                            formData.maritalStatus.length > 0 &&
                            !formData.maritalStatus.includes(
                              "Never Married",
                            ) && (
                              <div className="flex flex-col md:flex-row items-start mt-4 gap-2 md:gap-0">
                                <label className="w-full md:w-1/6 text-gray-700 font-medium pt-0 md:pt-1 text-xs md:text-sm">
                                  Child Status
                                </label>
                                <div className="w-full md:w-5/6 flex flex-wrap gap-4">
                                  <div className="flex items-center gap-2">
                                    <label className="text-xs md:text-sm text-gray-600">
                                      No. of Children
                                    </label>
                                    <select
                                      className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                                      value={formData.numberOfChildren}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "numberOfChildren",
                                          e.target.value,
                                        )
                                      }
                                    >
                                      <option value="">Select</option>
                                      <option value="None">None</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3+">3+</option>
                                    </select>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label className="text-xs md:text-sm text-gray-600">
                                      Children Living Status
                                    </label>
                                    <select
                                      className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                                      value={formData.childrenStatus}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "childrenStatus",
                                          e.target.value,
                                        )
                                      }
                                    >
                                      <option value="">Select</option>
                                      <option value="Living with me">
                                        Living with me
                                      </option>
                                      <option value="Not living with me">
                                        Not living with me
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}

                          {/* More Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Caste
                              </label>
                              <select
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                value={formData.caste}
                                onChange={(e) =>
                                  handleInputChange("caste", e.target.value)
                                }
                              >
                                <option value="">Select</option>
                                {CASTES.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Denomination
                              </label>
                              <select
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                value={formData.denomination}
                                onChange={(e) =>
                                  handleInputChange(
                                    "denomination",
                                    e.target.value,
                                  )
                                }
                              >
                                <option value="">Select</option>
                                {DENOMINATIONS.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Education
                              </label>
                              <select
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                value={formData.education}
                                onChange={(e) =>
                                  handleInputChange("education", e.target.value)
                                }
                              >
                                <option value="">Select</option>
                                {EDUCATIONS.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Country
                              </label>
                              <select
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                value={formData.country}
                                onChange={(e) =>
                                  handleInputChange("country", e.target.value)
                                }
                              >
                                <option value="">Select</option>
                                {COUNTRIES.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Advanced Search */}
                      {activeTab === "advanced" && (
                        <div className="space-y-6">
                          {/* Basic Fields */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Age */}
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Age
                                </label>
                                <div className="flex items-center gap-2">
                                  <select
                                    className="flex-1 border border-gray-300 rounded px-2 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    value={formData.ageFrom}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "ageFrom",
                                        e.target.value,
                                      )
                                    }
                                  >
                                    {[...Array(40)].map((_, i) => (
                                      <option key={i} value={18 + i}>
                                        {18 + i}
                                      </option>
                                    ))}
                                  </select>
                                  <span className="text-xs">To</span>
                                  <select
                                    className="flex-1 border border-gray-300 rounded px-2 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    value={formData.ageTo}
                                    onChange={(e) =>
                                      handleInputChange("ageTo", e.target.value)
                                    }
                                  >
                                    {[...Array(40)].map((_, i) => (
                                      <option key={i} value={21 + i}>
                                        {21 + i}
                                      </option>
                                    ))}
                                  </select>
                                  <span className="text-xs text-gray-500 hidden sm:inline">
                                    Years
                                  </span>
                                </div>
                              </div>

                              {/* Height */}
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Height
                                </label>
                                <div className="flex items-center gap-2">
                                  <select
                                    className="flex-1 border border-gray-300 rounded px-2 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    value={formData.heightFrom}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "heightFrom",
                                        e.target.value,
                                      )
                                    }
                                  >
                                    <option value="">Select</option>
                                    {heightOptions.map((opt) => (
                                      <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </option>
                                    ))}
                                  </select>
                                  <span className="text-xs">To</span>
                                  <select
                                    className="flex-1 border border-gray-300 rounded px-2 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    value={formData.heightTo}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "heightTo",
                                        e.target.value,
                                      )
                                    }
                                  >
                                    <option value="">Select</option>
                                    {heightOptions.map((opt) => (
                                      <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Mother Tongue */}
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Mother Tongue
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={formData.motherTongue}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "motherTongue",
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="">Select</option>
                                  {MOTHER_TONGUES.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Caste */}
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Caste
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={formData.caste}
                                  onChange={(e) =>
                                    handleInputChange("caste", e.target.value)
                                  }
                                >
                                  <option value="">Select</option>
                                  {CASTES.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Denomination */}
                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Denomination
                              </label>
                              <select
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                value={formData.denomination}
                                onChange={(e) =>
                                  handleInputChange(
                                    "denomination",
                                    e.target.value,
                                  )
                                }
                              >
                                <option value="">Select</option>
                                {DENOMINATIONS.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Marital Status */}
                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Marital Status
                              </label>
                              <div className="flex flex-wrap gap-3 md:gap-4">
                                {[
                                  "Any",
                                  "Never Married",
                                  "Separated",
                                  "Divorced",
                                  "Widow / Widower",
                                  "Awaiting Divorce",
                                  "Annulled",
                                ].map((status) => (
                                  <label
                                    key={status}
                                    className={`flex items-center gap-2 cursor-pointer ${formData.maritalStatus.includes("Any") && status !== "Any" ? "opacity-50" : ""}`}
                                  >
                                    <input
                                      type="checkbox"
                                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                      checked={(
                                        formData.maritalStatus || []
                                      ).includes(status)}
                                      onChange={() =>
                                        handleMaritalStatusChange(status)
                                      }
                                      disabled={
                                        formData.maritalStatus.includes(
                                          "Any",
                                        ) && status !== "Any"
                                      }
                                    />
                                    <span className="text-gray-700 text-xs md:text-sm">
                                      {status}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>

                          <hr className="border-gray-200" />

                          {/* Physical Status */}
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
                              Physical Status
                            </h4>
                            <div className="flex flex-wrap gap-3 md:gap-4">
                              {[
                                "Doesn't Matter",
                                "Normal",
                                "Physically Challenged",
                              ].map((status) => (
                                <label
                                  key={status}
                                  className={`flex items-center gap-2 cursor-pointer ${formData.physicalStatus.includes("Doesn't Matter") && status !== "Doesn't Matter" ? "opacity-50" : ""}`}
                                >
                                  <input
                                    type="checkbox"
                                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                    checked={(
                                      formData.physicalStatus || []
                                    ).includes(status)}
                                    onChange={() =>
                                      handlePhysicalStatusChange(status)
                                    }
                                    disabled={
                                      formData.physicalStatus.includes(
                                        "Doesn't Matter",
                                      ) && status !== "Doesn't Matter"
                                    }
                                  />
                                  <span className="text-gray-700 text-xs md:text-sm">
                                    {status}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <hr className="border-gray-200" />

                          {/* Professional Details */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                              Professional Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Education
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={formData.education}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "education",
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="">Select</option>
                                  {EDUCATIONS.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Occupation
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={formData.occupation}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "occupation",
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="">Select</option>
                                  {OCCUPATIONS.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Annual Income
                              </label>
                              <div className="flex items-center gap-2">
                                <select
                                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={formData.annualIncomeFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "annualIncomeFrom",
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="">Any</option>
                                  <option value="1">1 LPA</option>
                                  <option value="5">5 LPA</option>
                                </select>
                                <span className="text-xs text-gray-500">
                                  To
                                </span>
                                <select
                                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={formData.annualIncomeTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "annualIncomeTo",
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="">Any</option>
                                  <option value="10">10 LPA</option>
                                  <option value="20">20 LPA</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <hr className="border-gray-200" />

                          {/* Location Details */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                              Location Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Country
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={formData.country}
                                  onChange={(e) =>
                                    handleInputChange("country", e.target.value)
                                  }
                                >
                                  <option value="">Select</option>
                                  {COUNTRIES.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  State
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={formData.state}
                                  onChange={(e) =>
                                    handleInputChange("state", e.target.value)
                                  }
                                >
                                  <option value="">Select</option>
                                  {STATES.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  District/City
                                </label>
                                <select
                                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={formData.districtCity}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "districtCity",
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="">Select</option>
                                  {DISTRICTS.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          <hr className="border-gray-200" />

                          {/* Family Details & Display Settings */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                            {/* Family Details */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
                                Family Details
                              </h4>
                              <p className="text-xs md:text-sm text-gray-600 mb-2">
                                Family Status
                              </p>
                              <div className="flex flex-wrap gap-3">
                                {[
                                  "Lower Middle Class",
                                  "Middle Class",
                                  "Upper Middle Class",
                                  "Rich",
                                  "Affluent",
                                ].map((status) => (
                                  <label
                                    key={status}
                                    className="flex items-center gap-2 cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                    />
                                    <span className="text-gray-700 text-xs md:text-sm">
                                      {status}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Display Settings */}
                            <div className="space-y-4">
                              {/* Show Profiles */}
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
                                  Show Profiles
                                </h4>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                    checked={formData.showWithPhoto}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "showWithPhoto",
                                        e.target.checked,
                                      )
                                    }
                                  />
                                  <span className="text-gray-700 text-xs md:text-sm">
                                    With Photo
                                  </span>
                                </label>
                              </div>

                              {/* Don't Show */}
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
                                  Don't show
                                </h4>
                                <div className="flex flex-col gap-2">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                      checked={formData.dontShowIgnored}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "dontShowIgnored",
                                          e.target.checked,
                                        )
                                      }
                                    />
                                    <span className="text-gray-700 text-xs md:text-sm">
                                      Ignored Profiles
                                    </span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                      checked={formData.dontShowViewed}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "dontShowViewed",
                                          e.target.checked,
                                        )
                                      }
                                    />
                                    <span className="text-gray-700 text-xs md:text-sm">
                                      Viewed Profiles
                                    </span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                      checked={formData.dontShowShortlisted}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "dontShowShortlisted",
                                          e.target.checked,
                                        )
                                      }
                                    />
                                    <span className="text-gray-700 text-xs md:text-sm">
                                      Shortlisted Profiles
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bottom Action Bar */}
                      <div className="flex justify-center mt-6 pt-4 border-t border-gray-200">
                        <button
                          onClick={handleSearch}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg text-sm transition-all transform hover:scale-105"
                        >
                          Search Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
