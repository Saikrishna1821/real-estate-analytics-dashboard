module.exports = {
  apps: [
    {
      name: "real-estate-dashboard-server",
      script: "./server/index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
        JWT_SECRET: process.env.JWT_SECRET,
      },
      watch: false, // Disable watch in production
      ignore_watch: ["node_modules", "logs"],
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      max_memory_restart: "1G",
      restart_delay: 4000,
      max_restarts: 10,
    },
  ],
};
