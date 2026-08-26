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
                <img className="foots" src='https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg' border='0' alt='img-2-1784471233954-jpg'/>     
              </div>
              <div className="logo-text" style={{ color: "#fff" }}>
                <span>Sahjo Mart</span>
              </div>
            </a>

            <p style={{fontSize:"13px", lineHeight:"1.5", maxWidth:"320px"}}>
              Shop from your favorite local stores online with SahjoMart. 
              Find products near you, order in seconds, and let store owners 
              handle the rest with our integrated POS system.
            </p>

            {/* <div className="socials">
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">FB</a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">IG</a>
              <a href="https://youtube.com/" target="_blank" rel="noreferrer">YT</a>
              <a href="https://x.com/" target="_blank" rel="noreferrer">X</a>
            </div> */}
          </div>

          {/* 
          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#offers">Offers</a>
            <a href="#videos">Videos</a>
            <a href="#stores">Stores</a>
          </div> */}

          <div className="footer-col">
            <h4 style={{fontSize:"16px", marginTop:"10px"}}>Login</h4>
            <div style={{marginTop:"15px"}}>
              <Link style={{fontSize:"13px"}} to="/customer-login">
                Customer Login
              </Link>
              <Link style={{fontSize:"13px"}} to="/store-login">
                Store / POS Login
              </Link>
            </div>
          </div>

          <div className="footer-col">
            <h4 style={{fontSize:"16px", marginTop:"10px"}}>Business Details</h4>
            <div style={{marginTop:"15px"}}>
              <p style={{fontSize:"12px"}}>FSSAI No: 55667788990011</p>
    <p style={{fontSize:"12px"}}>Reg. No: U12345XX2026PTC123456</p>
    <p style={{fontSize:"12px"}}>Phone: +91 98765 43210</p>
    <p style={{fontSize:"12px"}}>Address: 123, Main Road, City</p>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2026 SahjoMart.com. All rights reserved.</span>
          <span>Nearby shopping made simple.</span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;