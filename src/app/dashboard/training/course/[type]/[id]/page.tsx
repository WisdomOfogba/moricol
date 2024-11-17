import React from 'react'
import CourseDetail from '../../../components/course-details'
import { CourseApi } from '@/api/training';
import { CourseData, ProfileData, ReviewData } from '@/definition';
import { getUserSession } from '@/lib/session';
import { profileApi } from '@/api/profile';

async function getCoursesData({type, id}: {type: string; id: string;}) {
  try {
    const { data: {course: courseDetails, review: courseDetailsReview} }: { data: {course: CourseData; review: ReviewData[]} } = await CourseApi.getSingleCourseData({ type, id });
    const { data: courseData }: { data: CourseData[] } = await CourseApi.getCourseData({ type });
    return {courseDetails, courseData, courseDetailsReview};
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get Courses data');
  }
}



async function getProfileData() {
  try {
    const session = await getUserSession();
    if (!session || !session.user || !('id' in session.user)) {
      throw new Error('User session is invalid or user ID is missing');
    }
    const { data: profileData }: { data: ProfileData } = await profileApi.getProfile({ userid: session.user.id, session});
    return profileData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get profile data');
  }
}

const page = async ({ params: { id, type } }: { params: { id: string, type: string } }) => {
  const {courseDetails, courseData, courseDetailsReview} = await getCoursesData({type, id});
  const profileData = await getProfileData();
  console.log(profileData._id)
  return <CourseDetail type={type} data={courseData} course={courseDetails} review={courseDetailsReview} />
}

export default page