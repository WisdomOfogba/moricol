import { massageApi } from "@/api/massage";
import NavigateToPrevPage from "@/components/dashboard/prev-page";
import MassageServiceCard from "@/components/massage/massage-service-card";
import { routes } from "@/constants/routes";
import { MassageServiceData } from "@/definition";
import { getUserSession } from "@/lib/auth";
import { Metadata } from "next";
import Link from "next/link";


export const dynamic = 'force-dynamic';

async function getSingleMassageData(id: string) {
  try {
    const session = await getUserSession();
    if (!session || !session.user || !('id' in session.user)) {
      throw new Error('User session is invalid or user ID is missing');
    }
    const { data: featuredMassageData }: { data: MassageServiceData } = await massageApi.getSingleMassage(id, session);
    return { featuredMassageData };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get profile data');
  }
}

export async function generateMetadata(
  { params }: { params: { id: string } },
): Promise<Metadata> {
  const id = params.id;
  const { featuredMassageData } = await getSingleMassageData(id);
  return {
    title: `Massage Service: ${featuredMassageData.name}`,
    description: `Details about the massage service: ${featuredMassageData.description}`,
  };
};

export default async function ServiceDetail({ params }: { params: { id: string } }) {

  const { featuredMassageData } = await getSingleMassageData(params.id);
  const data = featuredMassageData;

  return (
    <main>
      <NavigateToPrevPage />

      <div className="px-20 pb-20 pt-9">
        <MassageServiceCard bg={data.image} service={data.name} id={data._id} />

        <div className="mt-5 grid gap-y-6">


          <div>
            <h3 className="font-semibold">Description</h3>
            <p>
              {data.description}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Functionality</h3>
            <p>
              {data.functionality}
              dictum.
            </p>
          </div>
          <div>
            <Link
              href={`${routes.MASSAGESPECIALISTS}?id=${data._id}`}
              className="hover:bg-primary-500-80 inline-block w-full rounded-lg bg-primary-500 py-3.5 text-center text-white"
            >
              GO TO MASSEUSE
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
