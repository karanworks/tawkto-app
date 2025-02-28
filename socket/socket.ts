import { io } from "socket.io-client";

// const socket = io("https://ascentconnect.in");
const socket = io("https://ascent-bpo.com", {
  transports: ["websocket"], // Use WebSocket to avoid polling
});

export default socket;
