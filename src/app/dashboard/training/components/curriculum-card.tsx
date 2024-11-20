"use client";

import { ChevronDownSvg, File } from "@/components/svgs";
import { useState } from "react";
import CourseTimeLecturesSection from "./time-lecture-section";
import Image from "next/image";
import { curriculum } from "@/definition";
import { MdQuiz } from "react-icons/md";
import { Video } from "lucide-react";
import { CourseApi } from "@/api/training";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useSnackbar } from "notistack";
import QuizSection from "./quizSection";

export default function CurriculumCard({
  curriculum,
  courseid
}: {
  curriculum: curriculum;
  courseid: string;
}) {
  const [isAccordionOpen, setAccordion] = useState(false);

  return (
    <article className="border-b last:border-b-0">
      <button
        className={`{isAccordionOpen ? "rounded-t-xl" : "rounded-xl"} flex w-full items-center justify-between p-5`}
        onClick={() => setAccordion(!isAccordionOpen)}
      >
        <div
          className={`flex items-center gap-x-2 ${isAccordionOpen ? "font-medium text-primary-500" : "text-[#1D2026]"}`}
        >
          <ChevronDownSvg
            className={`transition-all duration-300 ${isAccordionOpen ? "-rotate-180" : ""}`}
            stroke={`${isAccordionOpen ? "#E29A13" : "#6E7485"}`}
          />
          {curriculum?.section_name}
        </div>
        <CourseTimeLecturesSection lectures={curriculum?.section.length} />
      </button>
      <ul
        className={`grid gap-y-3.5 px-5 pb-5 transition-all duration-300 ${isAccordionOpen ? "block h-auto" : "hidden h-0"}`}
      >
        {curriculum?.section.map((section, i) => (
          <div key={i}>
            <li className="text-s flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <div className="relative h-4 w-4 overflow-hidden">
                  <Image
                    alt=""
                    src="/icons/chevron-down.svg"
                    fill
                    className="-rotate-90"
                  />
                </div>
                <p className="text-[#4E5566]">{section.lesson_name}</p>
              </div>
              <MarkeLesson lessonid={section._id} sectionid={curriculum._id} courseid={courseid} />
            </li>
            <li className="text-s flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-x-2">
                <File />
                <p className="text-[#4E5566]">{section.lesson.lesson_type}</p>
              </div>
              <p className="text-[#8C94A3]">
                {section.lesson.isquiz ? <MdQuiz /> : <Video />}
              </p>
            </li>
            {section.lesson.isquiz && (
              <QuizSection quiz={section.lesson.quiz} lessonid={section._id} courseid={courseid} sectionid={curriculum._id} />
            )}
          </div>
        ))}
      </ul>
    </article>
  );
}

function MarkeLesson ({lessonid, courseid, sectionid}: {lessonid: string, courseid: string, sectionid: string}) {

  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkLesson = async (lessonid: string) => {
    try {
      setIsLoading(true)
      const response = await CourseApi.markLesson({
        userid: session?.user.id as string,
        courseid: courseid as string,
        session: session as Session,
        sectionid,
        lessonid,
    });
      if (response.status === 200) {
        console.log("Lesson marked as complete!");
      }
      enqueueSnackbar("Lesson marked as complete!", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error marking course", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <button
    onClick={() => handleMarkLesson(lessonid)}
    className="mt-2 bg-primary-500 px-4 py-2 text-white"
  >
    {isLoading ? "Marking..." : "Mark as Completed"}
  </button>
  )
}

// I did set text-s here if it is not okay we do the text-sm the way it was.
