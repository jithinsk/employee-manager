module.exports = {
  apps: [
    {
      name: "Employee Manager APP",
      script: "./index.js",
      node_args: "-r dotenv/config",
      env: {
        DOTENV_CONFIG_PATH: ".env",
      },
    },
  ],
};
