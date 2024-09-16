import Image from "next/image";
import Link from "next/link";

export default function Blog() {
  return (
    <main>
      <section className="p-20 text-[#0F172A]">
        <div className="mb-6">
          <h1 className="mb-3 text-3xl font-semibold">
            Get Informed about the latest happenings
          </h1>
          <p>
            We keep you informed about everything and anything you need to know
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <form className="max-w-[724px] grow">
            <label htmlFor="search" className="mb-1 block">
              Search for blog
            </label>
            <input
              type="text"
              id="search"
              className="w-full rounded-lg border border-gray-500 bg-white px-3.5 py-3"
            />
          </form>
          <button className="flex w-[281px] items-center justify-center gap-x-3 rounded-lg bg-primary-500 py-3 text-primary-50">
            Filter by Category <FilterSVG />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-x-7 gap-y-5">
          {Array(8)
            .fill("")
            .map((_, i) => (
              <BlogCard id={i} />
            ))}
        </div>
      </section>
    </main>
  );
}

function FilterSVG() {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.1009 4.09998V6.29998C21.1009 7.09998 20.6009 8.09998 20.1009 8.59998L15.8009 12.4C15.2009 12.9 14.8009 13.9 14.8009 14.7V19C14.8009 19.6 14.4009 20.4 13.9009 20.7L12.5009 21.6C11.2009 22.4 9.40086 21.5 9.40086 19.9V14.6C9.40086 13.9 9.00086 13 8.60086 12.5L8.13086 12.01C7.82086 11.68 7.76086 11.18 8.01086 10.79L13.1309 2.56998C13.3109 2.27998 13.6309 2.09998 13.9809 2.09998H19.1009C20.2009 2.09998 21.1009 2.99998 21.1009 4.09998Z"
        fill="#FDF5E8"
      />
      <path
        d="M6.87509 9.05706C6.70906 9.32565 6.31856 9.37042 6.0922 9.13488C6.09198 9.13465 6.09176 9.13442 6.09154 9.13419L5.16308 8.1558L5.1632 8.15568L5.15394 8.14642C4.95688 7.94936 4.76324 7.65438 4.61915 7.33295C4.47312 7.0072 4.40039 6.70449 4.40039 6.49998V4.19998C4.40039 3.26 5.09238 2.59998 5.90039 2.59998H10.0004C10.3851 2.59998 10.6314 3.02735 10.4249 3.36744L6.87618 9.05531L6.87618 9.05531L6.87509 9.05706Z"
        fill="#FDF5E8"
        stroke="#FDF5E8"
      />
    </svg>
  );
}

function BlogCard({ id }: { id: number }) {
  return (
    <Link href={`/blog/${id}`}>
      <article className="relative w-[285.05px] overflow-hidden rounded">
        <div>
          <Image
            src="/images/blog-img.jpg"
            alt=""
            width={285.05}
            height={238}
          />
        </div>
        <div className="grid gap-y-3 p-4 font-medium text-[#6D7280]">
          <p className="text-xxs">08.08.2023</p>
          <h3 className="text-sm text-gray-700">
            Unveiling the Future of Secure E-commerce
          </h3>
          <p className="text-xxs">
            Dive into the world of verified seller networks and learn how
            Payluk's rigorous identity verification process ...
          </p>

          <div className="my-4 h-[0.42px] bg-[#E5E5E5]" />

          <article className="flex items-center gap-x-3.5">
            <Image
              src="/images/avatar.png"
              alt=""
              width={45.98}
              height={42.5}
              className="rounded-full"
            />
            <div className="text-xxs font-semibold text-[#6D7280]">
              <h3>
                By <span className="text-gray-700">Jennifer Lawrence</span>
              </h3>
              <p>Thinker & Designer</p>
            </div>
          </article>
        </div>

        <Badge text="Technology" />
      </article>
    </Link>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div className="text-xxs absolute right-6 top-4 rounded-[6px] bg-white/15 px-2 py-1 text-sm font-semibold text-white">
      {text}
    </div>
  );
}
