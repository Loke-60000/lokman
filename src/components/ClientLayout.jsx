"use client";

import React, { useState, useEffect } from "react";
import MainNavbar from "~/components/NavBar";
import Divergencemeter from "~/components/DivergenceMeter";
import { LanguageProvider } from "~/components/LanguageToggle";
import PowerSwitch from "~/components/Switch";

import "bootstrap/dist/css/bootstrap.min.css";
import "~/styles/post-process/scanlines.scss";
import "~/styles/post-process/retro.css";
import "~/styles/components/navbar.css";
import "~/styles/components/switch.css";

export default function ClientLayout({ children }) {
  const [isScanlinesActive, setIsScanlinesActive] = useState(true);

  useEffect(() => {
    const scanlinesEnabled = localStorage.getItem("scanlinesEnabled");
    if (scanlinesEnabled === "true") {
      setIsScanlinesActive(true);
    } else if (scanlinesEnabled === "false") {
      setIsScanlinesActive(false);
    }
  }, []);

  const toggleScanlines = () => {
    setIsScanlinesActive(!isScanlinesActive);
    localStorage.setItem("scanlinesEnabled", String(!isScanlinesActive));
  };

  return (
    <div className="App">
      {/* Film grain overlay — fine fractal noise, stretched to fill viewport */}
      <svg
        className="grain-overlay"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <div
        className={`scanlines ${isScanlinesActive ? "" : "scanlines-inactive"}`}
      >
        <LanguageProvider>
          <div className="logocontainer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/lokmandevlogo.webp"
              className="lokmanlogo"
              alt=""
              width={1000}
              height={549}
              fetchPriority="high"
            />
          </div>
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <td>
                    <MainNavbar />
                  </td>
                </tr>
                <tr>
                  <td className="main_content">{children}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </LanguageProvider>
        <div className="adcontainer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/braunstoreAdRemake.webp"
            className="braunad"
            alt=""
            width={1500}
            height={375}
            loading="lazy"
          />
        </div>
        <div className="retro-mode-toggle">
          <PowerSwitch
            isScanlinesActive={isScanlinesActive}
            toggleScanlines={toggleScanlines}
          />
        </div>
        <div className="copyrights">
          <p>2023 Lokman RAMDANI</p>
        </div>
        <div className="nixie_clock">
          <Divergencemeter />
        </div>
      </div>
    </div>
  );
}
