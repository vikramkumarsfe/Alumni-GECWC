"use client";

import { useEffect, useState, useMemo } from "react";
import { Input, Badge, Button, message as antMessage, Form, Skeleton } from "antd";
import { Search, Phone, Video, MoreVertical, Paperclip, Send, ChevronLeft } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import ErrorState from "../shared/Errorstate";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { listenMessages } from "@/lib/listenMessage";
import { Message } from "@/types/chat";
import { useSession } from "next-auth/react";
import { sendMessage } from "@/lib/sendMessage";
import axios from "axios";
import EmptyState from "../shared/emptyState";

const { TextArea } = Input;

// --- Utilities ---

const getChatId = (uid1: string, uid2: string) => {
  return [uid1, uid2].sort().join("_");
};

const groupMessagesByDate = (messages: Message[]) => {
  return messages.reduce((groups: Record<string, Message[]>, message: Message) => {
    const date = moment(message.timestamp).format("LL");
    if (!groups[date]) groups[date] = [];
    groups[date].push(message);
    return groups;
  }, {});
};

// --- Component ---

const ChatPage = () => {
  const [form] = Form.useForm();
  const [activeChatId, setActiveChatId] = useState<string | number | null>(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const { data: connections, error, isLoading } = useSWR('/api/connection', fetcher);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // 1. Identify current active connection
  const currentChat = useMemo(() => {
    if (!connections || connections.length === 0) return null;
    return connections.find((c: any) => c._id === activeChatId) || connections[0];
  }, [connections, activeChatId]);

  // 2. Derive Firebase Chat ID
  const firebaseChatId = useMemo(() => {
    if (!currentChat?.user?._id || !userId) return null;
    return getChatId(currentChat.user._id, userId);
  }, [currentChat, userId]);

  useEffect(() => {
  if (connections && connections.length > 0 && !activeChatId) {
    setActiveChatId(connections[0]._id);
  }
}, [connections, activeChatId]);

  // 3. Real-time Listener Effect
  useEffect(() => {
    if (!firebaseChatId) 
      return;

    const unsubscribe = listenMessages(firebaseChatId, (msgs) => {
      // Firebase usually returns objects; listenMessages converts to array. 
      // We sort by timestamp to ensure order.
      const sorted = [...msgs].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      setChatMessages(sorted);
    });

    return () => {
      if (typeof unsubscribe === "function") 
        {
        (unsubscribe as Function)(); 
      }
    };
  }, [firebaseChatId]);

  // 4. Send Message to Firebase
  const onSendMessage = async (values: any) => {
    if (!values.message?.trim() || !firebaseChatId || !userId) 
      return;

    try {
      if (!currentChat?.user?._id || !userId) return null;

      const message = {
        senderId: userId,
        receiverId : currentChat.user._id as string,
        text : values.message.trim(),
        timestamp : Date.now(),
      }
      sendMessage(firebaseChatId, message)

      const payload = {
        lastMessage : values.message.trim()
      }

      await axios.put(`/api/connection/${activeChatId}`,payload)
      form.resetFields();
    } catch (err) {
      antMessage.error("Failed to send message");
    }
  };

  if (error) 
    return <ErrorState />;

  if (isLoading) 
    return <Skeleton active className="p-10" />;

  if (!connections || connections.length === 0) 
    return <div className="p-10 text-center"><EmptyState /></div>;

  if (!currentChat) 
    return <Skeleton active />;

  return (
    <div className="flex h-[calc(100vh-120px)] bg-slate-50 md:border border-gray-200 overflow-hidden shadow-sm m-2">
      
      {/* --- Sidebar --- */}
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
          {connections.map((chat: any) => (
            <div
              key={chat._id}
              onClick={() => {
                setActiveChatId(chat._id);
                setIsMobileChatOpen(true);
              }}
              className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors border-b border-gray-100 last:border-none ${
                (activeChatId === chat._id || (!activeChatId && currentChat._id === chat._id)) 
                  ? "bg-[#eff6ff]" 
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="relative flex-shrink-0">
                <Avatar className="w-10 h-10 border border-slate-100 shadow-sm">
                  <AvatarImage src={chat.user.image} alt={chat.user.fullname} />
                  <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold">
                    {chat.user.fullname.split(" ").map((n: any) => n[0]).join("")}
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
                  <span className="text-xs text-[#64748b] ml-2">{moment(chat.updatedAt).fromNow()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[13px] text-[#64748b] truncate pr-2">{chat.lastMsg}</p>
                  {chat.unread > 0 && <Badge count={chat.unread} color="#2563eb" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Main Chat Section --- */}
      <div className={`${isMobileChatOpen ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-[#f8fafc]`}>
        <header className="h-[72px] px-4 md:px-6 flex items-center justify-between bg-white border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
            <Button 
              type="text" 
              icon={<ChevronLeft size={20} />} 
              className="md:hidden flex items-center justify-center p-0 w-8 h-8"
              onClick={() => setIsMobileChatOpen(false)}
            />
            <Avatar className="w-10 h-10 border border-slate-100 shadow-sm flex-shrink-0">
              <AvatarImage src={currentChat.user.image} alt={currentChat.user.fullname} />
              <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold">
                {currentChat.user.fullname.split(" ").map((n: any) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <h3 className="text-[14px] md:text-[16px] font-semibold text-[#0f172a] leading-tight truncate">
                {currentChat.user.fullname}
              </h3>
              <span className="text-[11px] md:text-[13px] text-[#10b981] font-medium truncate">
                {currentChat.user.profile?.heading || "Member"} at { currentChat.user.profile?.company}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 shrink-0">
            <Button type="text" shape="circle" icon={<Phone size={18} />} className="bg-[#f1f5f9] text-[#64748b]" onClick={() => antMessage.info("Feature coming soon!")} />
            <Button type="text" shape="circle" icon={<Video size={18} />} className="hidden md:flex bg-[#f1f5f9] text-[#64748b]" onClick={() => antMessage.info("Feature coming soon!")} />
            <Button type="text" shape="circle" icon={<MoreVertical size={18} />} className="bg-[#f1f5f9] text-[#64748b]" onClick={() => antMessage.info("Feature coming soon!")} />
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4">
          {Object.entries(groupMessagesByDate(chatMessages)).map(([date, dateMessages]) => (
            <div key={date} className="flex flex-col gap-4">
              <div className="flex items-center my-2 text-[#64748b] text-[10px] md:text-xs font-medium uppercase tracking-wider before:flex-1 before:border-b before:border-gray-200 before:mr-4 after:flex-1 after:border-b after:border-gray-200 after:ml-4">
                {date === moment().format("LL") ? "Today" : date}
              </div>

              {dateMessages.map((msg) => {
                const isMe = String(msg.senderId) === String(userId);
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
                      {moment(msg.timestamp).format('LT')}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 md:p-5 bg-white border-t border-gray-200">
          <Form form={form} onFinish={onSendMessage} className="w-full">
            <div className="flex items-end gap-2 md:gap-3 bg-[#f1f5f9] p-2 md:p-3 rounded-xl border border-transparent focus-within:border-blue-200 transition-all">
              <Button 
                type="text" 
                icon={<Paperclip size={20} />} 
                className="text-[#64748b] p-1 h-auto flex-shrink-0" 
                onClick={() => antMessage.warning("Module under development")}
              />

              <Form.Item name="message" noStyle>
                <TextArea
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      form.submit();
                    }
                  }}
                  placeholder="Message..."
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  className="flex-1 border-none shadow-none bg-transparent text-sm resize-none p-0 focus:bg-transparent"
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