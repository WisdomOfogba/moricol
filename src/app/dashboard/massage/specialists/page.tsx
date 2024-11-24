import Button from "@/components/button";
import NavigateToPrevPage from "@/components/dashboard/prev-page";
import MasseuseCard from "@/components/massage/masseuse-card";
import FilterButton from "@/components/modals/filter";
import { FavouriteSVG } from "@/components/svgs";
import { MassageData } from "@/definition";
import { massageApi } from "@/api/massage";
import { getUserSession } from "@/lib/auth";

export const metadata = {
  title: "Massage Specialists",
  description: "Find and book professional massage therapists",
};

async function getMassageData() {
  const session = await getUserSession();
  if (!session) {
    throw new Error("User session is invalid");
  }
  const { data: massageData }: { data: MassageData[] } = await massageApi.getAllStaff({ massageid: "", gender: "", rating: 0 }, session);
  return massageData;
}

export default async function AllMasseuse() {
  const massageData = await getMassageData();
  console.log(massageData);
  return (
    <div>
      <NavigateToPrevPage />

      <div className="px-4">
        <section className="flex items-center justify-center gap-x-3 border-b border-b-gray-300 py-6">
          <FilterButton />
          <Button variant="outline" className="w-fit">
            <FavouriteSVG />
          </Button>
        </section>
        <section className="grid grid-cols-2 gap-x-10 gap-y-9">
          {massageData.map((masseuse) => (
            <MasseuseCard key={masseuse._id} masseuse={masseuse} />
          ))}
        </section>
      </div>
    </div>
  );
}
