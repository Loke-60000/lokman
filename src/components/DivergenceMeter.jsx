"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "~/styles/components/divergence-meter.module.css";

function Divergencemeter() {
  const [time, setTime] = useState(() => new Date(0));
  const animationFrameId = useRef();

  const updateClock = () => {
    setTime(new Date());
    animationFrameId.current = requestAnimationFrame(updateClock);
  };

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  const formattedTime = [
    time.getHours().toString().padStart(2, "0"),
    time.getMinutes().toString().padStart(2, "0"),
    time.getSeconds().toString().padStart(2, "0"),
    time.getMilliseconds().toString().padStart(3, "0"),
  ];

  const decorativeNumbers = "0";
  const decorativeNumbersLayer2 = "0";

  return (
    <div className={styles.wrapper}>
      <div className={styles.mesh}></div>
      <div className={styles.value}>
        {formattedTime.map((segment, index) => (
          <React.Fragment key={index}>
            {segment.split("").map((digit, digitIndex) => (
              <span key={digitIndex} className={styles.digitContainer}>
                <span className={styles.decorativeNumber}>
                  {decorativeNumbers[digitIndex % decorativeNumbers.length]}
                </span>
                <span className={styles.decorativeNumberLayer2}>
                  {
                    decorativeNumbersLayer2[
                      digitIndex % decorativeNumbersLayer2.length
                    ]
                  }
                </span>
                <span className={styles.digit} suppressHydrationWarning>
                  {digit}
                </span>
                <span
                  className={styles.numberBackground}
                  style={{
                    backgroundImage: `url(/images/divergence_meter_tube.webp)`,
                  }}
                ></span>
              </span>
            ))}
            {index < formattedTime.length - 1 && (
              <span className={styles.digitContainer}>
                <span className={styles.decorativeNumber}>
                  {decorativeNumbers[0]}
                </span>
                <span className={styles.decorativeNumberLayer2}>
                  {decorativeNumbersLayer2[0]}
                </span>
                <span className={styles.dot} suppressHydrationWarning>
                  .
                </span>
                <span
                  className={styles.numberBackground}
                  style={{
                    backgroundImage: `url(/images/divergence_meter_tube.webp)`,
                  }}
                ></span>
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Divergencemeter;
