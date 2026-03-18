import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import { Message } from "@/types/chat";

export const listenMessages = ( chatId: string, callback: (messages: (Message & { id: string })[]) => void ) => {

  const messagesRef = ref(db, `chats/${chatId}/messages`);
  onValue(messagesRef, (snapshot) => {
    
    const data = snapshot.val();

    if (!data) {
      callback([]);
      return;
    }

    const messages = Object.keys(data).map((key) => ({
      id: key,
      ...data[key]
    })) as (Message & { id: string })[];

    callback(messages);

  });

};