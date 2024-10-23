import { Session } from 'next-auth';
import { createServerAxios,  createClientAxios } from './axios-client';
import { axiosClient, handleAxiosError } from './index';

interface UpdateBioParams {
  userId: string;
  bio: string;
  session: Session; 
}

interface UpdateContactDetailsParams {
  userId: string;
  contactDetails: string;
}

interface UpdateReferenceParams {
  userId: string;
  reference: string;
}

interface UpdateGradeParams {
  userId: string;
  grade: string;
}

interface RetrieveResumeParams {
  userId: string;
}

const resumeUrl = 'user/recruitment/localresume'

const resumeApi = {
  /**
   * Update user bio
   */
  updateBio: async ({ userId, bio, session }: UpdateBioParams) => {
    const axios = createClientAxios({session: session});

    try {
      const response = await axios.post(resumeUrl + '/update/bio', {
        userid: userId,
        bio
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error updating bio');
      throw new Error(errorMessage);
    }
  },

  /**
   * Update contact details
   */
  updateContactDetails: async ({ userId, contactDetails }: UpdateContactDetailsParams) => {
    try {
      const response = await axiosClient.post(resumeUrl + '/update/contact/detail', {
        userid: userId,
        contact_details: contactDetails
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error updating contact details');
      throw new Error(errorMessage);
    }
  },

  /**
   * Update reference
   */
  updateReference: async ({ userId, reference }: UpdateReferenceParams) => {
    try {
      const response = await axiosClient.post(resumeUrl + '/update/reference', {
        userid: userId,
        reference
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error updating reference');
        throw new Error(errorMessage);
    }
  },

  /**
   * Update grade
   */
  updateGrade: async ({ userId, grade }: UpdateGradeParams) => {


    try {
      const response = await axiosClient.post(resumeUrl + '/update/grade', {
        userid: userId,
        grade
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error updating grade');
      throw new Error(errorMessage);
    }
  },

  /**
   * Retrieve resume
   */
  retrieveResume: async ({ userId }: RetrieveResumeParams) => {
    const serverAxios = await createServerAxios();
    try {
      const response = await serverAxios.post('user/recruitment/retrieve/localresume', {
        userid: userId
      });
      
      return response.data;
      
    } catch (error) {
     
      const errorMessage = handleAxiosError(error, 'Error retrieving resume');
      throw new Error(errorMessage);
      
    }
  }
};

export default resumeApi;

