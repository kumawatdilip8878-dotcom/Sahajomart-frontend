import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function CustomerLogin() {
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

    console.log("Customer Login:", form);

    alert("Customer login API yahan connect karein.");
  };

  return (
    <div className="login-page">
      <div className="login-page-card">

        <Link to="/" className="back-home">
          ← Back to SahajoMart
        </Link>

        <div className="auth-logo">
          <div className="logo-mark">S</div>

          <div className="logo-text">
            Sahajo<span>Mart</span>
          </div>
        </div>

        <span className="section-kicker">
          Customer
        </span>

        <h1>Customer Login</h1>

        <p>
          Login to access your SahajoMart customer account.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Mobile Number</label>

          <input
            type="tel"
            name="mobile"
            placeholder="Enter mobile number"
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

          <button
            type="submit"
            className="btn btn-primary auth-submit"
          >
            Login
          </button>
        </form>

        <button
          className="home-button"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>

      </div>
    </div>
  );
}

export default CustomerLogin;