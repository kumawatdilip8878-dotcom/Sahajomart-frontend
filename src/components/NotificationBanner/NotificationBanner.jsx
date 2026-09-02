import "./NotificationBanner.css";

const NotificationBanner = () => {
  const notifications = [
    {
      text: "🔥 Today's sahjoMart special offers are now live",
      link: "#offers",
    },
    {
      text: "📍 New sahjoMart store now available in Jaipur",
      link: "#stores",
    },
    {
      text: "🎬 Watch our latest promotional videos and offers",
      link: "#videos",
    },
    {
      text: "🛒 अब करें घर से ही आसान ऑनलाइन शॉपिंग",
      link: "#categories",
    },
    {
      text: "🎁 Special gifts and benefits available on selected products",
      link: "#offers",
    },
  ];

  const items = [...notifications, ...notifications];

  return (
    <div className="notification-banner">
      <div className="notification-track">
        {items.map((item, index) => (
          <a
            href={item.link}
            key={`${item.text}-${index}`}
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NotificationBanner;