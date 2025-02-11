import { io } from "socket.io-client";

// const socket = io("https://ascentconnect.in");
const socket = io("https://ascent-bpo.com", {
  transports: ["websocket"], // Use WebSocket to avoid polling
});

// socket.on("connect", () => {
//   console.log("SOCKET CONNECTED");
// });

// const socket = io("http://192.168.1.200:3010");

export default socket;
