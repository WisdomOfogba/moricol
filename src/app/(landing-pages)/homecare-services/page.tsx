import Image from "next/image";

export default function Homecare() {
  return (
    <header className="flex items-center justify-between gap-x-20 px-20 py-12">
      <Image src="/images/homecare.png" alt="" width={600} height={600} />
      <div className="max-w-[600px]">
        <h1 className="text-5.5xl mb-8 font-bold leading-[3.5rem]">
          Bringing Quality Healthcare to Your Home
        </h1>
        <p>
          Welcome to Moricol Healthcare&apos;s Homecare Services—a dedicated
          initiative focused on providing person centered care within the
          comfort of your home. We understand the importance of a nurturing
          environment during recovery, and our team of skilled caregivers and
          professionals is committed to ensuring that you receive the highest
          standard of care right at your doorstep.
        </p>
        <div className="mt-9 flex gap-x-2.5">
          <button className="w-full rounded-lg bg-primary-500 px-9 py-3 text-primary-50">
            GET STARTED
          </button>
          <button className="w-full rounded-lg border border-primary-500 px-9 py-3 text-primary-500">
            LOGIN
          </button>
        </div>
      </div>
    </header>
  );
}
