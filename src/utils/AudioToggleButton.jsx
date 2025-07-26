import { useEffect, useRef, useState } from "react";
import "./AudioToggleButton.css"; // move the CSS to a separate file

const AudioToggleButton = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((e) => {
          // Most browsers require user interaction before playing audio
          console.warn("Autoplay failed:", e);
          setIsPlaying(false);
        });
    }
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        autoPlay
        preload="auto"
      />

      {/* Button */}
      <button className="audio-toggle-btn" onClick={toggleSound}>
        <span>Sound</span>
        <span className={`sound-bars ${isPlaying ? "playing" : ""}`}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </span>
      </button>
    </>
  );
};

export default AudioToggleButton;
