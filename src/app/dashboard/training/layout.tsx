import Image from "next/image";
import {
  CartSvg,
  ChevronDownSvg,
  HeartSVG,
  NotificationSvg,
  SearchSvg,
} from "@/components/svgs";

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ToolBar />
      {children}
    </section>
  );
}

function ToolBar() {
  return (
    <header className="flex gap-x-20 border-b bg-white px-5 py-4">
      {/* Logo */}
      <div className="relative h-16 w-[127px]">
        <Image src="/logo.svg" alt="" fill sizes="127px" />
      </div>

      {/* Button and Input */}
      <div className="flex gap-x-4">
        <button className="flex w-52 items-center justify-between border border-[#E9EAF0] px-4 py-3 text-[#4E5566]">
          Browse <ChevronDownSvg />
        </button>
        <div className="flex w-[26rem] items-center gap-x-3 border border-[#E9EAF0] px-4 py-3 text-[#4E5566] has-[:focus]:border-primary-500 has-[:focus]:bg-primary-50">
          <SearchSvg />
          <input
            type="text"
            placeholder="What do you want to learn..."
            className="bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Icon and Profile */}
      <div className="flex grow items-center justify-end gap-x-6">
        <button className="relative">
          <NotificationSvg />
          <div className="absolute right-[1.4px] top-[1px] h-2 w-2 rounded-full border border-white bg-primary-500" />
        </button>
        <button>
          <HeartSVG className="h-6 w-6" fill="#1D2026" />
        </button>
        <button className="relative">
          <CartSvg />
          <div className="absolute -top-[3px] left-[11px] flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-medium leading-none text-white">
            1
          </div>
        </button>
        <button>
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src="/images/client.jpg"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </button>
      </div>
    </header>
  );
}
