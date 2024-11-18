"use client";

import {
  ArrowRightSvg,
  ChevronDownSvg,
  Clipboard,
  ClockSvg,
  // DollarSignSvg,
  Envelop,
  Facebook,
  GreenCheckmarCircle,
  NetworkSvg,
  // NotebookSvg,
  // NotepadSvg,
  Spinner,
  // StackSvg,
  StarSVG,
  // TrophySvg,
  // TvSvg,
  Twitter,
  TwoUserCutOffSvg,
  Whatsapp,
} from "@/components/svgs";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { useState } from "react";
import PrevPageBtn from "../view-course/prev-page-btn";
import CourseTimeLecturesSection from "./time-lecture-section";
import CurriculumCard from "./curriculum-card";
import { CourseData, ReviewData } from "@/definition";
import CourseCard from "./card-course";
import { useCart } from "@/lib/TrainingCartContext";
import MakeTrainingPaymentButton from "./make-training-payments";


const courseDescriptionDetailLink = [
  {
    name: "Overview",
    link: "overview",
  },
  {
    name: "Curriculum",
    link: "curriculum",
  },
  {
    name: "Instructor",
    link: "instructor",
  },
  {
    name: "Review",
    link: "review",
  },
];

const socialLinks = [
  { icon: <Facebook />, key: "facebook" },
  { icon: <Twitter />, key: "twitter" },
  { icon: <Envelop />, key: "mail" }, // Changed Envelop to Mail as it's not in lucide-react
  { icon: <Whatsapp />, key: "whatsapp" },
];

