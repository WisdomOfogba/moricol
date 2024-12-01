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
    lesson_completed,
    setProgress,
  }: {
    lessonid: string;
    sectionid: string;
    courseid: string;
    lesson_completed: boolean;
    setProgress: () => void;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handlePay = async () => {
    try {
      setIsLoading(true);
      await CourseApi.markLesson({
        userid: session?.user.id as string,
        lessonid,
        sectionid,
        courseid,
        session: session as Session,
      });
      setProgress()
      setCompleted(true);
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
      disabled={completed || lesson_completed}
      onClick={handlePay}
    >
      {isLoading ? "Marking..." : completed || lesson_completed ? "Completed" : "Mark as Completed"}
    </button>
  );
};

export default MarkLesson;
