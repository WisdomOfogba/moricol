import WishlistCourseCard from "../../components/wishlist-course-card";
import { courseorder, OrderData } from "@/definition";
import { CourseApi } from "@/api/training";
import { getUserSession } from "@/lib/auth";
import MakeTrainingPaymentButton from "../../components/make-training-payments";
// import AddCart from "../../components/addCart";

async function getSavedCourses() {
  const session = await getUserSession();
  if (!session || !session.user || !("id" in session.user)) {
    throw new Error("User session is invalid or user ID is missing");
  }
  try {
    const { data: Courses }: { data: courseorder[] } =
      await CourseApi.getSavedCourse({
        userid: session.user.id,
        session,
      });
    return Courses;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to get Saved Courses data",
    );
  }
}

async function getOrder() {
  const session = await getUserSession();
  if (!session || !session.user || !("id" in session.user)) {
    throw new Error("User session is invalid or user ID is missing");
  }
  try {
    const { data: Order }: { data: OrderData[] } =
      await CourseApi.getOrderHistory({
        userid: session.user.id,
        session,
      });
    return Order;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get Courses data",
    );
  }
}

export default async function TrainingProfileWishlists() {
  const Courses = await getSavedCourses();

  return (
    <main className="px-14 py-12">
      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold text-[#1D2026]">
          Wishlists ({Courses.length})
        </h2>
      </section>

      <section>
        <div className="border border-[#E9EAF0]">
          <div className="grid grid-cols-[3fr_1fr_2fr] border-b border-b-[#E9EAF0] px-6 py-5 text-sm font-medium text-[#4E5566]">
            <h3>COURSE</h3>
            <h3>PRICES</h3>
            <h3>ACTION</h3>
          </div>
          {Courses.map((course, i) => (
            <Wishlists key={i} course={course} />
          ))}
          {/* <Wishlists />
          <Wishlists />
          <Wishlists /> */}
        </div>
      </section>
    </main>
  );
}

async function Wishlists({ course }: { course: courseorder }) {
  const Order = await getOrder();
  const isBought = Order.some(
    (order) => order.courseid === course.courseid?._id,
  );
  const courseorder = Order.find(
    (order) => order.courseid === course.courseid?._id,
  );
  const courseorderid = courseorder?._id;

  if(course.courseid?._id === undefined || courseorderid === course._id) {
    return;
  }

  return (
    <article className="grid grid-cols-[3fr_1fr_2fr] items-center border-b border-b-[#E9EAF0] px-6 py-6 last:border-none">
      <WishlistCourseCard course={course} />
      <div className="text-lg font-medium text-primary-500">
        ₦{course.amount}
      </div>
      {isBought ? (
        <>
          <div className="grid gap-y-3 border-y border-y-[#E9EAF0] p-6">
            <a
              href={`/dashboard/training/view-course/${course._id}/${courseorderid}`}
              className="flex w-full items-center justify-center bg-primary-500 p-3 text-lg font-semibold text-white"
            >
              View Course
            </a>
          </div>
        </>
      ) : (
        <>
          {course._id !== undefined && (
            <MakeTrainingPaymentButton
              button="now"
              courses={[
                {
                  coursetype: course.coursetype,
                  courseid: course._id,
                  amount: course.amount,
                },
              ]}
            />
          )}
        </>
      )}
    </article>
  );
}
