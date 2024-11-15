import Link from "next/link";
import CourseCategories from "./components/course-categories";
import { routes } from "@/constants/routes";
import { CourseApi } from "@/api/training";
import { CourseData } from "@/definition";

async function getCoursesData() {
  try {
    const { data: courseClassroomData }: { data: CourseData[] } = await CourseApi.getCourseData({ type: "classroom"});
    const { data: courseVisualData }: { data: CourseData[] } = await CourseApi.getCourseData({ type: "visual"});
    const { data: courseBundleData }: { data: CourseData[] } = await CourseApi.getCourseData({ type: "bundle"});
    const { data: courseOnlineData }: { data: CourseData[] } = await CourseApi.getCourseData({ type: "online"});
    return { courseClassroomData, courseVisualData, courseBundleData, courseOnlineData };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get Courses data');
  }
}

export default async function Home() {
  const { courseClassroomData, courseVisualData, courseBundleData, courseOnlineData } = await getCoursesData();
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

      <CourseCategories courseData={[ courseClassroomData, courseVisualData, courseBundleData, courseOnlineData ]} />
    </main>
  );
}
