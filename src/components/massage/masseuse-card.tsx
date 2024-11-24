"use client";

import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { MassageData } from "@/definition";
import { routes } from "@/constants/routes";

export default function MasseuseCard({ masseuse }: { masseuse: MassageData }) {
  // const router = useRouter();

  // const handleReviewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   router.push("specialists/1/reviews");
  // };


  return (
    <Link href={`${routes.MASSAGESINGLESPECIALIST}/${masseuse._id}`} className="block">
      <article className="flex items-center gap-x-4 border-b border-gray-300 p-4">
        <Image
          src={masseuse.photo.startsWith('https') ? masseuse.photo : '/images/client.jpg'}
          alt="Masseuse"
          width={66}
          height={66}
          className="rounded-xl"
        />
        <div className="grow">
          <h3 className="font-medium capitalize">{masseuse.firstname} {masseuse.lastname}</h3>
          {/* <p className="mb-2 text-xs font-medium text-gray-500">⭐ 4.5</p> */}
          {/* <div className="flex justify-between text-xs">
            <p className="text-[#777A95]">{masseuse.massage_specialty[0].massageid}</p>
            <button
              className="border-none bg-transparent p-0 text-primary-500"
              onClick={handleReviewClick}
            >
              ({masseuse.massage_specialty[0].totalreviews} Reviews)
            </button>
          </div> */}
        </div>
      </article>
    </Link>
  );
}
