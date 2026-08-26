import React from 'react';

export const videos = [
  {
    label: "Promotion",
    title: "SahajoMart Special Offers",
    description:
      "Watch the latest SahajoMart promotional video and visit the associated offer page using the link below.",
    video: "https://media.gettyimages.com/id/483716927/video/fruit-and-vegetable-section-of-a-supermarket.mp4?s=mp4-640x640-gi&k=20&c=jckrFhUhSTIG8qGWYV7KR3seKptpqnbhQhtvb1A2b3w=",
    poster:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85",
    link: "https://example.com/offer",
    linkText: "View Associated Link",
  },
  {
    label: "Store Update",
    title: "Visit Your Nearby SahajoMart",
    description:
      "Promotional or informational videos can be linked directly to a particular store, location or campaign.",
    video: "https://media.gettyimages.com/id/456582358/video/supermarket.mp4?s=mp4-640x640-gi&k=20&c=hE-AKe4GXXbwClS-V1QpK78rkDYrmhNAZMDOstEATyY=",
    poster:
      "https://images.unsplash.com/photo-1601599561213-832382fd07ba?auto=format&fit=crop&w=1200&q=85",
    link: "https://example.com/nearest-store",
    linkText: "Find Store",
  },
];

function App() {
  return (
    <div style={{ 
      maxWidth: "1200px", 
      margin: "0 auto", 
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        SahajoMart Videos
      </h1>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "30px"
      }}>
        {videos.map((video, index) => (
          <div key={index} style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "20px"
          }}>
            {/* Video Player */}
            <div style={{ marginBottom: "15px" }}>
              <video
                src={video.video}
                poster={video.poster}
                controls
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  maxWidth: "600px"
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Info */}
            <div>
              <span style={{
                display: "inline-block",
                background: "#ff6b35",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "10px"
              }}>
                {video.label}
              </span>
              
              <h3 style={{ margin: "10px 0", color: "#1a1a1a" }}>
                {video.title}
              </h3>
              
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                {video.description}
              </p>
              
              <a
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "12px",
                  padding: "10px 20px",
                  background: "#007bff",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "6px",
                  transition: "background 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.background = "#0056b3"}
                onMouseLeave={(e) => e.target.style.background = "#007bff"}
              >
                {video.linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;