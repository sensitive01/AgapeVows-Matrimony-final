import React from "react";
import social1 from "../assets/images/social/1.png"
import social2 from "../assets/images/social/2.png"
import social3 from "../assets/images/social/3.png"
import social5 from "../assets/images/social/5.png"


const Footer = () => {
  return (
    <section className="wed-hom-footer" style={{ background: "#A020F0" }}>
      <div className="container">
        <div className="row foot-supp" style={{ background: "black" }}>
          <h2>
            <span>Free support:</span> +92 (8800) 68 - 8960
            &nbsp;&nbsp;|&nbsp;&nbsp; <span>Email:</span> info@example.com
          </h2>
        </div>
        <div className="row wed-foot-link wed-foot-link-1">
          <div className="col-md-4">
            <h4 style={{ color: "white" }}>Get In Touch</h4>
            <p style={{ color: "white" }}>
              Address: 3812 Lena Lane City Jackson Mississippi
            </p>
            <p style={{ color: "white" }}>
              Phone:{" "}
              <a href="tel:+917904462944" style={{ color: "white" }}>
                +92 (8800) 68 - 8960
              </a>
            </p>
            <p style={{ color: "white" }}>
              Email:{" "}
              <a href="mailto:info@example.com" style={{ color: "white" }}>
                info@example.com
              </a>
            </p>
          </div>
          <div className="col-md-4" style={{ color: "white" }}>
            <h4 style={{ color: "white" }}>HELP &amp; SUPPORT</h4>
            <ul>
              <li>
                <a href="/about-us" style={{ color: "white" }}>
                  About company
                </a>
              </li>
              <li>
                <a href="/contact-page" style={{ color: "white" }}>
                  Contact us
                </a>
              </li>
              <li>
                <a href="#!" style={{ color: "white" }}>
                  Feedback
                </a>
              </li>
              <li>
                <a href="/faq-page" style={{ color: "white" }}>
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "white" }}>
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 fot-soc">
            <h4 style={{ color: "white" }}>SOCIAL MEDIA</h4>
            <ul>
              <li>
                <a href="#!">
                  <img
                    src={social1}
                    alt=""
                    loading="lazy"
                  />
                </a>
              </li>
              <li>
                <a href="#!">
                  <img
                    src={social2}
                    alt=""
                    loading="lazy"
                  />
                </a>
              </li>
              <li>
                <a href="#!">
                  <img
                    src={social3}
                    alt=""
                    loading="lazy"
                  />
                </a>
              </li>
              <li>
                <a href="#!">
                  <img
                    src={social5}
                    alt=""
                    loading="lazy"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row foot-count">
          <p style={{ color: "white" }}>
            Company name Site - Trusted by over thousands of Boys &amp; Girls
            for successfull marriage.
            {/* <a href="/user/user-sign-up" className="btn btn-primary btn-sm">
              Join us today !
            </a> */}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
