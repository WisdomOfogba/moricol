import { Session } from "next-auth";
import { createClientAxios } from "./axios-client";
import handleAxiosError from "./handle-axios-error";
import { makeApiRequest } from ".";

const telemedicineUrl = 'user/telemedicine'

const endpoints = {
  homepage: telemedicineUrl + '/retrieve/all/category',
  retrieveCategory: telemedicineUrl + '/retrieve/category',
  createRatingReview: telemedicineUrl + '/create/review',
  makePayment: telemedicineUrl + '/make/session/payment',
  createAppointment: telemedicineUrl + '/create/appointment',
  retrieveAllAppointments: telemedicineUrl + '/retrieve/all/appointment',
  retrieveSingleAppointment: telemedicineUrl + '/retrieve/single/appointment',
  endAppointment: telemedicineUrl + '/end/appointment',
  upload: telemedicineUrl + '/upload',
  updateNotification: telemedicineUrl + '/update/notification',
  retrieveAllNotes: telemedicineUrl + '/retrieve/all/note',
  retrieveSingleNote: telemedicineUrl + '/retrieve/single/note',
  organization: {
    create: telemedicineUrl + '/create/organization',
    my: telemedicineUrl + '/my/organization',
    addMember: telemedicineUrl + '/organization/add/member',
    removeMember: telemedicineUrl + '/organization/remove/member',
    retrieveMembers: telemedicineUrl + '/retrieve/organization/member',
    retrieveMembership: telemedicineUrl + '/my/membership',
  },
}

interface HomepageParams {
  userid: string;
  session: Session;
}

interface RetrieveCategoryParams {
  categoryid?: string;
  session: Session;
}

// interface CreateReviewParams {
//     userid: string;
//     rating: number;
//     comment: string;
//     session: Session;
// }

interface OrganizationParams {
  userid: string;
  session: Session;
}

export interface CreateOrganizationParams extends OrganizationParams {
  userid: string;
  start_date: string;
  end_date: string;
  name: string;
  duration: string;
  plan_type: string;
  amount: number;
  user_limit: number;
}

interface MemberParams extends OrganizationParams {
  organizationid: string;
  memberId: string;
  email: string;
}

export interface AppointmentData {
  userid: string;
  date: string;
  paystackref?: string;
  feelingdays: number;
  takingmedication: boolean;
  user_responsiveness: boolean;
  drugallergy: boolean;
  surgery: boolean;
  medicalcondition: boolean;
  familymedicalcondition: boolean;
  medication: Array<{
    days: number | string;
    drug: string;
    drugs?: string;
  }>;
  primarycomplain: string[];
  others: string[];
  urgent_type: string;
  total_amount: number;
  note: string;
  subcategoryid: string;
  time: {
    start: string;
    end: string;
  };
  sessiontype: {
    audio: boolean;
    video: boolean;
    chat: boolean;
  };
  organization: {
    use_organization: boolean;
    organizationid: string | null;
  };
  location?: string;
}


export const availablePlansList = [
  {
    title: "1 - 5 PERSONS",
    plan_type: "1-5",
    min_members: 1,
    max_members: 5,
    subtitle: "For Organization who wants to cater for not so many persons all at once",
    durations: [
      { label: "WEEKLY", price: "5000" },
      { label: "MONTHLY", price: "8000" },
      { label: "QUARTERLY", price: "10000" },
    ],
  },
  {
    title: "6 - 10 PERSONS",
    plan_type: "6-10",
    min_members: 6,
    max_members: 10,
    subtitle: "For Organization who wants to cater for for many person in their company",
    durations: [
      { label: "WEEKLY", price: "10000" },
      { label: "MONTHLY", price: "20000" },
      { label: "QUARTERLY", price: "50000" },
    ],
    highlighted: true,
  },
  {
    title: "11 - 30 PERSONS",
    plan_type: "11-30",
    min_members: 11,
    max_members: 30,
    subtitle: "For Organization who wants to cater for so many persons all at once",
    durations: [
      { label: "WEEKLY", price: "25000" },
      { label: "MONTHLY", price: "30000" },
      { label: "QUARTERLY", price: "50000" },
    ],
  },
]

