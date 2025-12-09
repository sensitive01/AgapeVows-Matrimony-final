import React, { useState, useRef } from "react";
import { sendInterestData } from "../../api/axiosService/userAuthService";

const ShowInterest = ({ selectedUser,userId }) => {
  const modalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({
    about: true,
    photo: false,
    contact: false,
    personal: false,
    hobbies: false,
    social: false,
  });
  const [message, setMessage] = useState("");

  const handleCheckboxChange = (permission) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const handleSendInterestClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsLoading(true);

      // Prepare the data to send
      const interestData = {
        targetUser: selectedUser._id,
        permissions: selectedPermissions,
        message: message,
        timestamp: new Date().toISOString(),
      };

      console.log("Sending interest data:", interestData); // Debug log

      // Call the parent function with the data
      await sendInterestData(interestData,userId);

      // Show success message
      alert("Interest sent successfully!");

      // Close modal programmatically
      if (modalRef.current) {
        // For Bootstrap 5
        const modal = window.bootstrap?.Modal?.getInstance(modalRef.current);
        if (modal) {
          modal.hide();
        } else {
          // For Bootstrap 4 (jQuery)
          if (window.$) {
            window.$(modalRef.current).modal("hide");
          }
        }
      }

      // Reset form
      setMessage("");
      setSelectedPermissions({
        about: true,
        photo: false,
        contact: false,
        personal: false,
        hobbies: false,
        social: false,
      });
    } catch (error) {
      console.error("Error sending interest:", error);
      alert(`Failed to send interest: ${error.message || "Please try again."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fade" id="sendInter" ref={modalRef}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title seninter-tit">
              Send interest to{" "}
              <span className="intename2">{selectedUser?.userName}</span>
            </h4>
            <button type="button" className="close" data-bs-dismiss="modal">
              &times;
            </button>
          </div>

          <div className="modal-body seninter">
            <div className="lhs">
              <img
                src={selectedUser?.profileImage || "images/default-profile.jpg"}
                alt={selectedUser?.userName}
                className="intephoto2"
                onError={(e) => {
                  e.target.src = "images/default-profile.jpg";
                }}
              />
            </div>
            <div className="rhs">
              <h4>
                Permissions:{" "}
                <span className="intename2">{selectedUser?.userName}</span> Can
                able to view the below details
              </h4>
              <ul>
                <li>
                  <div className="chbox">
                    <input
                      type="checkbox"
                      id="pro_about"
                      checked={selectedPermissions.about}
                      onChange={() => handleCheckboxChange("about")}
                    />
                    <label htmlFor="pro_about">About section</label>
                  </div>
                </li>
                <li>
                  <div className="chbox">
                    <input
                      type="checkbox"
                      id="pro_photo"
                      checked={selectedPermissions.photo}
                      onChange={() => handleCheckboxChange("photo")}
                    />
                    <label htmlFor="pro_photo">Photo gallery</label>
                  </div>
                </li>
                <li>
                  <div className="chbox">
                    <input
                      type="checkbox"
                      id="pro_contact"
                      checked={selectedPermissions.contact}
                      onChange={() => handleCheckboxChange("contact")}
                    />
                    <label htmlFor="pro_contact">Contact info</label>
                  </div>
                </li>
                <li>
                  <div className="chbox">
                    <input
                      type="checkbox"
                      id="pro_person"
                      checked={selectedPermissions.personal}
                      onChange={() => handleCheckboxChange("personal")}
                    />
                    <label htmlFor="pro_person">Personal info</label>
                  </div>
                </li>
                <li>
                  <div className="chbox">
                    <input
                      type="checkbox"
                      id="pro_hobbi"
                      checked={selectedPermissions.hobbies}
                      onChange={() => handleCheckboxChange("hobbies")}
                    />
                    <label htmlFor="pro_hobbi">Hobbies</label>
                  </div>
                </li>
                <li>
                  <div className="chbox">
                    <input
                      type="checkbox"
                      id="pro_social"
                      checked={selectedPermissions.social}
                      onChange={() => handleCheckboxChange("social")}
                    />
                    <label htmlFor="pro_social">Social media</label>
                  </div>
                </li>
              </ul>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="comment"
                  name="text"
                  placeholder="Comment goes here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <label htmlFor="comment">
                  Write some message to{" "}
                  <span className="intename">{selectedUser?.userName}</span>
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSendInterestClick}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send interest"}
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-dismiss="modal"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowInterest;
