/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// ✅ SINGLE APP INSTANCE
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Realtime DB
export const db = getDatabase(app);

// ✅ SAFE messaging getter
export const getFirebaseMessaging = async () => {
  if (typeof window === "undefined") 
    return null;

  const supported = await isSupported();
  if (!supported) 
    return null;

  return getMessaging(app);
};


//✅ Notification helpers

export const requestNotificationPermission = async () => {
  try {
    const messaging = await getFirebaseMessaging();
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    });

    return token;
  } catch (err) {
    console.error("FCM error:", err);
    return null;
  }
};

export const onMessageListener = async () => {
  const messaging = await getFirebaseMessaging();
  if (!messaging) return;

  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};