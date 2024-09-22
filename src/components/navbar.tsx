import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
    </nav>
  );
}

// Language Switcher but currently not supported
{
  /* <div>
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
      </div> */
}
