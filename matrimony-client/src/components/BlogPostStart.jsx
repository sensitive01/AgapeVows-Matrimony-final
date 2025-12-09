import React from "react";
import blog1 from "../assets/images/blog/1.jpg"
import blog2 from "../assets/images/blog/2.jpg"
import blog3 from "../assets/images/blog/3.jpg"

const BlogPostStart = () => {
  return (
    <section>
      <div className="hom-blog">
        <div className="container">
          <div className="row">
            <div className="home-tit">
              <p style={{ color: "black" }}>Blog posts</p>
              <h2>
                <span>Blog &amp; Articles</span>
              </h2>
              <span className="leaf1" />
              <span className="tit-ani-" />
            </div>
            <div className="blog">
              <ul>
                <li>
                  <div className="blog-box">
                    <img
                      src={blog1}
                      alt=""
                      loading="lazy"
                    />
                    <span>Wedding - Johnny</span>
                    <h2>Wedding arrangements</h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content.
                    </p>
                    <a
                      href="#"
                      className="cta-dark"
                      style={{ background: "#A020F0" }}
                    >
                      <span>Read more</span>
                    </a>
                  </div>
                </li>
                <li>
                  <div className="blog-box">
                    <img
                      src={blog2}
                      alt=""
                      loading="lazy"
                    />
                    <span>Wedding - Johnny</span>
                    <h2>Wedding arrangements</h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content.
                    </p>
                    <a
                      href="#"
                      className="cta-dark"
                      style={{ background: "#A020F0" }}
                    >
                      <span>Read more</span>
                    </a>
                  </div>
                </li>
                <li>
                  <div className="blog-box">
                    <img
                      src={blog3}
                      alt=""
                      loading="lazy"
                    />
                    <span>Wedding - Johnny</span>
                    <h2>Invitation cards</h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content.
                    </p>
                    <a
                      href="#"
                      className="cta-dark"
                      style={{ background: "#A020F0" }}
                    >
                      <span>Read more</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostStart;
