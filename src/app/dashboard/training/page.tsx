import Link from "next/link";
import CourseCategories from "./components/course-categories";
import { routes } from "@/constants/routes";
import { CourseApi } from "@/api/training";
import { CourseData } from "@/definition";

export const dynamic = "force-dynamic";

async function getCoursesData() {
  try {
    const { data: courseClassroomData }: { data: CourseData[] } =
      await CourseApi.getCourseData({ type: "classroom" });
    const { data: courseVisualData }: { data: CourseData[] } =
      await CourseApi.getCourseData({ type: "visual" });
    const { data: courseBundleData }: { data: CourseData[] } =
      await CourseApi.getCourseData({ type: "bundle" });
    const { data: courseOnlineData }: { data: CourseData[] } =
      await CourseApi.getCourseData({ type: "online" });
    return {
      courseClassroomData,
      courseVisualData,
      courseBundleData,
      courseOnlineData,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get Courses data",
    );
  }
}

export default async function Home() {
  const {
    courseClassroomData,
    courseVisualData,
    courseBundleData,
    courseOnlineData,
  } = await getCoursesData();
  return (
    <main>
      <section className="mb-6 flex items-start justify-between px-4 md:px-14 py-8">
          <Link
            href={routes.TRAININGPROFILECOURSES}
            className="font-semibold text-primary-500"
          >
            My Enrolled Courses
          </Link>
      </section>

      <CourseCategories
        courseData={[
          courseClassroomData,
          courseVisualData,
          courseBundleData,
          courseOnlineData,
        ]}
      />
    </main>
  );
}
