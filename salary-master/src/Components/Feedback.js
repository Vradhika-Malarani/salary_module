import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Feedback.css"; // Ensure you have styles

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("All fields are required!");
      return;
    }

    // Success message
    toast.success("Feedback submitted successfully!");

    console.log("Feedback Submitted:", { name, email, message });

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="feedback-container">
      <h1>Feedback</h1>
      <p>We would love to hear your thoughts and improve our services.</p>

      <form onSubmit={handleSubmit} className="feedback-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Feedback;
