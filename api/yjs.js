import { Server } from 'http';
import { WebSocketServer } from 'ws';
import * as map from 'lib0/map';

const wsReadyStateConnecting = 0;
const wsReadyStateOpen = 1;
const pingTimeout = 30000;

/**
 * Map from topic-name to set of subscribed clients.
 * @type {Map<string, Set<any>>}
 */
const topics = new Map();

/**
 * Sends a message to a connection.
 * @param {any} conn
 * @param {object} message
 */
const send = (conn, message) => {
  if (conn.readyState !== wsReadyStateConnecting && conn.readyState !== wsReadyStateOpen) {
    conn.close();
  }
  try {
    conn.send(JSON.stringify(message));
  } catch (e) {
    conn.close();
  }
};

/**
 * Handles a new WebSocket connection.
 * @param {any} conn
 */
const onConnection = (conn) => {
  const subscribedTopics = new Set();
  let pongReceived = true;

  const pingInterval = setInterval(() => {
    if (!pongReceived) {
      conn.terminate();
      clearInterval(pingInterval);
    } else {
      pongReceived = false;
      conn.ping();
    }
  }, pingTimeout);

  conn.on('pong', () => {
    pongReceived = true;
  });

  conn.on('close', () => {
    subscribedTopics.forEach((topicName) => {
      const subs = topics.get(topicName) || new Set();
      subs.delete(conn);
      if (subs.size === 0) {
        topics.delete(topicName);
      }
    });
  });

  conn.on('message', (message) => {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === 'subscribe') {
      (parsedMessage.topics || []).forEach((topicName) => {
        if (typeof topicName === 'string') {
          const topic = map.setIfUndefined(topics, topicName, () => new Set());
          topic.add(conn);
          subscribedTopics.add(topicName);
        }
      });
    } else if (parsedMessage.type === 'publish') {
      const receivers = topics.get(parsedMessage.topic);
      if (receivers) {
        receivers.forEach((receiver) => send(receiver, parsedMessage));
      }
    }
  });
};

const server = Server((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Signaling server is running.');
});

const wss = new WebSocketServer({ server });
wss.on('connection', onConnection);

export default (req, res) => {
  if (!server.listening) {
    server.listen(0);
  }
  res.status(200).send('Server is running');
};
