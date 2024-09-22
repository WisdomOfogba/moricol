"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../button";
import { MdNotifications } from "react-icons/md";
import EditSVG from "../svgs/EditSVG";

export default function DashboardToolbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-[74px] items-center justify-end gap-x-9 bg-primary-500 px-10">
      <MdNotifications className="text-3xl text-primary-50" />
      <Image
        src="/images/client.jpg"
        alt=""
        height={48}
        width={48}
        className="h-12 w-12 rounded-full hover:cursor-pointer"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      />

      {showProfileMenu && <ProfileDropdown />}
    </header>
  );
}

function ProfileDropdown() {
  return (
    <article className="absolute right-2 top-[74px] w-full max-w-[320px] rounded-b-xl bg-white shadow-xl">
      <div className="flex flex-col items-center justify-center gap-y-2 py-2">
        <div className="relative h-20 w-20 rounded-full bg-[url('/images/client.jpg')] bg-cover bg-no-repeat">
          <div className="absolute left-[57px] top-[60px]">
            <EditSVG />
          </div>
        </div>
        <p>Jane Doe</p>
      </div>
      <div className="border-t border-t-primary-500 px-5 py-4">
        <p className="mb-1 text-sm text-primary-500">Switch Profile</p>
        <Button
          variant="outline"
          className="mb-7 flex items-center justify-between border-[#6D7280]"
        >
          Telemedicine
          <Image src="/icons/chevron.svg" alt="" width={16} height={9} />
        </Button>
        <Button variant="text" className="text-lg font-bold text-primary-500">
          Sign Out
        </Button>
      </div>
    </article>
  );
}
