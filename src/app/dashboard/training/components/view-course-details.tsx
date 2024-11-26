"use client";

import { File, StarSVG } from "@/components/svgs";
import Image from "next/image";
import { useState } from "react";
import PrevPageBtn from "../view-course/prev-page-btn";
import CourseTimeLecturesSection from "./time-lecture-section";
// import { BiDownload } from "react-icons/bi";
import { section, SingleCourse, comment, ProfileData } from "@/definition";
import ViewCurriculumCard from "./ViewCurriculumCard";
import VideoPlayer from "./VideoPlayer";
import QuizComponent from "./QuizComponent";
import MarkLesson from "./MarkLesson";
import Comment from "./Comment";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { CourseApi } from "@/api/training";
import Link from "next/link";

const courseDescriptionDetailLink = [
  {
    name: "Overview",
    link: "overview",
  },
  {
    name: "Comments",
    link: "comments",
  },
];

export default function ViewCourseDetail({
  profileData,
  singleCourse,
}: {
  profileData: ProfileData;
  singleCourse: SingleCourse;
}) {
  const [activeLink, setActiveLink] = useState("overview");
  const [activeLesson, setActiveLesson] = useState("");
  const [sectionid, setSectionid] = useState("");
  const [lesson, setLesson] = useState<section | null>(null);

  const handleSetLesson = (
    type: string,
    section?: section,
    sectionid?: string,
  ) => {
    setActiveLesson(type);
    if (section) {
      setLesson(section);
    }
    if (sectionid) {
      setSectionid(sectionid);
    }
  };

  const FiveStar = ({ className }: { className?: string }) => (
    <ul className="flex shrink-0">
      {Array(1)
        .fill("")
        .map((_, i) => (
          <li key={i}>
            <StarSVG fill="#FD8E1F" className={className} />
          </li>
        ))}
    </ul>
  );
  const handleDownload = async () => {
    const fileUrl = lesson ? lesson.lesson.content : "";

    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    {
      lesson && link.setAttribute("download", `${lesson.lesson_name}.pdf`);
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <main className="w-full pb-20">
      <section className="flex w-full items-center gap-x-4 bg-[#F5F7FA] px-4 py-5 sm:px-14">
        <PrevPageBtn />
        <div className="flex w-full">
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center justify-between">
              <h1 className="relative mb-3 w-40 truncate text-base font-medium text-[#1D2026] sm:w-min sm:text-lg">
                {singleCourse.courseorder.courseid.title ||
                  singleCourse.courseorder.courseid.bundle}
              </h1>
              <p className="text-base text-primary-500 lg:text-2xl">
                PRICE: ₦{singleCourse.courseorder.courseid.price}
              </p>
            </div>
            <CourseTimeLecturesSection
              time={singleCourse.courseorder.courseid.duration}
            />
          </div>
        </div>
      </section>

      <section className="mb-16 flex flex-col-reverse items-center justify-between gap-6 px-4 py-6 sm:px-14 xl:flex-row xl:items-start">
        {/* Right hand side */}
        <div className="grid w-full gap-y-10">
          {/* Heading */}
          {activeLesson === "" && (
            <>
              <div className="w-full">
                {/* <Breadcrumb /> */}
                <div className="mb-3 hidden text-sm sm:block">
                  <a href="/dashboard/training/profile">Home</a>{" "}
                  <span className="mx-2">{">"}</span> Online{" "}
                  <span className="mx-2">{">"}</span>
                </div>

                <h2 className="my-6 text-xl font-semibold sm:mb-6 sm:text-3xl">
                  {singleCourse.courseorder.courseid.title ||
                    singleCourse.courseorder.courseid.bundle}
                </h2>
                <div className="flex w-full justify-between">
                  <article className="flex w-full items-center gap-x-3">
                    <div className="flex">
                      <div className="relative h-[50px] w-[50px] overflow-hidden rounded-full border-[3px] border-white">
                        <Image
                          width={500}
                          height={281}
                          src={singleCourse.courseorder.courseid.instructors[0].instructor.photo || "/images/client.jpg"}
                          alt=""
                          className="flex w-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <p className="mb-1 text-sm text-[#6E7485]">Instructor</p>
                      <h3 className="text-medium flex flex-wrap items-center gap-x-1.5 text-[#1D2026]">
                        {singleCourse.courseorder.courseid.instructors.map(
                          (instructor) => (
                            <>
                              <div className="h-1.5 w-1.5 rounded-full bg-[#1D2026]" />{" "}
                              <span className="w-32 truncate">
                                {instructor.instructor.name || "665711e1356671"}
                              </span>
                            </>
                          ),
                        )}
                      </h3>
                    </div>
                  </article>
                  <div className="hidden items-center gap-x-2 sm:flex">
                    <FiveStar className="h-6 w-6" />
                    <p className="font-medium text-[#1D2026]">
                      {singleCourse.courseorder.courseid.rating}{" "}
                      <span className="text-sm font-normal text-[#6E7485]"></span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Course image */}
              <div className="relative h-[492px] w-full">
                <Image
                  fill
                  src={singleCourse.courseorder.courseid.thumbnail}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>
            </>
          )}
          {activeLesson === "video" && (
            <>
              <VideoPlayer videoUrl={lesson?.lesson.content} />
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex flex-col items-start gap-y-2">
                  <h2 className="text-3xl font-semibold">
                    {lesson?.lesson_name}
                  </h2>
                  <p>{lesson?.lesson.lesson_type}</p>
                </div>
                {lesson !== null && (
                  <MarkLesson
                    lessonid={lesson._id}
                    sectionid={sectionid}
                    courseid={singleCourse.course._id}
                  />
                )}
              </div>
            </>
          )}
          {activeLesson === "quiz" && (
            <>
              {lesson !== null && (
                <QuizComponent
                  lessonid={lesson._id}
                  sectionid={sectionid}
                  courseid={singleCourse.course._id}
                  quiz={lesson.lesson.quiz}
                />
              )}
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex flex-col items-start gap-y-2">
                  <h2 className="text-3xl font-semibold">
                    {lesson?.lesson_name}
                  </h2>
                  <p>{lesson?.lesson.lesson_type}</p>
                </div>
                {lesson !== null && (
                  <MarkLesson
                    lessonid={lesson._id}
                    sectionid={sectionid}
                    courseid={singleCourse.course._id}
                  />
                )}
              </div>
            </>
          )}
          {activeLesson === "assignment" && (
            <>
              <article className="flex items-center justify-between bg-[#F5F7FA] p-6">
                <div className="flex items-center gap-x-3">
                  <File className="h-12 w-12" />
                  <div>
                    <h3 className="mb-1 font-medium text-[#1D2026]">
                      {lesson && lesson.lesson_name}
                    </h3>
                  </div>
                </div>
                {lesson && (
                  <button
                    onClick={handleDownload}
                    className="bg-primary-500 px-6 py-3 font-semibold text-white"
                  >
                    Download File
                  </button>
                )}
              </article>
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex flex-col items-start gap-y-2">
                  <h2 className="text-3xl font-semibold">
                    {lesson?.lesson_name}
                  </h2>
                  <p>{lesson?.lesson.lesson_type}</p>
                </div>
                {lesson !== null && (
                  <MarkLesson
                    lessonid={lesson._id}
                    sectionid={sectionid}
                    courseid={singleCourse.course._id}
                  />
                )}
              </div>
            </>
          )}
          {activeLesson === "caption" && (
            <>
              <article className="flex items-center justify-between bg-[#F5F7FA] p-6">
                <div className="flex items-center gap-x-3">
                  <h3 className="mb-1 font-medium text-[#1D2026]">
                    {lesson && lesson.lesson_name}
                  </h3>
                </div>
              </article>
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex flex-col items-start gap-y-2">
                  <h2 className="text-3xl font-semibold">
                    {lesson?.lesson_name}
                  </h2>
                  <p>{lesson?.lesson.lesson_type}</p>
                </div>
                {lesson !== null && (
                  <MarkLesson
                    lessonid={lesson._id}
                    sectionid={sectionid}
                    courseid={singleCourse.course._id}
                  />
                )}
              </div>
            </>
          )}
          {activeLesson === "text" && (
            <>
              <article className="flex items-center justify-between bg-[#F5F7FA] p-6">
                <div className="flex items-center gap-x-3">
                  <h3 className="mb-1 font-medium text-[#1D2026]">
                    {lesson && lesson.lesson_name}
                  </h3>
                </div>
              </article>
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex flex-col items-start gap-y-2">
                  <h2 className="text-3xl font-semibold">
                    {lesson?.lesson_name}
                  </h2>
                  <p>{lesson?.lesson.lesson_type}</p>
                </div>
                {lesson !== null && (
                  <MarkLesson
                    lessonid={lesson._id}
                    sectionid={sectionid}
                    courseid={singleCourse.course._id}
                  />
                )}
              </div>
            </>
          )}
          {activeLesson === "survey" && (
            <>
              <h1>{`${lesson?.lesson_name}`}</h1>
              <div className="flex w-full items-center justify-between gap-4">
                <h2 className="mb-6 text-3xl font-semibold">
                  {lesson?.lesson_name}
                </h2>
                {lesson !== null && (
                  <MarkLesson
                    lessonid={lesson._id}
                    sectionid={sectionid}
                    courseid={singleCourse.course._id}
                  />
                )}
              </div>
            </>
          )}
          {activeLesson === "pdf" && (
            <>
              <article className="flex items-center justify-between bg-[#F5F7FA] p-6">
                <div className="flex items-center gap-x-3">
                  <File className="h-12 w-12" />
                  <div>
                    <h3 className="mb-1 font-medium text-[#1D2026]">
                      {lesson && lesson.lesson_name}
                    </h3>
                  </div>
                </div>
                {lesson && (
                  <button
                    onClick={handleDownload}
                    className="bg-primary-500 px-6 py-3 font-semibold text-white"
                  >
                    Download File
                  </button>
                )}
              </article>
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex flex-col items-start gap-y-2">
                  <h2 className="text-3xl font-semibold">
                    {lesson?.lesson_name}
                  </h2>
                  <p>{lesson?.lesson.lesson_type}</p>
                </div>
                {lesson !== null && (
                  <MarkLesson
                    lessonid={lesson._id}
                    sectionid={sectionid}
                    courseid={singleCourse.course._id}
                  />
                )}
              </div>
            </>
          )}

          {/* Links */}
          <section className="flex w-full">
            <ul className="flex w-full gap-x-6 border-b border-b-[#E9EAF0]">
              {singleCourse.course?.curriculum &&
                courseDescriptionDetailLink.map(({ name, link }, i) => (
                  <li key={i} className="w-full">
                    <button
                      className={`inline-block w-full border-b-2 pb-5 text-center ${activeLink === link ? "border-b-[#FF6636]" : "border-b-transparent"}`}
                      onClick={() => setActiveLink(link)}
                    >
                      {name}
                    </button>
                  </li>
                ))}
            </ul>
          </section>

          {/* Description */}
          {activeLink === "overview" && (
            <section>
              <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
                Lectures Description
              </h3>
              <div className="grid gap-y-5 text-sm text-[#4E5566]">
                <p>{singleCourse.courseorder.courseid.description}</p>
              </div>
            </section>
          )}

          {/* Lecture Notes */}
          {/* {activeLink === "notes" && (
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-[#1D2026]">
                  Lectures Note
                </h3>
                <button className="flex items-center gap-x-2 bg-primary-100 px-4 py-3 font-medium text-primary-500">
                  <BiDownload /> Download Notes
                </button>
              </div>
              <div className="grid gap-y-5 text-sm text-[#4E5566]">
                <p>
                  We cover everything you need to build your first website. From
                  creating your first page through to uploading your website to
                  the internet. We’ll use the world’s most popular (and Level 2)
                  web design tool called Visual Studio Code. There are exercise
                  files you can download and then work along with me. At the end
                  of each video I have a downloadable version of where we are in
                  the process so that you can compare your project with mine.
                  This will enable you to see easily where you might have a
                  problem. We will delve into all the good stuff such as how to
                  create your very own mobile burger menu from scratch learning
                  some basic JavaScript and jQuery.
                </p>
                <p>
                  If that all sounds a little too fancy - don’t worry, this
                  course is aimed at people new to web design and who have never
                  coded before. We’ll start right at the beginning and work our
                  way through step by step.
                </p>
              </div>
            </section>
          )} */}

          {/* Attach Files (01) */}
          {/* {activeLink === "files" && (
            <section>
              <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
                Attach Files <span className="font-normal">(01)</span>
              </h3>
              <AttachementCard />
            </section>
          )} */}

          {activeLink === "comments" && (
            <section>
              <CommentSection
                profileData={profileData}
                courseid={singleCourse.course._id}
                comment={singleCourse.comment}
              />
            </section>
          )}
        </div>

        {singleCourse.courseorder?.curriculum.length > 0 && (
          <section className="flex w-full flex-col items-start">
            <div className="w-full shrink-0 xl:max-w-[524px]">
              <div className="mb-3.5 flex items-center justify-between font-semibold">
                <h3 className="text-[#1D2026]">Course contents</h3>
                <p className="text-xs text-[#23BD33]">
                  {singleCourse.courseorder.progress}% Completed
                </p>
              </div>
              <div className="mb-4 bg-[#E9EAF0]">
                <div
                  style={{ width: `${singleCourse.courseorder.progress}%` }}
                  className={`h-[3px] bg-[#23BD33]`}
                ></div>
              </div>
              <div
                className={`${singleCourse.courseorder.curriculum.length > 0 ? "border text-xs" : "border-0"}`}
              >
                {singleCourse.course?.curriculum.map((curriculum, i) => (
                  <ViewCurriculumCard
                    setLesson={handleSetLesson}
                    key={i}
                    curriculum={curriculum}
                  />
                ))}
                {/* <CurriculumCard /> */}
              </div>
            </div>
            <div className="w-full shrink-0 p-4 xl:max-w-[524px]">
              {singleCourse.course?.redirect_course.redirect && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Redirect Links
                  </h3>
                  <div className="space-y-2">
                    {singleCourse.course.redirect_course.links.map(
                      (link, i) => (
                        <Link
                          key={i}
                          href={link}
                          target="_blank"
                          className="block break-words text-blue-600 hover:underline"
                        >
                          {link}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

// function AttachementCard() {
//   return (
//     <article className="flex items-center justify-between bg-[#F5F7FA] p-6">
//       <div className="flex items-center gap-x-3">
//         <File className="h-12 w-12" />
//         <div>
//           <h3 className="mb-1 font-medium text-[#1D2026]">
//             Create acount on webo
//           </h3>
//           <p className="text-sm text-[#6E7485]">12.6 MB</p>
//         </div>
//       </div>
//       <button className="bg-primary-500 px-6 py-3 font-semibold text-white">
//         Download File
//       </button>
//     </article>
//   );
// }

const CommentSection = ({
  profileData,
  comment: initialComment,
  courseid,
}: {
  profileData: ProfileData;
  comment: comment[];
  courseid: string;
}) => {
  //   const comments = [
  //     {
  //       id: 1,
  //       author: "Jane Doe",
  //       avatar: "/api/placeholder/40/40",
  //       content: "This is an example comment. It could be about anything!",
  //       timestamp: "1 week ago",
  //       isAdmin: false,
  //     },
  //     {
  //       id: 2,
  //       author: "John Smith",
  //       avatar: "/api/placeholder/40/40",
  //       content:
  //         "Here's another comment. Notice how it's structured similarly to the others.",
  //       timestamp: "1 week ago",
  //       isAdmin: true,
  //     },
  //     {
  //       id: 3,
  //       author: "Alice Johnson",
  //       avatar: "/api/placeholder/40/40",
  //       content: "Great discussion everyone! Keep the comments coming.",
  //       timestamp: "1 week ago",
  //       isAdmin: false,
  //     },
  //   ];
  const [comment, setComment] = useState(initialComment);
  const { data: session } = useSession();
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await sendComment({
        userid: session?.user.id as string,
        comment: commentText,
        session: session as Session,
        courseid,
      });
      setComment((prev) => [...prev, response.data]);
      setCommentText("");
    } catch (error) {
      console.error("Failed to post Comment:", error);
    } finally {
      setLoading(false);
    }
  };

  async function sendComment({
    userid,
    comment,
    courseid,
    session,
  }: {
    userid: string;
    comment: string;
    courseid: string;
    session: Session;
  }) {
    try {
      const response = await CourseApi.sendComment({
        userid,
        comment,
        courseid,
        session,
      });
      return response;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to post Comment",
      );
    }
  }

  return (
    <div>
      <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
        Comments{" "}
        <span className="font-normal">
          ({comment.length.toString().padStart(2, "0")})
        </span>
      </h3>

      {comment.map((comment, i) => (
        <Comment profileData={profileData} key={i} comment={comment} />
      ))}

      <div className="mt-3 flex flex-col items-start gap-x-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your Comment..."
          className="w-full rounded-md border p-2 text-sm focus:p-2"
        />
        <button
          disabled={commentText === ""}
          onClick={handleCommentSubmit}
          className="mt-2 rounded bg-primary-500 px-4 py-2 text-sm text-white"
        >
          {loading ? "Posting Comment..." : "Post a Comment"}
        </button>
      </div>
    </div>
  );
};
