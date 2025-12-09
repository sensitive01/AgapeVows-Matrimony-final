import { useState } from "react";

const Sidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (menuKey) => {
    console.log("Toggling menu:", menuKey);
    setExpandedMenus((prev) => {
      const newState = {
        ...prev,
        [menuKey]: !prev[menuKey],
      };
      console.log("New state:", newState);
      return newState;
    });
  };

  return (
    <div className="pan-lhs ad-menu-main">
      <div className="ad-menu">
        <ul>
          <li className="ic-db">
            <a href="/admin/dashboard">Dashboard</a>
          </li>

          <li className="ic-user">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu("users");
              }}
              className={expandedMenus.users ? "active" : ""}
            >
              Users
            </a>
            {/* Fixed: Using div without submenu class to match HTML structure */}
            <div style={{ display: expandedMenus.users ? "block" : "none" }}>
              <ol>
                <li>
                  <a href="/admin/new-user-requests">New User Requests</a>
                </li>
                <li>
                  <a href="/admin/all-user-list">All Users</a>
                </li>
                <li>
                  <a href="/admin/paid-user-list">Paid Users</a>
                </li>
                {/* <li>
                  <a href="/admin/standard-user-list">Standard Users</a>
                </li>
                <li>
                  <a href="/admin/premium-user-list">Premium Users</a>
                </li> */}
                <li>
                  <a href="/admin/add-new-user">Add new User</a>
                </li>
              </ol>
            </div>
          </li>

          <li>
            <h4>SEO Settings</h4>
          </li>
          <li className="ic-seo">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu("seo");
              }}
              className={expandedMenus.seo ? "active" : ""}
            >
              SEO Settings
            </a>
            <div style={{ display: expandedMenus.seo ? "block" : "none" }}>
              <ol>
                <li>
                  <a href="/admin/seo-meta-tags">Meta tags</a>
                </li>
                <li>
                  <a href="/admin/seo-google-analystics-code">Google Analytics Code</a>
                </li>
                <li>
                  <a href="/admin/seo-xml-site-map">XML Sitemap</a>
                </li>
              </ol>
            </div>
          </li>

          <li>
            <h4>Payments</h4>
          </li>
          <li className="ic-pay">
            <a href="/admin/all-payments-list">All Payments</a>
          </li>
          <li className="ic-pri">
            <a href="/admin/pricing-plans-list">Pricing Plans</a>
          </li>
          <li className="ic-pay">
            <a href="/admin/payment-gateway">Payment gateway</a>
          </li>

          <li>
            <h4>Settings</h4>
          </li>
          <li className="ic-set">
            <a href="/admin/settings-page">Site Setting</a>
          </li>

          <li>
            <h4>Appearance</h4>
          </li>
          <li className="ic-logo">
            <a href="/admin/logo">Website Logo</a>
          </li>
          <li className="ic-colr">
            <a href="/color-settings">Color Setting</a>
          </li>
          <li className="ic-medi">
            <a href="/media-library">Media Library</a>
          </li>

          <li>
            <h4>CMS</h4>
          </li>
          <li className="ic-hom">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu("homepage");
              }}
              className={expandedMenus.homepage ? "active" : ""}
            >
              Home Page
            </a>
            <div style={{ display: expandedMenus.homepage ? "block" : "none" }}>
              <ol>
                <li>
                  <a href="/admin/home-search">Search</a>
                </li>
                <li>
                  <a href="/admin/home-services">Services</a>
                </li>
                <li>
                  <a href="/admin/home-reviews">Customer reviews</a>
                </li>
                <li>
                  <a href="/admin/home-recent-couples">Recent couples</a>
                </li>
                <li>
                  <a href="/admin/home-meet-team">Meet our team</a>
                </li>
                <li>
                  <a href="/admin/photo-gallery">Photo gallery</a>
                </li>
                <li>
                  <a href="/admin/home-blogs">Blog & Articles</a>
                </li>
              </ol>
            </div>
          </li>

          <li className="ic-txt">
            <a href="/admin/profile-filters">All profile filters</a>
          </li>
          <li className="ic-txt">
            <a href="/admin/all-static-page">All Pages</a>
          </li>
          <li className="ic-txt">
            <a href="/admin/all-text-update">All Text Update</a>
          </li>
          <li className="ic-txt">
            <a href="/admin/footer">Footer</a>
          </li>
          <li className="ic-dum">
            <a href="/admin/dummy-images">Dummy Images</a>
          </li>
          <li className="ic-mail">
            <a href="/admin/all-mail" className="">
              Mail Templates
            </a>
          </li>

          <li>
            <h4>Others</h4>
          </li>
          <li className="ic-febk">
            <a href="/admin/enquiry">All Enquiry</a>
          </li>
          <li className="ic-imp">
            <a href="/admin/export">Export</a>
          </li>

          <li>
            <h4>Template</h4>
          </li>
          <li className="ic-act">
            <a href="/activate" className="">
              Activation
            </a>
          </li>
          <li className="ic-upd">
            <a href="/updates" className="">
              Template updates
            </a>
          </li>

          <li>
            <h4>Sign out</h4>
          </li>
          <li className="ic-lgo">
            <a href="/logout">Log out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
