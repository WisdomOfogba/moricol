import Button from "@/components/button";
import NavigateToPrevPage from "@/components/dashboard/prev-page";
import MasseuseCard from "@/components/massage/masseuse-card";
import FavouriteSVG from "@/components/svgs/favouritesvg";
import FilterSVG from "@/components/svgs/filtersvg";

export default function AllMasseuse() {
  return (
    <main>
      <NavigateToPrevPage />

      <div className="px-20">
        <section className="flex items-center justify-center gap-x-3 border-b border-b-gray-300 py-6">
          <Button
            variant="outline"
            className="flex max-w-[653px] items-center justify-between"
          >
            Filter Location, masseuse & dates
            <FilterSVG />
          </Button>
          <Button variant="outline" className="w-fit">
            <FavouriteSVG />
          </Button>
        </section>
        <section className="grid grid-cols-2 gap-x-[122px] gap-y-9">
          <MasseuseCard />
          <MasseuseCard />
          <MasseuseCard />
          <MasseuseCard />
        </section>
      </div>
    </main>
  );
}
