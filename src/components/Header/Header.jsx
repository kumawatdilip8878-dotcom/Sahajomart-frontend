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
 < img  className="ahjo" src='https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg' border='0' alt='img-2-1784471233954-jpg'/>        </div>

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