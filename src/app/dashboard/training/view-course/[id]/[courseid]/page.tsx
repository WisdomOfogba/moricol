import React from 'react'
import ViewCourseDetail from '../../../components/view-course-details'
import { CourseApi } from '@/api/training';
import { SingleCourse } from '@/definition';
import { getUserSession } from '@/lib/auth';
import { notFound } from 'next/navigation';

export const dynamic = "force-dynamic"

async function getSingle({courseid, courseorderid}: {courseid: string, courseorderid: string}) {
  const session = await getUserSession();
  if (!session || !session.user || !('id' in session.user)) {
    throw new Error('User session is invalid or user ID is missing');
  }

  if (!/^[a-fA-F0-9]{24}$/.test(courseid)) {
    console.error(`Invalid id format: ${courseorderid}`);
    notFound();
  }
  const { data: singleCourse }: { data: SingleCourse } = await CourseApi.getSingleCourse({ userid: session.user.id, session, courseid, courseorderid });
  try {
    return singleCourse;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get profile data');
  }
}

const page = async ({ params: {id, courseid} }: { params: { id: string, courseid: string } }) => {
  if (courseid === id){
    return notFound()
  }
  const singleCourse = await getSingle({courseid: id, courseorderid: courseid})
  return (
    <ViewCourseDetail singleCourse={singleCourse} />
  )
}

export default page