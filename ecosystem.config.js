module.exports = {
  apps: [
    {
      name: 'student-records-backend',
      script: './backend/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 80,
      },
    },
  ],
};
