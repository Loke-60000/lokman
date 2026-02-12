"use client";

import React from "react";
import Link from "next/link";
import "~/styles/pages/projects.css";

const Projects = () => {
  return (
    <div className="post_list">
      <div className="container">
        <h1 className="projectsTitle">
          <span className="ColoredLetter">P</span>rojects
        </h1>
        <hr />
        <div className="ProjectIconsOnProjectsPage">
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
            <Link href="https://jin-joo.fr">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="project_icons"
                src="/images/JINJOO.jpg"
                alt="Jin-Joo"
              />
              <span>Jin-Joo.fr</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  return <Projects />;
}
