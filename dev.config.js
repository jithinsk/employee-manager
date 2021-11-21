module.exports = {
  apps: [
    {
      name: "Employee Manager API Dev",
      script: "./index.js",
      node_args: "-r dotenv/config",
      env: {
        DOTENV_CONFIG_PATH: "local.env",
      },
      watch: true,
      watch_delay: 1000,
      ignore_watch: [
        "fe",
        "node_modules",
        ".env",
        ".gitignore",
        "readme.MD",
        ".git",
      ],
      watch_options: {
        followSymlinks: false,
      },
    },
    {
      name: "Employee Manager FE Dev",
      script: "cd fe && npm run start",
    },
  ],
};
