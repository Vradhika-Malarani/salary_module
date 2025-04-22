import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import loginImage from "../Images/istockphoto-1389255223-612x612.jpg";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("❌ Please enter both email and password!");
            return;
        }

        try {
            console.log(email, password);
            const response = await fetch("http://localhost:5000/api/auth/login", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userRole", data.role);

                toast.success("Login successful! Redirecting...", {
                    autoClose: 1500,
                    onClose: () => {
                        navigate(data.role === "admin" ? "/Admindash" : "/Userdash", { replace: true });
                    },
                });
            } else {
                toast.error(data.error || "⚠️ Invalid credentials!");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("⚠️ Server error! Please try again later.");
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light play-regular">
            <div className="row w-100 login-card">
                <div className="col-md-6 p-4">
                    <div className="card-body">
                        <h1 className="card-title text-center mb-4">Login</h1>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3 position-relative">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span className="input-group-text eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                        </div>

                        <button onClick={handleLogin} className="btn btn-dark w-100">Login</button>

                        <div className="mt-3 text-center">
                            <a href="/forgot-password" className="text-decoration-none text-dark">Forgot Password?</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 d-none d-md-block p-0">
                    <img
                        src={loginImage}
                        alt="Login Illustration"
                        className="img-fluid h-100 w-100"
                        style={{ objectFit: "cover", borderRadius: "0 10px 10px 0" }}
                    />
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={2000} pauseOnHover theme="light" />
        </div>
    );
};

export default Login;
