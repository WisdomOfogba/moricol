import Accordion from "@/components/accordion";
import { faq } from "@/constants/faq";
import { feedback } from "@/constants/feedback";
import { footerLinks, navLinks } from "@/constants/navlinks";
import { services } from "@/constants/services";
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

function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-x-11 bg-white px-9 py-2">
      <div>
        <Image src="/logo.svg" alt="Moricol logo" width={161} height={80.76} />
      </div>
      <ul className="flex gap-x-11 text-sm font-bold">
        {navLinks.map(({ href, name }) => (
          <li key={name}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
      <div>
        <button className="flex items-center rounded-lg bg-primary-50">
          <div className="border-r-2 border-r-primary-500 py-3.5 pl-2 pr-2.5">
            <Image
              src="/icons/world.svg"
              alt="World icon"
              width={20}
              height={20}
            />
          </div>
          <div className="flex pl-2.5 pr-1.5">
            <>
              <Image
                src="/icons/usa-flag.svg"
                alt="USA flag"
                width={20}
                height={15}
              />
              <p className="ml-2 mr-2.5">EN</p>
            </>
            <div className="px-[3.75px] pb-[6.75px] pt-[8.25px]">
              <Image
                src="/icons/chevron.svg"
                alt="chevron icon"
                width={16.5}
                height={9}
              />
            </div>
          </div>
        </button>
      </div>
    </nav>
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
        <p className="text-primary-600 mb-2 text-xl font-medium">
          WHAT YOU NEED IN HEALTHCARE
        </p>
        <h2 className="text-5.5xl mb-6 font-extrabold leading-[3.5rem]">
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
      <div className="bg-secondary-400 absolute -right-[201px] bottom-[125px] -z-50 h-[596px] w-[596px] rounded-full">
        <div className="bg-secondary-600 absolute right-[257px] top-[76px] -z-50 h-[154px] w-[154px] rounded-full" />
      </div>
      <div className="absolute -left-[355px] top-1/2 -z-50 h-[710px] w-[710px] -translate-y-1/2 rounded-full bg-primary-500">
        <div className="bg-primary-400 absolute right-[120px] top-[132px] h-[131px] w-[131px] rounded-full" />
      </div>
    </section>
  );
}

function Telemedicine() {
  return (
    <SectionTemplateV1
      data={Object.assign(services.telemedicine, {
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
      data={Object.assign(services.homeCare, {
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
      data={Object.assign(services.training, {
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
      data={Object.assign(services.onlinePharmacy, {
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
      data={Object.assign(services.recruitment, {
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
      data={Object.assign(services.medicalLoan, {
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
      data={Object.assign(services.massageTherapy, {
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
        <h3 className="text-primary-600 mb-2 font-medium">YOU CAN!</h3>
        <h2 className="text-5.5xl mb-6 font-extrabold leading-[3.5rem]">
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
        <h2 className="text-5.5xl mb-6 font-extrabold leading-[3.5rem] text-primary-500">
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
        <div className="bg-primary-400 absolute -top-[46px] left-[63px] h-20 w-20 rounded-full" />
        <div className="absolute -left-[59px] bottom-[265px] -z-10 h-[99px] w-[99px] rounded-full bg-[#38BDF8]" />
      </div>

      {/* Right side */}
      <div className="w-[700px]">
        <div className="mb-9">
          <h3 className="text-primary-600 mb-2 text-xl font-semibold">
            SERVICES
          </h3>
          <h2 className="text-5.5xl mb-6 font-extrabold leading-[3.5rem]">
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
          <h3 className="text-primary-600 mb-2 text-xl font-semibold">
            SERVICES
          </h3>
          <h2 className="text-5.5xl mb-6 font-extrabold leading-[3.5rem]">
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

function Footer() {
  return (
    <footer>
      <section className="bg-primary-700 text-primary-50">
        {/* NavLinks */}
        <ul className="flex items-center justify-center gap-x-16 border-b-2 border-b-[#CCEBF9] pb-10 pt-8">
          {footerLinks.map(({ name, href }) => (
            <li key={href}>
              <Link href={href}>{name}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between p-10">
          {/* Left side */}
          <div className="w-[679px]">
            <Image
              src="/logo-transparent.png"
              alt="Moricon logo"
              width={206}
              height={94}
              className="mb-6"
            />
            <p className="mb-7 text-lg">
              Our goal is to provide quality care and give you the best service
              in the process
            </p>

            <address className="item-center mb-5 flex gap-x-3 not-italic">
              <LocationSVG />
              House 2, Road 4 Abraham Adesanya Estate, Ajah Lekki, Lagos State
            </address>
            <address className="item-center mb-5 flex gap-x-3 not-italic">
              <LocationSVG />
              27 Rueben Agho Avenue off 2nd Ugbor Road, GRA, Benin City
            </address>
            <p className="flex items-center gap-x-3">
              <SupportSVG />
              <span>support@moricolhealth.com</span>
              <span>infomoricolhealthcare@gmail.com</span>
            </p>
          </div>
          {/* Right side */}
          <article className="max-w-[498px]">
            <h3 className="mb-2 text-2xl font-medium">
              Stay connected (Subscribe)
            </h3>
            <p className="mb-5 text-lg">
              The latest Moricol news, articles, and resources, sent straight to
              your inbox every month.
            </p>

            <form>
              <div className="mb-6">
                <label htmlFor="email" className="mb-1 block">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full rounded-lg py-3"
                />
              </div>
              <button className="font-seimi w-full rounded-lg bg-primary-500 py-3">
                SUBSCRIBE
              </button>
            </form>

            <div className="mt-4 flex justify-end gap-x-9">
              <Image
                src="/icons/facebook.png"
                width={20}
                height={20}
                alt="facebook logo"
              />
              <Image
                src="/icons/instagram.png"
                width={20}
                height={20}
                alt="instagram logo"
              />
              <Image
                src="/icons/twitter.png"
                width={20}
                height={20}
                alt="twitter logo"
              />
              <Image
                src="/icons/whatsapp-white.png"
                width={20}
                height={20}
                alt="whatsapp logo"
              />
            </div>
          </article>
        </div>
      </section>

      {/* Copyright */}
      <section className="flex items-center justify-between bg-primary-50 px-12 py-4">
        <p>© 2023 Moricol Limited</p>
        <p>Terms & Condition</p>
        <p>Privacy Policy</p>
      </section>
    </footer>
  );
}

function LocationSVG() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 13.0156C13.6569 13.0156 15 11.6725 15 10.0156C15 8.35877 13.6569 7.01562 12 7.01562C10.3431 7.01562 9 8.35877 9 10.0156C9 11.6725 10.3431 13.0156 12 13.0156Z"
        stroke="#E6F6FC"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.5 10.0156C19.5 16.7656 12 22.0156 12 22.0156C12 22.0156 4.5 16.7656 4.5 10.0156C4.5 8.0265 5.29018 6.11885 6.6967 4.71232C8.10322 3.3058 10.0109 2.51563 12 2.51562C13.9891 2.51563 15.8968 3.3058 17.3033 4.71232C18.7098 6.11885 19.5 8.0265 19.5 10.0156V10.0156Z"
        stroke="#E6F6FC"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function SupportSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.364 5.636L14.828 9.172M18.364 5.636C16.6762 3.94817 14.3869 3 12 3C9.61305 3 7.32383 3.94817 5.636 5.636M18.364 5.636C20.0518 7.32383 21 9.61305 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5283 18.364 18.364M14.828 9.172C14.0779 8.42185 13.0609 8 12 8C10.9391 8 9.92215 8.42185 9.172 9.172M14.828 9.172C15.5781 9.92215 16 10.9391 16 12C16 13.0609 15.5781 14.0779 14.828 14.828M14.828 14.828L18.364 18.364M14.828 14.828C14.0779 15.5781 13.0609 16 12 16C10.9391 16 9.92215 15.5781 9.172 14.828M18.364 18.364C17.5283 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47173 19.1997 5.636 18.364M9.172 9.172L5.636 5.636M9.172 9.172C8.42185 9.92215 8 10.9391 8 12C8 13.0609 8.42185 14.0779 9.172 14.828M5.636 5.636C3.94817 7.32383 3 9.61305 3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80027 17.5283 5.636 18.364M9.172 14.828L5.636 18.364"
        stroke="#FDF5E8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
