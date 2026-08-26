import "./InfoStrip.css";

function InfoStrip() {
  const details = [
    {
      label: "Contact",
      value: "+91 98765 43210",
    },
    {
      label: "FSSAI No.",
      value: "55667788990011",
    },
    {
      label: "Registration No.",
      value: "U12345XX2026PTC123456",
    },
    {
      label: "Service",
      value:
"अपने पास के SahjoMart से शॉपिंग करें",
    },
  ];

  return (
    <section className="info-strip">
      <div className="container">
        <div className="info-grid">
          {details.map((item) => (
            <div
              className="info-card"
              key={item.label}
            >
              <span>{item.label}</span>

              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoStrip;