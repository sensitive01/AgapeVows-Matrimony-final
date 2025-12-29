import React from "react";
import accountIcon from "../../assets/images/profiles/1.jpg";

const ProfileCompletion = () => {
  return (
    <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com">
      <h2 className="db-tit">Profiles status</h2>
      <div className="db-pro-stat">
        <h6>Profile completion</h6>
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
                Profile visibility settings
              </a>
            </li>
          </ul>
        </div>
        <div className="db-pro-pgog">
          <span>
            <b className="count">90</b>%
          </span>
        </div>
        <ul className="pro-stat-ic">
          {/* <li>
            <span>
              <i className="fa fa-heart-o like" aria-hidden="true"></i>
              <b>12</b>Likes
            </span>
          </li> */}
          <li>
            <span>
              <i className="fa fa-eye view" aria-hidden="true"></i>
              <b>12</b>Views
            </span>
          </li>
          <li>
            <span>
              <i className="fa fa-handshake-o inte" aria-hidden="true"></i>
              <b>12</b>Interests
            </span>
          </li>
          {/* <li>
            <span>
              <i className="fa fa-hand-pointer-o clic" aria-hidden="true"></i>
              <b>12</b>Clicks
            </span>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCompletion;
