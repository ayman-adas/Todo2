const WebSocket = require('ws');
const { con } = require('./database'); // Adjust the path to your database module

let wss;
let pollingInterval;
const POLLING_INTERVAL = 5000; // Poll every 5 seconds
const NOTIFICATION_TIMEOUT = 10000; // Reset notifications every 10 seconds

// Track the last notification for each project
const lastNotifications = new Map();

function createWebSocketServer(server) {
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

function notifyClients(projects) {
//   const message = JSON.stringify({ ProjectName: projectName, ProfileName: profileName });
  const message = JSON.stringify( projects);

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

function pollChanges() {
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
      P.ProjectCreatedTime < NOW() - INTERVAL ${POLLING_INTERVAL / 1000} SECOND;`;

  con.query(query, (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return;
    }

    console.log('Database query results:', results);

      notifyClients(results);
  });
}

function startPolling() {
  if (pollingInterval) {
    console.warn('Polling is already running.');
    return;
  }

  pollingInterval = setInterval(pollChanges, POLLING_INTERVAL);
  console.log('Polling started');
}

function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    console.log('Polling stopped');
  }
}

module.exports = { createWebSocketServer, startPolling, stopPolling };
