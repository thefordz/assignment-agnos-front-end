"use client";

import { createContext, useContext, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

interface IDSessionContextType {
  id: string;
}

const IDSessionContext = createContext<IDSessionContextType | null>(null);

export function IDSessionProvider({ children }: { children: React.ReactNode }) {
  const id = useMemo(() => {
    return uuidv4();
  }, []);

  //saveing in local
  // const id = useMemo(() => {
  //   const existing = sessionStorage.getItem("id")
  //   if (existing) return existing
  //
  //   const newId = uuidv4()
  //   sessionStorage.setItem("id", newId)
  //   return newId
  // }, [])

  return (
    <IDSessionContext.Provider value={{ id }}>
      {children}
    </IDSessionContext.Provider>
  );
}

export function useIDSession() {
  const ctx = useContext(IDSessionContext);
  if (!ctx)
    throw new Error("useIDSession must be used inside IDSessionProvider");
  return ctx;
}
