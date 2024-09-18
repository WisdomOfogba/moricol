import { about } from "@/constants/about";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="bg-gray-50">
      <header className="mb-12 p-20 text-center">
        <h1 className="mb-8 text-5xl font-extrabold">About us</h1>
        <p className="text-lg">
          At MORICOL HEALTHCARE SERVICE we specialize in connecting exceptional
          healthcare talent with rewarding opportunities across Nigeria&apos;s
          vibrant healthcare sector. With our deep understanding of the
          healthcare industry and a vast network of professionals, we are
          committed to bridging the gap between skilled Specialists and
          healthcare institutions in need of their expertise.
        </p>
      </header>
      <main className="px-20">
        <section className="mb-12">
          <h2 className="mb-5 text-center text-2xl font-medium">
            Why work with us
          </h2>
          <div className="flex flex-wrap justify-between gap-x-12 gap-y-6">
            {about.map(({ title, desc }, i) => (
              <AboutCard key={i} data={{ title, desc }} />
            ))}
          </div>
        </section>

        <section className="mb-28">
          <h2 className="mb-9 text-center text-5xl font-bold">Our Team</h2>
          <div className="grid grid-cols-4 gap-x-5">
            {Array(4)
              .fill("")
              .map((_, i) => (
                <TeamCard key={i} />
              ))}
          </div>
        </section>

        <section>
          <div className="flex gap-x-12">
            <article className="z-20 w-1/2 rounded-t-3xl bg-white px-9 pb-20 pt-8 shadow-lg">
              <div className="mb-7 flex items-center gap-x-6">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 13.0156C13.6569 13.0156 15 11.6725 15 10.0156C15 8.35877 13.6569 7.01562 12 7.01562C10.3431 7.01562 9 8.35877 9 10.0156C9 11.6725 10.3431 13.0156 12 13.0156Z"
                    stroke="#E8AE42"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19.5 10.0156C19.5 16.7656 12 22.0156 12 22.0156C12 22.0156 4.5 16.7656 4.5 10.0156C4.5 8.0265 5.29018 6.11885 6.6967 4.71232C8.10322 3.3058 10.0109 2.51563 12 2.51562C13.9891 2.51563 15.8968 3.3058 17.3033 4.71232C18.7098 6.11885 19.5 8.0265 19.5 10.0156V10.0156Z"
                    stroke="#E8AE42"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="grow">
                  <h3 className="mb-2 text-3xl font-bold">Get In Touch</h3>
                  <ThreeYellowLines
                    lineOneMarginLeft="0px"
                    lineThreeMarginLeft="0px"
                  />
                </div>
              </div>
              <p className="mb-3 text-lg">
                Lorem ipsum dolor sit amet consectetur. Turpis amet et elementum
                in vestibulum leo. Tortor quisque malesuada sed nunc platea eget
                habitasse.
              </p>

              <div className="mb-9 flex items-center gap-x-6">
                <div className="bg-primary-400 flex h-14 w-14 items-center justify-center rounded-full"></div>
                <p className="text-lg">
                  Plot 3703 - 3704 Babangida Boulevard, Maitama Abuja, Nigeria
                </p>
              </div>
              <div className="mb-9 flex items-center gap-x-6">
                <div className="bg-primary-400 flex h-14 w-14 items-center justify-center rounded-full"></div>
                <p className="text-lg">+234 818 153 5915</p>
              </div>
              <div className="flex items-center gap-x-6">
                <div className="bg-primary-400 flex h-14 w-14 items-center justify-center rounded-full"></div>
                <p className="text-lg">info@moricolhealth.com</p>
              </div>
            </article>
            <div className="relative z-20 w-1/2 bg-[url('/images/map.png')]">
              <Image
                src="/images/map-attach.png"
                alt=""
                width={180}
                height={154}
                className="absolute -right-[40px] top-[162px]"
              />
              <p className="absolute -right-6 top-[198px] text-3xl font-bold text-white">
                Go to Map
              </p>
            </div>
          </div>
          <div className="relative z-10 -mx-20 -mt-32 h-[357px] rounded-t-[100px] bg-gray-800">
            <div className="absolute bottom-[52px] left-1/2 flex -translate-x-1/2 items-center justify-center">
              <Link
                href=""
                className="flex h-20 w-[264px] items-center justify-center gap-x-3 bg-gray-700 text-2xl text-[#E7F1E9]"
              >
                <Image
                  src="/icons/facebook.png"
                  width={36}
                  height={36}
                  alt="facebook logo"
                />
                <span>Facebook</span>
              </Link>
              <Link
                href=""
                className="flex h-20 w-[264px] items-center justify-center gap-x-3 bg-gray-600 text-2xl text-[#E7F1E9]"
              >
                <Image
                  src="/icons/instagram.png"
                  width={36}
                  height={36}
                  alt="instagram logo"
                />
                <span>Instagram</span>
              </Link>
              <Link
                href=""
                className="flex h-20 w-[264px] items-center justify-center gap-x-3 bg-gray-700 text-2xl text-[#E7F1E9]"
              >
                <Image
                  src="/icons/twitter.png"
                  width={36}
                  height={36}
                  alt="twitter logo"
                />
                <span>Twitter</span>
              </Link>
              <Link
                href=""
                className="flex h-20 w-[264px] items-center justify-center gap-x-3 bg-gray-600 text-2xl text-[#E7F1E9]"
              >
                <Image
                  src="/icons/facebook.png"
                  width={36}
                  height={36}
                  alt="linkedin logo"
                />
                <span>Linkedin</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="-mx-20 bg-primary-50 pb-16 pt-9">
          <h2 className="mb-9 text-center text-5xl font-bold">Send Message</h2>

          <form>
            <section className="mx-auto mb-12 flex max-w-[910px] flex-wrap justify-center gap-x-32 gap-y-11 rounded-3xl bg-white px-[6.25rem] py-10">
              <div className="max-w-[278px] grow">
                <label htmlFor="fname" className="mb-3 block text-[#8D8D8D]">
                  First Name
                </label>
                <input
                  type="text"
                  className="mb-3 w-full border-b border-b-[#8D8D8D] pb-1 focus:border-b-primary-500 focus:outline-none"
                />
              </div>
              <div className="max-w-[278px] grow">
                <label htmlFor="fname" className="mb-3 block text-[#8D8D8D]">
                  Last Name
                </label>
                <input
                  type="text"
                  className="mb-3 w-full border-b border-b-[#8D8D8D] pb-1 focus:border-b-primary-500 focus:outline-none"
                />
              </div>
              <div className="max-w-[278px] grow">
                <label htmlFor="fname" className="mb-3 block text-[#8D8D8D]">
                  Email
                </label>
                <input
                  type="text"
                  className="mb-3 w-full border-b border-b-[#8D8D8D] pb-1 focus:border-b-primary-500 focus:outline-none"
                />
              </div>
              <div className="max-w-[278px] grow">
                <label htmlFor="fname" className="mb-3 block text-[#8D8D8D]">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="mb-3 w-full border-b border-b-[#8D8D8D] pb-1 focus:border-b-primary-500 focus:outline-none"
                />
              </div>
              <div className="w-full grow">
                <p className="mb-3.5">Select Subject?</p>
                <div className="flex gap-x-5">
                  <div className="flex items-center gap-x-2.5">
                    <input type="radio" className="" />
                    <label htmlFor="fname" className="text-[#8D8D8D]">
                      General Enquiry
                    </label>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <input type="radio" />
                    <label htmlFor="">Consultancy</label>
                  </div>
                </div>
              </div>
              <div className="w-full grow">
                <label htmlFor="fname" className="mb-3 block text-[#8D8D8D]">
                  Message
                </label>
                <input
                  type="text"
                  className="mb-3 w-full border-b border-b-[#8D8D8D] pb-1 focus:border-b-primary-500 focus:outline-none"
                  placeholder="Write your message..."
                />
              </div>
            </section>
            <div className="text-center">
              <button className="w-[603px] rounded-lg bg-primary-500 py-3 text-primary-50">
                SEND MESSAGE
              </button>
            </div>
          </form>
          <button></button>
        </section>
      </main>
    </div>
  );
}

