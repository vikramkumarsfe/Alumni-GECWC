importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCw3rMQfkGCF73x7PvcEIYa0uWCV19jXgc",
  authDomain: "alumni-gecwc.firebaseapp.com",
  projectId: "alumni-gecwc",
  messagingSenderId: "289118487606",
  appId: "1:289118487606:web:dfcec7de9c8ba5f8050497",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title;
  const options = {
    body: payload.notification?.body,
    icon: "/icon-192x192.png",
  };

  self.registration.showNotification(title, options);
});