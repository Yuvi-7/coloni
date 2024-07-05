module.exports = {
    apps: [
      {
        name: 'next-app',
        script: 'npx next',
        env: {
          NODE_ENV: 'development',
        },
      },
      {
        name: 'server',
        script: 'node',
        args: 'server.js',
      },
    ],
  };