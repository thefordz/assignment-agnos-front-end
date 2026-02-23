import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

server.listen(4000, () => console.log("Socket server running on port 4000"));
