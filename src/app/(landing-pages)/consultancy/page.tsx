import CircleFolderSVG from "@/assets/svgs/circlefoldersvg";
import Image from "next/image";

export default function Consultancy() {
  return (
    <main className="pb-20">
      <section className="flex items-center justify-between gap-x-20 px-20 py-12">
        <div className="max-w-[600px]">
          <h1 className="text-5.5xl mb-8 font-bold leading-[3.5rem]">
            Your Virtual Healthcare Hub
          </h1>
          <p>
            Welcome to Moricol Healthcare&apos;s Telemedicine platform - your gateway
            to accessible, convenient, and reliable healthcare from the comfort
            of your home. Our telemedicine service is designed to connect you
            with experienced Specialists, enabling you to receive personalized
            medical consultations and expert advice without leaving your
            doorstep.
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
        <Image
          src="/images/healthcare-hub.png"
          alt=""
          width={600}
          height={600}
        />
      </section>
      <section className="mb-20 flex items-start justify-center gap-x-12 bg-gradient-to-b from-[#F1F5F9] to-[#FFFFFF00] py-6">
        <article className="flex max-w-[394px] flex-col items-center pt-10 text-center">
          <CircleFolderSVG fillColor="#EF4444" />
          <h3 className="mb-3 mt-2 text-lg font-bold">Convenience</h3>
          <p>
            Enjoy the ease of scheduling appointments at your convenience,
            eliminating the need for travel and long waiting times at clinics
          </p>
        </article>
        <article className="flex max-w-[394px] flex-col items-center pt-10 text-center">
          <CircleFolderSVG fillColor="#EAB308" />
          <h3 className="mb-3 mt-2 text-lg font-bold">Time-Saving</h3>
          <p>
            Save time by consulting with Specialists without the hassle of
            commuting to a physical healthcare facility.
          </p>
        </article>
        <article className="flex max-w-[394px] flex-col items-center pt-10 text-center">
          <CircleFolderSVG fillColor="#2563EB" />
          <h3 className="mb-3 mt-2 text-lg font-bold">Access to Specialists</h3>
          <p>
            Gain access to a wide network of specialists, irrespective of your
            location, ensuring you receive specialized care and advice.
          </p>
        </article>
      </section>
      <section className="flex items-center justify-between gap-x-20 px-20 py-12">
        <Image
          src="/images/virtual-massage.png"
          alt=""
          width={600}
          height={600}
        />
        <div className="max-w-[600px]">
          <h1 className="text-5.5xl mb-8 font-bold leading-[3.5rem]">
            Your Virtual Massage Hub
          </h1>
          <p>
            At Moricol, we take pride in our team of seasoned massage
            therapists, each a master in the art of healing touch. Our
            therapists are not merely practitioners; they are artisans who blend
            expertise with empathy, tailoring each session to your unique needs.
            From tension-relieving Swedish massages to the profound benefits of
            deep tissue treatments, our diverse range of therapies is designed
            to cater to every aspect of your well-being.
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
      </section>
      <section className="flex items-start justify-center gap-x-12 bg-gradient-to-b from-[#F1F5F9] to-[#FFFFFF00] py-6">
        <article className="flex max-w-[394px] flex-col items-center pt-10 text-center">
          <CircleFolderSVG fillColor="#EF4444" />
          <h3 className="mb-3 mt-2 text-lg font-bold">Harmony Haven</h3>
          <p>
            Our expert therapists combine ancient massage techniques with modern
            healthcare principles to bring you a holistic experience. that
            rejuvenates and restores balance.
          </p>
        </article>
        <article className="flex max-w-[394px] flex-col items-center pt-10 text-center">
          <CircleFolderSVG fillColor="#EAB308" />
          <h3 className="mb-3 mt-2 text-lg font-bold">Revive Rhythms</h3>
          <p>
            Our skilled practitioners use a blend of therapeutic massage and
            healthcare expertise to awaken your senses and promote overall
            well-being.
          </p>
        </article>
        <article className="flex max-w-[394px] flex-col items-center pt-10 text-center">
          <CircleFolderSVG fillColor="#2563EB" />
          <h3 className="mb-3 mt-2 text-lg font-bold">Vitality Vortex</h3>
          <p>
            Our skilled therapists create a vortex of vitality around you, using
            specialized techniques that not only address physical tension but
            also promote mental clarity.
          </p>
        </article>
      </section>
    </main>
  );
}
