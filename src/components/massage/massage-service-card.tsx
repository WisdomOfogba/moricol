import { routes } from "@/constants/routes";
import Link from "next/link";

export default function MassageServiceCard({
  id,
  bg,
  service,
}: {
  id: string | number;
  bg: string;
  service: string;
}) {
  return (
    <Link href={`${routes.MASSAGESPECIALISTS}?id=${id}`} className="max-w-[201.78px] block">
      <article
        className="relative h-[172.1px] rounded bg-cover bg-no-repeat object-top"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%), url(${bg})`
        }}
      >
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 overflow-hidden text-center capitalize text-sm font-semibold text-white">
          {service}
        </p>
      </article>
    </Link>
  );
}
