import Accordion from "@/components/accordion";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { faq, feedback, landingPageServices } from "@/constants";

import { SectionTemplateProps } from "@/definition";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="relative">
        <Navbar />
        <Hero />

        {/* Illustration */}
        <svg
          width="673"
          height="694"
          viewBox="0 0 673 694"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-0 top-0 -z-50"
        >
          <path
            d="M673 0H158.125C21.3126 142.265 -107.666 492.12 140.534 637.976C374.769 775.625 605.087 624.306 673 559.79V0Z"
            fill="#BAE6FD"
          />
        </svg>
      </header>
      <main className="overflow-hidden">
        <Category />
        <Telemedicine />
        <HomeCare />
        <Training />
        <OnlinePharmarcy />
        <Recruitment />
        <MedicalLoan />
        <MassageTherapy />
        <Feedback />
        <Persuasion />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="flex items-center justify-between p-20">
      {/* Left hand side */}
      <div className="flex max-w-[600px] flex-col gap-y-6">
        <h1 className="text-7xl font-extrabold">
          Healthcare Solution at your fingertip
        </h1>
        <p className="text-xl">
          Our goal is to provide quality care and get you in and out as quickly
          as possible
        </p>
        <div className="flex items-center gap-x-9">
          <Image
            src="/buttons/google-play.svg"
            alt="Google play store download button"
            width={162}
            height={48}
          />
          <Image
            src="/buttons/app-store.svg"
            alt="Apple store download button"
            width={162}
            height={48}
          />
        </div>
      </div>

      {/* Right hand side */}
      <div className="relative">
        <Image
          src="/images/hero-img.jpg"
          alt="Different human's hand with a toy in it"
          width={645}
          height={473}
          priority
          className="rounded-3xl"
        />

        {/* Circles */}
        <div className="absolute -left-2.5 -top-[50px] h-[149px] w-[149px] rounded-full bg-primary-500" />
        <div className="absolute -right-[46px] top-[71px] h-[74px] w-[74px] rounded-full bg-[#A855F7]" />
        <div className="absolute -bottom-[76px] right-[200px] h-[70px] w-[70px] rounded-full bg-[#E0F2FE]" />
        <div className="absolute -top-[61px] right-[87px] h-[23px] w-[23px] rounded-full bg-[#E0F2FE]" />
      </div>
    </section>
  );
}

function Category() {
  return (
    <section className="relative flex flex-col items-center pb-32 pt-20">
      <div className="mb-8 max-w-[900px] text-center">
        <p className="mb-2 text-xl font-medium text-primary-600">
          WHAT YOU NEED IN HEALTHCARE
        </p>
        <h2 className="mb-6 text-5.5xl font-extrabold leading-[3.5rem]">
          Pick a Category
        </h2>
        <p className="text-lg">
          We offer different range of services for you to take from. We are very
          concerned about your daily lifestyle as well as the journey you would
          take to get there. Let’s here you get there in due time
        </p>
      </div>
      <Image src="/images/category-img.png" alt="" width={1100} height={694} />

      {/* Circles */}
      <div className="absolute -right-[201px] bottom-[125px] -z-50 h-[596px] w-[596px] rounded-full bg-secondary-400">
        <div className="absolute right-[257px] top-[76px] -z-50 h-[154px] w-[154px] rounded-full bg-secondary-600" />
      </div>
      <div className="absolute -left-[355px] top-1/2 -z-50 h-[710px] w-[710px] -translate-y-1/2 rounded-full bg-primary-500">
        <div className="absolute right-[120px] top-[132px] h-[131px] w-[131px] rounded-full bg-primary-400" />
      </div>
    </section>
  );
}

function Telemedicine() {
  return (
    <SectionTemplateV1
      data={Object.assign(landingPageServices.telemedicine, {
        img: {
          imgURL: "/images/telemedicine-img.png",
          altText:
            "A nurse conversing with a doctor via a video call on a computer",
        },
      })}
    />
  );
}

function HomeCare() {
  return (
    <SectionTemplateV2
      data={Object.assign(landingPageServices.homeCare, {
        img: {
          imgURL: "/images/homecare-img.png",
          altText:
            "A doctor on skyblue uniform holding a book and pen and smiling",
        },
      })}
    />
  );
}

function Training() {
  return (
    <SectionTemplateV1
      data={Object.assign(landingPageServices.training, {
        img: {
          imgURL: "/images/training-img.png",
          altText:
            "An aspiring doctor siting in front of a computer and studying",
        },
      })}
    />
  );
}

