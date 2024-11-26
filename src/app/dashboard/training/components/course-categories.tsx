"use client";

import React, { useState } from "react";
import CourseCard from "./card-course";
// import { FilterSVG, SearchSvg } from "@/components/svgs";
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
      {/* Filter section
      <section className="mb-10 w-full px-4 sm:px-14">
        <div className="flex w-full justify-between">
          <div className="flex w-full gap-x-6">
            <FilterBtn />
            <div className="flex w-full items-center gap-x-3 border border-[#E9EAF0] px-4 py-3 text-[#4E5566] has-[:focus]:border-primary-500 has-[:focus]:bg-primary-50 sm:w-[23rem] lg:w-[26rem]">
              <SearchSvg />
              <input
                type="text"
                placeholder="UI/UX Design"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section> */}

      <div className="w-full overflow-auto no-scrollbar">
        <ul className="mb-8 flex w-max sm:w-full justify-between">
          {categoriesList}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-7 bg-[#F5F7FA] px-4 py-8 sm:grid-cols-2 sm:px-14 lg:grid-cols-4 xl:grid-cols-5">
        {/* <ul className="grid gap-y-6">
          <FilterContainer title="Duration">
            <CheckboxListItem label={{ text: "BUNDLE 1" }} count={345} />
          </FilterContainer>

          <FilterContainer title="Level">
            <CheckboxListItem label={{ text: "BUNDLE 1" }} count={345} />
          </FilterContainer>

          <FilterContainer title="Rating">
            <CheckboxListItem
              label={{ icon: <StarSVG fill="#FD8E1F" />, text: "5 Star" }}
              count={345}
            />
          </FilterContainer>

          <FilterContainer title="Duration">
            <CheckboxListItem label={{ text: "6-12 Months" }} count={345} />
          </FilterContainer>
        </ul> */}
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

// function FilterBtn() {
//   return (
//     <button className="hidden items-center gap-x-6 border border-primary-500 px-6 py-3 sm:flex">
//       <FilterSVG /> <span>Filter</span>
//       <span className="bg-primary-500 px-1.5 py-1 text-white">3</span>
//     </button>
//   );
// }

// function FilterContainer({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   const [isFilterOptionOpen, setFilterOption] = useState(true);

//   return (
//     <article className="border border-[#E9EAF0] bg-white">
//       <header className="flex items-center justify-between border-b border-b-[#E9EAF0] px-5 py-6">
//         <h3 className="text-lg font-medium uppercase text-[#1D2026]">
//           {title}
//         </h3>
//         <button onClick={() => setFilterOption(!isFilterOptionOpen)}>
//           <ChevronDownSvg
//             className={`transition-transform duration-300 ease-in-out ${
//               isFilterOptionOpen ? "rotate-180" : ""
//             }`}
//           />
//         </button>
//       </header>

//       {isFilterOptionOpen && (
//         <main className="grid gap-y-2.5 px-5 py-6">
//           <ul>{children}</ul>
//         </main>
//       )}
//     </article>
//   );
// }

// function CheckboxListItem({
//   label,
//   count,
// }: {
//   label: { icon?: React.ReactNode; text: string };
//   count: number;
// }) {
//   const [isChecked, setIsChecked] = useState(false);

//   return (
//     <li className="group flex items-center justify-between text-sm">
//       <label
//         className={`flex cursor-pointer items-center gap-x-3 ${isChecked ? "text-primary-500" : "text-[#4E5566]"}`}
//       >
//         <input
//           type="checkbox"
//           className="h-[18px] w-[18px]"
//           onChange={(e) => setIsChecked(e.target.checked)}
//         />
//         <span className="flex items-center gap-x-1.5">
//           {label.icon}
//           {label.text}
//         </span>
//       </label>

//       <span
//         className={`text-xs ${isChecked ? "font-medium text-[#4E5566]" : "text-[#8C94A3]"}`}
//       >
//         {count}
//       </span>
//     </li>
//   );
// }
