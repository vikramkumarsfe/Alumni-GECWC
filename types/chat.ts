export interface Message {
    senderId: string;
    receiverId : string;
    text: string;
    timestamp: number | string;
    id ?: number
}