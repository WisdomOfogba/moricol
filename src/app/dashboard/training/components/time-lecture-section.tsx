import { ClockSvg, FolderSvg, PlaySVG } from "@/components/svgs";

export default function CourseTimeLecturesSection({
  time,
  lectures,
  sections,
}: {
  time?: string;
  lectures?: number;
  sections?: number;
}) {
  return (
    <ul className="text-sm flex gap-x-4 flex-wrap">
      {sections && (
        <li className="flex items-center gap-1.5">
            <FolderSvg /> {sections} sections
        </li>
      )}
      {lectures && (
        <li className="flex items-center gap-x-1.5">
          <PlaySVG stroke="#564FFD" className="h-[20px] w-[20px]" />
          {lectures || "10"} {lectures > 1 ? "lectures" : "lecture"}
        </li>
      )}
      {time && (
        <li className="flex items-center gap-1.5">
            <ClockSvg /> {time}
        </li>
      )}
    </ul>
  );
}

// i also did he text-s here if it doesn't match we do same thing