function OnlinePharmarcy() {
  return (
    <SectionTemplateV2
      data={Object.assign(landingPageServices.onlinePharmacy, {
        img: {
          imgURL: "/images/online-pharmacy.png",
          altText: "A supplement tablet in someone's palm",
        },
      })}
    />
  );
}

function Recruitment() {
  return (
    <SectionTemplateV1
      data={Object.assign(landingPageServices.recruitment, {
        img: {
          imgURL: "/images/recruitment.png",
          altText: "A man on black suit smiling at the camera",
        },
      })}
    />
  );
}

function MedicalLoan() {
  return (
    <SectionTemplateV2
      data={Object.assign(landingPageServices.medicalLoan, {
        img: {
          imgURL: "/images/medical-loan.png",
          altText: "A sthethoscope, calculator and drug container on a table",
        },
      })}
    />
  );
}

function MassageTherapy() {
  return (
    <SectionTemplateV1
      data={Object.assign(landingPageServices.massageTherapy, {
        img: {
          imgURL: "/images/massage-therapy.png",
          altText: "A woman laying on the table and being massaged",
        },
      })}
    />
  );
}

function Feedback() {
  return (
    <section className="bg-[url('/images/gray-line-yellow-bg-img.svg')] bg-cover bg-no-repeat px-20 py-[6.25rem] text-[#133240]">
      <div className="mb-14 flex items-center justify-between">
        <div>
          <h2 className="mb-3 text-3xl font-bold">Our Customer Feedback</h2>
          <p className="text-lg">
            Don’t take our word for it. Trust our customers
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <button className="flex items-center rounded border border-[#133240] px-3 py-1.5 font-semibold text-[#133240] opacity-50">
            <div className="px-2 py-1.5">
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180"
              >
                <path
                  d="M0.111328 10.6385L4.70343 6.03637L0.111328 1.43424L1.52506 0.0205078L7.54092 6.03637L1.52506 12.0522L0.111328 10.6385Z"
                  fill="#9BD609"
                />
              </svg>
            </div>
            Previous
          </button>
          <button className="flex items-center rounded border border-[#133240] px-3 py-1.5 font-semibold text-[#133240]">
            Next
            <div className="px-2 py-1.5">
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.111328 10.6385L4.70343 6.03637L0.111328 1.43424L1.52506 0.0205078L7.54092 6.03637L1.52506 12.0522L0.111328 10.6385Z"
                  fill="#9BD609"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-6">
        {feedback.map(({ testimony, name, id, url }) => (
          <article
            className="rounded border border-[#E7EAEC] bg-white p-6"
            key={id}
          >
            <Image
              src={url}
              alt={`${name}'s photo`}
              width={60.16}
              height={60.16}
              className="mb-3"
            />
            <h3 className="text-xl font-semibold">{name}</h3>
            <p>{testimony}</p>
          </article>
        ))}
      </div>
      <div className="flex items-center justify-center gap-x-1 py-2">
        {/* 30% inactive classes */}
        {feedback.map((_, i) => (
          <button key={i} className="h-2 w-2 rounded-full bg-[#9BD609]/30" />
        ))}
      </div>
    </section>
  );
}

function Persuasion() {
  return (
    <section className="relative flex items-center justify-between gap-x-16 overflow-hidden p-20">
      <div className="shrink-0">
        <Image src="/images/persuasion.png" alt="" width={524} height={557} />
      </div>
      <div>
        <h3 className="mb-2 font-medium text-primary-600">YOU CAN!</h3>
        <h2 className="mb-6 text-5.5xl font-extrabold leading-[3.5rem]">
          Embrace Your Wellness Journey with Moricol Healthcare
        </h2>
        <p className="text-lg">
          Your health is your greatest asset, and nurturing it is a testament to
          your strength and determination. Each day offers a new opportunity to
          invest in your wellness, and we&apos;re here to support you in this
          empowering journey
        </p>
      </div>

      <div className="absolute -bottom-[373px] -right-[138px] -z-10 h-[624px] w-[624px] rounded-full bg-[#FEF3C7]" />
    </section>
  );
}

