import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const VideoPlayer = ({ videoId }) => {
  const videoRef = useRef(null);
  const [VideoUrl, setVideoUrl] = useState("");

  useEffect(() => {}, [videoId]);

  return (
    <div>
      <video
        className="aspect-auto object-contain h-[80vh] w-[100vw]"
        id="videoPlayer"
        controls
        autoPlay
      >
        <source
          autoPlay
          src={`https://stream-test-isdf.onrender.com/video/${videoId}`}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default VideoPlayer;
