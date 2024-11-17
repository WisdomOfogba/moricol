import { API_BASE_URL } from "@/constants/config";
import axios from "axios";
import handleAxiosError from "./handle-axios-error";
import { CourseData, ReviewData } from "@/definition";

const endpoints = {
  getCourseData: `${API_BASE_URL}/user/training/retrieve/all`,
  getSingleCourseData: `${API_BASE_URL}/user/training/guest/retrieve/single`,
  markLesson: `${API_BASE_URL}/user/training/mark/course`,
};

export const CourseApi = {
  getCourseData: async ({
    type,
  }: {
    type: string;
  }): Promise<{ data: CourseData[] }> => {
    try {
      const response = await axios.post(
        `${endpoints.getCourseData}/${type}/course`,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Error retrieving All Courses",
      );
      throw new Error(errorMessage);
    }
  },
  getSingleCourseData: async ({
    type,
    id,
  }: {
    type: string;
    id: string;
  }): Promise<{ data: { course:CourseData; review: ReviewData[] } }> => {
    const jsonObject: { [key: string]: string } = {};
    
    if (type === "visual") {
      jsonObject.visualcourseid = id;
    }
    if (type === "classroom") {
        jsonObject.classroomcourseid = id;
    }
    if (type === "bundle") {
      jsonObject.bundlecourseid = id;
    }
    if (type === "online") {
      jsonObject.onlinecourseid = id;
    }

    try {
      const response = await axios.post(
        `${endpoints.getSingleCourseData}/${type}/course`,
        jsonObject,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error retrieving Courses");
      throw new Error(errorMessage);
    }
  },
  markLesson: async ({
    userid,
    lessonid,
    sectionid,
    courseid,
  }: {
    userid: string;
    lessonid: string;
    sectionid: string;
    courseid: string;
  }) => {
    try {
      const response = await axios.post(
        endpoints.markLesson,
        {
          userid,
          lessonid,
          sectionid,
          courseid,
        })
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error Marking Lesson");
      throw new Error(errorMessage);
    }
  },
};