function AboutCard({ data }: { data: { title: string; desc: string } }) {
  return (
    <article className="max-w-[411px] rounded-lg bg-white px-6 py-4 shadow-lg">
      <h3 className="mb-4 text-xl font-medium text-black">{data.title}</h3>
      <p>{data.desc}</p>
    </article>
  );
}

function TeamCard() {
  return (
    <article className="max-w-[314px] overflow-hidden rounded-lg">
      <Image src="/images/partner.png" alt="" width={314} height={322} />
      <div className="rounded-b-lg border border-t-0 border-gray-700 p-4 text-center">
        <h3 className="mb-2 text-xl font-semibold">Partner/CEO</h3>
        <p className="mb-4 text-2xl text-gray-400">Adnan Adeosun</p>
        <ThreeYellowLines
          lineOneMarginLeft="100px"
          lineThreeMarginLeft="73px"
        />
      </div>
    </article>
  );
}

function ThreeYellowLines({
  lineOneMarginLeft,
  lineThreeMarginLeft,
}: {
  lineOneMarginLeft: string;
  lineThreeMarginLeft: string;
}) {
  return (
    <div className="flex max-w-[275px] flex-col gap-y-1.5">
      <div
        className="bg-primary-400 h-[3px] max-w-[146px]"
        style={{ marginLeft: lineOneMarginLeft }}
      />
      <div className="bg-primary-400 h-[3px]" />
      <div
        className="bg-primary-400 h-[3px] max-w-[95px]"
        style={{ marginLeft: lineThreeMarginLeft }}
      />
    </div>
  );
}
