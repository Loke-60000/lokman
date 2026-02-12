"use client";

import React from "react";
import styles from "~/styles/pages/links.module.css";

const SocialMediaLinks = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.socialContainer} ${styles.buttonBig}`}>
        <a
          href="https://github.com/Loke-60000"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-github"></i>
        </a>
      </div>
      <div className={`${styles.socialContainer} ${styles.buttonBig}`}>
        <a
          href="https://www.linkedin.com/in/lokman-ramdani-0a670b20b/?originalSubdomain=fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-linkedin"></i>
        </a>
      </div>
      <div className={`${styles.socialContainer} ${styles.buttonBig}`}>
        <a
          href="https://www.youtube.com/@lokmanPSD/videos"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-youtube"></i>
        </a>
      </div>
      <div className={`${styles.socialContainer} ${styles.buttonBig}`}>
        <a
          href="https://twitter.com/IILokmanII"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-twitter"></i>
        </a>
      </div>
      <div className={`${styles.socialContainer} ${styles.buttonBig}`}>
        <a
          href="https://www.instagram.com/lokman.psd/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};

export default function LinksPage() {
  return <SocialMediaLinks />;
}
