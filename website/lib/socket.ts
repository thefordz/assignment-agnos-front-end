import { ClientToServerEvents, ServerToClientEvents } from "@/types/socket";
import { io, Socket } from "socket.io-client";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

const SocketURL = process.env.NEXT_PUBLIC_SOCKET_URL;

if (!SocketURL) {
  throw new Error("NEXT_PUBLIC_SOCKET_URL is not defined");
}

export function connectSocket() {
  if (!socket) {
    socket = io(SocketURL, {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
}

export function getSocket() {
  if (!socket) throw new Error("Socket not connected");
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
