"use client";

import { CourseApi } from "@/api/training";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useState } from "react";

const MarkLesson = ({
    lessonid,
    sectionid,
    courseid,
}: {
    lessonid: string;
    sectionid: string;
    courseid: string;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async () => {
    try {
      setIsLoading(true);
      const response = await CourseApi.markLesson({
        userid: session?.user.id as string,
        lessonid,
        sectionid,
        courseid,
        session: session as Session,
      });
      window.open(response.data, "_self");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error marking course", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="flex items-center justify-center bg-primary-500 py-3 px-5  text-lg font-semibold text-white"
      onClick={handlePay}
    >
      {isLoading ? "Loading..." : "Mark as Completed"}
    </button>
  );
};

export default MarkLesson;