export default function CourseDetail({course, data, type, review, isBought, courseorderid }: {course: CourseData; data: CourseData[]; type: string; review: ReviewData[]; isBought: boolean, courseorderid?: string}) {
  const [activeLink, setActiveLink] = useState("overview");

  const FiveStar = ({ className }: { className?: string }) => (
    <ul className="flex shrink-0">
      {Array(course.rating)
        .fill("")
        .map((_, i) => (
          <li key={i}>
            <StarSVG fill="#FD8E1F" className={className} />
          </li>
        ))}
    </ul>
  );
  return (
    <main className="pb-20">
      <section className="flex items-center justify-between bg-[#F5F7FA] px-8 py-5">
        <div className="flex gap-x-4">
          <PrevPageBtn />
          <div>
            <h1 className="mb-3 text-lg font-medium text-[#1D2026]">
              {course?.title || course?.bundle}
            </h1>
            <CourseTimeLecturesSection time={course.duration} />
          </div>
        </div>
        <p className="text-2xl text-primary-500">PRICE: ₦{course?.price}</p>
      </section>

      <section className="mb-16 flex items-start justify-between gap-x-6 px-14 py-6">
        {/* Right hand side */}
        <div className="grid gap-y-10 w-full">
          {/* Heading */}
          <div>
            {/* <Breadcrumb /> */}
            <div className="mb-3 text-sm">
              <Link href="/dashboard/training">Home</Link> <span className="mx-2">{">"}</span> {type}{" "}
              <span className="mx-2">{">"}</span>
            </div>

            <h2 className="mb-6 text-3xl font-semibold">
              {course.title || course.bundle}
            </h2>

            <div className="flex justify-between">
              <article className="flex items-center gap-x-3">
                <div className="flex">
                  <div className="relative h-[50px] w-[50px] overflow-hidden rounded-full border-[3px] border-white">
                    <Image fill src="/images/client.jpg" alt="" />
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-sm text-[#6E7485]">Instructor</p>
                  <h3 className="text-medium flex items-center gap-x-1.5 text-[#1D2026]">
                    {course.instructors.map((instructor) => (
                      <>
                        <div className="h-1.5 w-1.5 rounded-full bg-[#1D2026]" />{" "}
                        <span>{instructor.instructor}</span>
                      </>
                    ))}
                  </h3>
                </div>
              </article>
              <div className="flex items-center gap-x-2">
                <FiveStar className="h-6 w-6" />
                <p className="font-medium text-[#1D2026]">
                  4.8{" "}
                  <span className="text-sm font-normal text-[#6E7485]">
                    {" "}
                    ({course?.rating} Rating)
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Course image */}
          <div className="relative h-[492px] w-full">
            {course && 
            <Image
              fill
              src={course.thumbnail}
              alt=""
              style={{ objectFit: "cover" }}
            />
            }
          </div>

          {/* Links */}
          <section>
            <ul className="flex gap-x-6 border-b border-b-[#E9EAF0]">
              {courseDescriptionDetailLink.map(({ name, link }) => (
                <li className="w-full" key={name}>
                  <button
                    className={`inline-block w-full border-b-2 pb-5 text-center ${activeLink === link ? 'border-b-[#FF6636]"' : "border-b-transparent"}`}
                    onClick={() => setActiveLink(link)}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {activeLink === "overview" && (
            <>
              {/* Description */}
              <section>
                <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
                  Description
                </h3>
                <div className="grid gap-y-5 text-sm text-[#4E5566]">
                  <p>
                    {course?.description}
                  </p>
                </div>
              </section>

              {/* Online Courses */}
              <section>
                  <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
                    Classroom Courses
                  </h3>

              {course.online_course ? 
                course.online_course.map((online, i) => (
                  <ul key={i} className="grid grow gap-y-5">
                        <li
                          className="flex items-center gap-x-2 text-sm font-bold"
                          key={i}
                        >
                          <ArrowRightSvg className="-rotate-180" />
                          {online.course}{" "}
                          <div className="flex h-4 w-3.5 items-center justify-center bg-primary-50">
                            <ArrowRightSvg className="h-5 w-5 rotate-[135deg]" />
                          </div>
                        </li>
                  </ul>
                ))
              : <p className="flex items-center gap-x-2 text-sm font-bold">No Online courses</p>}
                </section>

              {/* Classroom Courses */}
                <section>
                  <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
                    Classroom Courses
                  </h3>

              {course.classroom_course ? 
                course.classroom_course.map((classroom, i) => (
                  <ul key={i} className="grid grow gap-y-5">
                        <li
                          className="flex items-center gap-x-2 text-sm font-bold"
                          key={i}
                        >
                          <ArrowRightSvg className="-rotate-180" />
                          {classroom.course}{" "}
                          <div className="flex h-4 w-3.5 items-center justify-center bg-primary-50">
                            <ArrowRightSvg className="h-5 w-5 rotate-[135deg]" />
                          </div>
                        </li>
                  </ul>
                ))
              : <p className="flex items-center gap-x-2 text-sm font-bold">No classroom courses</p>}
                </section>

              {/* What you would use in this course */}
              <section className="bg-[#E1F7E366] p-10">
                <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
                  What you would learn in this course
                </h3>
                <ul className="grid grow grid-cols-2 gap-x-6 gap-y-5">
                  {Array(4)
                    .fill("")
                    .map((_, index) => (
                      <li
                        className="flex items-start gap-x-2 text-sm"
                        key={index}
                      >
                        <GreenCheckmarCircle />
                        This course is for those who want to launch a Level
                        2lance Web Design Careers.
                      </li>
                    ))}
                </ul>
              </section>

              {/* Who the course is for */}
              {course?.for_who &&
                <section>
                  <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
                    Who is this course for:
                  </h3>

                  <ul className="grid grow gap-y-5">
                    {course.for_who.map((_, i) => (
                        <li className="flex items-center gap-x-2 text-sm" key={i}>
                          <ArrowRightSvg className="-rotate-180" />
                          {_.option}
                        </li>
                      ))}
                  </ul>
                </section>
              }

              {/* Course requirements */}
              <section>
                <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
                  Course requirements
                </h3>

                <ul className="ml-4 grid grow list-disc gap-y-5">
                  {Array(2)
                    .fill("")
                    .map((_, index) => (
                      <li key={index} className="pl-1 text-sm">
                        <span className="flex items-center">
                          Nunc auctor consequat lorem, in posuere enim hendrerit
                          sed.
                        </span>
                      </li>
                    ))}
                </ul>
              </section>
            </>
          )}

          {/* Curriculum */}
          {activeLink === "curriculum" && (
            <section>
              <div className="flex items-center justify-between">
                <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
                  Curriculum
                </h3>
                <CourseTimeLecturesSection time={course.duration} />
              </div>
              <div className="border">
                <CurriculumCard />
                <CurriculumCard />
              </div>
            </section>
          )}

          {/* Instructors */}
          {activeLink === "instructor" && (
            <section>
              <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
                Course Instructor
              </h3>
              <div className="flex gap-x-6">
                <ul className="grid grow gap-y-5">
                  {course.instructors && course.instructors.map((instructor) => (
                      <li key={instructor._id} className="flex items-center text-sm">
                        <article className="flex w-full items-center gap-x-7 border border-[#E9EAF0] px-6 py-2">
                          <div className="relative h-[63px] w-[63px] overflow-hidden rounded-full">
                            <Image
                              fill
                              src="/images/client.jpg"
                              alt=""
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <h4 className="text-lg font-semibold text-[#1D2026]">
                            {instructor.instructor}
                          </h4>
                        </article>
                      </li>
                    ))}
                </ul>
              </div>
            </section>
          )}

          {/* Rating | Feedback */}
          {activeLink === "review" && (
            <>
              <section>
                <h3 className="mb-5 text-2xl font-semibold text-[#1D2026]">
                  Course Rating
                </h3>
                <div className="flex gap-x-6">
                  <div className="flex w-[200px] flex-col items-center justify-center border border-[#E9EAF0]">
                    <p className="mb-6 text-5xl font-semibold">4.8</p>
                    <div className="flex flex-col items-center justify-center gap-y-3">
                      <FiveStar />
                      <p className="text-sm font-medium text-[#1D2026]">
                        Course Rating
                      </p>
                    </div>
                  </div>
                  <ul className="grid grow gap-y-5">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <FiveStar />
                          <p className="ml-1.5 mr-6 shrink-0 text-[#6E7485]">
                            {course?.rating} Star Rating
                          </p>
                          <div className="mr-4 w-full grow bg-primary-100">
                            <div className="h-2 w-[75%] bg-primary-500" />
                          </div>
                          <p className="font-medium text-[#1D2026]">75%</p>
                        </li>
                      ))}
                  </ul>
                </div>
              </section>

              <section className="grid gap-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-[#1D2026]">
                    Students Feedback
                  </h3>
                  <button className="flex items-center gap-x-12 border border-[#E9EAF0] px-4 py-3 text-[#4E5566]">
                    5 Start Rating
                    <ChevronDownSvg />
                  </button>
                </div>
                <div>
                  {review.map((review, i) => (
                    <CourseReview key={i} review={review} />
                  ))}
                  <hr className="my-5 h-[1px] border-none bg-[#E9EAF0] last:hidden" />
                </div>
                <button className="group flex w-fit items-center gap-x-3 bg-primary-100 px-6 py-3 font-semibold text-primary-500">
                  Load More{" "}
                  <Spinner className="duration-700 group-hover:motion-safe:animate-spin" />
                </button>
              </section>
            </>
          )}
        </div>

        <CourseDetailSummary courseorderid={courseorderid} isBought={isBought} type={type} course={course} />
      </section>

      {/* Related courses */}
      <section className="px-14">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-[#1D2026]">
            Related Courses
          </h2>
          <Link
            href={routes.TRAININGDASHBOARD}
            className="flex gap-x-3 bg-primary-100 px-6 py-3 font-semibold text-primary-500"
          >
            View All <ArrowRightSvg className="-rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data.map((course, i) => (
            <CourseCard key={i} courseData={course} type={type} />
          ))}
        </div>
      </section>
    </main>
  );
}

