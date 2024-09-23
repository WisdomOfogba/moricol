import SelectInput from "@/components/auth/select-input";
import Button from "@/components/button";
import PageToolBar from "@/components/dashboard/pharmacy-page-toolbar";
import ReviewCard from "@/components/dashboard/review-card";
import HeartSVG from "@/components/svgs/heartsvg";
import StarSVG from "@/components/svgs/rating-star";
import Image from "next/image";

export default function ProductPage() {
  return (
    <main>
      <PageToolBar />

      <div className="mb-8 grid gap-y-5 px-8">
        <section className="flex items-start justify-between gap-x-8 py-8">
          <div>
            <div className="relative mb-6 h-[537px] w-[537px] overflow-hidden">
              <Image
                src="/images/dashboard/drug.png"
                alt=""
                fill
                sizes="537px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="grid grid-cols-6 gap-x-3">
              {[
                Array(6)
                  .fill("")
                  .map(() => (
                    <div className="relative mb-6 h-[79px] w-[79px] border border-[#DBDBDB]">
                      <Image
                        src="/images/dashboard/drug.png"
                        alt=""
                        fill
                        sizes="79px"
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                  )),
              ]}
            </div>
          </div>

          <div className="max-w-[464px] grow text-xs text-gray-500">
            {/* Product Name */}
            <h1 className="mb-3 text-xl font-bold text-gray-700">
              Wall Hung Toilet with Slimline Luxury Seat
            </h1>

            {/* Brand | Rating | Availability */}
            <p className="mb-1.5">
              Brand: <span className="text-primary-500">Fendel Octopus</span>
            </p>
            <div className="mb-2 mt-0.5 flex items-center gap-x-1">
              <StarSVG fill="#E7A542" />
              <StarSVG />
              <StarSVG />
              <StarSVG />
              <StarSVG />
              <p>(12 Reviews)</p>
            </div>
            <p className="mb-5 text-[#2C2D33]">
              Status: <span className="text-primary-500">In Stock</span>
            </p>

            {/* Price */}
            <p className="mb-6 text-lg font-semibold">
              <span className="mr-2 line-through">₦450.50</span>
              <span className="text-secondary-400">₦450.50</span>
            </p>

            {/* Color | Size */}
            <div className="mb-7 flex flex-wrap gap-x-7">
              {/* Color */}
              <div className="shrink-0">
                <h3 className="mb-1 text-gray-700">Color</h3>
                <div className="flex flex-wrap gap-x-1.5">
                  <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-white">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-b from-[#0D4E5A] via-[#318585] to-[#296F7C]" />
                  </button>
                  <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-white">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-b from-[#0D4E5A] via-[#318585] to-[#296F7C]" />
                  </button>
                  <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-white">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-b from-[#0D4E5A] via-[#318585] to-[#296F7C]" />
                  </button>
                </div>
              </div>
              {/* Sizes */}
              <div className="shrink-0">
                <h3 className="mb-1 text-gray-700">Size</h3>
                <div className="flex flex-wrap gap-x-1.5">
                  <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-white">
                    XS
                  </button>
                  <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-white">
                    SM
                  </button>
                  <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-white">
                    M
                  </button>
                </div>
              </div>
            </div>

            {/* Cart */}
            <div className="mb-6 flex items-center justify-between rounded border px-5 py-4">
              <p>Quantity</p>
              <div className="flex items-center gap-x-3 rounded border px-3.5 py-2 text-sm">
                <button>-</button>
                <p className="font-bold">1</p>
                <button>+</button>
              </div>
              <Button className="w-fit py-3 font-semibold">Add to cart</Button>
              <div className="flex items-center gap-x-2">
                <HeartSVG className="h-4 w-4" fill="black" />
                <p className="text-[#2C2D33]">Add to WishList</p>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <form>
                <label htmlFor="location" className="mb-1 block">
                  Choose your location
                </label>
                <select
                  name=""
                  id="location"
                  className="rounded-[6px] border px-5 py-3.5"
                >
                  <option value="">Kaduna</option>
                </select>
              </form>
              <p className="mt-3">Estimated delivery 3-7 working days</p>
            </div>

            {/* Benefits */}
            <div className="mb-1.5">
              <h3 className="mb-1.5 font-bold text-gray-700">
                What&apos;s great about it?
              </h3>
              <ul className="ml-4 list-disc">
                <li>Sophisticated wall hung toilet</li>
                <li>Soft close, quick release luxury toilet seat included</li>
                <li>Beautifully made from high quality vitreous china</li>
                <li>Fixings included</li>
                <li>25 year manufacturer guarantes</li>
              </ul>
            </div>

            {/* Categories */}
            <p>
              Categories: <span className="text-primary-500">Cosmetics</span>
            </p>
          </div>
        </section>
        <section className="bg-gray-50">
          <h2 className="border-b border-gray-300 px-12 py-8 text-2xl font-bold text-primary-500">
            Description
          </h2>
          <p className="px-12 py-8">
            Lorem ipsum dolor sit amet consectetur. Id consequat gravida
            phasellus risus arcu mi neque. Mauris pretium sodales arcu ac risus
            praesent pellentesque. Nulla interdum in malesuada sem laoreet nulla
            pellentesque. Aliquam imperdiet rhoncus orci id. Ut viverra magna
            vitae id pellentesque a velit. Habitasse elementum felis nisi
            consequat est morbi elit. Eros consequat facilisis morbi in. Tortor
            id tortor sed felis fermentum placerat. Turpis dolor neque tellus
            egestas mi. Varius eget facilisis pellentesque leo in enim
            scelerisque justo mi. Ornare etiam aliquam nec neque at in risus in
            odio. Mauris at sit velit etiam placerat pulvinar pulvinar sit.
            Facilisi mi mauris natoque eget nec ornare. Quis justo fusce viverra
            morbi donec augue. At cum justo aliquam eleifend mauris auctor. Orci
            tincidunt sapien fermentum diam eget pretium morbi faucibus. Risus
            risus justo nascetur consectetur egestas nunc viverra. Quam hac
            dolor urna sit tortor fringilla egestas sem. Lacinia amet massa
            habitasse euismod vitae maecenas ut diam. Aliquam ut amet eget augue
            quam nunc nunc mauris. Sit dolor ullamcorper nunc id ipsum orci.
            Sollicitudin parturient tellus mauris sem aliquam sollicitudin
            magna. Quam proin cras urna mattis. Quam mus ac nulla pretium enim
            semper morbi rutrum.
          </p>
        </section>
        <section className="bg-gray-50">
          <h2 className="border-b border-gray-300 px-12 py-8 text-2xl font-bold text-primary-500">
            Specification
          </h2>
          <p className="px-12 py-8">
            Lorem ipsum dolor sit amet consectetur. Id consequat gravida
            phasellus risus arcu mi neque. Mauris pretium sodales arcu ac risus
            praesent pellentesque. Nulla interdum in malesuada sem laoreet nulla
            pellentesque. Aliquam imperdiet rhoncus orci id. Ut viverra magna
            vitae id pellentesque a velit. Habitasse elementum felis nisi
            consequat est morbi elit. Eros consequat facilisis morbi in. Tortor
            id tortor sed felis fermentum placerat. Turpis dolor neque tellus
            egestas mi. Varius eget facilisis pellentesque leo in enim
            scelerisque justo mi. Ornare etiam aliquam nec neque at in risus in
            odio. Mauris at sit velit etiam placerat pulvinar pulvinar sit.
            Facilisi mi mauris natoque eget nec ornare. Quis justo fusce viverra
            morbi donec augue. At cum justo aliquam eleifend mauris auctor. Orci
            tincidunt sapien fermentum diam eget pretium morbi faucibus. Risus
            risus justo nascetur consectetur egestas nunc viverra. Quam hac
            dolor urna sit tortor fringilla egestas sem. Lacinia amet massa
            habitasse euismod vitae maecenas ut diam. Aliquam ut amet eget augue
            quam nunc nunc mauris. Sit dolor ullamcorper nunc id ipsum orci.
            Sollicitudin parturient tellus mauris sem aliquam sollicitudin
            magna. Quam proin cras urna mattis. Quam mus ac nulla pretium enim
            semper morbi rutrum.
          </p>
        </section>
        <section className="bg-gray-50">
          <h2 className="border-b border-gray-300 px-12 py-8 text-2xl font-bold text-primary-500">
            Review
          </h2>
          <div className="grid gap-y-5 pt-8">
            <ReviewCard />
            <ReviewCard />
          </div>
        </section>
      </div>
    </main>
  );
}
