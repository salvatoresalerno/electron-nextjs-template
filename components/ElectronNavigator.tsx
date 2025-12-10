"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ElectronNavigator() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.electronAPI) return;

    // registra il listener
    window.electronAPI.onNavigate((path: string) => {
      console.log("Navigating to:", path);
      router.push(path);
    });

    // Non serve removeListener se la finestra dura tutta la vita
  }, []);

  return null;
}