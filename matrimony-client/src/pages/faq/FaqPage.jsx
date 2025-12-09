import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";

const FaqPage = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="login pg-faq">
          <div className="container">
            <div className="row">
              <div className="inn ab-faq-lhs">
                <div className="form-tit">
                  <h4>FAQ</h4>
                  <h1>Frequently asked questions</h1>
                </div>
                <div id="accordion">
                  <div className="card">
                    <div className="card-header">
                      <a
                        className="card-link"
                        data-toggle="collapse"
                        href="#collapse1"
                      >
                        How Matrimony website works?
                      </a>
                    </div>
                    <div
                      id="collapse1"
                      className="collapse show"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <a
                        className="collapsed card-link"
                        data-toggle="collapse"
                        href="#collapse2"
                      >
                        Printing and typesetting industry?
                      </a>
                    </div>
                    <div
                      id="collapse2"
                      className="collapse"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <a
                        className="collapsed card-link"
                        data-toggle="collapse"
                        href="#collapse3"
                      >
                        Why do we use it?
                      </a>
                    </div>
                    <div
                      id="collapse3"
                      className="collapse"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <a
                        className="collapsed card-link"
                        data-toggle="collapse"
                        href="#collapse4"
                      >
                        There are many variations of passages?
                      </a>
                    </div>
                    <div
                      id="collapse4"
                      className="collapse"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <a
                        className="collapsed card-link"
                        data-toggle="collapse"
                        href="#collapse5"
                      >
                        Where can I get some?
                      </a>
                    </div>
                    <div
                      id="collapse5"
                      className="collapse"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <a
                        className="collapsed card-link"
                        data-toggle="collapse"
                        href="#collapse6"
                      >
                        Piece of classical Latin literature from 45 BC?
                      </a>
                    </div>
                    <div
                      id="collapse6"
                      className="collapse"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END */}
      {/* FOOTER */}
      <section className="wed-hom-footer">
        <div className="container">
          <div className="row foot-supp">
            <h2>
              <span>Free support:</span> +92 (8800) 68 - 8960
              &nbsp;&nbsp;|&nbsp;&nbsp; <span>Email:</span>
              info@example.com
            </h2>
          </div>
          <div className="row wed-foot-link wed-foot-link-1">
            <div className="col-md-4">
              <h4>Get In Touch</h4>
              <p>Address: 3812 Lena Lane City Jackson Mississippi</p>
              <p>
                Phone: <a href="tel:+917904462944">+92 (8800) 68 - 8960</a>
              </p>
              <p>
                Email: <a href="mailto:info@example.com">info@example.com</a>
              </p>
            </div>
            <div className="col-md-4">
              <h4>HELP &amp; SUPPORT</h4>
              <ul>
                <li>
                  <a href="about-us.html">About company</a>
                </li>
                <li>
                  <a href="#!">Contact us</a>
                </li>
                <li>
                  <a href="#!">Feedback</a>
                </li>
                <li>
                  <a href="about-us.html#faq">FAQs</a>
                </li>
                <li>
                  <a href="about-us.html#testimonials">Testimonials</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 fot-soc">
              <h4>SOCIAL MEDIA</h4>
              <ul>
                <li>
                  <a href="#!">
                    <img src="images/social/1.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="images/social/2.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="images/social/3.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="images/social/5.png" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row foot-count">
            <p>
              Company name Site - Trusted by over thousands of Boys &amp; Girls
              for successfull marriage.{" "}
              <a href="sign-up.html" className="btn btn-primary btn-sm">
                Join us today !
              </a>
            </p>
          </div>
        </div>
      </section>
      {/* END */}
      {/* COPYRIGHTS */}
      <section>
        <div className="cr">
          <div className="container">
            <div className="row">
              <p>
                Copyright © <span id="cry">2017-2020</span>{" "}
                <a href="#!" target="_blank">
                  Company.com
                </a>{" "}
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
