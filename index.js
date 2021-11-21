const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./api/routes/");
const { testConnection, closePool } = require("./api/database/connect");
const { errorLogger } = require("./api/middleware/errorhandler");
const {
  NODE_ENV,
  PORT,
  EMPLOYEE_MANAGER_API_PUBLIC_FOLDER,
  EMPLOYEE_MANAGER_API_SERVER_PORT,
} = process.env;

const startAppServer = async () => {
  try {
    await testConnection();
    const app = express();
    if (NODE_ENV === "development")
      app.use(
        cors({
          origin: "*",
          methods: "GET,POST,PUT,DELETE",
        })
      );
    app.use(express.json());
    app.use(express.static(EMPLOYEE_MANAGER_API_PUBLIC_FOLDER));
    app.use("/api", router);
    app.get("*", (_, res) =>
      res.sendFile(
        path.join(__dirname, EMPLOYEE_MANAGER_API_PUBLIC_FOLDER, "index.html")
      )
    );
    app.use(errorLogger);
    const portToListen = PORT
      ? parseInt(PORT)
      : parseInt(EMPLOYEE_MANAGER_API_SERVER_PORT);
    app.listen(portToListen);
    console.log(`Server started on port: ${portToListen}`);
  } catch (error) {
    console.log(`Error in function::startAppServer`, error);
    process.kill(process.pid, "SIGINT");
  }
};

const cleanUpAfterClose = () => {
  closePool();
  process.exit(0);
};

startAppServer();
[`SIGINT`, `uncaughtException`].forEach((eventType) =>
  process.on(eventType, cleanUpAfterClose)
);
