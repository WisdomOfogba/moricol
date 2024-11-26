"use client";
import { ChatCircles } from "@/components/svgs";
import { comment, ProfileData, reply } from "@/definition";
import { formatRelativeTime } from "@/util/formatTime";
import Image from "next/image";
import React, { useState } from "react";
import Reply from "./Reply";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { CourseApi } from "@/api/training";

const Comment = ({ profileData, comment }: { profileData: ProfileData; comment: comment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="mb-6">
      {/* Main Comment */}
      <div className="flex space-x-3">
        {/* User Avatar */}
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={comment.userid.photo || profileData.photo || "/images/client.jpg"}
            alt={`${comment.userid.firstname || profileData.firstname} ${comment.userid.lastname || profileData.lastname}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Comment Content */}
        <div className="flex-1">
          <div className="mb-2 flex items-center space-x-2">
            <span className="text-sm font-medium text-[#1D2026]">
            {comment.userid.firstname || profileData.firstname} {comment.userid.lastname || profileData.lastname}
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
        <ReplySection profileData={profileData} commentid={comment._id} showReplyForm={showReplyForm} reply={comment.reply} />
    </div>
  );
};

const ReplySection = ({ reply: initialReply, showReplyForm, commentid, profileData }: { reply: reply[], showReplyForm: boolean, commentid: string, profileData: ProfileData }) => {
  const [reply, setReply] = useState(initialReply);
  const { data: session } = useSession();
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
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
        <div className="ml-12 mt-3 items-start flex flex-col gap-x-4 ">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            className="w-full rounded-md border p-2 text-sm focus:p-2"
          />
          <button
          disabled={replyText === ""}
            onClick={handleReplySubmit}
            className="mt-2 rounded bg-primary-500 px-4 py-2 text-sm text-white"
          >
          {loading ? "Replying Comment..." : "Reply Comment"}
          </button>
        </div>
      )}
      <div className="ml-6 mt-4 border-l-2 border-gray-200 pl-4">
        {reply.map((reply, i) => (
          <Reply profileData={profileData} key={i} reply={reply} />
        ))}
      </div>
    </div>
  );
};
export default Comment;
