import React, { useState } from "react";
import "./Aboutus.css";
import { FaShieldAlt, FaLock, FaHeadset } from "react-icons/fa";

import { FaCalculator, FaClipboardList, FaMoneyCheckAlt,FaUserCheck,FaChartLine} from "react-icons/fa";
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const App = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className="container">
        {/* About Us Section */}
        <section className="about">
          <h2>About Us</h2>
          <p>
            Our Payroll Management System is designed to simplify and automate salary processing, employee payments, tax calculations, and financial reporting.
            Our system ensures accuracy, compliance, and efficiency in handling payroll operations for businesses of all sizes.
          </p>

          {showMore && (
            <p>
              With features like **automated salary calculation, tax deductions, leave tracking, and real-time reporting,** we help organizations streamline their payroll processes while minimizing errors and administrative workload.
              <br />
              Our goal is to provide a **secure, user-friendly, and efficient** payroll solution that saves time and enhances financial transparency for businesses.
            </p>
          )}

          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : "Know More"}
          </button>
        </section>

        {/* Why Us Section */}
        <section className="why-us">
  <h2>Why Us</h2>
  <div className="why-cards">
    <div className="card">
      <FaShieldAlt className="icon" /> {/* Secure Processing Icon */}
      <h3>Quality Service</h3>
      <p>We ensure high-quality payroll processing with accuracy and efficiency.</p>
    </div>
    <div className="card">
      <FaLock className="icon" /> {/* Secure Transactions Icon */}
      <h3>Secure Transactions</h3>
      <p>Data security and compliance are our top priorities.</p>
    </div>
    <div className="card">
      <FaHeadset className="icon" /> {/* Customer Support Icon */}
      <h3>24/7 Support</h3>
      <p>Dedicated support team available anytime you need help.</p>
    </div>
    <div className="card">
      <FaChartLine className="icon" />
      <h3>Efficiency</h3>
      <p>Automated processes to save time and reduce errors.</p>
    </div>
    <div className="card">
      <FaUserCheck className="icon" />
      <h3>User-Friendly</h3>
      <p>Simple and easy-to-use payroll management system.</p>
    </div>
  </div>
</section>


        {/* Services Section */}
        <section className="services">
          <h2>Our Services</h2>
          <div className="service-boxes">
            <div className="service">
              <FaCalculator size={50} color="#1b1b1b" />
              <h3>Payroll Processing</h3>
              <p>Automated salary calculations with tax deductions.</p>
            </div>
            <div className="service">
              <FaClipboardList size={50} color="#1b1b1b" />
              <h3>Employee Management</h3>
              <p>Track employee attendance, leaves, and benefits.</p>
            </div>
            <div className="service">
              <FaMoneyCheckAlt size={50} color="#1b1b1b" />
              <h3>Salary Disbursement</h3>
              <p>Seamless bank transfers and financial compliance.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Moved Outside the Container */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>What We Do</h3>
            <p>Business Growth, Sustainability, Advanced Analytics</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>Improve Business</li>
              <li>Customer Insights</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p><FaPhone /> +1 (404) 987-5599</p>
            <p><FaEnvelope /> info@corporate.com</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <p>
              <FaFacebook /> <FaTwitter /> <FaLinkedin />
            </p>
          </div>
        </div>
        <p className="copyright">© 2025 Corporate. All rights reserved.</p>
      </footer>
    </>
  );
};

export default App;
