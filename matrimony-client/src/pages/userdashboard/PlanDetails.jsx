import React, { useEffect, useState } from "react";
import planIcon from "../../assets/images/icon/plan.png";
import { getMyActivePlanData } from "../../api/axiosService/userAuthService";
import { useNavigate } from "react-router-dom";

const PlanDetails = () => {
  const navigate = useNavigate()
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMyActivePlanData(userId);

        if (response.status===200) {
          setPlanData(response?.data?.activePlan);
        } else {
          setError("No active plan found");
        }
      } catch (err) {
        setError(err?.response?.data?.message);
        console.error("Error fetching plan data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Function to calculate validity period
  const getValidityPeriod = (validFrom, validTo) => {
    const fromDate = new Date(validFrom);
    const toDate = new Date(validTo);
    const diffTime = Math.abs(toDate - fromDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 365) {
      const years = Math.floor(diffDays / 365);
      return `${years} Year${years > 1 ? "s" : ""}`;
    } else if (diffDays >= 30) {
      const months = Math.floor(diffDays / 30);
      return `${months} Month${months > 1 ? "s" : ""}`;
    } else {
      return `${diffDays} Day${diffDays > 1 ? "s" : ""}`;
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com">
        <h2 className="db-tit">Plan details</h2>
        <div className="db-pro-stat">
          <div className="text-center p-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading plan details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com">
        <h2 className="db-tit">Plan details</h2>
        <div className="db-pro-stat">
          <div className="text-center p-4">
            <p className="text-danger">{error}</p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/user/user-plan-selection")}
            >
              Upgrade plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com">
      <h2 className="db-tit">Plan details</h2>
      <div className="db-pro-stat">
        <h6 className="tit-top-curv">
          {planData?.subscriptionType || "Standard"} plan
        </h6>
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#!">
                Edit profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                View profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Plan change
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Download invoice now
              </a>
            </li>
          </ul>
        </div>
        <div className="db-plan-card">
          <img src={planIcon} alt="Plan" />
        </div>
        <div className="db-plan-detil">
          <ul>
            <li>
              Plan name: <strong>{planData?.subscriptionType || "N/A"}</strong>
            </li>
            <li>
              Amount: <strong>₹{planData?.subscriptionAmount || "0"}</strong>
            </li>
            <li>
              Validity:{" "}
              <strong>
                {planData?.subscriptionValidFrom &&
                planData?.subscriptionValidTo
                  ? getValidityPeriod(
                      planData.subscriptionValidFrom,
                      planData.subscriptionValidTo
                    )
                  : "N/A"}
              </strong>
            </li>
            <li>
              Valid from:{" "}
              <strong>
                {planData?.subscriptionValidFrom
                  ? formatDate(planData.subscriptionValidFrom)
                  : "N/A"}
              </strong>
            </li>
            <li>
              Valid till:{" "}
              <strong>
                {planData?.subscriptionValidTo
                  ? formatDate(planData.subscriptionValidTo)
                  : "N/A"}
              </strong>
            </li>
            <li>
              Transaction date:{" "}
              <strong>
                {planData?.subscriptionTransactionDate
                  ? formatDate(planData.subscriptionTransactionDate)
                  : "N/A"}
              </strong>
            </li>
            <li>
              <a href="/user/user-plan-selection" className="cta-3">
                Upgrade now
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