const telemedicineApi = {
  homepage: async ({ userid, session }: HomepageParams) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.homepage, { userid });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error retrieving telemedicine homepage');
      throw new Error(errorMessage);
    }
  },

  retrieveSingleCategory: async ({ categoryid, session }: RetrieveCategoryParams) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.retrieveCategory, { categoryid });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error retrieving telemedicine category');
      throw new Error(errorMessage);
    }
  },



  organization: {
    create: async ({ userid, start_date, end_date, name, duration, plan_type, amount, user_limit, session, paystackref }: CreateOrganizationParams & { paystackref: string }) => {
      const axios = createClientAxios({ session });

      try {
        const response = await axios.post(endpoints.organization.create, { userid, start_date, end_date, name, duration, plan_type, amount, user_limit, paystackref });
        return response.data;
      } catch (error) {
        const errorMessage = handleAxiosError(error, 'Error creating organization');
        throw new Error(errorMessage);
      }
    },

    my: async ({ userid, session }: OrganizationParams) => {
      const axios = createClientAxios({ session });

      try {
        const response = await axios.post(endpoints.organization.my, { userid });
        return response.data;
      } catch (error) {
        const errorMessage = handleAxiosError(error, 'Error retrieving organization');
        throw new Error(errorMessage);
      }
    },

    addMember: async ({ userid, organizationid, email, session }: Omit<MemberParams, 'memberId'>) => {
      const axios = createClientAxios({ session });

      try {
        const response = await axios.post(endpoints.organization.addMember, { userid, organizationid, email });
        return response.data;
      } catch (error) {
        const errorMessage = handleAxiosError(error, 'Error adding member');
        throw new Error(errorMessage);
      }
    },

    removeMember: async ({ userid, organizationid, memberId, session }: Omit<MemberParams, 'email'>) => {
      const axios = createClientAxios({ session });

      try {
        const response = await axios.post(endpoints.organization.removeMember, { userid, organizationid, memberid: memberId });
        return response.data;
      } catch (error) {
        const errorMessage = handleAxiosError(error, 'Error removing member');
        throw new Error(errorMessage);
      }
    },

    retrieveMembers: async ({ userid, organizationid, session }: Omit<MemberParams, 'memberId' | 'email'>) => {
      const axios = createClientAxios({ session });
      try {
        const response = await axios.post(endpoints.organization.retrieveMembers, { userid, organizationid });
        return response.data;
      } catch (error) {
        const errorMessage = handleAxiosError(error, 'Error retrieving members');
        throw new Error(errorMessage);
      }
    },

    retrieveMembership: async ({ userid, session }: OrganizationParams) => {
      const axios = createClientAxios({ session });

      try {
        const response = await axios.post(endpoints.organization.retrieveMembership, { userid });
        return response.data;
      } catch (error) {
        const errorMessage = handleAxiosError(error, 'Error retrieving membership');
        throw new Error(errorMessage);
      }
    },

  },

  makePayment: async ({ userid, email, amount, session }: { userid: string, email: string, amount: number, session: Session }) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.makePayment, {
        userid,
        email,
        amount
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error making payment');
      throw new Error(errorMessage);
    }
  },

  createAppointment: async ({
    userid,
    date,
    paystackref,
    feelingdays,
    takingmedication,
    user_responsiveness,
    drugallergy,
    surgery,
    medicalcondition,
    familymedicalcondition,
    medication,
    primarycomplain,
    others,
    urgent_type,
    total_amount,
    note,
    subcategoryid,
    time,
    sessiontype,
    organization,
    session
  }: AppointmentData & { session: Session }) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.createAppointment, {
        userid,
        date,
        paystackref,
        feelingdays,
        takingmedication,
        user_responsiveness,
        drugallergy,
        surgery,
        medicalcondition,
        familymedicalcondition,
        medication,
        primarycomplain,
        others,
        urgent_type,
        total_amount,
        note,
        subcategoryid,
        time,
        sessiontype,
        organization,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error creating appointment');
      throw new Error(errorMessage);
    }
  },

  retrieveAllAppointments: async ({
    userid,
    status,
    start_time,
    end_time,
    date,
    session
  }: {
    userid: string;
    status?: string;
    start_time?: string;
    end_time?: string;
    date?: string;
    session: Session;
  }) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.retrieveAllAppointments, {
        userid,
        status,
        start_time,
        end_time,
        date
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error retrieving appointments');
      throw new Error(errorMessage);
    }
  },

  retrieveSingleAppointment: async ({
    userid,
    appointmentid,
    session
  }: {
    userid: string;
    appointmentid: string;
    session: Session;
  }) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.retrieveSingleAppointment, {
        userid,
        appointmentid
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error retrieving appointment');
      throw new Error(errorMessage);
    }
  },

  endAppointment: async ({
    userid,
    appointmentid,
    session
  }: {
    userid: string;
    appointmentid: string;
    session: Session;
  }) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.endAppointment, {
        userid,
        appointmentid
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error ending appointment');
      throw new Error(errorMessage);
    }
  },

  uploadFiles: async ({
    userid,
    appointmentid,
    userupload,
    session
  }: {
    userid: string;
    appointmentid: string;
    userupload: Array<{ name: string, upload: string }>;
    session: Session;
  }) => {
    const axios = createClientAxios({ session });

    try {
      const response = await axios.post(endpoints.upload, {
        userid,
        appointmentid,
        userupload
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, 'Error uploading files');
      throw new Error(errorMessage);
    }
  },

  createRatingReview: async ({
    userid,
    telemedicineid,
    staffid,
    review,
    rating,
    recommend,
    session
  }: {
    userid: string;
    telemedicineid: string;
    staffid: string;
    review: string;
    rating: number;
    recommend: boolean;
    session: Session;
  }) => {
    return makeApiRequest({
      endpoint: endpoints.createRatingReview,
      payload: {
        userid,
        telemedicineid,
        staffid,
        review,
        rating,
        recommend
      },
      errorMessage: 'Error creating review',
      session
    });
  },
  updateNotification: async ({
    userid,
    appointmentid,
    email,
    sms,
    push,
    session
  }: {
    userid: string;
    appointmentid: string;
    email: boolean;
    sms: boolean;
    push: boolean;
    session: Session;
  }) => {
    return makeApiRequest({
      endpoint: endpoints.updateNotification,
      payload: {
        userid,
        appointmentid,
        email,
        sms,
        push
      },
      errorMessage: 'Error updating notification preferences',
      session
    });
  },
  retrieveAllNotes: async ({
    userid,
    appointmentid,
    session
  }: {
    userid: string;
    appointmentid: string;
    session: Session;
  }) => {
    return makeApiRequest({
      endpoint: endpoints.retrieveAllNotes,
      payload: {
        userid,
        appointmentid
      },
      errorMessage: 'Error retrieving notes',
      session
    });
  },

  retrieveSingleNote: async ({
    userid,
    noteid,
    session
  }: {
    userid: string;
    noteid: string;
    session: Session;
  }) => {
    return makeApiRequest({
      endpoint: endpoints.retrieveSingleNote,
      payload: {
        userid,
        noteid
      },
      errorMessage: 'Error retrieving note',
      session
    });
  },

}

export default telemedicineApi;