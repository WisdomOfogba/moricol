import Image from "next/image";
import { HeartSVG, StarSVG } from "@/components/svgs";

export default function TrainingProfileWishlists() {
  return (
    <main className="px-14 py-12">
      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold text-[#1D2026]">
          Wishlists (3)
        </h2>
      </section>

      <section>
        <div className="border border-[#E9EAF0]">
          <div className="grid grid-cols-[3fr_1fr_2fr] border-b border-b-[#E9EAF0] px-6 py-5 text-sm font-medium text-[#4E5566]">
            <h3>COURSE</h3>
            <h3>PRICES</h3>
            <h3>ACTION</h3>
          </div>
          <Wishlists />
        </div>
      </section>
    </main>
  );
}

function Wishlists() {
  return (
    <article className="grid grid-cols-[3fr_1fr_2fr] items-center border-b border-b-[#E9EAF0] px-6 py-6 last:border-none">
      <WishlistCourseCard />
      <div className="text-lg font-medium text-primary-500">₦37.00</div>
      <div className="flex gap-x-3">
        <button className="h-12 w-[176px] bg-[#F5F7FA] font-semibold text-[#1D2026]">
          Buy Now
        </button>
        <button className="h-12 w-[176px] bg-primary-500 font-semibold text-white">
          Buy Now
        </button>
        <button className="bg-primary-100 h-12 px-3 font-semibold text-white">
          <HeartSVG fill="#E29A13" className="h-6 w-6" />
        </button>
      </div>
    </article>
  );
}

function WishlistCourseCard() {
  return (
    <article className="flex gap-x-5 text-[#1D2026]">
      <div className="relative h-[120px] w-40 overflow-hidden">
        <Image
          src="/images/dashboard/drug.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <div className="mb-2 flex items-center gap-x-2 text-sm font-medium">
            <StarSVG fill="#FD8E1F" />
            <p>
              4.6 <span className="text-[#8C94A3]">(451434 Review)</span>
            </p>
          </div>
          <h3 className="mb-6 font-medium">
            The Ultimate Drawing Course - Beginner to Advanced
          </h3>
        </div>

        {/* if there are more than two authors use the dot separator else comot am */}
        <div className="text-sm text-[#4E5566]">
          <span className="mr-1.5 text-[#A1A5B3]">Course by:</span>
          Harry Potter{" "}
          <div className="mx-1.5 inline-block h-1 w-1 rounded-full bg-[#4E5566]" />{" "}
          Joen Mosil
        </div>
      </div>
    </article>
  );
}
