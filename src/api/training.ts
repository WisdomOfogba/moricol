import { API_BASE_URL } from "@/constants/config";
import axios from "axios";
import handleAxiosError from "./handle-axios-error";
import { CourseData } from "@/definition";



const endpoints = {
    getCourseBundleData: `${API_BASE_URL}/user/training/retrieve/all/bundle/course`,
};


export const CourseApi = {
    getCourseBundleData: async (): Promise<{ data: CourseData[] }> => {

        try {
            const response = await axios.post(endpoints.getCourseBundleData);
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error, 'Error retrieving profile');
            throw new Error(errorMessage);
        }
    },
}