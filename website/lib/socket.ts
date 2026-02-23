import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const SocketURL = process.env.NEXT_PUBLIC_SOCKET_URL;

export function connectSocket() {
  if (!socket) {
    socket = io(SocketURL);
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
