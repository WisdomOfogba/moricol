import { CourseApi } from "@/api/training";
import { courseorder } from "@/definition";
import { getUserSession } from "@/lib/auth";
import CourseCard2 from "../../components/card2-course";
async function getCourses() {
  const session = await getUserSession();
  if (!session || !session.user || !('id' in session.user)) {
    throw new Error('User session is invalid or user ID is missing');
  }
  try {
    const { data: Courses }: { data: courseorder[] } = await CourseApi.getCourse({
      userid: session.user.id,
      session,
    });
    return Courses
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get Courses data');
  }
}


export default async function TrainingProfileCourses() {

  const Courses = await getCourses()

  return (
    <main className="px-4 md:px-14 py-12">
      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold text-[#1D2026]">
          Courses ({Courses.length})
        </h2>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {Courses.map((course, i) => {

          const index = course.coursetype.lastIndexOf("course")

          return <CourseCard2 key={i} courseData={course} type={course.coursetype.slice(0, index)} />;
        })}
      </section>
    </main>
  );
}
