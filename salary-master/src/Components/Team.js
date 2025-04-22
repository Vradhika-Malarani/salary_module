import React from "react";
import "./Team.css";


const teamMembers = [
  { name: "Shane Steinberger", role: "Founder", image: "/images/team1.jpg" },
  { name: "Stephanie Pry", role: "CFO", image: "/images/team2.jpg" },
  { name: "Andrew Hawkins", role: "CFO", image: "/images/team1.jpg" },
  { name: "Laura Crooks", role: "COO", image: "/images/team2.jpg" },
  { name: "Robert Carpenter", role: "Marketing Director", image: "/images/team1.jpg" },
  { name: "Jeson Smith", role: "Designer, Themeforest", image: "/images/team2.jpg" },
  { name: "Sayful Milon", role: "Data Management", image: "/images/team1.jpg" },
  { name: "Jeqlin Firnos", role: "Analytical Solutions", image: "/images/team2.jpg" },
];

const Team = () => {
  return (
    <section className="team">
      <h2>Our finance expert team members</h2>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="team-img" />
            <div className="team-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <span className="team-icon">🟢</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
