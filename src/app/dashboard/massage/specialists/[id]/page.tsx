import NavigateToPrevPage from "@/components/dashboard/prev-page";
import { BadgeSvg, TwoUsersSvg } from "@/components/svgs";
import Image from "next/image";
import Link from "next/link";
import { getUserSession } from "@/lib/auth";
import { massageApi } from "@/api/massage";
import { MassageData } from "@/definition";

export const metadata = {
  title: "Massage Specialists",
  description: "Find and book professional massage therapists",
};

async function getMassageData(id: string) {
  const session = await getUserSession();
  if (!session) {
    throw new Error("User session is invalid");
  }
  const { data: massageData }: { data: MassageData } = await massageApi.getSingleStaff(id, session);
  return massageData;
}

export default async function MasseuseProfile({ params }: { params: { id: string } }) {
  const massageData = await getMassageData(params.id);

  return (
    <main className="">
      <NavigateToPrevPage />

      <div className="mx-auto max-w-[818px] bg-gray-50">
        <section className="p-4 sm:p-6 md:p-9">
          <article className="flex shrink-0 items-center gap-x-3">
            <Image
              src={massageData.photo.startsWith('https') ? massageData.photo : '/images/client.jpg'}
              alt={`${massageData.firstname} ${massageData.lastname}`}
              width={90}
              height={90}
              className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] rounded-xl"
            />
            <div>
              <h3 className="mb-0.5 text-base sm:text-lg font-medium text-gray-700">
                {massageData.firstname} {massageData.lastname}
              </h3>
              {/* <div className="mb-2 text-xs sm:text-sm font-medium text-gray-500">
                ⭐ <span>{massageData.rating || 4.5}</span>
              </div> */}
              {/* <p className="text-sm sm:text-base text-[#777A95]">{massageData.massage_specialty[0].massageid}</p> */}
            </div>
          </article>
        </section>

        <section className="flex flex-col sm:flex-row items-center justify-center gap-y-6 sm:gap-x-14 rounded-t-[40px] bg-gray-600 py-7 px-4">
          <div className="flex items-center gap-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
              <TwoUsersSvg />
            </div>
            <div className="text-white">
              <p className="text-xl font-semibold">1000+</p>
              <p className="text-sm">Clients</p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
              <BadgeSvg />
            </div>
            <div className="text-white">
              <p className="text-xl font-semibold">5 Years</p>
              <p className="text-sm">Experience</p>
            </div>
          </div>
        </section>

        <section className="grid gap-y-6 px-4 sm:px-6 md:px-9 py-4">
          <article>
            <h3 className="mb-3 text-lg font-medium">About Masseuse</h3>
            <p className="text-gray-500 text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur. Netus est sit est proin
              aliquet mi ac. Mauris posuere egestas egestas eget amet. Sed enim
              purus accumsan convallis feugiat sed nam varius. Vitae elementum
              ut ut cursus elit ac urna. Donec odio vivamus tellus nibh commodo
              turpis amet. Odio id pretium tristique vitae mattis adipiscing ut
              ullamcorper. At elit urna egestas hac. In ornare tincidunt
              molestie fusce condimentum at. Rhoncus magna eget nisi proin
              imperdiet mattis enim elit. Sit egestas risus ac placerat rhoncus
              duis nibh. Vitae feugiat eget cursus consequat molestie metus
              molestie convallis elementum. Consectetur pellentesque ornare diam
              tristique sed. Cras sit lorem tempus senectus non lobortis ut. Ac
              mattis sapien sed viverra lacus massa odio purus morbi. Augue
              varius mauris integer nisl neque massa purus facilisis euismod.
              Quis quis elementum eget urna sit leo ut elementum mattis. Eget
              viverra cursus eu mattis lobortis.
            </p>
          </article>
          <article>
            <h3 className="mb-3 text-lg font-medium">Speciaties</h3>
            <ul className="grid gap-y-2 text-gray-500 text-sm sm:text-base">
              <li>Hot Stone Massage (3000/hr)</li>
              <li>
                <input type="radio" />
                <label className="ml-2">1:00PM - 3:00PM</label>
              </li>
              <li>
                <input type="radio" />
                <label className="ml-2">1:00PM - 3:00PM</label>
              </li>
              <li>
                <input type="radio" />
                <label className="ml-2">1:00PM - 3:00PM</label>
              </li>
              <li>Swedish Massage (1000/hr)</li>
              <li>
                <input type="radio" />
                <label className="ml-2">1:00PM - 3:00PM</label>
              </li>
              <li>
                <input type="radio" />
                <label className="ml-2">1:00PM - 3:00PM</label>
              </li>
              <li>Hot Stone Massage (3000/hr)</li>
              <li>
                <input type="radio" />
                <label className="ml-2">1:00PM - 3:00PM</label>
              </li>
              <li>
                <input type="radio" />
                <label className="ml-2">1:00PM - 3:00PM</label>
              </li>
            </ul>
          </article>
          <div className="mt-10 text-center">
            <Link
              href="1/set-appointment"
              className="transition-color inline-block w-full max-w-[640px] rounded-lg border border-primary-500 bg-primary-500 px-4 py-3 text-center text-sm sm:text-base text-white duration-300 hover:border-primary-500/80 hover:bg-primary-500/80"
            >
              BOOK SWEDISH APPOINTMENT
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

