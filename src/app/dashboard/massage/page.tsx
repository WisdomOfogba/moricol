import Button from "@/components/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="px-20 py-9">
      <section className="mb-6">
        <h1 className="mb-1 text-2xl font-medium leading-9">Welcome, Amaka</h1>
        <p className="text-gray-500">Find your suitable doctors here</p>
      </section>
      <section className="mb-7 border-y border-y-gray-300 py-6">
        <p className="mb-2 text-xl">Schedule a Massage Appointment</p>
        <Button className="max-w-[377px]">
          Schedule a Massage Appointment
        </Button>
      </section>
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="shrink-0 text-xl">Top Masseuse</h2>
          <Button variant="text" className="w-fit">
            View all
          </Button>
        </div>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-9">
          <MasseuseCard />
        </div>
      </section>
    </main>
  );
}

function MasseuseCard() {
  return (
    <article className="w-[114px] overflow-hidden rounded-b rounded-t-lg border border-[#A0A2B333]">
      <Image src="/images/client.jpg" alt="" width={114} height={143} />
      <div className="py-1 text-center text-xs">
        <p className="mb-1">
          <span>⭐</span>
          <span className="font-medium text-gray-500">4.5</span>
        </p>
        <h3 className="mb-1 text-sm font-medium">Dr. John Doe</h3>
        <p className="text-gray-500">Heart Surgeon</p>
      </div>
    </article>
  );
}