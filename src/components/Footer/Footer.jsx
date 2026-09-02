import "./Footer.css";

import {
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">

        <div className="footer-grid">

          {/* BRAND */}
          <div className="footer-brand">

            <a
              href="#home"
              className="footer-logo"
              aria-label="Go to home"
            >
              <div className="footer-logo-image">
                <img
                  src="https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg"
                  alt="Sahjo Mart Logo"
                />
              </div>

             <div className="footer-logo-text">
  <div className="footer-brand-name">
    <span className="footer-sahjo">Sahjo</span>
    <span className="footer-mart">Mart</span>
  </div>

  <span className="footer-hindi-line">
    अब करें घर से ऑनलाइन शॉपिंग
  </span>
</div>
              
            </a>

            <p className="footer-description">
              Shop from your favorite local stores online with SahjoMart.
              Find products near you, order in seconds, and enjoy convenient
              shopping from the comfort of your home.
            </p>

          </div>


          {/* BUSINESS DETAILS */}
          <div className="footer-col business-details">

            <h4>Business Details</h4>

            <div className="business-info">

              {/* FSSAI */}
              <div className="business-item">

                <div className="manual-fssai-logo">
                  <span className="fssai-f">F</span>
                  <span className="fssai-check">✓</span>
                </div>

                <div className="business-text">
                  <strong>FSSAI No:</strong>

                  <a
                    href="https://foscos.fssai.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    55667788990011
                  </a>
                </div>

              </div>


              {/* REGISTRATION */}
              <div className="business-item">

                <div className="manual-register-logo">
                  <span className="register-roof"></span>

                  <div className="register-columns">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <span className="register-base"></span>
                </div>

                <div className="business-text">
                  <strong>Reg. No:</strong>

                  <a
                    href="https://www.mca.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    U12345XX2026PTC123456
                  </a>
                </div>

              </div>


              {/* PHONE */}
              <div className="business-item">

                <div className="business-icon">
                  <FaPhoneAlt />
                </div>

                <div className="business-text">
                  <strong>Phone:</strong>

                  <a href="tel:+919876543210">
                    +91 98765 43210
                  </a>
                </div>

              </div>


              {/* ADDRESS */}
              <div className="business-item">

                <div className="business-icon">
                  <FaMapMarkerAlt />
                </div>

                <div className="business-text">
                  <strong>Address:</strong>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=123+Main+Road+City"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    123, Main Road, City
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 SahjoMart.com. All rights reserved.
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