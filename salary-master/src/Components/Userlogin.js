import React, { useState } from 'react'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import loginImage from '../Images/istockphoto-1389255223-612x612.jpg';
import './Login.css'; // Import external styles

const LoginValidation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please fill out all fields!');
    } else if (!validateEmail(email)) {
      toast.error('Invalid email format!');
    } else if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters long and include both letters and numbers!');
    } else {
      toast.success('Login successful!');
      navigate('/userdash');
    }
  };
  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light play-regular">
        <div className="row w-100 login-card">
          <div className="col-md-6 p-4">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">User Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                {/* ✅ Updated Password Field */}
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <span className="input-group-text eye-icon" onClick={() => setShowPassword(!showPassword)}>
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                  </div>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Login
                </button>
              </form>
              <div className="mt-3 text-center">
                <a href="/forgot-password" className="text-decoration-none text-white">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
          
          {/* ✅ Image Section */}
          <div className="col-md-6 d-none d-md-block p-0">
            <img
              src={loginImage}
              alt="Login Illustration"
              className="img-fluid h-100 w-100"
              style={{ objectFit: 'cover', borderRadius: '0 10px 10px 0' }}
            />
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

export default LoginValidation;
