import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

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

      <Footer />
    </div>
  );
};

export default AboutPage;
