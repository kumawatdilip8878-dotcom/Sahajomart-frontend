import "./Footer.css";

function Footer() {
  return (
    <footer id="contact">
      <div className="container">

        <div className="footer-grid">

          {/* =====================================
              BRAND
          ===================================== */}

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
                <span className="footer-sahjo">
                  Sahjo
                </span>

                <span className="footer-mart">
                  Mart
                </span>
              </div>
            </a>


            <p className="footer-description">
              Shop from your favorite local stores online
              with SahjoMart. Find products near you,
              order in seconds, and let store owners
              handle the rest with our integrated POS
              system.
            </p>

          </div>


          {/* =====================================
              BUSINESS DETAILS
          ===================================== */}

          <div className="footer-col business-details">

            <h4>
              Business Details
            </h4>

            <div className="business-info">

              <p>
                <strong>
                  FSSAI No:
                </strong>{" "}
                55667788990011
              </p>


              <p>
                <strong>
                  Reg. No:
                </strong>{" "}
                U12345XX2026PTC123456
              </p>


              <p>
                <strong>
                  Phone:
                </strong>{" "}

                <a href="tel:+919876543210">
                  +91 98765 43210
                </a>
              </p>


              <p>
                <strong>
                  Address:
                </strong>{" "}
                123, Main Road, City
              </p>

            </div>

          </div>

        </div>


        {/* =====================================
            FOOTER BOTTOM
        ===================================== */}

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