// src/pages/Auth/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import "../../Css/Auth/Login.css";
import { useAuth } from "../../context/AuthContext"; // add at top

import LoginPageLogo from '../../assets/Images/Logo/Login Page Logo.jpg'
import LoginpageImg1 from '../../assets/Images/LoginPageImg1.png'
import LoginpageImg2 from '../../assets/Images/LoginPageImg2.png'

const DEFAULT_PASSWORD = "signpost";

const carouselItems = [
  {
    img: LoginpageImg1, 
    title: "Share Your Products",
    description:
      "Showcase Your Products with detailed Specifications, Dimensions, and beautiful images to react more Customers.",
  },
  {
    img: LoginpageImg2, 
    title: " Discover and connect ",
    description: "Find Business, people, and Products near you. Save Contacts and build meaningfull connections.",
  },
];

const Login = () => {
  const { login } = useAuth(); 

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (password !== DEFAULT_PASSWORD) {
      setMessage("❌ Invalid password");
      return;
    }

    const { data: user } = await supabase
      .from("Directory_Data")
      .select("*")
      .eq("mobile_no", mobile)
      .single();

    if (!user) {
      setMessage("❌ User not found");
      return;
    }

    login(user);
    setMessage("✅ Login successful!");
    setTimeout(() => navigate("/LandingPage"), 1000);
  };

  return (
    <div className="login-container">
      <div className="carousel-section">
        <img
          src={carouselItems[current].img}
          alt="carousel visual"
          className="carousel-image"
        />

        <div className="carousel-text">
          <h4>{carouselItems[current].title}</h4>
          <p>{carouselItems[current].description}</p>
        </div>

        <div className="carousel-indicators">
          {carouselItems.map((_, i) => (
            <span
              key={i}
              className={`dot ${current === i ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </div>

      <div className="form-section">
        {/* Moved Logo here */}
        <img src={LoginPageLogo} alt="Logo" className="form-logo" />

        <h2 className="logo-text">PHONEBOOK</h2>
        <h4>Welcome to Signpost Phonebook</h4>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Your Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-end mb-2">
            <small className="text-muted">Forgot password?</small>
          </div>
          <button className="btn btn-dark w-100">Sign in</button>
        </form>
        <div className="divider">or</div>

        <div className="mt-3 text-center">
          <small>
            New to Phonebook? <a href="/Signup">Create Account</a>
          </small>
        </div>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
