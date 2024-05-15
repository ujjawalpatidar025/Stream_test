import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

function App() {
  const [videoId, setVideoId] = useState("first");
  const [key, setKey] = useState(0); // Key to force re-render

  function playVideo(e, id) {
    e.preventDefault();
    setVideoId(id);
    setKey((prevKey) => prevKey + 1); // Increment the key to force re-render
  }

  return (
    <div className="App">
      <button
        className="bg-green-500 px-3 py-2 mx-2 "
        onClick={(e) => {
          playVideo(e, "forward");
        }}
      >
        play next video
      </button>
      <button
        className="bg-green-500 px-3 py-2 mx-2"
        onClick={(e) => {
          playVideo(e, "backward");
        }}
      >
        play previous video
      </button>
      <VideoPlayer key={key} videoId={videoId} /> {/* Use the key prop here */}
    </div>
  );
}

export default App;
