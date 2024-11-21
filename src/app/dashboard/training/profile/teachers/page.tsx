import Image from "next/image";

// import { StarSVG } from "@/components/svgs";
import { instructors } from "@/definition";
import { CourseApi } from "@/api/training";
import { getUserSession } from "@/lib/auth";
import Link from "next/link";

async function getInstructors() {
  const session = await getUserSession();
  if (!session || !session.user || !('id' in session.user)) {
    throw new Error('User session is invalid or user ID is missing');
  }
  try {
    const {data: Instructors}: {data: instructors[]} = await CourseApi.getInstructors({
      userid: session.user.id,
      session,
    });
    return Instructors
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get Courses data');
  }
}

export default async function TrainingProfileTeachers() {

  const Instructors = await getInstructors()

  return (
    <main className="px-14 py-12">
      <section className="mb-10">
        <h2 className="mb-6 text-center text-2xl font-semibold text-[#1D2026]">
          Instructors ({Instructors.length})
        </h2>
      </section>

      <section>
        <div className="grid grid-cols-4 gap-6">
          {Instructors.map((instructor, i) => (
            <InstructorCard instructor={instructor} key={i} />
          ))}
          {/* <InstructorCard />
          <InstructorCard />
          <InstructorCard />
          <InstructorCard />
          <InstructorCard />
          <InstructorCard /> */}
        </div>
      </section>
    </main>
  );
}

function InstructorCard({instructor}: {instructor: instructors}) {
  return (
    <article className="w-full border border-[#E9EAF0] bg-white">
      <div className="relative h-[312px] overflow-hidden">
        <Image src="/images/dashboard/drug.png" fill alt="" sizes="312px" />
      </div>

      <div>
        <div className="px-5 py-4 text-center">
          <h3 className="mb-1 text-lg font-medium leading-6 text-[#1D2026]">
            {instructor.name}
          </h3>
          <p className="text-sm leading-5 text-[#8C94A3]">Software Developer</p>
        </div>
      </div>
      <div className="border-t border-t-[#E9EAF0] px-5 py-4">

        <Link
        href={`/dashboard/training/profile/messages/${instructor._id}`}
          className={`rounded-none border-none bg-primary-100 px-4 font-semibold text-primary-500 hover:bg-primary-500 hover:text-white w-full py-4 flex items-center justify-center`}
        >
          Send Message
        </Link>
      </div>
    </article>
  );
}
