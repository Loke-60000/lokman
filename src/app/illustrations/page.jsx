"use client";

import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "~/lib/firebase-config";
import styles from "~/styles/pages/irasuto.module.css";

const Irasuto = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchUrls().then(setImages);
  }, []);

  const fetchUrls = async () => {
    try {
      const urlsRef = collection(db, "urls");
      const urlsSnapshot = await getDocs(urlsRef);
      return urlsSnapshot.docs.map((doc) => doc.data().url);
    } catch (error) {
      console.error("Error fetching URLs:", error);
      return [];
    }
  };

  return (
    <div className={styles.container}>
      <Table images={images} />
    </div>
  );
};

const Table = ({ images }) => {
  return (
    <table className={styles.imageTable}>
      <thead>
        <tr>
          <th className={styles.tableHeader}>
            <span className="ColoredLetter">D</span>rawing and{" "}
            <span className="ColoredLetter">P</span>ictures
          </th>
        </tr>
      </thead>
      <tbody>
        {images.map((image, id) => (
          <tr key={id}>
            <td className={styles.imageCell}>
              <a href={image} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.image}
                  src={image}
                  alt={`Image ${id + 1}`}
                />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function IrasutoPage() {
  return <Irasuto />;
}
