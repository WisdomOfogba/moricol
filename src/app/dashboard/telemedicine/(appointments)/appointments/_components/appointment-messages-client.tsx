"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Video,
  Phone,
  // Paperclip,
  // Image,
  ChevronLeft,
  SendHorizonal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Textarea } from "@/components/textarea";
import { ShadButton } from "@/components/shadcn-button";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { useRouter, useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import { API_BASE_URL } from "@/constants/config";

// Move messages to state
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
  isUser: boolean;
}

interface ChatPayload {
  userid: string;
  appointmentid: string;
  usertype: string;
  text: string;
}

export default function AppointmentMessagesClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();
  const appointmentId = params.id as string;
  const { data: session } = useSession();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Socket setup
  useEffect(() => {
    const socket = io(API_BASE_URL || '', {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.emit("telemedicinechat", appointmentId);

    socket.on("receieve_telemedicine_chat", (message: {
      sender: string;
      text: string;
    }) => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: message.sender,
        content: message.text,
        timestamp: new Date().toLocaleTimeString(),
        avatar: "/placeholder.svg?height=40&width=40",
        isUser: false
      }]);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [appointmentId]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !socketRef.current) return;

    const messageData: ChatPayload = {
      userid: session?.user?.id as string,
      appointmentid: appointmentId,
      usertype: "user",
      text: newMessage.trim()
    };

    socketRef.current.emit("send_telemedicine_chat", messageData);

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: session?.user?.firstname + " " + session?.user?.lastname || "User",
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString(),
      avatar: session?.user?.image || "",
      isUser: true
    }]);

    setNewMessage("");
  }, [newMessage, appointmentId, session]);


  return (
    <div className="flex h-[90vh] flex-col bg-gray-100">
      {/* Chat area */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* Patient info */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <ChevronLeft
                onClick={() => router.back()}
                className="h-5 w-5 text-gray-500 hover:text-primary-500"
              />
            </div>
            <Avatar>
              <AvatarImage src="/images/client.jpg" alt="David Moore" />
              <AvatarFallback>DM</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">David Moore</h2>
              <p className="text-sm text-gray-500">17 September, 2023</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href={`${routes.TELEMEDICINE_APPOINTMENTS}/${appointmentId}/video-call`}>
              <ShadButton
                variant="ghost"
                size="icon"
                className="hover:text-primary-500"
              >
                <Video className="h-5 w-5" />
              </ShadButton>
            </Link>
            <Link href={`${routes.TELEMEDICINE_APPOINTMENTS}/${appointmentId}/call`}>
              <ShadButton
                variant="ghost"
                size="icon"
                className="hover:text-primary-500"
              >
                <Phone className="h-5 w-5" />
              </ShadButton>
            </Link>
          </div>
        </div>
        <div className="px-6">
          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"} space-x-4 mb-4`}
            >
              {!message.isUser && (
                <Avatar>
                  <AvatarImage src={message.avatar} alt={message.sender} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`flex-1 ${message.isUser ? "text-right" : "text-left"}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{message.sender}</h3>
                  <span className="text-sm text-gray-500">
                    {message.timestamp}
                  </span>
                </div>
                <p
                  className={`mt-1 inline-block rounded-lg p-3 shadow ${message.isUser ? "bg-primary-500 text-white" : "bg-white"}`}
                >
                  {message.content}
                </p>
                <div
                  className={`my-2 flex items-center space-x-2 ${message.isUser ? "justify-end" : "justify-start"}`}
                ></div>
              </div>
              {message.isUser && (
                <Avatar>
                  <AvatarImage src={message.avatar} alt={message.sender} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="border-t bg-white p-4">
        <div className="flex items-center space-x-2">
          <Textarea
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="h-5 flex-1 resize-none rounded-lg border p-2"
            rows={1}
            maxLength={1000}
          />

          <ShadButton
            variant="ghost"
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <SendHorizonal className="h-8 w-8 text-blue-500" />
          </ShadButton>
        </div>
      </div>
    </div>
  );
}
