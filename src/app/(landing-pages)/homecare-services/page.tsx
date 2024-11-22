import Image from "next/image";
import Link from "next/link";

export default function Homecare() {
  return (
    <header className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-x-20 px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-12 pt-10">
      <Image
        src="/images/homecare.png"
        alt=""
        width={600}
        height={600}
        className="w-full md:w-1/2 h-auto"
      />
      <div className="w-full md:w-1/2 md:max-w-[600px]">
        <h1 className="mb-4 md:mb-8 text-3xl md:text-4xl lg:text-5.5xl font-bold leading-tight md:leading-[3.5rem]">
          Bringing Quality Healthcare to Your Home
        </h1>
        <p className="text-base md:text-lg">
          Welcome to Moricol Healthcare&apos;s Homecare Services—a dedicated
          initiative focused on providing person centered care within the
          comfort of your home. We understand the importance of a nurturing
          environment during recovery, and our team of skilled caregivers and
          professionals is committed to ensuring that you receive the highest
          standard of care right at your doorstep.
        </p>
        <div className="mt-6 md:mt-9 flex flex-col sm:flex-row gap-4 sm:gap-x-2.5">
          <Link
            href="/dashboard/homecare"
            className="w-full rounded-lg border border-primary-500 bg-primary-500 px-6 sm:px-9 py-3 text-center text-primary-50 transition duration-300 hover:border-primary-500/70 hover:bg-primary-500/70"
          >
            GET STARTED
          </Link>
          <button className="w-full rounded-lg border border-primary-500 px-6 sm:px-9 py-3 text-primary-500">
            LOGIN
          </button>
        </div>
      </div>
    </header>
  );
}
