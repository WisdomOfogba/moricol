import { ProfileData, reply } from "@/definition";
import { formatRelativeTime } from "@/util/formatTime";
import Image from "next/image";
import React from "react";

const Reply = ({ reply, profileData }: {reply: reply, profileData: ProfileData}) => {

  return (
    <div key={reply._id} className="mb-4">
      <div className="flex space-x-3">
        {/* Reply Avatar */}
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image
            src={reply.userid.photo || profileData.photo || "/images/client.jpg"}
            alt={`${reply.userid.firstname || profileData.firstname} ${reply.userid.lastname || profileData.lastname}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Reply Content */}
        <div className="flex-1">
          <div className="mb-1 flex items-center space-x-2">
            <span className="text-sm font-medium text-[#1D2026]">
            {reply.userid.firstname || profileData.firstname} {reply.userid.lastname || profileData.lastname}
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
