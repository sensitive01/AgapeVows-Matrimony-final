import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search } from "lucide-react";

/**
 * Global Search Modal
 * Implements Quick, Regular, and Advanced search tabs
 * Plus Search by BNR ID
 */
const GlobalSearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("quick");
  const [bnrId, setBnrId] = useState("");

  // Search Form State
  const [formData, setFormData] = useState({
    // Quick Search
    ageFrom: "21",
    ageTo: "30",
    caste: "",
    maritalStatus: "",
    denomination: "",
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
  });

  if (!isOpen) return null;

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
    onClose();
  };

  const handleBnrSearch = () => {
    navigate("/show-searched-result", {
      state: {
        searchType: "bnr",
        bnrId: bnrId,
      },
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Background backdrop */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 z-10 p-1"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-4 md:p-6">
            {/* Top Section: Search by BNR ID */}
            <div className="flex justify-center mb-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Search by AGWID ID:
                </span>
                <input
                  type="text"
                  className="w-full flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-500"
                  placeholder="Enter ID"
                  value={bnrId}
                  onChange={(e) => setBnrId(e.target.value)}
                />
                <button
                  onClick={handleBnrSearch}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Tabs Header */}
            <div className="grid grid-cols-3 border-b border-gray-200 mb-4">
              <button
                className={`py-2 text-center text-xs md:text-sm font-medium transition-colors px-1 h-full flex items-center justify-center ${
                  activeTab === "quick"
                    ? "border-t-4 border-purple-600 bg-white text-purple-700"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("quick")}
              >
                Quick Search
              </button>
              <button
                className={`py-2 text-center text-xs md:text-sm font-medium transition-colors px-1 h-full flex items-center justify-center ${
                  activeTab === "regular"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("regular")}
              >
                Regular Search
              </button>
              <button
                className={`py-2 text-center text-xs md:text-sm font-medium transition-colors px-1 h-full flex items-center justify-center ${
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-5 pb-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-0">
                    <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                      Age
                    </label>
                    <div className="flex items-center gap-2 w-full md:w-2/3">
                      <select
                        className="form-select w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
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
                        className="form-select w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
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

                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-0">
                    <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                      Caste
                    </label>
                    <input
                      type="text"
                      className="w-full md:w-2/3 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                      placeholder="Select"
                      value={formData.caste}
                      onChange={(e) =>
                        handleInputChange("caste", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-0">
                    <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                      Marital Status
                    </label>
                    <input
                      type="text"
                      className="w-full md:w-2/3 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                      placeholder="Select"
                      value={formData.maritalStatus}
                      onChange={(e) =>
                        handleInputChange("maritalStatus", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-0">
                    <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                      Denomination
                    </label>
                    <input
                      type="text"
                      className="w-full md:w-2/3 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                      placeholder="Select"
                      value={formData.denomination}
                      onChange={(e) =>
                        handleInputChange("denomination", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}

              {/* Regular Search Fields */}
              {activeTab === "regular" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                    {/* Age */}
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-0">
                      <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                        Age
                      </label>
                      <div className="flex items-center gap-2 w-full md:w-2/3">
                        <select
                          className="w-full border border-gray-300 rounded p-2"
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
                          className="w-full border border-gray-300 rounded p-2"
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
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-0">
                      <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                        Height
                      </label>
                      <div className="flex items-center gap-2 w-full md:w-2/3">
                        <select
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          value={formData.heightFrom}
                          onChange={(e) =>
                            handleInputChange("heightFrom", e.target.value)
                          }
                        >
                          <option value="">4ft</option>
                          <option value="4.5">4ft 5in</option>
                          <option value="5">5ft</option>
                          <option value="5.5">5ft 5in</option>
                          <option value="6">6ft</option>
                        </select>
                        <span className="text-xs">To</span>
                        <select
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          value={formData.heightTo}
                          onChange={(e) =>
                            handleInputChange("heightTo", e.target.value)
                          }
                        >
                          <option value="">4ft</option>
                          <option value="4.5">4ft 5in</option>
                          <option value="5">5ft</option>
                          <option value="5.5">5ft 5in</option>
                          <option value="6">6ft</option>
                        </select>
                      </div>
                    </div>

                    {/* Mother Tongue */}
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-0">
                      <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                        Mother Tongue
                      </label>
                      <input
                        type="text"
                        className="w-full md:w-2/3 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                        placeholder="Select"
                        value={formData.motherTongue}
                        onChange={(e) =>
                          handleInputChange("motherTongue", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Marital Status Checkboxes */}
                  <div className="flex flex-col md:flex-row items-start mt-3 gap-1 md:gap-0">
                    <label className="w-full md:w-1/6 text-gray-700 font-medium pt-0 md:pt-1 text-xs md:text-sm">
                      Marital Status
                    </label>
                    <div className="w-full md:w-5/6 flex flex-wrap gap-2 md:gap-3 pt-0 md:pt-1">
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
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="rounded text-purple-600 focus:ring-purple-500 h-3 w-3"
                          />
                          <span className="text-gray-700 text-xs md:text-sm">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* More Fields (Caste, Denom, Education, Country) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium text-xs md:text-sm">
                        Caste
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                        placeholder="Select"
                        value={formData.caste}
                        onChange={(e) =>
                          handleInputChange("caste", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium text-xs md:text-sm">
                        Denomination
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                        placeholder="Select"
                        value={formData.denomination}
                        onChange={(e) =>
                          handleInputChange("denomination", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium text-xs md:text-sm">
                        Education
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                        placeholder="Select"
                        value={formData.education}
                        onChange={(e) =>
                          handleInputChange("education", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium text-xs md:text-sm">
                        Country
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                        placeholder="Select"
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "advanced" && (
                <div className="space-y-6">
                  {/* Reuse Common Fields (Age, Height, etc.) */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Age */}
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium text-xs md:text-sm">
                          Age
                        </label>
                        <div className="flex items-center gap-2">
                          <select
                            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
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
                            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
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
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium text-xs md:text-sm">
                          Height
                        </label>
                        <div className="flex items-center gap-2">
                          <select
                            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                            value={formData.heightFrom}
                            onChange={(e) =>
                              handleInputChange("heightFrom", e.target.value)
                            }
                          >
                            <option value="">4ft</option>
                            <option value="4.5">4ft 5in</option>
                            <option value="5">5ft</option>
                            <option value="5.5">5ft 5in</option>
                            <option value="6">6ft</option>
                          </select>
                          <span className="text-xs">To</span>
                          <select
                            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                            value={formData.heightTo}
                            onChange={(e) =>
                              handleInputChange("heightTo", e.target.value)
                            }
                          >
                            <option value="">4ft</option>
                            <option value="4.5">4ft 5in</option>
                            <option value="5">5ft</option>
                            <option value="5.5">5ft 5in</option>
                            <option value="6">6ft</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Mother Tongue */}
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium text-xs md:text-sm">
                          Mother Tongue
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          placeholder="Select"
                          value={formData.motherTongue}
                          onChange={(e) =>
                            handleInputChange("motherTongue", e.target.value)
                          }
                        />
                      </div>

                      {/* Caste */}
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium text-xs md:text-sm">
                          Caste
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          placeholder="Select"
                          value={formData.caste}
                          onChange={(e) =>
                            handleInputChange("caste", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* Denomination & Marital Status */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium text-xs md:text-sm">
                          Denomination
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          placeholder="Select"
                          value={formData.denomination}
                          onChange={(e) =>
                            handleInputChange("denomination", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* Marital Status */}
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium text-xs md:text-sm">
                        Marital Status
                      </label>
                      <div className="flex flex-wrap gap-2 md:gap-3">
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
                            className="flex items-center gap-1 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="rounded text-purple-600 focus:ring-purple-500 h-3 w-3"
                            />
                            <span className="text-gray-700 text-xs md:text-sm">
                              {status}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Physical Status */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                      Physical Status
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "Doesn't Matter",
                        "Normal",
                        "Physically Challenged",
                      ].map((status) => (
                        <label
                          key={status}
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="rounded text-purple-600 focus:ring-purple-500 h-3 w-3"
                          />
                          <span className="text-gray-700 text-xs md:text-sm">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Professional Details */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm">
                      Professional Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium text-xs md:text-sm">
                          Education
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          placeholder="Select"
                          value={formData.education}
                          onChange={(e) =>
                            handleInputChange("education", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium text-xs md:text-sm">
                          Occupation
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          placeholder="Select"
                          value={formData.occupation}
                          onChange={(e) =>
                            handleInputChange("occupation", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium text-xs md:text-sm">
                        Annual Income
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          value={formData.annualIncomeFrom}
                          onChange={(e) =>
                            handleInputChange(
                              "annualIncomeFrom",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Any</option>
                          <option value="1">1 LPA</option>
                          <option value="5">5 LPA</option>
                        </select>
                        <span className="text-xs text-gray-500">To</span>
                        <select
                          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          value={formData.annualIncomeTo}
                          onChange={(e) =>
                            handleInputChange("annualIncomeTo", e.target.value)
                          }
                        >
                          <option value="">Any</option>
                          <option value="10">10 LPA</option>
                          <option value="20">20 LPA</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Location Details */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm">
                      Location Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium text-xs md:text-sm">
                          Country
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          placeholder="Select"
                          value={formData.country}
                          onChange={(e) =>
                            handleInputChange("country", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium text-xs md:text-sm">
                          State
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          placeholder="Select"
                          value={formData.state}
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium text-xs md:text-sm">
                          District/City
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                          placeholder="Select"
                          value={formData.districtCity}
                          onChange={(e) =>
                            handleInputChange("districtCity", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Family Details */}
                  {/* Family Details & Display Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                    {/* Family Details */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                        Family Details
                      </h4>
                      <p className="text-xs md:text-sm text-gray-600 mb-1">
                        Family Status
                      </p>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {[
                          "Lower Middle Class",
                          "Middle Class",
                          "Upper Middle Class",
                          "Rich",
                          "Affluent",
                        ].map((status) => (
                          <label
                            key={status}
                            className="flex items-center gap-1 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="rounded text-purple-600 focus:ring-purple-500 h-3 w-3"
                            />
                            <span className="text-gray-700 text-xs md:text-sm">
                              {status}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Display Settings */}
                    <div className="space-y-3">
                      {/* Show Profiles */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                          Show Profiles
                        </h4>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded text-purple-600 focus:ring-purple-500 h-3 w-3"
                            checked={formData.showWithPhoto}
                            onChange={(e) =>
                              handleInputChange(
                                "showWithPhoto",
                                e.target.checked
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
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                          Don't show
                        </h4>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded text-purple-600 focus:ring-purple-500 h-3 w-3"
                              checked={formData.dontShowIgnored}
                              onChange={(e) =>
                                handleInputChange(
                                  "dontShowIgnored",
                                  e.target.checked
                                )
                              }
                            />
                            <span className="text-gray-700 text-xs md:text-sm">
                              Ignored Profiles
                            </span>
                          </label>
                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded text-purple-600 focus:ring-purple-500 h-3 w-3"
                              checked={formData.dontShowViewed}
                              onChange={(e) =>
                                handleInputChange(
                                  "dontShowViewed",
                                  e.target.checked
                                )
                              }
                            />
                            <span className="text-gray-700 text-xs md:text-sm">
                              Viewed Profiles
                            </span>
                          </label>
                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded text-purple-600 focus:ring-purple-500 h-3 w-3"
                              checked={formData.dontShowShortlisted}
                              onChange={(e) =>
                                handleInputChange(
                                  "dontShowShortlisted",
                                  e.target.checked
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
              <div className="flex justify-center mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={handleSearch}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow-md text-sm transition-transform transform hover:scale-105"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
