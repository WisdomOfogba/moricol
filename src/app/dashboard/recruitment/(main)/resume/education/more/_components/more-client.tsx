"use client";
import ContentLayout from "@/app/dashboard/recruitment/_components/content-layout";
import { Education } from "@/definition";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiBriefcase, BiChevronRight } from "react-icons/bi";
import { BsFillPlusSquareFill, BsTrash2 } from "react-icons/bs";


export default function MoreEducationClient({
  next_route,
  more_route,
  education
}: {
  next_route: string;
  more_route: string;
  education: Education[]
}) {
  const router = useRouter();
  const [education_entries, setEducation_entries] = useState<Education[]>(education);

  const deleteEducation_entry = (id: string) => {
    setEducation_entries(education_entries.filter((entry) => entry._id !== id));
  };

  const handleNext = () => {
    router.push(next_route);
  };

  return (
    <ContentLayout
      next_route={next_route}
      pageTitle="Your educational qualifications"
      step={3}
      nextFunction={handleNext}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {education_entries.map((education_entry) => (
          <div key={education_entry._id}>
            <div className="rounded-lg bg-[#FFF8E7] p-4 shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <BiBriefcase className="text-3xl text-gray-500" />
                  <div>
                    <h3 className="font-semibold">{education_entry.school}</h3>
                    <p className="text-sm text-gray-600">
                      {education_entry.degree}
                    </p>
                    <p className="text-sm text-gray-500">{`${education_entry.start_date} - ${education_entry.end_date==='' ? 'Present' : education_entry.end_date}`}</p>
                  </div>
                </div>
                <BiChevronRight className="text-3xl text-gray-400" />
              </div>
            </div>
            <button
              onClick={() => deleteEducation_entry(education_entry._id)}
              className="mt-2 flex items-center text-sm text-red-500"
            >
              Delete <BsTrash2 className="ml-1 h-4 w-4" />
            </button>
          </div>
        ))}
       
      </div>
        {education_entries.length === 0 && (
          <div className="col-span-1 flex items-center justify-center">
            <p className="text-secondary-500">No education entries found</p>
          </div>
        )}
      <Link
        href={more_route}
        className="mt-4 flex items-center font-semibold w-fit"
      >
        <BsFillPlusSquareFill className="mr-2" /> Add more Education
      </Link>
    </ContentLayout>
  );
}
