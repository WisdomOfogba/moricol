import { getUserSession } from "@/lib/auth";
import PurchaseHistoryCard from "../../components/purchase-history-card";
import { OrderData, SingleCourse } from "@/definition";
import { CourseApi } from "@/api/training";

// import Link from "next/link";

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
      error instanceof Error
        ? error.message
        : "Failed to get Order History data",
    );
  }
}

async function getSingle({
  courseid,
  courseorderid,
}: {
  courseid: string;
  courseorderid: string;
}) {
  const session = await getUserSession();
  if (!session || !session.user || !("id" in session.user)) {
    throw new Error("User session is invalid or user ID is missing");
  }

  if (!/^[a-fA-F0-9]{24}$/.test(courseid)) {
    console.error(`Invalid id format: ${courseorderid}`);
  }
  const { data: singleCourse }: { data: SingleCourse } =
    await CourseApi.getSingleCourse({
      userid: session.user.id,
      session,
      courseid,
      courseorderid,
    });
  try {
    return singleCourse;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get profile data",
    );
  }
}

export default async function TrainingProfilePurchaseHistory() {
  const Order = await getOrder();

  // return (
  //   <div className="w-full h-[400px] flex flex-col items-center justify-center bg-primary-50 px-4 sm:px-14 gap-4">
  //     <h1 className="text-2xl text-center font-bold">
  //     No purchase Data yet,<br /> Purchase a course now and start <br /> tracking your your Purchase History Today
  //     </h1>
  //     <Link className="py-2 px-4 rounded-md bg-primary-500 text-base font-medium text-white" href="/dashboard/training">Purchase a Course Today</Link>
  //   </div>
  // );
  return (
    <main className="px-4 sm:px-14 py-12">
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-[#1D2026]">
          Purchase History
        </h2>

        <ul className="space-y-6">
          {Order.map((order, i) => (
            <li key={i}>
              <Purchase
                order={order}
              />
            </li>
          ))}
          {/* <li>
            <PurchaseHistoryCard />
          </li>
          <li>
            <PurchaseHistoryCard />
          </li>
          <li>
            <PurchaseHistoryCard />
          </li> */}
        </ul>
      </section>
    </main>
  );
}

async function Purchase({order}: {order: OrderData}) {
  const singleCourse = await getSingle({courseid: order.courseid,courseorderid: order._id});
  if (singleCourse.courseorder.courseid?._id === undefined) {
    return;
  }

  return (
    <PurchaseHistoryCard course={singleCourse.courseorder} order={order} />
  );
}
