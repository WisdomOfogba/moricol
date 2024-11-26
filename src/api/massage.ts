import { API_BASE_URL } from "@/constants/config";
import { Session } from "next-auth";
import { makeApiRequest } from ".";

const endpoints = {
    getAllMassage: `${API_BASE_URL}/user/massage/retrieve/all/massage`,
    getSingleMassage: `${API_BASE_URL}/user/massage/retrieve/single/massage`,
    getAllStaff: `${API_BASE_URL}/user/massage/retrieve/all/massage/staff`,
    getSingleStaff: `${API_BASE_URL}/user/massage/retrieve/single/massage/staff`,
    addFavorite: `${API_BASE_URL}/user/massage/save/masseuse`,
    getFavorites: `${API_BASE_URL}/user/massage/retrieve/favorite/masseuse`,
    addReview: `${API_BASE_URL}/user/massage/create/massage/review`,
    getReviews: `${API_BASE_URL}/user/massage/retrieve/massage/review`,
    appointment: {
        create: `${API_BASE_URL}/user/massage/create/massage/appointment`,
        update: `${API_BASE_URL}/user/massage/update/notification`,
        getSingle: `${API_BASE_URL}/user/massage/retrieve/single/massage/appointment`,
        start: `${API_BASE_URL}/user/massage/start/massage/session`,
        end: `${API_BASE_URL}/user/massage/end/massage/session`,
        getAll: `${API_BASE_URL}/user/massage/retrieve/all/massage/appointment`,
        makePayment: `${API_BASE_URL}/user/massage/make/payment`
    }
};

export const massageApi = {
    getAllMassage: async (session: Session) => {
        return makeApiRequest({
            endpoint: endpoints.getAllMassage,
            payload: {},
            errorMessage: "Failed to retrieve massage services",
            session
        });
    },

    getSingleMassage: async (massageId: string, session: Session) => {
        return makeApiRequest({
            endpoint: endpoints.getSingleMassage,
            payload: { massageid: massageId },
            errorMessage: "Failed to retrieve massage service details",
            session
        });
    },

    getAllStaff: async ({ massageid = "", gender = "", rating = 0 }: { massageid: string, gender: string, rating: number }, session: Session) => {
        return makeApiRequest({
            endpoint: endpoints.getAllStaff,
            payload: { massageid, gender, rating },
            errorMessage: "Failed to retrieve massage staff",
            session
        });
    },

    getSingleStaff: async (staffId: string, session: Session) => {
        return makeApiRequest({
            endpoint: endpoints.getSingleStaff,
            payload: { staffid: staffId },
            errorMessage: "Failed to retrieve staff details",
            session
        });
    },



    addFavorite: async (staffId: string, session: Session) => {
        return makeApiRequest({
            endpoint: endpoints.addFavorite,
            payload: { staffId },
            errorMessage: "Failed to add favorite masseuse",
            session
        });
    },

    getFavorites: async (session: Session) => {
        return makeApiRequest({
            endpoint: endpoints.getFavorites,
            payload: {},
            errorMessage: "Failed to retrieve favorite masseuses",
            session
        });
    },

    addReview: async (reviewData: {
        staffId: string;
        rating: number;
        comment: string;
    }, session: Session) => {
        return makeApiRequest({
            endpoint: endpoints.addReview,
            payload: reviewData,
            errorMessage: "Failed to add massage review",
            session
        });
    },

    getReviews: async (staffId: string, session: Session) => {
        return makeApiRequest({
            endpoint: endpoints.getReviews,
            payload: { staffId },
            errorMessage: "Failed to retrieve massage reviews",
            session
        });
    },

    appointment: {
        create: async (appointmentData: {
            userid: string;
            massageid: string;
            staffid: string;
            paystackref: string;
            home_service: boolean;
            end_time: string;
            start_time: string;
            date: string;
            note: string;
            amount: number;
            km: string;
            bvn: string;
            address: string;
            landmark: string;
            state: string;
        }, session: Session) => {
            return makeApiRequest({
                endpoint: endpoints.appointment.create,
                payload: appointmentData,
                errorMessage: "Failed to create massage appointment",
                session
            });
        }

    }
};

