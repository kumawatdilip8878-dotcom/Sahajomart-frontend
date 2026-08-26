import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StoreLogin.css";

function StoreLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Store Login:", form);

    alert("Store/POS login API yahan connect karein.");
  };

  return (
    <div className="store-login-page">
      <div className="store-login-card">
        <Link to="/" className="back-home">
          ← Back to SahajoMart
        </Link>

        <div className="auth-logo">
          <div  style={{width:"55px"}} className="logo-mark">
             < img  className="ahjo" src='https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg' border='0' alt='img-2-1784471233954-jpg'/>   

          </div>

          <div style={{fontSize:"30px",marginTop:"0px",marginLeft:"10px"}} className="logo-text">
            <span>Sahjo Mart</span>
          </div>
        </div>

        <span className="store-kicker">POS ACCESS</span>

        <h1>Store Login</h1>

        <p>Login to access store POS, billing and inventory management.</p>

        <form onSubmit={handleSubmit}>
          <label>Store Mobile / Username</label>

          <input
            type="text"
            name="mobile"
            placeholder="Enter mobile or username"
            value={form.mobile}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary auth-submit">
            Store Login
          </button>
        </form>

        <button className="home-button" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default StoreLogin;
