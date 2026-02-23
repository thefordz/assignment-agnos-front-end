"use client";

import { useIDSession } from "@/features/shared/components/providers/id-session-provider";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import { useEffect } from "react";

export default function Home() {
  const { id } = useIDSession();

  useEffect(() => {
    const socket = connectSocket();
    socket.emit("join-role", {
      role: "patient",
      id,
    });

    return () => disconnectSocket();
  }, [id]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <h1 className="text-6xl font-bold">
        Health<span className="text-lg">Care</span>
      </h1>
    </div>
  );
}
