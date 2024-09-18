import Image from "next/image";

export default function Training() {
  return (
    <header className="flex items-center justify-between gap-x-20 px-20 py-12">
      <Image src="/images/training.png" alt="" width={600} height={600} />
      <div className="max-w-[600px]">
        <h1 className="text-5.5xl mb-8 font-bold leading-[3.5rem]">
          Welcome to Moricol Healthcare&apos;s Training Hub!
        </h1>
        <p>
          Our commitment to empowering Specialists and enthusiasts drives us to
          provide a comprehensive and diverse range of educational
          opportunities. We understand the importance of continuous learning and
          development in the dynamic field of healthcare. This is why we offer
          high-quality, industry-relevant training programs tailored to suit
          your needs and aspirations
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