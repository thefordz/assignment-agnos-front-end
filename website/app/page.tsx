"use client";

import { connectSocket, disconnectSocket } from "@/lib/socket";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, []);

  return <div>home</div>;
}
