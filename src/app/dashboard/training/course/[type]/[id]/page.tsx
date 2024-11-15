import React from 'react'
import CourseDetail from '../../../components/course-details'
import { CourseApi } from '@/api/training';
import { CourseData } from '@/definition';

async function getCoursesData({type, id}: {type: string; id: string;}) {
  try {
    const { data: courseData }: { data: CourseData[] } = await CourseApi.getCourseData({ type });
    const course = courseData.find((c) => c._id === id)
    return course;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get Courses data');
  }
}

const page = async ({ params: { id, type } }: { params: { id: string, type: string } }) => {
  const course = await getCoursesData({type, id});
  return <CourseDetail course={course} />
}

export default page