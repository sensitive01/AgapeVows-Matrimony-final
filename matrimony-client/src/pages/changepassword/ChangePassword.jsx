import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import { resetPasswordRequest } from "../../api/axiosService/userSignUpService";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasNonalphas) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Validate password strength
    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Replace with your actual API call
      const response = await resetPasswordRequest({
        newPassword: formData.newPassword,
        userId,
      });

      if (response.status === 200) {
        setSuccess(response.data.message);
        setTimeout(() => {
          navigate("/user/user-login");
        }, 2000);
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getPasswordStrength = (password) => {
    if (!password) return "";

    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /\W/.test(password);

    const strength = [
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    ].filter(Boolean).length;

    if (strength < 2) return "Weak";
    if (strength < 4) return "Medium";
    if (strength === 5) return "Strong";
    return "Medium";
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case "Weak":
        return "#dc3545";
      case "Medium":
        return "#ffc107";
      case "Strong":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  return (
      <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="inn">
                <div className="lhs">
                  <div className="tit">
                    <h2>
                      Create your <b>new password</b> Easy and fast.
                    </h2>
                  </div>
                  <div className="im">
                    <img src="images/login-couple.png" alt="" />
                  </div>
                  <div className="log-bg">&nbsp;</div>
                </div>
                <div className="rhs">
                  <div>
                    <div className="form-tit">
                      <h4>Almost Done</h4>
                      <h1>Reset Password</h1>
                      <p>
                        Remember your password?{" "}
                        <a href="/user/user-login">Login</a>
                      </p>
                    </div>
                    <div className="form-login">
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                      {success && (
                        <div className="alert alert-success" role="alert">
                          {success}
                        </div>
                      )}
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label className="lb">New Password:</label>
                          <div style={{ position: "relative" }}>
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              placeholder="Enter new password"
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleInputChange}
                              required
                              style={{ paddingRight: "40px" }}
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                fontSize: "16px",
                              }}
                            >
                              {showPassword ? "👁️" : "🙈"}
                            </button>
                          </div>
                          {formData.newPassword && (
                            <div
                              style={{
                                fontSize: "12px",
                                marginTop: "5px",
                                color: getPasswordStrengthColor(
                                  getPasswordStrength(formData.newPassword)
                                ),
                              }}
                            >
                              Password Strength:{" "}
                              {getPasswordStrength(formData.newPassword)}
                            </div>
                          )}
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#666",
                              marginTop: "5px",
                            }}
                          >
                            Password must contain at least 8 characters with
                            uppercase, lowercase, number, and special character
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="lb">Confirm Password:</label>
                          <div style={{ position: "relative" }}>
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="form-control"
                              placeholder="Confirm your new password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              required
                              style={{ paddingRight: "40px" }}
                            />
                            <button
                              type="button"
                              onClick={toggleConfirmPasswordVisibility}
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                fontSize: "16px",
                              }}
                            >
                              {showConfirmPassword ? "👁️" : "🙈"}
                            </button>
                          </div>
                          {formData.confirmPassword && (
                            <div
                              style={{
                                fontSize: "12px",
                                marginTop: "5px",
                                color:
                                  formData.newPassword ===
                                  formData.confirmPassword
                                    ? "#28a745"
                                    : "#dc3545",
                              }}
                            >
                              {formData.newPassword === formData.confirmPassword
                                ? "✓ Passwords match"
                                : "✗ Passwords do not match"}
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? "Resetting Password..." : "Reset Password"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <CopyRights />
    </div>
  );
};

export default ChangePassword;
