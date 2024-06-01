/** @type {import('next').NextConfig} */
const nextConfig = {
  // next.config.js

  webpack: (config, { isServer }) => {
    // Add loader for MP3 files
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next",
          name: "static/media/[name].[hash].[ext]",
        },
      },
    });

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
