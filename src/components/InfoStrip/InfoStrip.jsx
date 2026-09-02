import "./InfoStrip.css";

import {
  FaPhoneAlt,
  FaBuilding,
} from "react-icons/fa";

import {
  MdVerified,
} from "react-icons/md";

function InfoStrip() {
  const details = [
    {
      label: "Contact",
      value: "+91 98765 43210",
      type: "contact",
      link: "tel:+919876543210",
    },

    {
      label: "FSSAI No.",
      value: "55667788990011",
      type: "fssai",
    },

    {
      label: "Registration No.",
      value: "U12345XX2026PTC123456",
      type: "registration",
    },

    // {
    //   label: "Service",
    //   value: "Easy Shopping from Your Nearest Sahjo Mart",
    //   type: "service",
    // },
  ];

  const renderLogo = (type) => {
    switch (type) {
      case "contact":
        return (
          <div className="info-logo contact-logo">
            <FaPhoneAlt />
          </div>
        );

      case "fssai":
        return (
          <div className="info-logo fssai-logo">
            <MdVerified />
          </div>
        );

      case "registration":
        return (
          <div className="info-logo registration-logo">
            <FaBuilding />
          </div>
        );

      // case "service":
      //   return (
      //     <div className="info-logo sahjo-logo">
      //       <img
      //         src="https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg"
      //         alt="Sahjo Mart"
      //       />
      //     </div>
      //   );

      default:
        return null;
    }
  };

  return (
    <section className="info-strip">
      <div className="container">

        <div className="info-grid">

          {details.map((item) => {
            const cardContent = (
              <>
                <div className="info-card-top">

                  {renderLogo(item.type)}

                  <span className="info-label">
                    {item.label}
                  </span>

                </div>

                <strong>
                  {item.value}
                </strong>
              </>
            );

            return item.link ? (
              <a
                href={item.link}
                className="info-card info-card-link"
                key={item.label}
                aria-label={`Call ${item.value}`}
              >
                {cardContent}
              </a>
            ) : (
              <div
                className="info-card"
                key={item.label}
              >
                {cardContent}
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default InfoStrip;