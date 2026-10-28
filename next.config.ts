import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Hide the development-only "N" (Next.js Dev Tools) button. Compile and runtime
  // errors still show. Production builds never include it.
  devIndicators: false,
};

export default nextConfig;
