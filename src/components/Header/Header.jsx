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

  const menuItems = [
    ["Home", "#home"],
    ["Categories", "#categories"],
    ["Offers", "#offers"],
    ["Videos", "#videos"],
    ["Stores", "#stores"],
    ["Contact", "#contact"],
  ];

  return (
    <header>

      <div className="container nav">

        <a
          href="#home"
          className="logo"
          
          onClick={closeMenu}
          
        >
          <div className="logo-mark">
           <img src="https://images.jdmagicbox.com/v2/comp/jaipur/s3/0141px141.x141.240614085559.f5s3/catalogue/sahjo-freight-carrier-vishwakarma-industrial-area-jaipur-transporters-zaxrmu4nyu.jpg" alt="" />
          </div>

          <div className="logo-text">
            Sahajo<span>Mart</span>
          </div>
        </a>

        <nav className="nav-menu">
          {menuItems.map(([name, link]) => (
            <a
              href={link}
              key={name}
            >
              {name}
            </a>
          ))}
        </nav>

        <div className="nav-actions">

          <a
            href="/customer-login"
            className="btn btn-outline"
          >
            Customer Login
          </a>

          <a
            href="/store-login"
            className="btn btn-primary"
          >
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

      <div
        className={`mobile-menu ${
          menuOpen ? "active" : ""
        }`}
      >

        {menuItems.map(([name, link]) => (
          <a
            href={link}
            key={name}
            onClick={closeMenu}
          >
            {name}
          </a>
        ))}

        <div className="mobile-login-actions">

          <a
            href="/customer-login"
            className="btn btn-outline"
            onClick={closeMenu}
          >
            Customer Login
          </a>

          <a
            href="/store-login"
            className="btn btn-primary"
            onClick={closeMenu}
          >
            Store Login
          </a>

        </div>

      </div>

    </header>
  );
};

export default Header;