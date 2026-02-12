import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
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

        <TRPCReactProvider>
          <ClientLayout>{children}</ClientLayout>
        </TRPCReactProvider>
        <Script src="/elpsycongroo.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
