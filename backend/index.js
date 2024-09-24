const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const app = express();
const { MySql } = require("./services/database");

const { authRouters } = require("./routes/auth");
const { ProjectRouter } = require("./routes/project");
const { subTaskRouter } = require("./routes/subTask");
const { subTaskActionRouter } = require("./routes/subTaskAction");

const { taskRouter } = require("./routes/task");
const { SocketsIo } = require("./services/Socket");
// Create an HTTP server for Express
const expressServer = http.createServer(app);

app.use(express.json({ extended: false, limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 })
);
// Middleware setup for Express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouters);
app.use(ProjectRouter);
app.use(subTaskRouter);
app.use(subTaskActionRouter);

app.use(taskRouter);
const mySql = new MySql();
mySql.connect();
app.get("/", (req, res) => {
  res.send("Server is running");
});
const socket = new SocketsIo();
socket.createSocketServer();
socket.startPulling();
//
const EXPRESS_PORT = 20031;

expressServer.listen(EXPRESS_PORT, () => {
  console.log(`Express server listening on Port ${EXPRESS_PORT}`);
});
