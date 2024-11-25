import Button from "@/components/button";
import NavigateToPrevPage from "@/components/dashboard/prev-page";
import MasseuseCard from "@/components/massage/masseuse-card";
import FilterButton from "@/components/modals/filter";
import { FavouriteSVG } from "@/components/svgs";
import { MassageData } from "@/definition";
import { massageApi } from "@/api/massage";
import { getUserSession } from "@/lib/auth";
import NoItemsFound from "@/components/no-item-found";

export const metadata = {
  title: "Massage Specialists",
  description: "Find and book professional massage therapists",
};

async function getMassageData({ id = '' }: { id: string }) {
  const session = await getUserSession();
  if (!session) {
    throw new Error("User session is invalid");
  }
  const { data: massageData }: { data: MassageData[] } = await massageApi.getAllStaff({ massageid: id, gender: "", rating: 0 }, session);
  return massageData;
}

export default async function AllMasseuse({
  searchParams
}: {
  searchParams: { id: string }
}) {
  const massageData = await getMassageData({ id: searchParams.id ?? '' });

  const handleSubmitFilters = async () => {
    "use server"
    // Logic to handle filter submission can be added here: collect gender, massage type and rdirect
  };

  return (
    <div>
      <NavigateToPrevPage />

      <div className="px-4">
        <section className="flex items-center justify-center gap-x-3 border-b border-b-gray-300 py-6">
          <FilterButton submitFilters={handleSubmitFilters} />
          <Button variant="outline" className="w-fit">
            <FavouriteSVG />
          </Button>
        </section>
        <section className="grid grid-cols-2 gap-x-10 gap-y-9">
          {massageData.map((masseuse) => (
            <MasseuseCard key={masseuse._id} masseuse={masseuse} />
          ))}

        </section>
        {massageData.length === 0 && <NoItemsFound />}
      </div>
    </div>
  );
}
