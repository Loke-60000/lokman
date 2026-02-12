"use client";

import React, { useEffect } from "react";

const switchAudio = "/audio_switch_effect.mp3";

const PowerSwitch = ({ isScanlinesActive, toggleScanlines }) => {
  useEffect(() => {
    const snd = new Audio(switchAudio);
    const handler = (e) => {
      if (e.target.parentNode?.className?.indexOf("checkboxControl") !== -1) {
        snd.currentTime = 0;
        snd.play();
      }
    };
    document.addEventListener("change", handler);
    return () => document.removeEventListener("change", handler);
  }, []);

  return (
    <div className="centerContainer">
      <div className="contentWrapper">
        <div className="checkboxGroup">
          <label className="checkboxControl">
            <input
              type="checkbox"
              checked={isScanlinesActive}
              onChange={toggleScanlines}
            />
            <div>ΟΙ</div>
            <b></b>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PowerSwitch;
