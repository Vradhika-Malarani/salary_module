import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      toast.error('Please enter your email!');
    } else if (!validateEmail(email)) {
      toast.error('Invalid email format!');
    } else {
      toast.success('Password reset link has been sent to your email!');
      setEmail('');
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light play-regular">
        <div className="card shadow-lg" style={{ width: '24rem' }}>
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Forgot Password</h1>
            <p className="text-center mb-4 text-muted">
              Enter your email address below, and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn bg-black text-white w-100 transform">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default ForgotPassword;