function CourseDetailSummary({course, type, isBought, courseorderid }: {course: CourseData, type: string, isBought: boolean, courseorderid?: string }) {
  const highlightDetails = [
    {
      title: "Course Duration",
      detail: `${course.duration || "no duration"}`,
      icon: <ClockSvg stroke="#A1A5B3" />,
    },
    {
      title: "Course Level",
      detail: `level ${course.level || "(no level)"}`,
      icon: <NetworkSvg />,
    },
    {
      title: "Students Enrolled",
      detail: `${course.client}`,
      icon: <TwoUserCutOffSvg />,
    },
  ];


  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(course);
  };

  return (
    <article className="w-[424px] shrink-0 shadow-md">
      {/* Course Details */}
      <div className="grid gap-y-6 p-6">
        {highlightDetails.map(({ title, detail, icon }, i) => (
          <div className="flex justify-between text-sm" key={i}>
            <p className="flex items-center gap-x-2 text-[#1D2026]">
              {icon}  
              {title}
            </p>
            <p className="text-[#6E7485]">{detail}</p>
          </div>
        ))}
      </div>
      {/* Buttons */}
      {
        isBought ? (
        <div className="grid gap-y-3 border-y border-y-[#E9EAF0] p-6">
          <a href={`/dashboard/training/view-course/${course._id}/${courseorderid}`} className="w-full flex justify-center items-center bg-primary-500 p-3 text-lg font-semibold text-white">
            View Course
          </a>
        </div>
        ) : (
        <div className="grid gap-y-3 border-y border-y-[#E9EAF0] p-6">
          <button onClick={handleAddToCart} className="w-full bg-primary-500 p-3 text-lg font-semibold text-white">
            Add To Cart
          </button>
            <MakeTrainingPaymentButton button="now" type={type} courseid={course._id} price={course.price} />
          <div className="flex gap-x-3">
            <button className="w-full border border-[#E9EAF0] py-3 text-sm font-semibold">
              Add To Wishlist
            </button>
            <MakeTrainingPaymentButton button="no" type={type} courseid={course._id} price={course.price} />
          </div>
          <p className="text-sm text-[#8C94A3]">
            <span className="font-medium">Note:</span> all course have 30-days
            money-back guarantee
          </p>
        </div>
        )
      }
      {/* Benefits */}{
        course.benefits &&
      <div className="p-6">
        <h3 className="mb-4 font-medium text-[#1D2026]">
          This course includes:
        </h3>
        <ul className="grid gap-y-3">
          {course.benefits.map(({ option }, i) => (
            <li key={i} className="flex items-center gap-x-3 text-sm">
              <span className="flex h-6 w-6 items-center justify-center">
              </span>{" "}
              {option}
            </li>
          ))}
        </ul>
      </div>
        }

      <div className="border-t p-6">
        <h3 className="mb-4 font-medium text-[#1D2026]">Share this course:</h3>

        <div className="flex gap-x-2">
          <button className="flex grow items-center gap-x-3 bg-[#F5F7FA] px-5 py-3.5 text-sm font-medium">
            <Clipboard />
            Copy link
          </button>

          {socialLinks.map(({ icon, key }) => (
            <button
              key={key}
              className="flex h-12 w-12 items-center justify-center bg-[#F5F7FA]"
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function CourseReview({review}: {review: ReviewData}) {
  return (
    <article className="flex items-start gap-x-4">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src="/images/client.jpg"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div>
        <div className="mb-2 flex items-center gap-x-2">
          <h4 className="text-sm font-medium text-[#1D2026]">{`${review.userid.firstname} ${review.userid.lastname}`}</h4>
          <div className="h-1 w-1 rounded-full bg-[#6E7485]" />
          <p className="text-xs">{review.createdAt}</p>
        </div>
        <ul className="mb-3 flex">
          {Array(review.rating)
            .fill("")
            .map((_, i) => (
              <li key={i}>
                <StarSVG fill="#FD8E1F" />
              </li>
            ))}
        </ul>
        <p className="text-sm text-[#4E5566]">
          {review.review}
        </p>
      </div>
    </article>
  );
}
