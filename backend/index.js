const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const app = express();
const { MySql } = require('./services/database')

const { authRouters } = require("./routes/auth")
const { ProjectRouter } = require("./routes/project")
const { subTaskRouter } = require("./routes/subTask")
const { taskRouter } = require("./routes/task")
const { MyClass } = require("./models/length")
const { SocketsIo } = require('./services/Socket');
// Create an HTTP server for Express
const expressServer = http.createServer(app);

app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))
// Middleware setup for Express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouters)
app.use(ProjectRouter)
app.use(subTaskRouter)
app.use(taskRouter)
mySql = new MySql()
mySql.connect()// // Use your routers and routes here...
app.get('/', (req, res) => {
    res.send('Server is running');
});
socket=new SocketsIo()
socket.createSocketServer()
socket.startPulling()
//
const EXPRESS_PORT = 2003;

expressServer.listen(EXPRESS_PORT, () => {
    console.log(`Express server listening on Port ${EXPRESS_PORT}`);
});
