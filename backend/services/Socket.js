const WebSocket = require('ws');
const { MySql } = require('./database'); // Adjust the path to your database module
const http = require('http');
const socketIOServer = http.createServer();
const {ProjectController}=require("../controller/project")
const SOCKETIO_PORT = 4000;

// Create an HTTP server for Socket.io

// Initialize socket.io with the Socket.io server


socketIOServer.listen(SOCKETIO_PORT, () => {
  console.log(`Socket.io server listening on Port ${SOCKETIO_PORT}`);
})
const socketIO = require('socket.io')(socketIOServer, {
  cors: {
    origin: "http://localhost:5173", // Update to match your frontend origin
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['POST', 'GET'],
  }
});
project = new ProjectController()
// Track the last notification for each project


class Socket {
  createSocketServer = function () {
    throw new Error('cannot add from secket class')
  }
  pullChanges = function () {
    throw new Error('cannot pull change from secket class')

  }
  startPulling = function () {
    throw new Error('cannot pull start from secket class')

  }
  stopPulling = function () {
    throw new Error('cannot pull stop from secket class')

  }
  notifyClients = function (projects) {
    throw new Error('cannot notify client from secket class')

  }
}
class WebSockets extends Socket {
sql = new MySql();
lastNotifications = new Map();

notifyClients = function (projects) {
  const message = JSON.stringify(projects);

  // Notify clients only if the message has not been sent recently
  const key = `${message}`;
  const lastNotification = lastNotifications.get(key);
  const now = Date.now();

  if (lastNotification && (now - lastNotification < NOTIFICATION_TIMEOUT)) {
    console.log('Skipping message to avoid duplication:', message);
    return;
  }

  console.log('Sending message to clients:', message);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(projects);
    }
  });

  lastNotifications.set(key, now);
}
pullChanges = function () {
  const query = `
    SELECT 
      P.ProjectName,
      Profile.ProfileName
    FROM
      Project P
    INNER JOIN Profile ON P.ProfileID = Profile.ProfileID
    WHERE 
      P.IsPrivate = false
    AND     
      P.ProjectCreatedTime < NOW() - INTERVAL ${PuLLING_INTERVAL / 1000} SECOND;`;

  sql.connection().query(query, (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return;
    }

    console.log('Database query results:', results);

    notifyClients(results);
  });
}
startPulling = function () {
  if (pullingInterval) {
    console.warn('Pulling is already running.');
    return;
  }

  pullingInterval = setInterval(pullChanges, PuLLING_INTERVAL);
  console.log('Pulling started');

}
stopPulling = function () {
  if (pullingInterval) {
    clearInterval(pullingInterval);
    pullingInterval = null;
    console.log('Pulling stopped');
  }
}
createSocketServer = function () {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  wss.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  return wss;
}
}
class SocketsIo extends Socket {
  createSocketServer = function () {
    // const SOCKETIO_PORT = 4000;

    // // Create an HTTP server for Socket.io

    // // Initialize socket.io with the Socket.io server


    // socketIOServer.listen(SOCKETIO_PORT, () => {
    //   console.log(`Socket.io server listening on Port ${SOCKETIO_PORT}`);
    // })
  }
  sql = new MySql();

  pullChanges = function () {


  }

  async retrievePublicProjects() {
    const sql = `SELECT P.ProjectName, Profile.ProfileName, P.ProjectID, P.ProfileID,COUNT(*) OVER () AS TotalCount FROM Project P INNER JOIN Profile ON P.ProfileID = Profile.ProfileID WHERE P.IsPrivate = false ORDER BY ProjectCreatedTime;`;
    return await this.sql.query(sql);
  }
  sqlInsertProjectQuery = async function (data) {
    const currentDate = new Date();

    console.log(data);
    console.log(data.ProjectName)
    const sql = `INSERT INTO Project (ProjectName, isPrivate, ProfileID, ProjectCreatedTime) VALUES (?, ?, ?, ?)`;
    const result = await new MySql().query(sql, [data.ProjectName, data.isPrivate, data.ProfileID, currentDate])
    const projectID = result.insertId;

    this.sqlInsertProjectCollaboratorQuery(projectID, data)
    socketIO.emit("projects",
      await this.retrievePublicProjects())
  }
  sqlInsertProjectCollaboratorQuery = async (projectID, data) => {
    const sqlCollaborators = `INSERT INTO projectcollaborators (ProjectId, ProfileID) VALUES (?, ?)`;
    await new MySql().query(sqlCollaborators, [projectID, data.ProfileID],)
  }
  startPulling = function () {
    socketIO.on("connection", async (socket) => {
      console.log('connection socket')

      socketIO.emit("projects",
        await this.retrievePublicProjects())
      socket.on("send_data", async (data) => {
        console.log('Received send_data:', data);
        try {
          await this.sqlInsertProjectQuery(data.data);
          socket.emit("projects", await this.retrievePublicProjects());
        } catch (error) {
          console.error('Error processing data:', error);
        }
      })
      socketIO.on('disconnect', (reason) => {
        console.log('user disconnected', reason);
      });
    });
  }

}

module.exports = { SocketsIo ,WebSockets};
