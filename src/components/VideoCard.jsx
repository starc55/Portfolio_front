import React, { useRef, useState } from "react";
import "../pages/Page.css";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const VideoCard = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="video-wrapper">
      <video
        ref={videoRef}
        className="video-card"
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      />

      <div className="video-controls">
        <button className="video-btn" onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button className="video-btn" onClick={toggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
