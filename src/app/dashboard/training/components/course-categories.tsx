"use client";

import React, { useState } from "react";
import CourseCard from "./card-course";
import { CourseData } from "@/definition";

const categories = ["Classroom", "Visual", "Bundle", "Online"];

export default function CourseCategories({
  courseData,
}: {
  courseData: [
    courseClassroomData: CourseData[],
    courseVisualData: CourseData[],
    courseBundleData: CourseData[],
    courseOnlineData: CourseData[],
  ];
}) {
  const [activeCategory, setActiveCategory] = useState(0);

  const categoriesList = categories.map((c, i) => (
    <li
      key={i}
      className={`w-[160px] border-b pb-1 text-center sm:w-full ${activeCategory === i ? "border-primary-500 text-primary-500" : "border-gray-700 text-gray-700"}`}
    >
      <button onClick={() => setActiveCategory(i)}>{c}</button>
    </li>
  ));

  return (
    <section className="w-full">

      <div className="w-full overflow-auto no-scrollbar">
        <ul className="mb-8 flex w-max sm:w-full justify-between">
          {categoriesList}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-7 bg-[#F5F7FA] px-4 py-8 sm:grid-cols-2 sm:px-14 lg:grid-cols-4 xl:grid-cols-5">
        {courseData[activeCategory].map((course, i) => (
          <CourseCard
            key={i}
            type={`${categories[activeCategory]}`}
            courseData={course}
          />
        ))}
      </div>
    </section>
  );
}