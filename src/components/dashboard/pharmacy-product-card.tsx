"use client";

import Image from "next/image";
import { StarSVG } from "../svgs";
import { cn } from "@/util/cn";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";

export default function ProductCard({
  bestSelling,
  prescription = true,
}: {
  bestSelling?: boolean;
  prescription?: true;
}) {
  const router = useRouter();

  const navigateToPrescriptionPageOrProductDetailsPage = () => {
    if (prescription) {
      router.push(routes.PHARMARCYPRESCRIPTION);
    } else {
      router.push(routes.PHARMARCYPRODUCT);
    }
  };

  return (
    <article
      className="relative max-w-[151.24px] cursor-pointer text-center"
      onClick={navigateToPrescriptionPageOrProductDetailsPage}
    >
      <div className="relative h-[214.51px] w-[151.24px] overflow-hidden">
        <Image
          src="/images/dashboard/drug.png"
          alt="Doctor profile"
          fill
          sizes="151px"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="py-3">
        <h3 className="mb-0.5 text-sm">Pepto-bismol</h3>
        {bestSelling && (
          <div className="mb-1 mt-0.5 flex justify-center gap-x-1">
            <StarSVG fill="#E7A542" />
            <StarSVG />
            <StarSVG />
            <StarSVG />
            <StarSVG />
          </div>
        )}
        <p className="font-bold text-primary-500">₦200.10</p>
      </div>

      <DiscountBadge className="absolute -left-2 top-2" />
    </article>
  );
}

function DiscountBadge({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "rounded bg-[#F1CCCE] px-2 py-1 font-semibold text-secondary-400",
        className,
      )}
    >
      -200%
    </div>
  );
}
