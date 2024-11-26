import Link from "next/link";
import NavigateToPrevPage from "@/components/dashboard/prev-page";
import MassageServiceCard from "@/components/massage/massage-service-card";
import { UsersSVG } from "@/components/svgs";
import { routes } from "@/constants/routes";
import { MassageServiceData } from "@/definition";
import { getUserSession } from "@/lib/auth";
import { massageApi } from "@/api/massage";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Massage Services",
  description: "Massage Services",
};

async function getMassageData() {
  try {
    const session = await getUserSession();
    if (!session || !session.user || !('id' in session.user)) {
      throw new Error('User session is invalid or user ID is missing');
    }
    const { data: featuredMassageData }: { data: MassageServiceData[] } = await massageApi.getAllMassage(session);
    return { featuredMassageData };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get profile data');
  }
}

export default async function MassageServices() {
  const { featuredMassageData } = await getMassageData();

  return (
    <main>
      <NavigateToPrevPage />

      <div className="px-4 sm:px-10 lg:px-20 py-5">
        <section className="mb-12 border-b border-y-gray-300 pb-6">
          <p className="mb-2 text-lg sm:text-xl">Schedule a Massage Appointment</p>
          <Link
            href={routes.MASSAGESPECIALISTS}
            className="inline-block w-full max-w-[377px] rounded-lg bg-primary-500 py-3.5 text-center text-white"
          >
            Schedule a Massage Appointment
          </Link>
        </section>
        <section className="grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-9">
          <Link href="specialists">
            <article className="flex h-[172.1px] flex-col items-center justify-center gap-y-5 rounded bg-[#BD3D44] font-semibold text-white">
              <UsersSVG />
              <p>All Masseurs</p>
            </article>
          </Link>
          {featuredMassageData.map((service) => (
            <MassageServiceCard key={service._id} bg={service.image} service={service.name} id={service._id} />
          ))}
        </section>
      </div>
    </main>
  );
}
