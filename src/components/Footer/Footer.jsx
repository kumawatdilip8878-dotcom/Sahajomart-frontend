import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer id="contact">
      <div className="container">

        <div className="footer-grid">

          <div className="footer-brand">

            <a href="#home" className="logo">
              
              <div className="logo-mark">
                 < img className="foots" src='https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg' border='0' alt='img-2-1784471233954-jpg'/>     

              </div>

              <div
                className="logo-text"
                style={{ color: "#fff" }}
              >
                <span> Sahjo   Mart</span>
              </div>
            </a>

            <p>
              SahjoMart connects customers with nearby
              stores through a simple online experience
              while primary store operations are managed
              through the POS system.
            </p>

            <div className="socials">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                FB
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                IG
              </a>

              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noreferrer"
              >
                YT
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>

            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#offers">Offers</a>
            <a href="#videos">Videos</a>
            <a href="#stores">Stores</a>
          </div>

          <div className="footer-col">
            <h4>Login</h4>

            <Link to="/customer-login">
              Customer Login
            </Link>

            <Link to="/store-login">
              Store / POS Login
            </Link>
          </div>

          <div className="footer-col">
            <h4>Business Details</h4>

            <p>
              FSSAI No: XXXXXXXXXXXXXX
            </p>

            <p>
              Reg. No: XXXXXXXXXX
            </p>

            <p>
              Phone: +91 98765 43210
            </p>

            <p>
              Address: Your Business Address
            </p>
          </div>

        </div>

        <div className="footer-bottom">
          <span>
            © 2026 SahajoMart.com. All rights reserved.
          </span>

          <span>
            Nearby shopping made simple.
          </span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;