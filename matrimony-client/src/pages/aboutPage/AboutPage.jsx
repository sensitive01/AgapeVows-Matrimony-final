import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="str">
          <div className="ban-inn ab-ban">
            <div className="container">
              <div className="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    <span>
                      <i className="no1">#1</i> Wedding Website
                    </span>
                    <h1>About us</h1>
                    <p>
                      Most Trusted and premium Matrimony Service in the World.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END */}
      {/* START */}
      <section>
        <div className="ab-sec2">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div>
                    <img src="images/icon/prize.png" alt="" />
                    <h4>Genuine profiles</h4>
                    <p>The most trusted wedding matrimony brand</p>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="images/icon/trust.png" alt="" />
                    <h4>Most trusted</h4>
                    <p>The most trusted wedding matrimony brand</p>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="images/icon/rings.png" alt="" />
                    <h4>2000+ weddings</h4>
                    <p>The most trusted wedding matrimony brand</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* START */}
      <section>
        <div className="ab-wel">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="ab-wel-lhs">
                  <span className="ab-wel-3" />
                  <img src="images/about/1.jpg" alt="" className="ab-wel-1" />
                  <img src="images/about/2.jpg" alt="" className="ab-wel-2" />
                  <span className="ab-wel-4" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ab-wel-rhs">
                  <div className="ab-wel-tit">
                    <h2>
                      Welcome to <em>Wedding matrimony</em>
                    </h2>
                    <p>
                      Best wedding matrimony It is a long established fact that
                      a reader will be distracted by the readable content of a
                      page when looking at its layout.{" "}
                    </p>
                    <p>
                      {" "}
                      <a href="plans.html">Click here to</a> Start you matrimony
                      service now.
                    </p>
                  </div>
                  <div className="ab-wel-tit-1">
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>
                  <div className="ab-wel-tit-2">
                    <ul>
                      <li>
                        <div>
                          <i className="fa fa-phone" aria-hidden="true" />
                          <h4>
                            Enquiry <em>+01 2242 3366</em>
                          </h4>
                        </div>
                      </li>
                      <li>
                        <div>
                          <i className="fa fa-envelope-o" aria-hidden="true" />
                          <h4>
                            Get Support <em>info@example.com</em>
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* START */}
      <section>
        <div className="ab-cont">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-heart-o" aria-hidden="true" />
                    <div>
                      <h4>2K</h4>
                      <span>Couples pared</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-users" aria-hidden="true" />
                    <div>
                      <h4>4000+</h4>
                      <span>Registered users</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-male" aria-hidden="true" />
                    <div>
                      <h4>1600+</h4>
                      <span>Mens</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-female" aria-hidden="true" />
                    <div>
                      <h4>2000+</h4>
                      <span>Womens</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* RECENT COUPLES */}
      <section>
        <div className="hom-partners abo-partners" id="testimonials">
          <div className="container">
            <div className="row">
              {/* SUB TITLE */}
              <div className="sub-tit-caps">
                <h2>
                  Customer{" "}
                  <span
                    className="animate animate__animated"
                    data-ani="animate__flipInX"
                    data-dely="0.1"
                  >
                    Testimonials
                  </span>
                </h2>
                <p>Fusce imperdiet ullamcorper fringilla.</p>
              </div>
              {/* TESTMONIAL BACKGROUND SHAPES */}
              <div className="wedd-shap">
                <span className="abo-shap-1" />
                <span className="abo-shap-3" />
              </div>
              {/* SLIDER START */}
              <div id="demo" className="carousel slide" data-ride="carousel">
                {/* Wrapper for slides */}
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <ul>
                      <li>
                        <div className="ab-testmo">
                          <div className="ab-test-rat">
                            <div className="ab-test-star">
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i
                                className="fa fa-star-half-o"
                                aria-hidden="true"
                              />
                              <span>(50 Reviews)</span>
                            </div>
                            <div className="ab-test-conte">
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                              </p>
                            </div>
                          </div>
                          <div className="ab-rat-user">
                            <img src="images/profiles/1.jpg" alt="" />
                            <div>
                              <h4>John Smith</h4>
                              <span>IT Profession</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="ab-testmo">
                          <div className="ab-test-rat">
                            <div className="ab-test-star">
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star-o" aria-hidden="true" />
                              <span>(50 Reviews)</span>
                            </div>
                            <div className="ab-test-conte">
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                              </p>
                            </div>
                          </div>
                          <div className="ab-rat-user">
                            <img src="images/profiles/6.jpg" alt="" />
                            <div>
                              <h4>Julia Ann</h4>
                              <span>Teacher</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="ab-testmo">
                          <div className="ab-test-rat">
                            <div className="ab-test-star">
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i
                                className="fa fa-star-half-o"
                                aria-hidden="true"
                              />
                              <span>(50 Reviews)</span>
                            </div>
                            <div className="ab-test-conte">
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                              </p>
                            </div>
                          </div>
                          <div className="ab-rat-user">
                            <img src="images/profiles/7.jpg" alt="" />
                            <div>
                              <h4>William Son</h4>
                              <span>Government Staff</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="carousel-item">
                    <ul>
                      <li>
                        <div className="ab-testmo">
                          <div className="ab-test-rat">
                            <div className="ab-test-star">
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star-o" aria-hidden="true" />
                              <span>(50 Reviews)</span>
                            </div>
                            <div className="ab-test-conte">
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                              </p>
                            </div>
                          </div>
                          <div className="ab-rat-user">
                            <img src="images/profiles/1.jpg" alt="" />
                            <div>
                              <h4>John Smith</h4>
                              <span>IT Profession</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="ab-testmo">
                          <div className="ab-test-rat">
                            <div className="ab-test-star">
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star-o" aria-hidden="true" />
                              <span>(50 Reviews)</span>
                            </div>
                            <div className="ab-test-conte">
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                              </p>
                            </div>
                          </div>
                          <div className="ab-rat-user">
                            <img src="images/profiles/6.jpg" alt="" />
                            <div>
                              <h4>Julia Ann</h4>
                              <span>Teacher</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="ab-testmo">
                          <div className="ab-test-rat">
                            <div className="ab-test-star">
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i
                                className="fa fa-star-half-o"
                                aria-hidden="true"
                              />
                              <span>(50 Reviews)</span>
                            </div>
                            <div className="ab-test-conte">
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                              </p>
                            </div>
                          </div>
                          <div className="ab-rat-user">
                            <img src="images/profiles/7.jpg" alt="" />
                            <div>
                              <h4>William Son</h4>
                              <span>Government Staff</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Left and right controls */}
                <a
                  className="carousel-control-prev"
                  href="#demo"
                  data-slide="prev"
                >
                  <span className="carousel-control-prev-icon" />
                </a>
                <a
                  className="carousel-control-next"
                  href="#demo"
                  data-slide="next"
                >
                  <span className="carousel-control-next-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* START */}
      <section>
        <div className="ab-team pg-abo-ab-team">
          <div className="container">
            <div className="row">
              <div className="home-tit">
                <p>OUR PROFESSIONALS</p>
                <h2>
                  <span>Meet Our Team</span>
                </h2>
                <span className="leaf1" />
              </div>
              <ul>
                <li>
                  <div>
                    <img src="images/profiles/6.jpg" alt="" loading="lazy" />
                    <h4>Ashley Jen</h4>
                    <p>Marketing Manager</p>
                    <ul className="social-light">
                      <li>
                        <a href="#!">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-whatsapp" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-linkedin" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="images/profiles/7.jpg" alt="" loading="lazy" />
                    <h4>Ashley Jen</h4>
                    <p>Marketing Manager</p>
                    <ul className="social-light">
                      <li>
                        <a href="#!">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-whatsapp" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-linkedin" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="images/profiles/8.jpg" alt="" loading="lazy" />
                    <h4>Emily Arrov</h4>
                    <p>Creative Manager</p>
                    <ul className="social-light">
                      <li>
                        <a href="#!">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-whatsapp" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-linkedin" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="images/profiles/9.jpg" alt="" loading="lazy" />
                    <h4>Julia sear</h4>
                    <p>Client Coordinator</p>
                    <ul className="social-light">
                      <li>
                        <a href="#!">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-whatsapp" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-linkedin" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* START */}
      <section>
        <div className="ab-faq" id="faq">
          <div className="container">
            <div className="row">
              {/* SUB TITLE */}
              <div className="sub-tit-caps">
                <h2>
                  KB{" "}
                  <span
                    className="animate animate__animated"
                    data-ani="animate__flipInX"
                    data-dely="0.1"
                  >
                    knowledge base
                  </span>
                </h2>
                <p>Fusce imperdiet ullamcorper fringilla.</p>
              </div>
              {/* TESTMONIAL BACKGROUND SHAPES */}
              <div className="wedd-shap">
                <span className="abo-shap-1" />
                <span className="abo-shap-2" />
                <span className="abo-shap-4" />
                <span className="abo-shap-5" />
              </div>
              <div className="col-lg-6">
                <div className="ab-faq-lhs">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header">
                        <a
                          className="card-link"
                          data-toggle="collapse"
                          href="#collapse1"
                        >
                          It is a long established fact
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
                          Where can I get some?
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
                          Where does it come from?
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
                          Why do we use it?
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
                          What is Lorem Ipsum?
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
                          Contrary to popular belief
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
              <div className="col-lg-6">
                <div className="ab-faq-rhs">
                  <img src="images/about/3.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
   <Footer/>
      {/* END */}

    </div>
  );
};

export default AboutPage;
