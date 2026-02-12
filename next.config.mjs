/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPagesSite = repoName.endsWith(".github.io");

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath:
    isGithubActions && !isUserOrOrgPagesSite && repoName ? `/${repoName}` : "",
  assetPrefix:
    isGithubActions && !isUserOrOrgPagesSite && repoName ? `/${repoName}/` : "",
  // Allow images from external domains
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Support SCSS
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
