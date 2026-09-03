import {
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

import "./Header.css";

const Header = () => {
  const whatsappNumber = "919876543210";

  const whatsappLink =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hello Sahjo Mart, I want to place an order."
    )}`;

  return (
    <header className="site-header">

      <div className="header-container nav">

        {/* ==========================================
            LOGO
        ========================================== */}

        <a
          href="#home"
          className="logo"
        >
          <div className="header-logo-image">
            <img
              className="sahjo-logo-img"
              src="https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg"
              alt="Sahjo Mart Logo"
            />
          </div>


          {/* BRAND */}

          <div className="brand-copy">

            <div className="logo-text">

              <span className="sahjo-text">
                SAHJO
              </span>

              <span className="mart-text">
                Mart
              </span>

            </div>


            <div className="shopping-tagline">
              अब करें घर से ऑनलाइन शॉपिंग
            </div>

          </div>

        </a>


        {/* ==========================================
            DESKTOP ACTIONS
        ========================================== */}

        <div className="nav-actions">

          {/* DESKTOP WHATSAPP */}

          <a
            href={whatsappLink}
            className="btn btn-whatsapp desktop-action"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="action-icon whatsapp-icon" />

            <span>
              Order on WhatsApp
            </span>
          </a>


          {/* DESKTOP CALL */}

          <a
            href="tel:+919876543210"
            className="btn btn-call desktop-action"
          >
            <FaPhoneAlt className="action-icon phone-icon" />

            <span>
              Order on Call
            </span>
          </a>


          {/* ========================================
              PHONE WHATSAPP BUTTON

              ☰ / 3 DOT KI JAGAH YE DIKHEGA
          ======================================== */}

          <a
            href={whatsappLink}
            className="mobile-whatsapp-order"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on WhatsApp"
          >

            <div className="mobile-whatsapp-text">

              <span className="mobile-order-hindi">
                अभी ऑर्डर करें
              </span>

              <span className="mobile-order-whatsapp">
                WhatsApp पर
              </span>

            </div>


            <FaWhatsapp
              className="mobile-whatsapp-icon"
            />

          </a>

        </div>

      </div>

    </header>
  );
};

export default Header;