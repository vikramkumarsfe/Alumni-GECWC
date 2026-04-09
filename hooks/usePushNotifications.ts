"use client";

import { useEffect, useState } from "react";
import {
  requestNotificationPermission,
  onMessageListener,
} from "@/lib/firebase";
import clientCatchError from "@/utils/clientCatchError";
import axios from "axios";
import { message } from "antd";

export function usePushNotifications() {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    title?: string;
    body?: string;
  } | null>(null);

  //  Register service worker (safe)
  useEffect(() => {
    if (typeof window === "undefined") 
      return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .catch((err) =>
          console.error("Service Worker registration failed:", err)
        );
    }
  }, []);

  //  Load token from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("fcmToken");
    if (saved) setToken(saved);
  }, []);

  //  Listen for foreground messages (safe + cleanup)
  useEffect(() => {
  let unsubscribe: any;

  const init = async () => {
    unsubscribe = await onMessageListener((payload: any) => {
      const title = payload.notification?.title || "New Notification";
      const body = payload.notification?.body || "";

      setNotification({ title, body });

      if (Notification.permission === "granted") {
        new Notification(title, { body });
      }
    });
  };

  init();

  return () => {
    if (unsubscribe) unsubscribe();
  };
}, []);

  //  Enable notifications
  const enableNotifications = async () => {
  try {
    if (token) {
      message.info("Already enabled");
      return;
    }

    const t = await requestNotificationPermission();

    if (!t) {
      message.error("Permission denied");
      return;
    }

    setToken(t);
    localStorage.setItem("fcmToken", t);

    await axios.post("/api/save-fcm-token", { token: t });

    message.success("Notification enabled");
  } catch (err) {
    return clientCatchError(err);
    }
  };

  const clearToken = async () => {
    try {
      await axios.post("/api/remove-fcm-token");

      setToken(null);
      localStorage.removeItem("fcmToken");

      message.success("Notifications disabled");
    } catch (err) {
      return clientCatchError(err);
    }
  };

  return {
    token,
    notification,
    enableNotifications,
    clearToken,
  };
}