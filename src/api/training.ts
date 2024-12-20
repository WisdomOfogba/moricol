import { API_BASE_URL } from "@/constants/config";
import axios from "axios";
import handleAxiosError from "./handle-axios-error";
import {
  archive,
  comment,
  CourseData,
  courseorder,
  Dashboard,
  instructors,
  messaging,
  OrderData,
  reply,
  ReviewData,
  SingleCourse,
} from "@/definition";
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
  saveCourse: `${API_BASE_URL}/user/training/saved/course`,
  unsaveCourse: `${API_BASE_URL}/user/training/delete/saved/course`,
  getSavedCourse: `${API_BASE_URL}/user/training/retrieve/saved/course`,
  getArchive: `${API_BASE_URL}/user/training/message/archive`,
  getMessages: `${API_BASE_URL}/user/training/retrieve/messages`,
  sendMessages: `${API_BASE_URL}/user/training/send/message`,
  updateQuizScore: `${API_BASE_URL}/user/training/mark/quiz/score`,
  sendComment: `${API_BASE_URL}/user/training/create/comment`,
  sendReply: `${API_BASE_URL}/user/training/create/reply`,
  sendReview: `${API_BASE_URL}/user/training/create/review`,
};

export const CourseApi = {
  makePayment: async ({
    userid,
    email,
    amount,
    session,
  }: {
    userid: string,
    email: string,
    amount: number,
    session: Session,
  }) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.makePayment, {
        userid,
        email,
        amount,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Error making payment for Course",
      );
      throw new Error(errorMessage);
    }
  },
  saveCourse: async (
    userid: string,
    session: Session,
    type: string,
    id: string,
  ) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.saveCourse, {
        userid,
        coursetype: type + "course",
        courseid: id,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error saving Course");
      throw new Error(errorMessage);
    }
  },
  unsaveCourse: async ({
    userid,
    session,
    courseid,
  }: {
    userid: string;
    session: Session;
    courseid: string;
  }) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.unsaveCourse, {
        userid,
        courseid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error saving Course");
      throw new Error(errorMessage);
    }
  },
  updateCoursePayment: async ({
    userid,
    session,
    paystackref,
    courses,
  }: {
    userid: string;
    session: Session;
    paystackref: string;
    courses: Array<{
      courseid: string;
      amount: number;
      coursetype: string;
    }>;
  }) => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(endpoints.updateCoursePayment, {
        userid,
        paystackref,
        courses: courses.map((course) => ({
          ...course,
          coursetype: `${course.coursetype}course`,
          userid,
        })),
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Error updating Course payment",
      );
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
  getSavedCourse: async ({
    userid,
    session,
  }: {
    userid: string;
    session: Session;
  }): Promise<{ data: courseorder[] }> => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(endpoints.getSavedCourse, {
        userid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Error retrieving Saved Courses",
      );
      throw new Error(errorMessage);
    }
  },
  getArchive: async ({
    userid,
    session,
  }: {
    userid: string;
    session: Session;
  }): Promise<{ data: archive[] }> => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(endpoints.getArchive, {
        userid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Error retrieving Saved Courses",
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
  }): Promise<{ data: { course: CourseData; review: ReviewData[] } }> => {
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
    session,
  }: {
    userid: string;
    lessonid: string;
    sectionid: string;
    courseid: string;
    session: Session;
  }) => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(endpoints.markLesson, {
        userid,
        lessonid,
        sectionid,
        courseid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error Marking Lesson");
      throw new Error(errorMessage);
    }
  },
  updateQuizScore: async ({
    userid,
    lessonid,
    sectionid,
    courseid,
    session,
    score,
  }: {
    userid: string;
    lessonid: string;
    sectionid: string;
    courseid: string;
    session: Session;
    score: number;
  }) => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(endpoints.updateQuizScore, {
        userid,
        lessonid,
        sectionid,
        courseid,
        score,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error Updating Score");
      throw new Error(errorMessage);
    }
  },
  getOrderHistory: async ({
    userid,
    session,
  }: {
    userid: string;
    session: Session;
  }): Promise<{ data: OrderData[] }> => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(`${endpoints.getOrderHistory}`, {
        userid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Error retrieving Order History",
      );
      throw new Error(errorMessage);
    }
  },
  getMessages: async ({
    userid,
    adminid,
    session,
  }: {
    userid: string;
    adminid: string;
    session: Session;
  }): Promise<{ data: messaging[] }> => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(`${endpoints.getMessages}`, {
        userid,
        adminid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error retrieving Messages");
      throw new Error(errorMessage);
    }
  },
  sendMessages: async ({
    userid,
    adminid,
    message,
    session,
  }: {
    userid: string;
    adminid: string;
    session: Session;
    message: string;
  }) => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(`${endpoints.sendMessages}`, {
        userid,
        adminid,
        message,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error sending Messages");
      throw new Error(errorMessage);
    }
  },
  sendComment: async ({
    userid,
    comment,
    courseid,
    session,
  }: {
    userid: string;
    comment: string;
    courseid: string;
    session: Session; 
  }): Promise<{ data: comment }> => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(`${endpoints.sendComment}`, {
        userid,
        comment,
        courseid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error Posting Comment");
      throw new Error(errorMessage);
    }
  },
  sendReply: async ({
    userid,
    reply,
    commentid,
    session,
  }: {
    userid: string;
    reply: string;
    commentid: string;
    session: Session; 
  }): Promise<{ data: reply }> => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(`${endpoints.sendReply}`, {
        userid,
        reply,
        commentid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error Repying Post");
      throw new Error(errorMessage);
    }
  },
  sendReview: async ({
    userid,
    review,
    coursetype,
    rating,
    courseid,
    session,
  }: {
    userid: string;
    review: string,
    coursetype: string,
    rating: number,
    courseid: string,
    session: Session; 
  }) => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(`${endpoints.sendReview}`, {
        userid,
        review,
        courseType: coursetype + "course",
        rating,
        courseid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error Repying Post");
      throw new Error(errorMessage);
    }
  },
  getDashboard: async ({
    userid,
    session,
  }: {
    userid: string;
    session: Session;
  }): Promise<{ data: Dashboard }> => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(`${endpoints.getDashboard}`, {
        userid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Error retrieving Dashboard",
      );
      throw new Error(errorMessage);
    }
  },
  getSingleCourse: async ({
    userid,
    session,
    courseorderid,
    courseid,
  }: {
    userid: string;
    session: Session;
    courseorderid: string;
    courseid: string;
  }): Promise<{ data: SingleCourse }> => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(`${endpoints.getSingleCourse}`, {
        userid,
        courseorderid,
        courseid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Error retrieving Single Course",
      );
      throw new Error(errorMessage);
    }
  },
  getCourse: async ({
    userid,
    session,
  }: {
    userid: string;
    session: Session;
  }): Promise<{ data: courseorder[] }> => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(`${endpoints.getCourse}`, {
        userid,
      });
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
    userid: string;
    session: Session;
  }): Promise<{ data: instructors[] }> => {
    const axios = createClientAxios({ session });
    try {
      const response = await axios.post(`${endpoints.getInstructors}`, {
        userid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error retrieving Courses");
      throw new Error(errorMessage);
    }
  },
};
