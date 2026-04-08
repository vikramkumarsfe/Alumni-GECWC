"use client";

import { useEffect, useState } from "react";
import {
  requestNotificationPermission,
  onMessageListener,
} from "@/lib/firebase";

export function usePushNotifications() {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    title?: string;
    body?: string;
  } | null>(null);

  // ✅ Register service worker (safe)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .catch((err) =>
          console.error("Service Worker registration failed:", err)
        );
    }
  }, []);

  // ✅ Load token from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("fcmToken");
    if (saved) setToken(saved);
  }, []);

  // ✅ Listen for foreground messages (safe + cleanup)
  useEffect(() => {
    let isMounted = true;

    const listen = async () => {
      try {
        const payload: any = await onMessageListener();
        if (!payload || !isMounted) return;

        const title = payload.notification?.title || "New Notification";
        const body = payload.notification?.body || "";

        // In-app notification
        setNotification({ title, body });

        // System notification
        if (
          typeof window !== "undefined" &&
          "Notification" in window &&
          Notification.permission === "granted"
        ) {
          const notif = new Notification(title, {
            body,
            icon: "/icon-192x192.png",
          });

          notif.onclick = () => {
            window.focus();
            notif.close();
          };
        }

        // Auto hide toast
        setTimeout(() => {
          if (isMounted) setNotification(null);
        }, 4000);
      } catch (err) {
        console.error("FCM listener error:", err);
      }
    };

    listen();

    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Enable notifications
  const enableNotifications = async () => {
    try {
      const t = await requestNotificationPermission();

      if (t) {
        setToken(t);
        localStorage.setItem("fcmToken", t);
      }
    } catch (err) {
      console.error("Enable notification error:", err);
    }
  };

  // ✅ Clear token
  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("fcmToken");
  };

  return {
    token,
    notification,
    enableNotifications,
    clearToken,
  };
}