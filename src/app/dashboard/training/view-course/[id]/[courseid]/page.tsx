import React from "react";
import ViewCourseDetail from "../../../components/view-course-details";
import { CourseApi } from "@/api/training";
import { ProfileData, SingleCourse } from "@/definition";
import { getUserSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { profileApi } from "@/api/profile";
import { MarkLessonProvider } from "@/lib/TrainingMarkLessonContext";

export const dynamic = "force-dynamic";

async function getSingle({
  courseid,
  courseorderid,
}: {
  courseid: string;
  courseorderid: string;
}) {
  const session = await getUserSession();
  if (!session || !session.user || !("id" in session.user)) {
    throw new Error("User session is invalid or user ID is missing");
  }

  if (!/^[a-fA-F0-9]{24}$/.test(courseid)) {
    console.error(`Invalid id format: ${courseorderid}`);
    notFound();
  }
  const { data: singleCourse }: { data: SingleCourse } =
    await CourseApi.getSingleCourse({
      userid: session.user.id,
      session,
      courseid,
      courseorderid,
    });
  try {
    return singleCourse;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get profile data",
    );
  }
}

async function getProfileData() {
  try {
    const session = await getUserSession();
    if (!session || !session.user || !("id" in session.user)) {
      throw new Error("User session is invalid or user ID is missing");
    }
    const { data: profileData }: { data: ProfileData } =
      await profileApi.getProfile({ userid: session.user.id, session });
    return profileData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get profile data",
    );
  }
}

const page = async ({
  params: { id, courseid },
}: {
  params: { id: string; courseid: string };
}) => {
  const profileData = await getProfileData();
  if (courseid === id) {
    return notFound();
  }
  const singleCourse = await getSingle({
    courseid: id,
    courseorderid: courseid,
  });
  return (
    <MarkLessonProvider>
      <ViewCourseDetail
        profileData={profileData}
        singleCourse={singleCourse}
        courseid={courseid}
        id={id}
      />
    </MarkLessonProvider>
  );
};

export default page;
