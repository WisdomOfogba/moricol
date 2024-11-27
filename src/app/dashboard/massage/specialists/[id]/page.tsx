import { getUserSession } from "@/lib/auth";
import { massageApi } from "@/api/massage";
import { SingleMassageData } from "@/definition";
import BookAppointmentClient from "./_components/book-appointment-client";

export const metadata = {
  title: "Massage Specialists",
  description: "Find and book professional massage therapists",
};

async function getMassageData(id: string) {
  const session = await getUserSession();
  if (!session) {
    throw new Error("User session is invalid");
  }
  const { data: massageData }: { data: SingleMassageData } = await massageApi.getSingleStaff(id, session);
  return massageData;
}

export default async function MasseuseProfile({ params }: { params: { id: string } }) {
  const massageData = await getMassageData(params.id);

  console.log(massageData)

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-[90%] sm:max-w-[818px]">
        <BookAppointmentClient massageData={massageData} />
      </div>
    </main>
  );
}
