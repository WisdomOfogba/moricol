import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constants/navlinks";

export default function Footer() {
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
