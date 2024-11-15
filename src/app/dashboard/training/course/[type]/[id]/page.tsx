import React from 'react'
import CourseDetail from '../../../components/course-details'
import { CourseApi } from '@/api/training';
import { CourseData } from '@/definition';

async function getCoursesData({type, id}: {type: string; id: string;}) {
  try {
    const { data: {course: courseData} }: { data: {course: CourseData} } = await CourseApi.getSingleCourseData({ type, id });
    return {courseData};
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get Courses data');
  }
}

const page = async ({ params: { id, type } }: { params: { id: string, type: string } }) => {
  const {courseData} = await getCoursesData({type, id});
  return <CourseDetail course={courseData} />
}

export default page