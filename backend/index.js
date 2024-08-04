const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const app = express();
const { con } = require('./services/database')

const { authRouters } = require("./routes/auth")
const { ProjectRouter } = require("./routes/project")
const { subTaskRouter } = require("./routes/subTask")
const { taskRouter } = require("./routes/task")
const { MyClass } = require("./models/length")
const { retrivePublicProjects } = require('./controller/project')
// Create an HTTP server for Express
const expressServer = http.createServer(app);

// Create an HTTP server for Socket.io
const socketIOServer = http.createServer();

// Initialize socket.io with the Socket.io server
const socketIO = require('socket.io')(socketIOServer, {
    cors: {
        origin: "http://localhost:5173", // Update to match your frontend origin
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['POST', 'GET'],
    }
});

// Middleware setup for Express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouters)
app.use(ProjectRouter)
app.use(subTaskRouter)
app.use(taskRouter)

// Use your routers and routes here...
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Socket.io setup
socketIO.on("connection", async (socket) => {


    socket.emit("projects",
        await retrivePublicProjects())





    //  const fetchData =async ()=>{
    //     const projects =await retrivePublicProjects();
    //     console.log(projects)
    //             socket.emit("projects", projects);

    //  }
    //  fetchData()
    // console.log("A client has connected");
    socket.on("send_data", async (data) => {
        const currentDate = new Date();

        console.log(data.data);
        console.log(data.data.ProjectName)
        const sql = `INSERT INTO Project (ProjectName, isPrivate, ProfileID, ProjectCreatedTime) VALUES (?, ?, ?, ?)`;
        con.query(sql, [data.data.ProjectName, data.data.isPrivate, data.data.ProfileID, currentDate], async (err, result) => {

            const projectID = result.insertId;

            const sqlCollaborators = `INSERT INTO projectcollaborators inde(ProjectId, ProfileID) VALUES (?, ?)`;
            con.query(sqlCollaborators, [projectID, data.data.ProfileID], (err, result) => {
                console.log(result)
            });
            socket.emit("projects",
                await retrivePublicProjects())
        })
        socket.on('disconnect', (reason) => {
            console.log('user disconnected', reason);
        });
    });
})
const EXPRESS_PORT = process.env.PORT || 2003;
const SOCKETIO_PORT = 4000;

expressServer.listen(EXPRESS_PORT, () => {
    console.log(`Express server listening on Port ${EXPRESS_PORT}`);
});

socketIOServer.listen(SOCKETIO_PORT, () => {
    console.log(`Socket.io server listening on Port ${SOCKETIO_PORT}`);
})