import { useEffect, useState } from "react";
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

  // ✅ Sirf "Stores" rakha hai
  const menuItems = [
    ["Stores", "#stores"],
  ];

  return (
    <header>
      <div className="container nav">
        {/* Logo Section */}
        <a href="#home" className="logo" onClick={closeMenu}>
          <div className="logo-mark">
            <img 
              className="ahjo" 
              src='https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg' 
              border='0' 
              alt='Sahjo Mart Logo'
            />     
          </div>
          <div className="logo-text">
            <span style={{fontSize:"25px"}}>Sahjo Mart</span>
          </div>
        </a>

        {/* ✅ Online Shopping Text - Hindi */}
        <div className="online-shopping-text">
         अब करें घर से  ऑनलाइन शॉपिंग
        </div>

        {/* Desktop Navigation - Sirf Stores */}
        <nav className="nav-menu">

        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions">
          {/* ✅ Order on WhatsApp Button */}
          <a 
            href="https://wa.me/your-number" 
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            📱 Order on WhatsApp
          </a>

          {/* ✅ Call Button */}
          <a 
            href="tel:+919876543210" 
            className="btn btn-call"
          >
            📞  Order on Call
          </a>

          <a href="/customer-login" className="btn btn-outline">
            Customer Login
          </a>
          <a href="/store-login" className="btn btn-primary">
            Store Login
          </a>
          <button
            className="mobile-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Sirf Stores */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        {menuItems.map(([name, link]) => (
          <a href={link} key={name} onClick={closeMenu}>
            {name}
          </a>
        ))}
        
        {/* ✅ Mobile Menu - Online Shopping Text */}
        <div className="mobile-online-text">
          ऑनलाइन शॉपिंग
        </div>

        <div className="mobile-login-actions">
          {/* ✅ Mobile - Order on WhatsApp */}
          <a 
            href="https://wa.me/your-number" 
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            📱 Order on WhatsApp
          </a>

          {/* ✅ Mobile - Call Button */}
          <a 
            href="tel:+919876543210" 
            className="btn btn-call"
            onClick={closeMenu}
          >
            📞 Call
          </a>

          <a href="/customer-login" className="btn btn-outline" onClick={closeMenu}>
            Customer Login
          </a>
          <a href="/store-login" className="btn btn-primary" onClick={closeMenu}>
            Store Login
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;