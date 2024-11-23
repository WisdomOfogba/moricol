"use client";

import { ChevronDownSvg } from "@/components/svgs";
import { useState } from "react";
import CourseTimeLecturesSection from "./time-lecture-section";
import Image from "next/image";
import { curriculum, section } from "@/definition";
import VideoDuration from "./VideoDuration";
// import { MdQuiz } from "react-icons/md";
// import { Video } from "lucide-react";
// import { CourseApi } from "@/api/training";
// import { useSession } from "next-auth/react";
// import { Session } from "next-auth";
// import { useSnackbar } from "notistack";
// import QuizSection from "./quizSection";

export default function ViewCurriculumCard({
  curriculum,
  setLesson,
}: {
  curriculum: curriculum;
  setLesson: (type: string, lesson?: section, sectionid?: string) => void;
}) {
  const [isAccordionOpen, setAccordion] = useState(false);
  const [active, setActive] = useState("");

  return (
    <article className="border-b last:border-b-0">
      <button
        className={`{isAccordionOpen ? "rounded-t-xl" : "rounded-xl"} flex w-full items-center justify-between p-5`}
        onClick={() => {setAccordion(!isAccordionOpen); setLesson("")}}
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
        className={`grid pb-5 transition-all duration-300 ${isAccordionOpen ? "block h-auto" : "hidden h-0"}`}
      >
        {curriculum?.section.map((section, i) => (
          <div key={i}>
            {section.lesson.lesson_type === "video" ? (
              <li
                onClick={() => {
                  setLesson(section.lesson.lesson_type, section);
                  setActive(section.lesson_name);
                }}
                className={`text-s flex cursor-pointer items-center justify-between px-5 py-2 hover:bg-secondary-50 ${active === section.lesson_name && "bg-secondary-50"}`}
              >
                <div className="flex items-center gap-x-2">
                  <Image
                    alt=""
                    src={
                      active === section.lesson_name
                        ? "/icons/CheckedBox.svg"
                        : "/icons/CheckBox.svg"
                    }
                    width={12.66}
                    height={12.66}
                    className="h-3 w-3"
                  />
                  <p className="text-[#4E5566]">{section.lesson_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* <div className="relative h-4 w-4 overflow-hidden"> */}
                    <Image
                      alt=""
                      src="/icons/chevron-down.svg"
                      width={12.66}
                      height={12.66}
                      className="-rotate-90"
                    />
                  {/* </div> */}
                  <VideoDuration videoUrl={section.lesson.content} />
                </div>
              </li>
            ) : (
              <li
                onClick={() => {
                  setLesson(section.lesson.lesson_type, section, curriculum._id);
                  setActive(section._id);
                }}
                className={`text-s flex cursor-pointer items-center justify-between px-5 py-2 hover:bg-secondary-50 ${active === section._id && "bg-secondary-50"}`}
              >
                <div className="flex items-center gap-x-2">
                  <Image
                    alt=""
                    src={
                      active === section._id
                        ? "/icons/CheckedBox.svg"
                        : "/icons/CheckBox.svg"
                    }
                    width={12.66}
                    height={12.66}
                    className="h-3 w-3"
                  />
                  <p className="text-[#4E5566]">{section.lesson_name}</p>
                </div>
              </li>
            )}
          </div>
        ))}
      </ul>
    </article>
  );
}

// function MarkeLesson ({lessonid, courseid, sectionid}: {lessonid: string, courseid: string, sectionid: string}) {

//   const { enqueueSnackbar } = useSnackbar();
//   const { data: session } = useSession();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleMarkLesson = async (lessonid: string) => {
//     try {
//       setIsLoading(true)
//       const response = await CourseApi.markLesson({
//         userid: session?.user.id as string,
//         courseid: courseid as string,
//         session: session as Session,
//         sectionid,
//         lessonid,
//     });
//       if (response.status === 200) {
//         console.log("Lesson marked as complete!");
//       }
//       enqueueSnackbar("Lesson marked as complete!", { variant: "success" });
//     } catch (error) {
//       console.error(error);
//       enqueueSnackbar("Error marking course", { variant: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button
//     onClick={() => handleMarkLesson(lessonid)}
//     className="mt-2 bg-primary-500 px-4 py-2 text-white"
//   >
//     {isLoading ? "Marking..." : "Mark as Completed"}
//   </button>
//   )
// }

// I did set text-s here if it is not okay we do the text-sm the way it was.
