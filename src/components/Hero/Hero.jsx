import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">

      <div className="container">

        <div className="hero-card">

          <div className="hero-content">

            <span className="eyebrow">
              🛍️ YOUR NEARBY STORE, NOW ONLINE
            </span>

            <h1>
              Everyday shopping,
              <span>made easier.</span>
            </h1>

            <p className="hero-subtitle">
              Explore products and offers from your nearby
              SahajoMart store. Browse category-wise images
              and connect directly with the store for simple
              and convenient shopping.
            </p>

            <p className="hero-hindi">
              अब करें घर से ही ऑनलाइन शॉपिंग
            </p>

            <div className="hero-actions">

              {/* <a
                href="#categories"
                className="btn btn-primary"
              >
                Explore Categories →
              </a> */}

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                WhatsApp Order
              </a>

              <a style={{width:"150px"}}
                href="tel:+919876543210"
                className="btn btn-outline"
              >
                Call Store
              </a>

            </div>

            <div className="hero-features">

              <span>✓ Nearby Stores</span>

              {/* <span>✓ Hindi & English</span> */}

              <span>✓ Offers & Promotions</span>

              <span>✓ Direct Store Access</span>

            </div>

          </div>

          <div className="hero-image-wrap">

            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1300&q=85"
              alt="SahajoMart Store"
            />

            <div className="floating-card">

              <strong>
                Your Local Store
              </strong>

              <span>
                now available online
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;