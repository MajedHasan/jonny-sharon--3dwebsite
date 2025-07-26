import React from "react";
import AudioToggleButton from "../utils/AudioToggleButton";

const Header = () => {
  return (
    <section
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        padding: "10px",
        zIndex: 99,
      }}
    >
      <div>
        <AudioToggleButton />
      </div>
      <div>
        <img
          src="/images/3dwebsite_logo.webp"
          alt=""
          style={{ width: "80px" }}
        />
      </div>
    </section>
  );
};

export default Header;
