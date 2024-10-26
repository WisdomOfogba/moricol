import { Session } from 'next-auth';
import { createServerAxios, createClientAxios } from './axios-client';
import { axiosClient, handleAxiosError } from './index';
import { Education } from '@/definition';

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
  reference: {
    name: string;
    email: string;
    phone: string;
  }
  session: Session;
}

interface UpdateGradeParams {
  userId: string;
  grade: string;
}

interface RetrieveResumeParams {
  userId: string;
}

interface UpdateEducationParams {
  userId: string;
  education: Education[];
  session: Session;
}

interface WorkExperience {
  title: string;
  company: string;
  start_date: string;
  end_date: string;
  previous_employer: string;
  leaving_reason: string;
  inview: boolean;
}

interface UpdateWorkExperienceParams {
  userId: string;
  workExperience: WorkExperience[];
  session: Session;
}

const resumeUrl = 'user/recruitment/localresume'

const resumeApi = {
  /**
   * Update user bio
   */
  updateBio: async ({ userId, bio, session }: UpdateBioParams) => {
    const axios = createClientAxios({ session: session });

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
  updateReference: async ({ userId, reference, session }: UpdateReferenceParams) => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(resumeUrl + '/update/reference', {
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
   * Update work experience
   */
  updateWorkExperience: async ({ userId, workExperience, session }: UpdateWorkExperienceParams) => {
    const axios = createClientAxios({ session: session });
    try {
      const response = await axios.post(resumeUrl + '/update/work/experience', {
        userid: userId,
        work_experience: workExperience
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error updating work experience');
      throw new Error(errorMessage);
    }
  },

  /**
   * Update education
   */
  updateEducation: async ({ userId, education, session }: UpdateEducationParams) => {
    const axios = createClientAxios({ session: session });
    try {
      const response = await axios.post(resumeUrl + '/update/education', {
        userid: userId,
        education
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error updating education');
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
