import { StarSVG } from "@/components/svgs";
import { CourseData } from "@/definition";
import Image from "next/image";
import Link from "next/link";

export default function CourseCard({ courseData, type }: { courseData: CourseData, type: string }) {
  return (
    <Link href={`/dashboard/training/course/${type.toLowerCase()}/${courseData._id}`} className="block">
      <article className="border bg-white">
        {/* Image */}
        <div className="relative h-[11.7rem]">
          <Image
            src={courseData.thumbnail}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Details */}
        <div className="p-3.5 font-medium">
          {/* Badge */}
          <div className="mb-2.5 flex items-center justify-between">
            <span>
              {courseData.category && (
                <span className="bg-[#F9EBD0] px-1.5 py-1 text-[10px] font-medium text-[#714D0A]">
                  {courseData.category}
                </span>
              )}

            </span>
            <p className="text-xs text-[#E29A13]">{courseData.level && `LEVEL ${courseData.level}`}</p>
          </div>

          {/* Title */}
          <h3 className="text-sm text-[#1D2026]">
            {courseData?.title || courseData?.bundle}
          </h3>
        </div>

        {/* Footer */}
        <div className="flex justify-between border-t border-t-[#E9EAF0] p-3.5 text-sm text-[#4E5566]">
          <p className="flex items-center gap-x-1">
            <StarSVG fill="#FD8E1F" /> {courseData.rating}
          </p>
          <p>
            {courseData.client} <span className="#8C94A3">students</span>
          </p>
        </div>
      </article>
    </Link>
  );
}
