import {  useState } from "react";
import "./Footer.css";

import {
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

// ==========================================
// AXIOS - API READY HONE PAR UNCOMMENT KARNA
// ==========================================

// import axiosInstance from "../../api/axiosInstance";


const defaultFooterData = {
  logo: "https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg",

  brandName: {
    first: "Sahjo",
    second: "Mart",
  },

  hindiTagline: "अब करें घर से ऑनलाइन शॉपिंग",

  description:
    "Shop from your favorite local stores online with SahjoMart. Order in seconds, and enjoy convenient shopping from the comfort of your home.",

  fssai: {
    number: "55667788990011",
    url: "https://foscos.fssai.gov.in/",
  },

  registration: {
    number: "U12345XX2026PTC123456",
    url: "https://www.mca.gov.in/",
  },

  phone: {
    number: "+91 98765 43210",
    value: "+919876543210",
  },

  address: {
    text: "123, Main Road, City",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=123+Main+Road+City",
  },

  copyright:
    "© 2026 SahjoMart.com. All rights reserved.",
};


function Footer() {
  const [footerData, ] = useState(defaultFooterData);

  // ==========================================
  // API KE LIYE LOADING STATE
  // BAAD ME UNCOMMENT KAR SAKTE HO
  // ==========================================

  // const [loading, setLoading] = useState(false);


  // ==========================================
  // AXIOS API CALL
  // BACKEND READY HONE PAR UNCOMMENT KARNA
  // ==========================================

  /*
  useEffect(() => {

    const getFooterData = async () => {

      try {

        setLoading(true);

        const response = await axiosInstance.get("/footer");

        if (response.data?.data) {
          setFooterData(response.data.data);
        }

      } catch (error) {

        console.error(
          "Footer API Error:",
          error.response?.data || error.message
        );

        setFooterData(defaultFooterData);

      } finally {

        setLoading(false);

      }

    };

    getFooterData();

  }, []);
  */


  // ==========================================
  // LOADING UI
  // API START KARNE PAR UNCOMMENT KARNA
  // ==========================================

  /*
  if (loading) {
    return null;
  }
  */


  return (
    <footer id="contact" className="footer">

      <div className="container">

        <div className="footer-grid">


          {/* ===============================
              BRAND
          =============================== */}

          <div className="footer-brand">

            <a
              href="#home"
              className="footer-logo"
              aria-label="Go to home"
            >

              <div className="footer-logo-image">

                <img
                  src={footerData.logo}
                  alt={`${footerData.brandName?.first} ${footerData.brandName?.second} Logo`}
                />

              </div>


              <div className="footer-logo-text">

                <div className="footer-brand-name">

                  <span className="footer-sahjo">
                    {footerData.brandName?.first}
                  </span>

                  <span className="footer-mart">
                    {footerData.brandName?.second}
                  </span>

                </div>


                <span className="footer-hindi-line">
                  {footerData.hindiTagline}
                </span>

              </div>

            </a>


            <p className="footer-description">
              {footerData.description}
            </p>

          </div>



          {/* ===============================
              BUSINESS DETAILS
          =============================== */}

          <div className="footer-col business-details">

            <h4>Business Details</h4>


            <div className="business-info">


              {/* ===============================
                  FSSAI
              =============================== */}

              {footerData.fssai?.number && (

                <div className="business-item">

                  <div className="manual-fssai-logo">

                    <span className="fssai-f">
                      F
                    </span>

                    <span className="fssai-check">
                      ✓
                    </span>

                  </div>


                  <div className="business-text">

                    <strong>
                      FSSAI No:
                    </strong>

                    <a
                      href={footerData.fssai.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {footerData.fssai.number}
                    </a>

                  </div>

                </div>

              )}



              {/* ===============================
                  REGISTRATION
              =============================== */}

              {footerData.registration?.number && (

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

                    <strong>
                      Reg. No:
                    </strong>

                    <a
                      href={footerData.registration.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {footerData.registration.number}
                    </a>

                  </div>

                </div>

              )}



              {/* ===============================
                  PHONE
              =============================== */}

              {footerData.phone?.number && (

                <div className="business-item">

                  <div className="business-icon">
                    <FaPhoneAlt />
                  </div>


                  <div className="business-text">

                    <strong>
                      Phone:
                    </strong>

                    <a
                      href={`tel:${
                        footerData.phone.value ||
                        footerData.phone.number
                      }`}
                    >
                      {footerData.phone.number}
                    </a>

                  </div>

                </div>

              )}



              {/* ===============================
                  ADDRESS
              =============================== */}

              {footerData.address?.text && (

                <div className="business-item">

                  <div className="business-icon">
                    <FaMapMarkerAlt />
                  </div>


                  <div className="business-text">

                    <strong>
                      Address:
                    </strong>

                    <a
                      href={footerData.address.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {footerData.address.text}
                    </a>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>



        {/* ===============================
            FOOTER BOTTOM
        =============================== */}

        <div className="footer-bottom">

          <span>
            {footerData.copyright}
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;