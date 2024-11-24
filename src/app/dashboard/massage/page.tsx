import { routes } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
// import { getUserSession } from "@/lib/auth";
// import { MassageData } from "@/definition";
// import { massageApi } from "@/api/massage";

export const metadata: Metadata = {
  title: "Massage",
  description: "Schedule a massage appointment",
};



// async function getMassageData() {
//   try {
//     const session = await getUserSession();
//     if (!session || !session.user || !('id' in session.user)) {
//       throw new Error('User session is invalid or user ID is missing');
//     }
//     const { data: massageData }: { data: MassageData } = await massageApi.getAllStaff({ massageid: "", gender: "", rating: 0 }, session);
//     return massageData;
//   } catch (error) {
//     throw new Error(error instanceof Error ? error.message : 'Failed to get profile data');
//   }
// }

export default function MassageHome() {

  return (
    <main className="px-4  py-9">
      <section className="mb-6">
        <h1 className="mb-1 text-2xl font-medium leading-9">Book a Massage</h1>
        <p className="text-gray-500">Find and book professional massage therapists</p>
      </section>
      <section className="mb-7 border-y border-y-gray-300 py-6">
        <p className="mb-2 text-lg">Schedule a Massage Appointment</p>
        <Link
          href={routes.MASSAGESPECIALISTS}
          className="inline-block w-full max-w-[377px] rounded-lg bg-primary-500 py-3.5 text-center text-white hover:bg-primary-600 transition-colors"
        >
          Book Now
        </Link>
      </section>
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="shrink-0 text-xl">Featured Therapists</h2>
          <Link
            href={routes.MASSAGESPECIALISTS}
            className="w-fit text-primary-500 hover:text-primary-600 transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <MasseuseCard />
          <MasseuseCard />
          <MasseuseCard />
        </div>
      </section>
    </main>
  );
}

function MasseuseCard() {
  return (
    <Link href={routes.MASSAGESINGLESPECIALIST} className="block hover:opacity-90 transition-opacity">
      <article className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <div className="relative h-[140px] w-full">
          <Image
            src="/images/client.jpg"
            alt="Massage Therapist"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-3 text-center">
          <p className="mb-1 flex items-center justify-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span className="font-medium text-gray-500">4.5</span>
          </p>
          <h3 className="mb-1 text-sm font-medium">Sarah Johnson</h3>
          <p className="text-xs text-gray-500">Massage Therapist</p>
        </div>
      </article>
    </Link>
  );
}
