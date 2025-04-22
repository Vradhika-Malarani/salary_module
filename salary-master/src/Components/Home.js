import React, { useState } from "react";  
import Nav from "./Nav";
import "./Home.css";
import src from "../Images/images2.jpg";
import Dashboard from "./Dashboard";
import { FaMicrophone, FaSearch } from "react-icons/fa"; 
import footerImage from "../Images/images1.jpg"; 
import Team from "./Team";  

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    alert("Searching for: " + searchQuery);
  };

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.onstart = () => console.log("Voice recognition started...");
    
    recognition.onresult = (event) => {
      setSearchQuery(event.results[0][0].transcript);
    };

    recognition.onerror = (event) => {
      alert("Error with voice recognition: " + event.error);
    };

    recognition.start();
  };

  return (
    <>
      <Nav />

      {/* ✅ Image Section */}
      <div className="image-container">
        <img src={src} alt="Payroll Management" className="home-image" />
      </div>

      {/* ✅ Search Bar */}
      <div className="search-wrapper">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            <FaSearch />
          </button>
          <button onClick={handleVoiceSearch} className="mic-button">
            <FaMicrophone />
          </button>
        </div>
      </div>

      {/* ✅ Dashboard Section */}
      <Dashboard />

      {/* ✅ Team Section */}
      <Team />

      {/* ✅ Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          {/* ✅ Footer Image & Description */}
          <div className="footer-about">
            <img src={footerImage} alt="Payroll Management" className="footer-image" />
            <div className="footer-text">
              <h3>Payroll Management System</h3>
              <p>
                Payroll Management streamlines salary distribution, automates tax
                calculations, and ensures compliance. It provides insights into employee
                benefits and financial planning.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;