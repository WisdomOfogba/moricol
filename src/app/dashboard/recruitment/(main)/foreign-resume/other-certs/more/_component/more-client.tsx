"use client";
import ContentLayout from "@/app/dashboard/recruitment/_components/content-layout";
import Link from "next/link";
import { useState } from "react";
import { BiBriefcase, BiChevronRight } from "react-icons/bi";
import { BsFillPlusSquareFill, BsTrash2 } from "react-icons/bs";

interface OtherCertificate {
  id: number;
  bootcampOrOnlineLearning: string;
  courseLearnt: string;
  inProgress: boolean;
  schoolStarted: string;
  schoolEnded: string;
  description: string;
}

export default function MoreOtherCertClient({
  next_route,
  more_route,
}: {
  next_route: string;
  more_route: string;
}) {
  const [certificates, setCertificates] = useState<OtherCertificate[]>([
    {
      id: 1,
      bootcampOrOnlineLearning: "Udacity",
      courseLearnt: "Full Stack Web Development",
      inProgress: false,
      schoolStarted: "Jan 2020",
      schoolEnded: "Dec 2020",
      description:
        "Learned modern web development techniques and technologies.",
    },
    {
      id: 2,
      bootcampOrOnlineLearning: "Coursera",
      courseLearnt: "Machine Learning",
      inProgress: true,
      schoolStarted: "Mar 2021",
      schoolEnded: "Present",
      description:
        "Studying advanced machine learning algorithms and their applications.",
    },
  ]);

  // const addCertificate = () => {
  //   const newCertificate: OtherCertificate = {
  //     id: certificates.length + 1,
  //     bootcampOrOnlineLearning: "New Bootcamp/Online Learning",
  //     courseLearnt: "New Course",
  //     inProgress: false,
  //     schoolStarted: "Start Date",
  //     schoolEnded: "End Date",
  //     description: "Description of the course or bootcamp",
  //   };
  //   setCertificates([...certificates, newCertificate]);
  // };

  const deleteCertificate = (id: number) => {
    setCertificates(certificates.filter((cert) => cert.id !== id));
  };

  return (
    <ContentLayout
      next_route={next_route}
      pageTitle="Your Other Certificates"
      step={3}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((certificate) => (
          <div key={certificate.id}>
            <div className="rounded-lg bg-[#FFF8E7] p-4 shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <BiBriefcase className="text-3xl text-gray-500" />
                  <div>
                    <h3 className="font-semibold">
                      {certificate.bootcampOrOnlineLearning}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {certificate.courseLearnt}
                    </p>
                    <p className="text-sm text-gray-500">
                      {`${certificate.schoolStarted} - ${certificate.inProgress ? "Present" : certificate.schoolEnded}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {certificate.inProgress ? "In Progress" : "Completed"}
                    </p>
                  </div>
                </div>
                <BiChevronRight className="text-3xl text-gray-400" />
              </div>
            </div>
            <button
              onClick={() => deleteCertificate(certificate.id)}
              className="mt-2 flex items-center text-sm text-red-500"
            >
              Delete <BsTrash2 className="ml-1 h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <Link
        href={more_route}
        // onClick={addCertificate}
        className="mt-4 flex items-center font-semibold"
      >
        <BsFillPlusSquareFill className="mr-2" /> Add more Certificates
      </Link>
    </ContentLayout>
  );
}
