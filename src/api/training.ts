import { API_BASE_URL } from "@/constants/config";
import axios from "axios";
import handleAxiosError from "./handle-axios-error";
import { CourseData, courseorder, Dashboard, instructors, OrderData, ReviewData, SingleCourse } from "@/definition";
import { createClientAxios } from "./axios-client";
import { Session } from "next-auth";
const endpoints = {
  getCourseData: `${API_BASE_URL}/user/training/retrieve/all`,
  getSingleCourseData: `${API_BASE_URL}/user/training/guest/retrieve/single`,
  markLesson: `${API_BASE_URL}/user/training/mark/course`,
  makePayment: `${API_BASE_URL}/user/training/make/course/payment`,
  updateCoursePayment: `${API_BASE_URL}/user/training/order/course/`,
  getOrderHistory: `${API_BASE_URL}/user/training/retrieve/order/history`,
  getDashboard: `${API_BASE_URL}/user/training/dashboard`,
  getSingleCourse: `${API_BASE_URL}/user/training/single/course`,
  getCourse: `${API_BASE_URL}/user/training/mycourses`,
  getInstructors: `${API_BASE_URL}/user/training/myinstructor`,
};

export const CourseApi = {
  makePayment: async (userid: string, email: string, amount: number, session: Session) => {
    const axios = createClientAxios({ session });

    try {
        const response = await axios.post(endpoints.makePayment, {
            userid,
            email,
            amount
        });
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error, 'Error making payment for Course');
        throw new Error(errorMessage);
    }
  },
  updateCoursePayment: async ({ userid, courseid, amount, session, coursetype, ref }: { userid: string; courseid: string; amount: number; session: Session, coursetype: string, ref: string }) => {
    const axios = createClientAxios({ session });
    try {
        const response = await axios.post(endpoints.updateCoursePayment, {
          userid,
          paystackref: ref,
          courses: [{
              amount,
              coursetype: coursetype + "course",
              userid,
              courseid
          }]
        });
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error, 'Error updating Course payment');
        throw new Error(errorMessage);
    }
},
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
  getOrderHistory: async ({
    userid,
    session
  }: {
    userid: string, session: Session
  }): Promise<{ data: OrderData[] }> => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(
        `${endpoints.getOrderHistory}`,
        {
          userid
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error retrieving Order History");
      throw new Error(errorMessage);
    }
  },
  getDashboard: async ({
    userid,
    session
  }: {
    userid: string, session: Session
  }): Promise<{data: Dashboard} > => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(
        `${endpoints.getDashboard}`,
        {
          userid
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error retrieving Dashboard");
      throw new Error(errorMessage);
    }
  },
  getSingleCourse: async ({
    userid,
    session,
    courseorderid,
    courseid
  }: {
    userid: string, session: Session, courseorderid: string, courseid: string
  }): Promise<{data: SingleCourse} > => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(
        `${endpoints.getSingleCourse}`,
        {
          userid,
          courseorderid,
          courseid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error retrieving Single Course");
      throw new Error(errorMessage);
    }
  },
  getCourse: async ({
    userid,
    session,
  }: {
    userid: string, session: Session,
  }): Promise<{data: courseorder[]} > => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(
        `${endpoints.getCourse}`,
        {
          userid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error retrieving Courses");
      throw new Error(errorMessage);
    }
  },
  getInstructors: async ({
    userid,
    session,
  }: {
    userid: string, session: Session,
  }): Promise<{data: instructors[]} > => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(
        `${endpoints.getInstructors}`,
        {
          userid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error retrieving Courses");
      throw new Error(errorMessage);
    }
  },
};
