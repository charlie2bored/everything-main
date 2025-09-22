import path from "path";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      // Make server-side imports of "client-only" a no-op
      config.resolve.alias["client-only"] = path.resolve(process.cwd(), "noop-client-only.js");
    }
    return config;
  },
};
export default nextConfig;
