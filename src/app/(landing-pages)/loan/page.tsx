import { loans } from "@/constants";
import { routes } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

export default function Loan() {
  return (
    <>
      <header className="flex justify-between gap-x-20 bg-[#346887] px-20 pt-12 text-white">
        <div className="max-w-[686px] self-center">
          <h1 className="mb-8 text-5xl font-bold leading-[3.5rem]">
            Find Help in your Health Journey
          </h1>
          <p>
            We understand that your health is a priority, and we&apos;re
            committed to ensuring you have access to the best care possible.
            Medical expenses can often come unannounced, causing stress and
            financial strain. Our Medical Loan service is designed to ease this
            burden and empower you to prioritize your well-being without
            compromising on quality healthcare. experience.
          </p>
          <div className="mt-9 flex gap-x-2.5">
            <Link
              href={routes.LOANDASHBOARDHOME}
              className="block w-full max-w-[293px] rounded-lg bg-primary-500 px-9 py-3 text-center text-primary-50"
            >
              GET STARTED
            </Link>
            <Link
              href={routes.LOGIN}
              className="block w-full max-w-[293px] rounded-lg border border-primary-500 bg-white px-9 py-3 text-center text-primary-500"
            >
              LOGIN
            </Link>
          </div>
        </div>
        <Image
          src="/images/loan.png"
          alt=""
          width={600}
          height={600}
          className="self-end"
        />
      </header>
      <main>
        <section className="p-20">
          <h2 className="mb-6 text-center text-4xl font-medium">
            How it works
          </h2>

          <div className="grid grid-cols-3 gap-x-20">
            {loans.map(({ SvgComponent, details }, i) => (
              <article
                className="rounded-lg border-4 border-[#9CA3AF] p-8 shadow-lg"
                key={i}
              >
                <div className="mb-4 flex justify-center">
                  {" "}
                  <SvgComponent />
                </div>
                <p className="fong text-center">{details}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
