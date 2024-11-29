"use client";

import { useRouter } from "next/navigation";
import { ArrowRightSvg } from "@/components/svgs";

export default function PrevPageBtn() {
  const router = useRouter();

  return (
    <button
      className="flex w-[30px] h-[30px] md:h-[58px] md:w-[58px] items-center justify-center rounded-full bg-white"
      onClick={() => router.back()}
    >
      <ArrowRightSvg stroke="#1D2026" />
    </button>
  );
}
