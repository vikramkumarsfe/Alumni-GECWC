"use client";

import { useState } from "react";
import { Input, Badge,  Button, message, Form, Skeleton } from "antd";
import {  Search, Phone, Video, MoreVertical, Paperclip, Send, ChevronLeft } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import ErrorState from "../shared/Errorstate";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const { TextArea } = Input;

interface ChatMessage {
  id: number;
  senderId: number;
  text: string;
  timestamp: string; 
}

// This tells TS: "The key is a string (date), and the value is an array of messages"
type GroupedMessages = Record<string, ChatMessage[]>;

const ChatPage = () => {
  const [activeChatId, setActiveChatId] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const { data, error, isLoading } = useSWR('/api/connection', fetcher)

  if(error)
    return <ErrorState />

  if(isLoading)
    return <Skeleton active />

  console.log(data)
  const chatList = [
    {
      id: 1,
      name: "Priya Patel",
      role: "Senior Software Engineer at Google",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F2",
      lastMsg: "That sounds like a great plan, Alex. Let's schedule a call.",
      unread: 0,
    },
    {
      id: 2,
      name: "David Smith",
      role: "Product Manager at Meta",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FEuropean%2F3",
      time: "10:42 AM",
      lastMsg: "Can you share your updated resume?",
      online: false,
      unread: 1,
    }
  ];

  const messages = [
    { id: 1, senderId: 2, text: "Hello! How are you?", timestamp: "2026-03-18T10:00:00Z" },
    { id: 2, senderId: 1, text: "I'm good, thanks!", timestamp: "2026-03-18T10:05:00Z" },
    { id: 3, senderId: 2, text: "Did you see the new designs?", timestamp: "2026-03-19T09:30:00Z" },
  ];

  const groupMessagesByDate = (messages: ChatMessage[]): GroupedMessages => {
    return messages.reduce((groups: GroupedMessages, message: ChatMessage) => {
      const date = new Date(message.timestamp).toLocaleDateString([], {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const currentChat = chatList.find(c => c.id === activeChatId) || chatList[0];

  const sendMessage = (values : any) => {
    console.log("Sent:", values);
    setMessageText("");
  };

  const openConversation = (id : number) => {
    setActiveChatId(id);
    setIsMobileChatOpen(true);
  }

  return (
    <div className="flex h-[calc(100vh-120px)] bg-slate-50 md:border border-gray-200 overflow-hidden shadow-sm  m-2">
      
      <div className={`${isMobileChatOpen ? 'hidden' : 'flex'} md:flex w-full md:w-[340px] flex-col border-r border-gray-200 bg-white`}>
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#0f172a] mb-4">Messages</h2>
          <Input
            placeholder="Search messages..."
            prefix={<Search size={16} className="text-[#64748b]" />}
            className="bg-[#f1f5f9] border-none rounded-lg h-10 text-sm focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {data && data.map((chat : any, index :number ) => (
            <div
              key={chat._id}
              onClick={() => openConversation(chat._id)}
              className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors border-b border-gray-100 last:border-none ${
                activeChatId === chat._id ? "bg-[#eff6ff]" : "hover:bg-gray-50"
              }`}
            >
              <div className="relative flex-shrink-0">
                <Avatar className="w-10 h-10 rounded-full border border-slate-100 shadow-sm flex-shrink-0">
                  <AvatarImage src={chat.user.image} alt={chat.user.fullname} />
                  <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-base">
                      {chat.user.fullname
                          .split(" ")
                          .map((n : any) => n[0])
                          .join("")}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-[#10b981] border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`text-[15px] truncate ${activeChatId === chat._id ? "font-semibold text-[#2563eb]" : "font-medium text-[#0f172a]"}`}>
                    {chat.user.fullname}
                  </span>
                  <span className="text-xs text-[#64748b] ml-2">{moment(chat.updatedAt).calendar()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[13px] text-[#64748b] truncate pr-2">{chat.lastMsg}</p>
                  {chat.unread > 0 && (
                    <Badge count={chat.unread} styles={{ indicator: { backgroundColor: '#2563eb', fontWeight: 700 } }} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MAIN CHAT SECTION --- */}
      {/* Hidden on mobile if viewing list */}
      <div className={`${isMobileChatOpen ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-[#f8fafc]`}>
        {/* Chat Header */}
        <header className="h-[72px] px-4 md:px-6 flex items-center justify-between bg-white border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
            {/* Back button for mobile */}
            <Button 
              type="text" 
              icon={<ChevronLeft size={20} />} 
              className="md:hidden flex items-center justify-center p-0 w-8 h-8"
              onClick={() => setIsMobileChatOpen(!isMobileChatOpen)}
            />
            <Avatar className="w-10 h-10 rounded-full border border-slate-100 shadow-sm flex-shrink-0">
              <AvatarImage src={currentChat.user.image} alt={chat.user.fullname} />
              <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-base">
                  {chat.user.fullname
                      .split(" ")
                      .map((n : any) => n[0])
                      .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <h3 className="text-[14px] md:text-[16px] font-semibold text-[#0f172a] leading-tight truncate">
                {currentChat.name}
              </h3>
              <span className="text-[11px] md:text-[13px] text-[#10b981] font-medium truncate">
                {currentChat.role}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 shrink-0">
            <Button type="text" shape="circle" icon={<Phone size={18} />} className="bg-[#f1f5f9] text-[#64748b]" onClick={() => message.info("Feature coming soon!")} />
            <Button type="text" shape="circle" icon={<Video size={18} />} className="hidden md:flex bg-[#f1f5f9] text-[#64748b]" onClick={() => message.info("Feature coming soon!")} />
            <Button type="text" shape="circle" icon={<MoreVertical size={18} />} className="bg-[#f1f5f9] text-[#64748b]" />
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4">
          {Object.entries(groupMessagesByDate(messages)).map(([date, dateMessages]) => (
            <div key={date} className="flex flex-col gap-4">
              {/* Date Divider */}
              <div className="flex items-center my-2 text-[#64748b] text-[10px] md:text-xs font-medium uppercase tracking-wider before:content-[''] before:flex-1 before:border-b before:border-gray-200 before:mr-4 after:content-[''] after:flex-1 after:border-b after:border-gray-200 after:ml-4">
                {date === new Date().toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' }) ? "Today" : date}
              </div>

              {/* Messages for this date */}
              {dateMessages.map((msg) => {
                const isMe = msg.senderId === 1; // Logic to determine if you sent it
                return (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[85%] md:max-w-[75%] gap-1 ${isMe ? 'self-end' : 'self-start'}`}
                  >
                    <div className={`px-4 py-2 text-sm border shadow-sm rounded-2xl ${
                      isMe 
                        ? "bg-[#2563eb] text-white border-[#2563eb] rounded-br-none" 
                        : "bg-white text-[#0f172a] border-gray-200 rounded-bl-none"
                    }`}>
                      {msg.text}
                    </div>
                    <span className={`text-[10px] text-[#64748b] mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {/* Input Area */}
        <div className="p-3 md:p-5 bg-white border-t border-gray-200">
          <Form 
            onFinish={sendMessage}
            className="w-full"
          >
            <div className="flex items-end gap-2 md:gap-3 bg-[#f1f5f9] p-2 md:p-3 rounded-xl border border-transparent focus-within:border-blue-200 transition-all">
              <Button 
                type="text" 
                icon={<Paperclip size={20} />} 
                className="text-[#64748b] p-1 h-auto flex-shrink-0" 
                onClick={() => message.warning("Module under development")}
              />

              <Form.Item name="message" noStyle>
                <TextArea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      sendMessage({ message: messageText });
                    }
                  }}
                  placeholder="Message..."
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  className="flex-1 border-none shadow-none bg-transparent text-sm resize-none p-0"
                />
              </Form.Item>

              <Form.Item noStyle>
                <Button 
                  type="primary" 
                  shape="circle" 
                  icon={<Send size={18} />} 
                  className="bg-[#2563eb] flex items-center justify-center min-w-[36px] h-[36px] flex-shrink-0" 
                  htmlType="submit"
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;