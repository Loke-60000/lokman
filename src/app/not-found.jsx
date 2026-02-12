"use client";

import React from "react";

export default function NotFound() {
  return (
    <div className="errorNotFound">
      <h1>404 - Not Found</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="errorimg" src="/images/404sketch.png" alt="" />
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        Certain pages are currently under construction. You can reach out to me
        for more information or simply await their completion.
      </p>
    </div>
  );
}
