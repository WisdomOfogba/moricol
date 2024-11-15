import { API_BASE_URL } from "@/constants/config";
import axios from "axios";
import handleAxiosError from "./handle-axios-error";
import { CourseData } from "@/definition";



const endpoints = {
    getCourseBundleData: `${API_BASE_URL}/user/training/retrieve/all`,
};


export const CourseApi = {
    getCourseData: async ({ type }: { type: string}): Promise<{ data: CourseData[] }> => {

        try {
            const response = await axios.post( `${endpoints.getCourseBundleData}/${type}/course`);
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error, 'Error retrieving Courses');
            throw new Error(errorMessage);
        }
    },
}