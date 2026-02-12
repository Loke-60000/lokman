"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CarouselComponent from "~/components/Carousel";
import "~/styles/pages/introduction.css";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "~/lib/firebase-config";
import { useLanguage } from "~/components/LanguageToggle";

const Introduction = () => {
  const [lastTenPosts, setLastTenPosts] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchLastTenPosts = async () => {
      const postQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(10),
      );
      const postSnapshot = await getDocs(postQuery);
      const posts = postSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLastTenPosts(posts);
    };

    fetchLastTenPosts();
  }, []);

  const carouselImages = [
    {
      src: "/images/WEBSITE_Gadgetlab_website.webp",
      alt: "Get a website!",
      caption: "",
      link: "https://www.fiverr.com/s/w5EEmr",
    },
    {
      src: "/images/WEBSITE_bannerr_contactme_1.webp",
      alt: "Contact me for more informations!",
      caption: "",
      link: "/contact",
    },
    {
      src: "/images/atchan_banner.webp",
      alt: "Atto Channel soon available",
      caption: "",
      link: "https://github.com/Loke-60000/Atto-channel",
    },
  ];

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge("2001-11-21");

  const isNewPost = (postDate) => {
    const currentDate = new Date();
    const postCreationDate = new Date(postDate);
    const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
    return currentDate - postCreationDate < oneMonthInMilliseconds;
  };

  return (
    <div>
      <CarouselComponent images={carouselImages} />
      <hr />
      <div className="bio-container">
        <h2>
          <span className="ColoredLetter">A</span>bout Me
        </h2>
        <p>
          Thank you for visiting my personal website! My name is Lokman, and
          I&apos;m a {age} year-old web developer who&apos;s passionate about
          the digital world. After studying the Japanese language abroad, I made
          the decision to focus on the field of development and computer science
          in general. Everyday I learn more and more, and I&apos;m always
          looking for new challenges to overcome.
        </p>
        <h2>
          <span className="ColoredLetter">E</span>ducation
        </h2>
        <ul>
          <li>2021: Japanese Language Course - Tokyo, JAPAN</li>
          <li>2022-2023: Web &amp; Mobile Development Course - FRANCE</li>
          <li>2024: AI &amp; Data Development Course - FRANCE</li>
        </ul>
        <h2>
          <span className="ColoredLetter">W</span>ork Experience
        </h2>
        <ul>
          <li>2021: Freelance Illustrator &amp; Designer</li>
          <li>
            2022-2023: Development of several websites (React, Vue) for various
            clients
          </li>
          <li>2023: Code review &amp; performance audits on client websites</li>
          <li>2023: Designer for a Web development &amp; marketing agency</li>
          <li>
            2024: Development of a web application implementing AI workflows,
            model finetuning and inference
          </li>
        </ul>
        <h2>
          <span className="ColoredLetter">I</span>nterests
        </h2>
        <ul>
          <li>Computer technology (hardware and software)</li>
          <li>Social media activities: sharing illustrations, streaming</li>
          <li>Traveling</li>
          <li>Digital drawing</li>
        </ul>
      </div>
      <hr />
      <div className="news-icons-wrapper">
        <div>
          <h1>
            <span className="ColoredLetter">N</span>ews
          </h1>
          <ul className="Post">
            {lastTenPosts.map((post) => (
              <li className="PostList" key={post.id}>
                <span className="postDate">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <Link href={`/post?id=${post.id}`} className="postName">
                  {post.title}
                </Link>
                {isNewPost(post.createdAt) && (
                  <span style={{ color: "#d26600" }}> [New!]</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="Projectsicon">
          <h1 className="ProjectTitleIntro">
            <span className="ColoredLetter">P</span>rojects
          </h1>
          <div className="project-container">
            <Link href="https://github.com/Loke-60000/Atto-channel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="project_icons"
                src="/images/atchan.webp"
                alt="@Chan"
              />
              <span>@Chan (still in development)</span>
            </Link>
          </div>
          <div className="project-container">
            <Link href="/projects">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="project_icons"
                src="/images/rakugaki.webp"
                alt="Rakugaki"
              />
              <span>Rakugaki</span>
            </Link>
          </div>
          <div className="project-container">
            <Link href="/post?id=ZbJ9NdhxWIlsgVlZ1GFc">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="project_icons"
                src="/images/amadeus.webp"
                alt="Amadeus Fan-Project Realisation 2.0"
              />
              <span>Fan-Project: Amadeus Reborn (name subject to change)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function IntroductionPage() {
  return <Introduction />;
}
