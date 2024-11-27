"use client";
import Image from "next/image";
import { courseorder } from "@/definition";
import { CircleCancel } from "@/components/svgs";
import { useSnackbar } from "notistack";
import { useSession } from "next-auth/react";
import { CourseApi } from "@/api/training";
import { Session } from "next-auth";

export default function WishlistCourseCard({
  wishList,
  course,
}: {
  wishList: boolean;
  course: courseorder;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const handleCancel = async ({ courseid }: { courseid: string }) => {
    try {
      await CourseApi.unsaveCourse({
        userid: session?.user.id as string,
        session: session as Session,
        courseid,
      });
      enqueueSnackbar(
        `Deleted ${course.courseid.bundle || course.courseid.title} from wishlist succesfully`,
        { variant: "success" },
      );
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error deleting from wishlist", { variant: "error" });
    }
  };

  return (
    <article className="flex items-center gap-x-5 text-[#1D2026]">
      {wishList && (
        <button
          className="cursor-pointer"
          onClick={() => handleCancel({ courseid: course.courseid._id })}
        >
          <CircleCancel />
        </button>
      )}
      <div className="relative h-[120px] w-40 overflow-hidden">
        <Image
          src={course.courseid?.thumbnail}
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          {/* Course title */}
          <h3 className="mb-6 w-[312px] font-medium">
            {course.courseid?.title || course.courseid?.bundle}
          </h3>
        </div>
      </div>
    </article>
  );
}
