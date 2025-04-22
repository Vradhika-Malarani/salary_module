import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Assests/Nav.css";
import Logo from "../Images/logo.png";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="main-nav-container">
      <div className="logo-container">
        <img src={Logo} alt="Logo" />
      </div>

      <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" className={isActive("/") ? "active" : ""} onClick={closeMenu}>Home</Link>
        <Link to="/aboutus" className={isActive("/aboutus") ? "active" : ""} onClick={closeMenu}>About</Link>
        <Link to="/feedback" className={isActive("/feedback") ? "active" : ""} onClick={closeMenu}>Feedback</Link>
        <Link to="/contactus" className={isActive("/contactus") ? "active" : ""} onClick={closeMenu}>Contact Us</Link>
      </div>

      {/* Navigate to Login Page */}
      <button className="login-button" onClick={() => navigate("/login")}>Login</button>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </div>
    </nav>
  );
};

export default Nav;
