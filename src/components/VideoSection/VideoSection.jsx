import React from "react";
import { videos } from "../../data/videos";
import "./VideoSection.css";

function VideoSection() {
  return (
    <section className="section" id="videos">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">
              Watch
            </span>

            <h2>Latest Videos & Promotions</h2>

            <p>
              Every video can have its own associated link.
              Use the link for an offer page, product,
              YouTube video, social media page or external URL.
            </p>
          </div>
        </div>

        <div className="video-grid">
          {videos.map((video) => (
            <article
              className="video-card"
              key={video.title}
            >
              <div className="video-wrapper">
                <video
                  controls
                  preload="metadata"
                  poster={video.poster}
                >
                  <source
                    src={video.video}
                    type="video/mp4"
                  />

                  Your browser does not support video playback.
                </video>
              </div>

              <div className="video-content">
                <span className="video-label">
                  {video.label}
                </span>

                <h3>{video.title}</h3>

                <p>{video.description}</p>

                <a
                  className="video-link"
                  href={video.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {video.linkText}
                  <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideoSection;