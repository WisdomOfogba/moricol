"use client";
import { ChatCircles } from "@/components/svgs";
import { comment, reply } from "@/definition";
import { formatRelativeTime } from "@/util/formatTime";
import Image from "next/image";
import React, { useState } from "react";
import Reply from "./Reply";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { CourseApi } from "@/api/training";

const Comment = ({ comment }: { comment: comment }) => {
  const { data: session } = useSession();
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="mb-6">
      {/* Main Comment */}
      <div className="flex space-x-3">
        {/* User Avatar */}
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src="/images/client.jpg"
            alt={`${comment.userid.firstname || session?.user.firstname} ${comment.userid.lastname || session?.user.lastname}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Comment Content */}
        <div className="flex-1">
          <div className="mb-2 flex items-center space-x-2">
            <span className="text-sm font-medium text-[#1D2026]">
            {comment.userid.firstname || session?.user.firstname} {comment.userid.lastname || session?.user.lastname}
            </span>
            <span className="text-xs text-[#6E7485]">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <p className="mb-2 text-sm">{comment.comment}</p>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-x-2 text-sm text-[#8C94A3]"
          >
            <ChatCircles />
            REPLY
          </button>
        </div>
      </div>

      {/* Replies Section */}
        <ReplySection commentid={comment._id} showReplyForm={showReplyForm} reply={comment.reply} />
    </div>
  );
};

const ReplySection = ({ reply: initialReply, showReplyForm, commentid }: { reply: reply[], showReplyForm: boolean, commentid: string }) => {
  const [reply, setReply] = useState(initialReply);
  const { data: session } = useSession();
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await sendReply({
        userid: session?.user.id as string,
        reply: replyText,
        session: session as Session,
        commentid,
      });
      setReply((prev) => [...prev, response.data]);
      setReplyText("");
    } catch (err) {
      console.error("Failed to Reply Post:", err);
    }
  };

  async function sendReply({
    userid,
    reply,
    commentid,
    session,
  }: {
    userid: string;
    reply: string;
    commentid: string;
    session: Session;
  }) {
    try {
      const response = await CourseApi.sendReply({
        userid,
        reply,
        commentid,
        session,
      });
      return response;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to Reply Post",
      );
    }
  }
  return (
    <div>
      {showReplyForm && (
        <div className="ml-12 mt-3 flex flex-col gap-x-4 sm:flex-row">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            className="w-full rounded-md border p-2 text-sm focus:p-2 sm:w-2/3"
          />
          <button
            onClick={handleReplySubmit}
            className="mt-2 rounded bg-primary-500 px-4 py-2 text-sm text-white"
          >
            Post Reply
          </button>
        </div>
      )}
      <div className="ml-6 mt-4 border-l-2 border-gray-200 pl-4">
        {reply.map((reply, i) => (
          <Reply key={i} reply={reply} />
        ))}
      </div>
    </div>
  );
};
export default Comment;
