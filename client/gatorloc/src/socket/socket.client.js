import io from "socket.io-client";

const SOCKET_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

let socket = null;

export const initializeSocket = (userId) => {
  if (!userId) return null;
  
  if (socket) {
    // If we already have a socket but with a different user, disconnect first
    if (socket.auth?.userId !== userId) {
      socket.disconnect();
    } else if (socket.connected) {
      // If already connected with the same user, just return it
      return socket;
    }
  }

  // Create new socket with proper auth
  socket = io(SOCKET_URL, {
    auth: { userId },
    withCredentials: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 10,
    transports: ["websocket", "polling"]
  });

  // Log connection status
  socket.on("connect", () => {
    console.log("Socket connected successfully", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected");
  }
};
