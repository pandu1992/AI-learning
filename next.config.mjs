/** @type {import('next').NextConfig} */

// For GitHub Pages project sites the app is served from /<repo>/.
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH="/AI-learning".
// Locally (npm run dev) the env var is unset, so the app runs at "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  output: "export", // generate a fully static site in ./out
  basePath,
  images: {
    unoptimized: true, // required for static export (no image server)
  },
  trailingSlash: true, // friendlier paths for static hosting
};

export default nextConfig;
