// lib/sendNotification.ts

import { messaging } from "./firebase-admin";


type SendNotificationParams = {
  token: string;
  title: string;
  body: string;
  data?: Record<string, string>;
};

export async function sendPushNotification({
  token,
  title,
  body,
  data = {},
}: SendNotificationParams) {
  try {
    const response = await messaging.send({
      token,
      notification: { title, body },
      data,
    });

    return { success: true, messageId: response };
  } catch (error: any) {
    console.error("FCM Error:", error);

    // Handle expired token case
    if (error.code === "messaging/registration-token-not-registered") {
      return {
        success: false,
        error: "Token expired",
        shouldRefreshToken: true,
      };
    }

    return { success: false, error: error.message };
  }
}