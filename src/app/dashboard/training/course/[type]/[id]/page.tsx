import React from 'react'
import CourseDetail from '../../../components/course-details'
import { CourseApi } from '@/api/training';
import { CourseData, ReviewData } from '@/definition';

async function getCoursesData({type, id}: {type: string; id: string;}) {
  try {
    const { data: {course: courseDetails, review: courseDetailsReview} }: { data: {course: CourseData; review: ReviewData[]} } = await CourseApi.getSingleCourseData({ type, id });
    const { data: courseData }: { data: CourseData[] } = await CourseApi.getCourseData({ type });
    return {courseDetails, courseData, courseDetailsReview};
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get Courses data');
  }
}

const page = async ({ params: { id, type } }: { params: { id: string, type: string } }) => {
  const {courseDetails, courseData, courseDetailsReview} = await getCoursesData({type, id});
  console.log(courseDetails)
  return <CourseDetail type={type} data={courseData} course={courseDetails} review={courseDetailsReview} />
}

export default page