import { Server } from "socket.io";

let io;

const connectedUsers = new Map();
// { userId: socketId }

export const initializeSocket = (httpServer) => {
	io = new Server(httpServer, {
		cors: {
			origin: process.env.CLIENT_URL,
			credentials: true,
		},
	});

	io.use((socket, next) => {
		const userId = socket.handshake.auth.userId;
		if (!userId) return next(new Error("Invalid user ID"));

		socket.userId = userId;
		next();
	});

	io.on("connection", (socket) => {
		console.log(`User connected with socket id: ${socket.id}`);
		connectedUsers.set(socket.userId, socket.id);
		
		// Join a room with the user's ID
		socket.join(socket.userId);
		console.log(`User ${socket.userId} joined their personal room`);

		socket.on("disconnect", () => {
			console.log(`User disconnected with socket id: ${socket.id}`);
			connectedUsers.delete(socket.userId);
		});
	});
};

export const getIO = () => {
	if (!io) {
		throw new Error("Socket.io not initialized!");
	}
	return io;
};

export const getConnectedUsers = () => connectedUsers;

// Add this helper function to emit match events
export const emitNewMatch = (user1Id, user2Id, matchData) => {
    if (!io) {
        console.error("Socket.io not initialized!");
        return;
    }
    
    console.log(`Emitting match notification to users ${user1Id} and ${user2Id}`);
    
    // Emit to user 1's room
    io.to(user1Id).emit("newMatch", matchData);
    
    // Emit to user 2's room
    io.to(user2Id).emit("newMatch", matchData);
};
