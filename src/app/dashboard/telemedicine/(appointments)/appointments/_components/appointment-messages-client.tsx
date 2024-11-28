"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import {
  Video,
  Phone,
  ChevronLeft,
  SendHorizonal,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Textarea } from "@/components/textarea";
import { ShadButton } from "@/components/shadcn-button";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useChat } from "@/hooks/useChat";
import dayjs from "dayjs";
import { MessagePayload, SingleAppointmentData } from "@/definition";
import { BsExclamationCircle } from "react-icons/bs";

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
    session_close: appointment.session_close
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
              <AvatarFallback>{getStaffDetails().firstname}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{`${getStaffDetails().firstname} ${getStaffDetails().lastname}`}</h2>
              {!isLoading && !appointment.session_close && <p className="text-sm text-gray-500">{
                dayjs().format('MMMM D, YYYY')
              }</p>}
              {!isLoading && appointment.session_close && <p className="text-sm text-gray-500">
                SESSION ENDED
              </p>}

              {isLoading && <div className="text-sm text-gray-500 flex items-center italics">
                Connecting <Loader2 className="animate-spin ml-2 h-4 w-4" />
              </div>}
            </div>
          </div>
          <div className="flex space-x-2">
            {appointment.sessiontype.video && <Link href={`${routes.TELEMEDICINE_APPOINTMENTS}/${appointmentId}/video-call`}>
              <ShadButton
                variant="ghost"
                size="icon"
                className="hover:text-primary-500"
              >
                <Video className="h-5 w-5" />
              </ShadButton>
            </Link>}
            {appointment.sessiontype.audio && <Link href={`${routes.TELEMEDICINE_APPOINTMENTS}/${appointmentId}/call`}>
              <ShadButton
                variant="ghost"
                size="icon"
                className="hover:text-primary-500"
              >
                <Phone className="h-5 w-5" />
              </ShadButton>
            </Link>}
          </div>
        </div>
        {appointment.sessiontype.chat && <div className="px-6">
          {/* Messages */}
          {messages.map((message) => (
            <MessageItem photo={message.userid === session?.user.id ? appointment.userid.photo : getStaffDetails().photo} key={message.text} message={message} isUser={message.userid === session?.user.id} username={`${session?.user.firstname} ${session?.user.lastname}`} />
          ))}
          <div ref={messagesEndRef} />
        </div>}

        {!appointment.sessiontype.chat &&
          <div className="flex flex-col items-center justify-center p-4 bg-yellow-100 border border-yellow-300 rounded">
            <BsExclamationCircle className="h-12 w-12 text-yellow-500 mb-4" aria-hidden="true" />
            <h2 className="font-semibold text-lg">Chat is not available for this appointment.</h2>
            <p className="text-sm text-gray-600">Allowed session types:</p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {appointment.sessiontype.chat && (
                <li className="flex items-center gap-2">
                  <Link className="flex items-center gap-2" href={`${routes.TELEMEDICINE_APPOINTMENTS}/${appointmentId}/messages`}>
                    <span className="text-green-500">💬</span> Chat
                  </Link>
                </li>
              )}
              {appointment.sessiontype.video && (
                <li className="flex items-center gap-2">
                  <Link className="flex items-center gap-2" href={`${routes.TELEMEDICINE_APPOINTMENTS}/${appointmentId}/video-call`}>
                    <Video className="h-4 w-4 text-green-500" /> Video
                  </Link>
                </li>
              )}
              {appointment.sessiontype.audio && (
                <li className="flex items-center gap-2">
                  <Link className="flex items-center gap-2" href={`${routes.TELEMEDICINE_APPOINTMENTS}/${appointmentId}/call`}>
                    <Phone className="h-4 w-4 text-green-500" /> Audio
                  </Link>
                </li>
              )}
            </ul>
          </div>

        }
      </div>

      {/* Message input */}
      <div className="border-t bg-white p-4">
        <small className="uppercase text-xs text-red-500">no connected</small>
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
const MessageItem = memo(function MessageItem({ message, isUser, username, photo }: { message: MessagePayload, isUser: boolean, username: string, photo: string }) {
  return (
    <div
      className={`flex ${!isUser ? "justify-end" : "justify-start"} space-x-4 mb-4`}
    >
      <Avatar>
        <AvatarImage src={photo} alt={username} />
        <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
      </Avatar>
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

    </div>
  );
});