import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path";
import { createServer } from "http";

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import matchRoutes from "./routes/matchRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import eventRoutes from "./routes/eventsRoutes.js"  // Add this line

import { connectDB } from "./config/db.js"
import { initializeSocket } from "./socket/socket.server.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5001;

initializeSocket(httpServer);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/matches", matchRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/events", eventRoutes)  // Add this line

httpServer.listen(PORT, () => {
  console.log("Listening on port " + PORT);
  connectDB();
});
