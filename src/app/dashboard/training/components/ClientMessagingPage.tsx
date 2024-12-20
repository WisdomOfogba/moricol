"use client";

import React, { useEffect, useRef, useState } from "react";
import { PaperPlaneSvg, PencilLine } from "@/components/svgs";
import Button from "@/components/button";
import { CourseApi } from "@/api/training";
import { Session } from "next-auth";
import Image from "next/image";
import { archive, messaging } from "@/definition";
import { formatRelativeTime } from "@/util/formatTime";

function ThreeDotsMenu() {
  return (
    <div className="flex h-6 w-6 items-center justify-center gap-x-[3px]">
      {Array(3)
        .fill("")
        .map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-[#1D2026]" />
        ))}
    </div>
  );
}


function IncomingMessage({msg, admin_photo}: {msg: messaging; admin_photo: string;}) {
  return (
    <article className="w-full max-w-[536px]">
      <div className="mb-2 flex items-center gap-x-1.5">
        <div className="relative h-6 w-6 rounded-full">
          <Image
            src={admin_photo || "/images/client.jpg"}
            alt=""
            fill
            sizes="24px"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </div>
        <p className="text-xs text-[#6E7485]">{formatRelativeTime(msg.createdAt)}</p>
      </div>
      <p className="bg-primary-300 px-3 py-2 text-sm text-[#1D2026]">
        {msg.message}
      </p>
    </article>
  );
}

function OutGoingMessage({msg}: {msg: messaging}) {
  return (
    <div className="flex justify-end">
      <article className="w-full max-w-[536px]">
        <p className="mb-2 text-right text-xs text-[#6E7485]">{formatRelativeTime(msg.createdAt)}</p>

        <p className="bg-primary-100 px-3 py-2 text-sm text-[#1D2026]">
          {msg.message}
        </p>
      </article>
    </div>
  );
}


export default function ClientMessagingPage({
  archive,
  messages: initialMessages,
  session,
  adminid,
}: {
  archive: archive[];
  adminid: string;
  messages: messaging[];
  session: Session; // session is passed down from the server component
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isInitialRender = useRef(true);
  const lastMessageId = useRef(messages[0]?._id); // Track the last message's ID

  const admin = archive.find((a) => a.admin_details._id === adminid);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Scroll to bottom only on initial render or when a new message is added
    if (isInitialRender.current) {
      scrollToBottom();
      isInitialRender.current = false;
    } else {
      const latestMessage = messages[0];
      if (latestMessage?._id !== lastMessageId.current) {
        // Scroll only if a new message is added
        lastMessageId.current = latestMessage?._id;
        scrollToBottom();
      }
    }
  }, [messages]);

  // Polling for new messages
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetchMessages();
        if (response.data) {
          setMessages((prevMessages) => {
            const newMessages = response.data.filter(
              (msg) => !prevMessages.some((prev) => prev._id === msg._id)
            );
            return [...newMessages, ...prevMessages];
          });
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    try {
      if (!adminid) {
        throw new Error("Admin ID is missing.");
      }

      const response = await sendMessage({
        adminid,
        message: newMessage,
        session,
      });
      setMessages((prev) => [response.data, ...prev]);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  async function sendMessage({
    adminid,
    message,
    session,
  }: {
    adminid: string;
    message: string;
    session: Session;
  }) {
    try {
      const response = await CourseApi.sendMessages({
        userid: session.user.id,
        session,
        message,
        adminid,
      });
      return response;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  }

  async function fetchMessages() {
    try {
      const response = await CourseApi.getMessages({
        adminid,
        userid: session.user.id,
        session,
      });
      return response;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch messages"
      );
    }
  }

  return (
    <section className="relative w-full border border-[#E9EAF0] pb-24">
      {/* Messaging Header */}
      <header className="flex items-center justify-between border-b border-b-[#E9EAF0] px-6 py-5">
        <article className="flex items-center gap-x-4">
          <div className="relative h-16 w-16 rounded-full">
            <Image
              src={admin?.admin_details.photo || "/images/client.jpg"}
              alt=""
              fill
              sizes="48px"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
            <div className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#23BD33]" />
          </div>
          <div className="text-sm text-[#4E5566]">
            <h3 className="mb-2 text-lg font-medium text-[#1D2026]">
              {admin ? admin.admin_details.name : "New Instructor"}
            </h3>
            <p>online</p>
          </div>
        </article>
        <button className="bg-[#F5F7FA] p-3">
          <ThreeDotsMenu />
        </button>
      </header>

      {/* Messaging Body */}
      <section className="no-scrollbar grid max-h-[678px] gap-y-6 overflow-y-auto px-6 py-12">
        {messages
          .slice()
          .reverse()
          .map((msg) =>
            msg.sender === "user" ? (
              <OutGoingMessage key={msg._id} msg={msg} />
            ) : (
              <IncomingMessage admin_photo={admin?.admin_details.photo as string} key={msg._id} msg={msg} />
            )
          )}
        <div ref={messagesEndRef}></div>
      </section>

      {/* Messaging Footer */}
      <form
        onSubmit={handleSendMessage}
        className="absolute bottom-0 flex w-full gap-x-5 border-t border-[#E9EAF0] p-6"
      >
        <div className="flex grow items-center gap-x-3 border border-[#E9EAF0] px-4 py-3 text-[#4E5566]">
          <PencilLine />
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Your message..."
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <Button className="flex w-fit shrink-0 items-center gap-x-3 rounded-none py-3">
          Send <PaperPlaneSvg />
        </Button>
      </form>
    </section>
  );
}
