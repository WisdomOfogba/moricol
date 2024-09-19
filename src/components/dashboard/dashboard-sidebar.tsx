import Image from "next/image";

export default function DashboardSidebar() {
  return (
    <aside className="no-scrollbar max-h-screen min-h-screen w-[328px] shrink-0 overflow-y-auto bg-primary-500">
      <div className="flex h-[74px] items-center justify-center bg-white">
        <Image src="/logo.svg" alt="" width={102} height={46.17} />
      </div>
      <ul className="py-4">
        <li></li>
      </ul>
    </aside>
  );
}
