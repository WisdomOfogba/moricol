"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
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
import { useSession } from "next-auth/react";
import { useChat } from "@/hooks/useChat";
import { MessagePayload, SingleAppointmentData } from "@/definition";

export default function AppointmentMessagesClient({
  appointment
}: {
  appointment: SingleAppointmentData
}) {
  const { data: session } = useSession();
  const params = useParams();
  const appointmentId = params.id as string;

  const {
    messages,
    isConnected,
    sendMessage,
    emitTyping,
    emitStopTyping,
  } = useChat({
    roomId: {
      appointmentid: appointmentId,
      userid: session?.user.id as string
    },
    userId: session?.user?.id || '',
    userName: `${session?.user?.firstname} ${session?.user?.lastname}`,
    userAvatar: session?.user?.image as string
  });

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!session?.user?.id) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  }, [session?.user?.id]);

  const handleSendMessage = () => {
    sendMessage(newMessage.trim());
    setNewMessage("");
  }



  function getStaffDetails() {
    if (typeof appointment.staffid === 'string') {
      return { firstname: '', lastname: '', photo: '' }
    } else {
      return appointment.staffid
    }
  }

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
              <AvatarImage src={getStaffDetails().photo} alt={getStaffDetails().firstname} />
              <AvatarFallback>DM</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{`${getStaffDetails().firstname} ${getStaffDetails().lastname}`}</h2>
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
            <MessageItem key={message.text} message={message} isUser={message.userid === session?.user.id} username={`${session?.user.firstname} ${session?.user.lastname}`} />
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
            onChange={(e) => {
              setNewMessage(e.target.value);
              emitTyping();
            }}
            onBlur={emitStopTyping}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="h-5 flex-1 resize-none rounded-lg border p-2"
            rows={1}
            maxLength={1000}
            disabled={!isConnected}
          />

          <ShadButton
            variant="ghost"
            size="icon"
            onClick={handleSendMessage}
            disabled={!isConnected || !newMessage.trim()}
          >
            <SendHorizonal className="h-8 w-8 text-blue-500" />
          </ShadButton>
        </div>
      </div>
    </div>
  );
}








// Memoize message components to prevent unnecessary re-renders
const MessageItem = memo(function MessageItem({ message, isUser, username }: { message: MessagePayload, isUser: boolean, username: string }) {
  return (
    <div
      className={`flex ${!isUser ? "justify-end" : "justify-start"} space-x-4 mb-4`}
    >
      {!isUser && (
        <Avatar>
          <AvatarFallback>{message.userid}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`flex-1 ${isUser ? "text-right" : "text-left"}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{username}</h3>
          <span className="text-sm text-gray-500">
            {/* {message.timestamp} */}
            no time stamps
          </span>
        </div>
        <p
          className={`mt-1 inline-block rounded-lg p-3 shadow ${isUser ? "bg-primary-500 text-white" : "bg-white"}`}
        >
          {message.text}
        </p>
        <div
          className={`my-2 flex items-center space-x-2 ${isUser ? "justify-end" : "justify-start"}`}
        ></div>
      </div>
      {isUser && (
        <Avatar>
          {/* <AvatarImage src={message.avatar} alt={message.sender} /> */}
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
});