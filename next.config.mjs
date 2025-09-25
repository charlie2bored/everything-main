import path from "path";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    // Make imports of "client-only" a no-op in all builds
    config.resolve.alias["client-only"] = path.resolve(process.cwd(), "noop-client-only.js");
    return config;
  },
};
export default nextConfig;