function FAQ() {
  return (
    <section className="bg-[#F1F5F9] p-20">
      <div className="mx-auto mb-14 max-w-[900px] text-center">
        <h2 className="mb-6 text-5.5xl font-extrabold leading-[3.5rem] text-primary-500">
          Frequently asked questions
        </h2>
        <p className="text-xl text-[#475569]">
          Et pulvinar nec interdum integer id urna molestie porta nullam. A,
          donec ornare sed turpis pulvinar purus maecenas quam a. Erat porttitor
          pharetra sed in mauris elementum sollicitudin.
        </p>
      </div>

      <div className="mb-6 grid gap-y-6">
        {faq.map(({ answer, question, id }) => (
          <Accordion key={id} question={question} answer={answer} />
        ))}
      </div>

      <article className="ml-auto flex max-w-[440px] flex-col items-center gap-y-5 rounded-lg bg-white py-3 text-center">
        <Image
          src="/icons/whatsapp.png"
          alt="whatsapp icon"
          width={30}
          height={30}
        />
        <div className="font-medium">
          <h3 className="mb-1 text-xl">Connect with us on Whatsapp</h3>
          <Link
            href="https://wa.me/+2349080010168"
            className="text-primary-500 underline"
          >
            Click to chat with us
          </Link>
        </div>
      </article>
    </section>
  );
}

function SectionTemplateV1({ data }: { data: SectionTemplateProps }) {
  return (
    <section className="relative flex items-center justify-between p-20">
      <RedBackgroundRectangle />

      {/* Left side */}
      <div className="relative">
        <Image
          src={data.img.imgURL}
          alt={data.img.altText}
          width={420}
          height={900}
        />
        {/* Circles */}
        <div className="absolute -top-[46px] left-[63px] h-20 w-20 rounded-full bg-primary-400" />
        <div className="absolute -left-[59px] bottom-[265px] -z-10 h-[99px] w-[99px] rounded-full bg-[#38BDF8]" />
      </div>

      {/* Right side */}
      <div className="w-[700px]">
        <div className="mb-9">
          <h3 className="mb-2 text-xl font-semibold text-primary-600">
            SERVICES
          </h3>
          <h2 className="mb-6 text-5.5xl font-extrabold leading-[3.5rem]">
            {data.title}
          </h2>
          <p className="text-lg">{data.description}</p>
        </div>

        <div className="flex flex-wrap justify-between gap-y-6">
          {data.feature.map(({ id, title, description }) => (
            <article className="max-w-[326px]" key={id}>
              <Image
                src="/icons/settings.svg"
                alt="icon"
                width={53.33}
                height={53.23}
                className="mb-4"
              />

              <h3 className="mb-4 text-xl font-bold">{title}</h3>
              <p className="text-lg">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTemplateV2({ data }: { data: SectionTemplateProps }) {
  return (
    <section className="relative flex items-center justify-between p-20">
      <YellowBackgroundRectangle />

      {/* Left side */}
      <div className="w-[700px]">
        <div className="mb-9">
          <h3 className="mb-2 text-xl font-semibold text-primary-600">
            SERVICES
          </h3>
          <h2 className="mb-6 text-5.5xl font-extrabold leading-[3.5rem]">
            {data.title}
          </h2>
          <p className="text-lg">{data.description}</p>
        </div>

        <div className="flex flex-wrap justify-between gap-y-6">
          {data.feature.map(({ id, title, description }) => (
            <article className="max-w-[326px]" key={id}>
              <Image
                src="/icons/settings.svg"
                alt="icon"
                width={53.33}
                height={53.23}
                className="mb-4"
              />

              <h3 className="mb-4 text-xl font-bold">{title}</h3>
              <p className="text-lg">{description}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="relative">
        <Image
          src={data.img.imgURL}
          alt={data.img.altText}
          width={420}
          height={900}
        />
        {/* Circles */}
        <div className="absolute -right-[41px] bottom-[203px] h-[115px] w-[115px] rounded-full border-4 border-white bg-[#BAE6FD]" />
      </div>
    </section>
  );
}

function RedBackgroundRectangle() {
  return (
    <svg
      width="573"
      height="1001"
      viewBox="0 0 573 1001"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-0 top-0 -z-50"
    >
      <path
        d="M26.4105 946.477C-164.907 1056.93 -409.543 991.384 -520 800.067C-630.457 608.75 -564.906 364.114 -373.589 253.657L-27.1793 53.6566C164.138 -56.8003 408.774 8.74977 519.231 200.067C629.688 391.384 564.138 636.02 372.821 746.477L26.4105 946.477Z"
        fill="#E04235"
      />
    </svg>
  );
}

function YellowBackgroundRectangle() {
  return (
    <svg
      width="574"
      height="1001"
      viewBox="0 0 574 1001"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -top-[37px] right-0 -z-50"
    >
      <path
        d="M546.821 53.6566C738.138 -56.8003 982.774 8.74977 1093.23 200.067C1203.69 391.384 1138.14 636.02 946.821 746.477L600.411 946.477C409.093 1056.93 164.457 991.384 54.0004 800.067C-56.4566 608.75 9.09352 364.114 200.411 253.657L546.821 53.6566Z"
        fill="#E8AE42"
      />
    </svg>
  );
}
