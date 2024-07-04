module.exports = {
  apps: [
    {
      name: "nextjs-app",
      script: "node",
      args: "server.js",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
