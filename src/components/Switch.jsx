// components/PowerSwitch.js
import React, { useEffect } from 'react';
import switchAudio from '../assets/sounds/audio_switch_effect.mp3';

const PowerSwitch = ({ isScanlinesActive, toggleScanlines }) => {
  useEffect(() => {
    const snd = new Audio(switchAudio);
    document.addEventListener('change', (e) => {
      if (e.target.parentNode.className.indexOf('checkboxControl') !== -1) {
        snd.currentTime = 0;
        snd.play();
      }
    });
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
