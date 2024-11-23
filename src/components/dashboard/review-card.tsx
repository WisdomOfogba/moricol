import { convertDate } from "@/util/get-total";
import Image from "next/image";

export default function ReviewCard({
  review,
  date,
  rating,
  name,
}: {
  rating: number;
  name: string;
  review: string;
  date: string;
}) {
  return (
    <article className="border-b border-b-gray-300 px-10 pb-6 text-xs text-[#777A95] last:border-none lg:flex">
      <div className="mb-5">
        <Profile name={name} rating={rating} />
        <p className="pt-5">{review}</p>
      </div>
      <p className="text-right">{convertDate(date)}</p>
    </article>
  );
}

function Profile({ name, rating }: { name: string; rating: number }) {
  return (
    <article className="flex shrink-0 items-center gap-x-4">
      <Image
        src="/images/client.jpg"
        alt=""
        width={48}
        height={48}
        className="h-12 w-auto rounded-xl"
      />
      <div>
        <h3 className="text-base font-medium text-gray-700">{name}</h3>
        <div className="flex gap-2">
          {Array(rating)
            .fill("")
            .map(() => (
              <span key={Math.random()}>⭐</span>
            ))}
        </div>
      </div>
    </article>
  );
}
