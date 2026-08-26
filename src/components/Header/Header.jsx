import { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <header className="site-header">

      <div className="header-container nav">

        {/* ========================================
            LOGO
        ======================================== */}
        <a
          href="#home"
          className="logo"
          onClick={closeMenu}
        >
          <div className="logo-mark">
            <img
              className="ahjo"
              src="https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg"
              alt="Sahjo Mart Logo"
            />
          </div>

          <div className="logo-text">
            <span style={{fontSize:"20px"}}>Sahjo Mart</span>
          </div>
        </a>


        {/* ========================================
            ONLINE SHOPPING TEXT
        ======================================== */}
        <div style={{marginLeft:"50px",gap:"10px"}} className="online-shopping-text">
          अब करें घर से ऑनलाइन शॉपिंग
        </div>


        {/* ========================================
            DESKTOP ACTIONS
        ======================================== */}
        <div className="nav-actions">

          {/* WhatsApp */}
          <a
            href="https://wa.me/919876543210"
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="action-icon whatsapp-icon" />
            <span>Order on WhatsApp</span>
          </a>


          {/* Call */}
          <a
            href="tel:+919876543210"
            className="btn btn-call"
          >
            <FaPhoneAlt className="action-icon phone-icon" />
            <span>Order on Call</span>
          </a>


          {/* Customer Login */}
          <a
            href="/customer-login"
            className="btn btn-outline"
          >
            Customer Login
          </a>


          {/* Store Login */}
          <a
            href="/store-login"
            className="btn btn-primary"
          >
            Store Login
          </a>


          {/* Mobile Menu */}
          <button
            className="mobile-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            type="button"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

      </div>


      {/* ==========================================
          MOBILE MENU
      ========================================== */}
      <div
        className={`mobile-menu ${
          menuOpen ? "active" : ""
        }`}
      >

        {/* WhatsApp */}
        <a
          href="https://wa.me/919876543210"
          className="btn btn-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          <FaWhatsapp className="action-icon whatsapp-icon" />
          <span>Order on WhatsApp</span>
        </a>


        {/* Call */}
        <a
          href="tel:+919876543210"
          className="btn btn-call"
          onClick={closeMenu}
        >
          <FaPhoneAlt className="action-icon phone-icon" />
          <span>Order on Call</span>
        </a>


        {/* Customer Login */}
        <a
          href="/customer-login"
          className="btn btn-outline"
          onClick={closeMenu}
        >
          Customer Login
        </a>


        {/* Store Login */}
        <a
          href="/store-login"
          className="btn btn-primary"
          onClick={closeMenu}
        >
          Store Login
        </a>

      </div>

    </header>
  );
};

export default Header;