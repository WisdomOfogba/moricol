import { Session } from "next-auth";
import { createClientAxios } from "./axios-client";
import handleAxiosError from "./handle-axios-error";
import { API_BASE_URL } from "@/constants/config";
import { ProfileData } from "@/definition";

const endpoints = {
  getProfile: `${API_BASE_URL}/user/retrieve/profile`,
  resetPassword: `${API_BASE_URL}/user/reset/password`,
  updateProfile: `${API_BASE_URL}/user/update/profile`,
};

export const profileApi = {
  getProfile: async ({
    userid,
    session,
  }: {
    userid: string;
    session: Session;
  }): Promise<{ data: ProfileData }> => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.getProfile, { userid });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error retrieving profile");
      throw new Error(errorMessage);
    }
  },

  resetPassword: async ({
    userid,
    newpassword,
    currentpassword,
    session,
  }: {
    userid: string;
    newpassword: string;
    currentpassword: string;
    session: Session;
  }) => {
    const axios = createClientAxios({ session });

        try {
            const response = await axios.post(endpoints.resetPassword, {
                userid,
                newpassword,
                currentpassword
            });
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error, 'Error resetting password');
            throw new Error(errorMessage);
        }
    },

<<<<<<< HEAD
   
=======
    updateProfile: async (profile: ProfileData & { userid: string }, session: Session) => {
        const axios = createClientAxios({ session });

        try {
            const response = await axios.post(endpoints.updateProfile, {
                ...profile,
                userid: profile.userid
            });
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error, 'Error updating profile');
            throw new Error(errorMessage);
        }
    },
>>>>>>> 2d2a2a37f30e333d63524f8c747bf7f7d6888b86

  updateProfile: async (
    profile: ProfileData & { userid: string },
    session: Session,
  ) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.updateProfile, {
        ...profile,
        userid: profile.userid,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error updating profile");
      throw new Error(errorMessage);
    }
  },
};
