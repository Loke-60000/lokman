"use client";

import React from "react";
import "~/styles/pages/contact.css";

const ContactPage = () => {
  return (
    <div className="container">
      <h1>
        <span className="ColoredLetter">C</span>ontact Me
      </h1>
      <p style={{ fontSize: "1.2rem", marginTop: "2rem", color: "#e0e0e0" }}>
        You can reach me at:{" "}
        <a
          href="mailto:lokman@viktorchondria.com"
          style={{ color: "#00d4ff", textDecoration: "none" }}
        >
          lokman@viktorchondria.com
        </a>
      </p>

      {/* 
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone (optional)</label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject (optional)</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            id="message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          {errors.message && (
            <div className="invalid-feedback">{errors.message}</div>
          )}
        </div>
        {isSending && (
          <div className="alert alert-info" role="alert">
            Sending your message...
          </div>
        )}
        {isSent && (
          <div className="alert alert-success" role="alert">
            Your message has been sent. Thank you!
          </div>
        )}
        {sendError && (
          <div className="alert alert-danger" role="alert">
            {sendError}
          </div>
        )}
        <div className="contactButtonContainer">
          <button type="submit" className="contactButton" disabled={isSending}>
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
      */}
    </div>
  );
};

export default function ContactPageRoute() {
  return <ContactPage />;
}
