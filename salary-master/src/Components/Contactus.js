import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contactus.css";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // For button loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.title || !formData.message) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setFormData({ name: "", email: "", title: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
      </div>

      <div className="contact-container">
        {/* Left: Contact Form */}
        <div className="contact-form-section">
          <h2>Get In Touch</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Title..."
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Type Here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Now"}
            </button>
          </form>
        </div>

        {/* Right: Contact Info & Map */}
        <div className="contact-info">
          <p>
            "Have questions? Need assistance? Contact us, and we’ll get back to you as soon as possible."
          </p>
          <div className="contact-details">
            <p>
              <a href="tel:+62824032567">
                <FaPhoneAlt className="contact-icon" /> +62 82 4032 567
              </a>
            </p>
            <p>
              <a href="mailto:example@email.com">
                <FaEnvelope className="contact-icon" /> example@email.com
              </a>
            </p>
            <p>
              <a href="https://wa.me/9822457253" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="contact-icon" /> 982-245-7253
              </a>
            </p>
            <p>
              <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer">
                <FaMapMarkerAlt className="contact-icon" /> Mangalore
              </a>
            </p>
          </div>
          <iframe
            title="Google Maps"
            className="contact-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8589272359273!2d74.84113567502918!3d12.914141787378334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35aa2f9d1f0a1%3A0x65d4d333dd5d3f8!2sMangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1708012345678!5m2!1sen!2sin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        <div className="footer-content">
          <h3>Payroll Management</h3>
          <p>💼 "Simplify Payroll, Empower Your Workforce".</p>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <p><Link to="/Home">Home</Link></p>
          <p><Link to="/About">About</Link></p>
          <p><Link to="/Feedback">Feedback</Link></p>
          <p><Link to="/Setting">Settings</Link></p>
        </div>
        <div className="footer-contact">
          <h4>Get In Touch</h4>
          <p>
            <a href="https://www.google.com/maps/place/Mangalore,+Karnataka" target="_blank" rel="noopener noreferrer">
              <FaMapMarkerAlt className="contact-icon" /> Mangalore
            </a>
          </p>
          <p>207-8767-452</p>
          <p>982-245-7253</p>
          <p>payroll@site.com</p>
        </div>
      </footer>

      {/* Toast Notification */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Contact;
