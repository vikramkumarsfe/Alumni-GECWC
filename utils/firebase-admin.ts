// lib/firebaseAdmin.ts
import admin from "firebase-admin";

// Singleton init
function initAdmin() {
  if (admin.apps.length) return admin.app();

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!raw) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT is missing");
  }

  const serviceAccount = JSON.parse(raw);

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const app = initAdmin();

// Reusable instances
export const adminApp = app;
export const messaging = admin.messaging(app);

export default admin;