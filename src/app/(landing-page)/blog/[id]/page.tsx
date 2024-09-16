import Image from "next/image";

export default function Blog({ param }: { param: string }) {
  console.log(param);

  return (
    <>
      <header className="relative h-[562.5px] bg-black/40 bg-[url('/images/blog-bg-img.jpg')] bg-cover bg-no-repeat bg-blend-overlay">
        <div className="absolute left-[95px] top-[272px] max-w-[762px] text-white">
          <h1 className="mb-3 text-5xl uppercase tracking-[0.35px]">
            5 Efficient Rules How to Organize Your Working Place
          </h1>
          <p className="mb-3.5 text-4xl">
            Relationship tips couples therapists are giving all the time
          </p>
          <div className="flex items-center gap-x-2">
            <p className="text-sm">by Joanna Wellick</p>
            <Separator color="white" />
            <p className="flex items-center gap-x-1.5 text-xs">
              <ClockSVG fill={"white"} />2 minute read
            </p>
            <Separator color="white" />
            <p className="flex items-center gap-x-1.5 text-xs">
              <ViewSVG fill={"white"} />
              1.6K views
            </p>
          </div>
        </div>
      </header>

      <main className="flex items-start gap-x-3 px-[6.25rem] py-9 text-sm leading-6">
        <section className="flex items-start gap-x-11">
          <div className="flex flex-col items-center justify-center text-[#121416]">
            <ViewSVG fill={"#121416"} />
            <span>views</span>
            <span>1.6k</span>
          </div>
          <div>
            <section className="mb-14">
              <div className="mb-14">
                <p className="mb-6">
                  Structured gripped tape invisible moulded cups for sauppor
                  firm hold strong powermesh front liner sport detail. Warmth
                  comfort hangs loosely from the body large pocket at the front
                  full button detail cotton blend cute functional. Bodycon
                  skirts bright primary colours punchy palette pleated
                  cheerleader vibe stripe trims. Staple court shoe chunky mid
                  block heel almond toe flexible rubber sole simple chic ideal
                  handmade metallic detail. Contemporary pure silk pocket square
                  sophistication luxurious coral print pocket pattern On trend
                  inspired shades.
                </p>
                <p>
                  Striking pewter studded epaulettes silver zips inner
                  drawstring waist channel urban edge single-breasted jacket.
                  Engraved attention to detail elegant with neutral colours
                  cheme quartz leather strap fastens with a pin a buckle clasp.
                  Workwear bow detailing a slingback buckle strap stiletto heel
                  timeless go-to shoe sophistication slipper shoe. Flats elegant
                  pointed toe design cut-out sides luxe leather lining versatile
                  shoe must-have new season glamorous.
                </p>
              </div>
              <div className="mb-7 flex items-start gap-x-6">
                <svg
                  width="30"
                  height="28"
                  viewBox="0 0 30 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.972 27.375L18.5138 24.9155C19.7057 22.8287 20.7485 20.7419 21.6424 18.6551C22.5363 16.6428 23.0578 14.6678 23.2068 12.73L17.6199 11.5003L17.6199 0.65625H29.6875V8.48183C29.6875 13.1026 28.7936 16.8291 27.0058 19.6612C25.1435 22.5679 23.1323 25.1391 20.972 27.375ZM4.21148 27.375L1.75327 24.9155C2.94513 22.8287 3.98801 20.7419 4.8819 18.6551C5.7758 16.6428 6.29724 14.6678 6.44622 12.73L0.859375 11.5003V0.65625H12.927V8.48183C12.927 13.1026 12.0331 16.8291 10.2453 19.6612C8.38299 22.5679 6.37173 25.1391 4.21148 27.375Z"
                    fill="#A9A9A9"
                  />
                </svg>
                <blockquote className="text-4xl uppercase">
                  Knicker lining concealed back zip fasten swing style high
                  waisted double layer full pattern floral.
                </blockquote>
              </div>

              <div>
                <p className="mb-6">
                  Foam padding in the insoles leather finest quality staple flat
                  slip-on design pointed toe off-duty shoe. Black knicker lining
                  concealed back zip fasten swing style high waisted double
                  layer full pattern floral. Polished finish elegant court shoe
                  work duty stretchy slingback strap mid kitten heel this
                  ladylike design
                </p>
                <p>
                  Eget aenean tellus venenatis. Donec odio tempus. Felis arcu
                  pretium metus nullam quam aenean sociis quis sem neque vici
                  libero. Venenatis nullam fringilla pretium magnis aliquam nunc
                  vulputate integer augue ultricies cras. Eget viverra feugiat
                  cras ut. Sit natoque montes tempus ligula eget vitae pede
                  rhoncus maecenas consectetuer commodo condimentum aenean.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 text-4xl uppercase">
                Eu ridiculus fringilla aenean
              </h2>
              <p>
                Sociis consequat adipiscing sit curabitur donec sem luctus cras
                natoque vulputate dolor eget dapibus. Nec vitae eros ullamcorper
                laoreet dapibus mus ac ante viverra. A aenean sit augue
                curabitur et parturient nisi sed enim. Nulla nec quis sit
                quisque sem commodo ultricies neque. Lorem eget venenatis dui
                ante luctus ultricies tellus montes. Quis in sapien tempus.
              </p>

              <ul className="my-4 ml-12 list-disc">
                <li>Crisp fresh iconic elegant timeless clean perfume</li>
                <li>Neck straight sharp silhouette and dart detail</li>
                <li>
                  Machine wash cold slim fit premium stretch selvedge denim
                  comfortable low waist
                </li>
              </ul>
              <p>
                See-through delicate embroidered organza blue lining luxury
                acetate-mix stretch pleat detailing. Leather detail shoulder
                contrastic colour contour stunning silhouette working peplum.
                Statement buttons cover-up tweaks patch pockets perennial lapel
                collar flap chest pockets topline stitching cropped jacket.
                Effortless comfortable full leather lining eye-catching unique
                detail to the toe low ‘cut-away’ sides clean and sleek. Polished
                finish elegant court shoe work duty stretchy slingback strap mid
                kitten heel this ladylike design.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-4xl uppercase">YOU MAY ALSO LIKE</h2>

              <div className="grid grid-cols-3 gap-x-7">
                {Array(3)
                  .fill("")
                  .map((_, i) => (
                    <FeaturedBlogCard key={i} />
                  ))}
              </div>
            </section>
          </div>
        </section>
        <section className="w-[240px] shrink-0">
          <form className="mb-4">
            <div className="mb-2">
              <label htmlFor="email" className="mb-4 block text-base">
                Subscription Subscribe to our newsletter and receive a selection
                of cool articles every weeks
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="w-full rounded border border-[#CECECE] px-4 py-3 text-xs text-[#757575]"
                placeholder="Enter your email"
              />
            </div>
            <button className="w-full rounded bg-primary-500 py-3 text-xs tracking-[3px] text-white">
              SUBSCRIBE
            </button>
          </form>
          <form>
            <div className="flex items-center gap-x-2">
              <input type="checkbox" id="subscribe" className="" />
              <label htmlFor="subscribe" className="leading-5 text-[#A9A9A9]">
                By checking this box, you confirm that you have read and are
                agreeing to our terms of use regarding the storage of the data
                submitted through this form.
              </label>
            </div>
          </form>
          <section className="mt-10">
            <h2 className="mb-3.5 text-lg text-[#121416]">The Latest</h2>

            <div className="grid gap-y-3.5">
              <article className="bg-[url('/images/latest-blog.jpg')] bg-cover bg-no-repeat px-3.5 py-3.5 text-xs text-white">
                <p className="mb-2">
                  10 Habits That Will Change Your Live for the Better If envy
                  and jealousy are impacting your friendships
                </p>
                <div className="my-3 flex items-center gap-x-2 text-xs text-white/80">
                  <p>June 21,2023</p>
                  <Separator color="#ffffffcc" />
                  <p className="flex items-center gap-x-1">
                    <ClockSVG fill="white" />2 minute read
                  </p>
                </div>
              </article>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

function FeaturedBlogCard() {
  return (
    <article className="relative">
      <div className="h-[210px] w-[281px] bg-black/25 bg-[url('/images/feature-blog-img.jpg')] bg-cover bg-no-repeat bg-blend-overlay" />

      <div className="py-3.5">
        <h3 className="text-xl">Integer Maecenas Eget Viverra.</h3>
        <p className="text-base">
          Aenean eleifend ante maecenas pulvinar montes lorem et pede.
        </p>
        <div className="my-3 flex items-center gap-x-2 text-xs">
          <p>June 21,2023</p>
          <Separator color="black" />
          <p className="flex items-center gap-x-1">
            <ClockSVG fill="black" />2 minute read
          </p>
        </div>
      </div>

      <div className="absolute left-3 top-3.5 flex items-center gap-x-0.5">
        <Badge text={"Aenean Eleifend"} />
        <Badge text={"Aliquam"} />
      </div>
    </article>
  );
}

function ClockSVG({ fill }: { fill: string }) {
  return (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5625 13.6406C11.2808 13.6406 13.4844 11.437 13.4844 8.71875C13.4844 6.00047 11.2808 3.79688 8.5625 3.79688C5.84422 3.79688 3.64062 6.00047 3.64062 8.71875C3.64062 11.437 5.84422 13.6406 8.5625 13.6406Z"
        stroke={fill}
        stroke-width="0.703125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.5625 8.71875L6.92188 9.8125M8.5625 5.98438V8.71875"
        stroke={fill}
        stroke-width="0.703125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function ViewSVG({ fill }: { fill: string }) {
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.625 8.9375H0.9375V3.03125H2.625V8.9375ZM6 8.9375H4.3125V0.5H6V4.71875V8.9375ZM9.375 8.9375H7.6875V5.5625H9.375V8.9375Z"
        fill={fill}
      />
    </svg>
  );
}

function Separator({ color }: { color: string }) {
  return <div className="h-[0.45px] w-3.5" style={{ background: color }} />;
}

function Badge({ text }: { text: string }) {
  return (
    <div
      className="rounded bg-white/20 px-2 py-1 text-sm text-white"
      style={{ backdropFilter: "blur(2px)" }}
    >
      {text}
    </div>
  );
}
