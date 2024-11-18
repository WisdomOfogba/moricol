import Image from "next/image";
import {
  ArrowRightSvg,
  CheckSquareOffsetSvg,
  PlaySVG,
  TrophySvg,
} from "@/components/svgs";
import { Dashboard, ProfileData, SingleCourse, SummaryCardProps } from "@/definition";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { getUserSession } from "@/lib/auth";
import { profileApi } from "@/api/profile";
import { CourseApi } from "@/api/training";

export const dynamic = "force-dynamic"

async function getData() {
  const session = await getUserSession();
  if (!session || !session.user || !('id' in session.user)) {
    throw new Error('User session is invalid or user ID is missing');
  }
  const { data: profileData }: { data: ProfileData } = await profileApi.getProfile({ userid: session.user.id, session });
  const { data: dashboard }: { data: Dashboard } = await CourseApi.getDashboard({ userid: session.user.id, session });
  try {
    return {profileData, dashboard};
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get profile data');
  }
}

async function getSingle({courseid, courseorderid}: {courseid: string, courseorderid: string}) {
  const session = await getUserSession();
  if (!session || !session.user || !('id' in session.user)) {
    throw new Error('User session is invalid or user ID is missing');
  }
  const { data: singleCourse }: { data: SingleCourse } = await CourseApi.getSingleCourse({ userid: session.user.id, session, courseid, courseorderid });
  try {
    return singleCourse.courseorder;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get profile data');
  }
}


export default async function TrainingProfile() {

  const {profileData, dashboard } = await getData();

  return (
    <main className="px-14 py-12">
      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold text-[#1D2026]">
          Dashboard
        </h2>

        <div className="flex gap-x-6">
          <SummaryCard
            color="#F9EBD0"
            icon={<PlaySVG />}
            total={dashboard.enroledcourses}
            title="Enrolled Courses"
          />
          <SummaryCard
            color="#E1F7E3"
            icon={<TrophySvg />}
            total={dashboard.completedcourses}
            title="Completed Courses"
          />
          <SummaryCard
            color="#EBEBFF"
            icon={<CheckSquareOffsetSvg />}
            total={dashboard.activecourses}
            title="Active Courses"
          />
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="mb-6 text-2xl font-semibold text-[#1D2026]">
            Let’s start learning, {profileData.firstname}
          </h2>

          <div className="flex gap-x-2">
            <button className="flex h-10 w-10 items-center justify-center bg-primary-100">
              <ArrowRightSvg />
            </button>
            <button className="flex h-10 w-10 items-center justify-center bg-primary-100">
              <ArrowRightSvg className="-rotate-180" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 justify-between gap-x-6">
          {dashboard.courses.map((item, i) => (
            <MyCourseCard key={i} progress={item.progress} course={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

function SummaryCard({ color, icon, total, title }: SummaryCardProps) {
  return (
    <article
      className="flex w-full max-w-[312px] items-center gap-x-6 p-6"
      style={{ background: color }}
    >
      <div className="flex h-[60px] w-[60px] items-center justify-center bg-white">
        {icon}
      </div>
      <div>
        <p className="mb-1.5 text-2xl text-[#1D2026]">{total}</p>
        <p className="text-sm text-[#4E5566]">{title}</p>
      </div>
    </article>
  );
}

async function MyCourseCard({ progress, course }: { progress: number, course: {courseid: string, _id: string} }) {
  const singleCourse = await getSingle({courseid: course.courseid, courseorderid: course._id})

  return (
    <article className="border border-[#E9EAF0] bg-white">
      {/* Image */}
      <div className="relative h-[13.75rem]">
        <Image
          src={singleCourse?.courseid.thumbnail ? singleCourse.courseid.thumbnail : "/images/dashboard/drug.png"}
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="mb-1.5 text-xs text-[#6E7485]">
          {singleCourse?.courseid.description ? singleCourse.courseid.description : "No Description"}
        </h3>
        <p className="text-sm font-medium text-[#1D2026]">{singleCourse?.courseid.title ? singleCourse.courseid.title : "No Title"}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-t-[#E9EAF0] p-4 text-sm text-[#4E5566]">
        <Link
          href={`${routes.TRAININGVIEWCOURSE}/${singleCourse?.courseid._id ? singleCourse.courseid._id : "No-Description"}/${course._id}`}
          className={`inline-block rounded-none border-none bg-primary-100 px-4 py-3 text-center font-semibold text-primary-500 hover:bg-primary-500 hover:text-white ${progress > 0 ? "w-fit" : "w-full"}`}
        >
          Watch Lecture
        </Link>
        {progress > 0 && (
          <p className="font-medium text-[#23BD33]">{progress}% Completed</p>
        )}
      </div>
    </article>
  );
}
