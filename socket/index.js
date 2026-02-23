import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "https://assignment-agnos-front-end.vercel.app",
];

const app = express();
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.get("/", (req, res) => {
  res.send("Socket Server is running ");
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  //first event after connection
  socket.on("join-role", ({ role, id }) => {
    if (role === "staff") {
      socket.join("staff:room");
      console.log(`Staff ${id} joined`);
    }

    if (role === "patient" && id) {
      socket.join(`patient:${id}`);
      console.log(`Patient ${id} joined`);
    }
  });

  //patient open form and send payload to staff room
  socket.on("patient:open", (payload) => {
    console.log("Received patient:open", payload);
    io.to("staff:room").emit("patient:created", payload);
  });

  //patient close form and send payload to staff room
  socket.on("patient:close", (payload) => {
    console.log("Received patient:close", payload);
    io.to("staff:room").emit("patient:closed", payload);
  });

  //patient updated form values and send payload to staff room
  socket.on("patient:update", (payload) => {
    console.log("Received patient:update", payload);
    io.to("staff:room").emit("patient:updated", payload);
  });

  //patient submitted form values and send payload to staff room
  socket.on("patient:submit", (payload) => {
    console.log("Received patient:submit", payload);
    io.to("staff:room").emit("patient:submitted", payload);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
