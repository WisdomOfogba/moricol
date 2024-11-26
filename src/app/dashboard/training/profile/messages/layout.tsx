import { SearchSvg } from "@/components/svgs";
import Image from "next/image";
// import ComposeMessage from "../../modals/compose-message";
import { getUserSession } from "@/lib/auth";
import { archive } from "@/definition";
import { CourseApi } from "@/api/training";
import Link from "next/link";

async function getSavedCourses() {
  const session = await getUserSession();
  if (!session || !session.user || !("id" in session.user)) {
    throw new Error("User session is invalid or user ID is missing");
  }
  try {
    const { data: archive }: { data: archive[] } = await CourseApi.getArchive({
      userid: session.user.id,
      session,
    });
    return archive;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to get Saved Courses data",
    );
  }
}

export default async function TrainingProfileMessages({
  children,
}: {
  children: React.ReactNode;
}) {
  const archive = await getSavedCourses();

  return (
    <main className="px-4 sm:px-14 py-12">
      <section className="flex flex-col items-center xl:items-start xl:flex-row gap-6">
        {/* Friend list section */}
        <aside className="w-full xl:w-[424px] shrink-0 border border-[#E9EAF0] py-6">
          <div className="mb-4 flex items-center justify-between px-6">
            <h2 className="text-xl font-semibold text-[#1D2026]">Message</h2>
            {/* <ComposeMessage /> */}
          </div>
          <div className="mb-4 px-6">
            <div className="flex items-center gap-x-3 border border-[#E9EAF0] px-4 py-3 text-[#4E5566] has-[:focus]:border-primary-500 has-[:focus]:bg-primary-50">
              <SearchSvg />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Friends */}
          <ul>
            {archive.map((archive, i) => (
              <li key={i}>
                <MessageUserCard archive={archive} />
              </li>
            ))}
          </ul>
        </aside>

        {children}
      </section>
    </main>
  );
}

function MessageUserCard({ archive }: { archive: archive }) {
  return (
    <Link href={`/dashboard/training/profile/messages/${archive._id}`} className="transition-color flex cursor-pointer gap-x-4 px-6 py-3 duration-300 hover:bg-primary-50">
      <div className="relative h-12 w-12 rounded-full">
        <Image
          src={archive.admin_details.photo || "/images/client.jpg"}
          alt=""
          fill
          sizes="48px"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
        <div className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#23BD33]" />
      </div>
      <div className="flex grow flex-col justify-between text-sm text-[#4E5566]">
        <div className="flex justify-between">
          <h3 className="font-medium text-[#1D2026]">
            {archive.admin_details.name || "Instructors name"}
          </h3>
          <p>just now</p>
        </div>
        <div className="flex items-center justify-between"></div>
      </div>
    </Link>
  );
}