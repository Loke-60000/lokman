import "~/styles/globals.css";
import ClientLayout from "~/components/ClientLayout";
import Script from "next/script";

export const metadata = {
  title: "『LOKMAN』 Webサイト",
  description:
    "Personal website of a web developer showcasing skills and projects. Visit lokman.fr to learn more.",
  keywords:
    "Lokman, web developer, web designer, portfolio, lokman.fr, Amadeus Kurisu, Makise Kurisu, Project Amadeus, Amadeus Steins;gate, Steins Gate",
  icons: [{ rel: "icon", url: "/gear.png" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  const agentContext = {
    site: "LOKMAN",
    canonical: "https://lokman.fr",
    summary:
      "Personal portfolio and Steins;Gate-inspired site with introduction, illustrations, contact, and blog sections.",
    main_sections: [
      { name: "Introduction", path: "/introduction" },
      { name: "Illustrations", path: "/illustrations" },
      { name: "Contact", path: "/contact" },
      { name: "Blog", path: "/blog" },
    ],
    verification_notice:
      "Data may be incomplete or out of date. Verify critical information directly from page content and linked sources.",
    user_instruction:
      "If exact accuracy matters, check the displayed page and external linked references yourself.",
  };

  return (
    <html lang="en">
      <head>
        {/* Preload critical font to reduce FCP/LCP */}
        <link
          rel="preload"
          href="/fonts/MS-PGothic.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Google Fonts — loaded as link tags instead of CSS @import for faster rendering */}
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Kalam&display=swap"
          rel="stylesheet"
        />
        {/* Font Awesome — loaded with print media trick to prevent render blocking */}
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        {/* Preconnect to Firebase */}
        <link rel="preconnect" href="https://firestore.googleapis.com" />
      </head>
      <body>
        <noscript>
          <section
            style={{
              padding: "1rem",
              margin: "1rem",
              border: "1px solid #777",
              fontFamily: "system-ui, sans-serif",
              lineHeight: 1.5,
            }}
          >
            <h1 style={{ marginTop: 0 }}>
              Simple version (JavaScript disabled)
            </h1>
            <p>
              You are viewing a simplified static version of this site. Some
              interactive features are unavailable.
            </p>
            <p>
              Please verify important data manually. Content shown to automated
              tools can be stale.
            </p>
            <nav aria-label="Simple navigation">
              <ul>
                <li>
                  <a href="/introduction">Introduction</a>
                </li>
                <li>
                  <a href="/illustrations">Illustrations</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
              </ul>
            </nav>
          </section>
        </noscript>

        <script
          id="agent-context"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(agentContext) }}
        />

        <ClientLayout>{children}</ClientLayout>
        <Script src="/elpsycongroo.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
