import { ref, push, set } from "firebase/database";
import { db } from "./firebase";
import { Message } from "@/types/chat";


export const sendMessage = async (
  chatId: string,
  message: Message
): Promise<void> => {
  const messageRef = ref(db, `chats/${chatId}/messages`);
     try{
        await push(messageRef, message)
     }
     catch(err)
     {
        console.log(err)
     }

}