import Link from "next/link";
import CourseCategories from "./components/course-categories";
import { routes } from "@/constants/routes";
import { CourseApi } from "@/api/training";
import { CourseData } from "@/definition";

export const dynamic = "force-dynamic";

async function getCoursesData() {
  try {
<<<<<<< HEAD
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
=======
    const { data: courseClassroomData }: { data: CourseData[] } = await CourseApi.getCourseData({ type: "classroom" });
    const { data: courseVisualData }: { data: CourseData[] } = await CourseApi.getCourseData({ type: "visual" });
    const { data: courseBundleData }: { data: CourseData[] } = await CourseApi.getCourseData({ type: "bundle" });
    const { data: courseOnlineData }: { data: CourseData[] } = await CourseApi.getCourseData({ type: "online" });
    return { courseClassroomData, courseVisualData, courseBundleData, courseOnlineData };
>>>>>>> 2d2a2a37f30e333d63524f8c747bf7f7d6888b86
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get Courses data",
    );
  }
}

export default async function Home() {
<<<<<<< HEAD
  const {
    courseClassroomData,
    courseVisualData,
    courseBundleData,
    courseOnlineData,
  } = await getCoursesData();
=======
  const { courseClassroomData, courseVisualData, courseBundleData, courseOnlineData } = await getCoursesData();
>>>>>>> 2d2a2a37f30e333d63524f8c747bf7f7d6888b86
  return (
    <main>
      <section className="mb-6 flex items-start justify-between px-14 py-8">
        <div className="font-semibold">
          <h1 className="mb-4 text-2xl text-[#1D2026]">Browse top category</h1>
          <p className="text-gray-500">
            Choose a path you would like to learn from
          </p>
        </div>
        <div>
          <Link
            href={routes.TRAININGPROFILECOURSES}
            className="font-semibold text-primary-500"
          >
            My Enrolled Courses
          </Link>
        </div>
      </section>

<<<<<<< HEAD
      <CourseCategories
        courseData={[
          courseClassroomData,
          courseVisualData,
          courseBundleData,
          courseOnlineData,
        ]}
      />
=======
      <CourseCategories courseData={[courseClassroomData, courseVisualData, courseBundleData, courseOnlineData]} />
>>>>>>> 2d2a2a37f30e333d63524f8c747bf7f7d6888b86
    </main>
  );
}
