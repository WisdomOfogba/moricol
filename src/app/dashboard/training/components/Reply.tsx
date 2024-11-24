import { reply } from "@/definition";
import { formatRelativeTime } from "@/util/formatTime";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Reply = ({ reply }: {reply: reply}) => {
    const { data: session } = useSession();

  return (
    <div key={reply._id} className="mb-4">
      <div className="flex space-x-3">
        {/* Reply Avatar */}
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image
            src="/images/client.jpg"
            alt={`${reply.userid.firstname || session?.user.firstname} ${reply.userid.lastname || session?.user.lastname}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Reply Content */}
        <div className="flex-1">
          <div className="mb-1 flex items-center space-x-2">
            <span className="text-sm font-medium text-[#1D2026]">
            {reply.userid.firstname || session?.user.firstname} {reply.userid.lastname || session?.user.lastname}
            </span>
            <span className="text-xs text-[#6E7485]">
              {formatRelativeTime(reply.createdAt)}
            </span>
          </div>
          <p className="text-sm">{reply.reply}</p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
