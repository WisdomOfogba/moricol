import { Session } from "next-auth";
import { createClientAxios } from "./axios-client";
import handleAxiosError from "./handle-axios-error";

const loanUrl = 'user/loan'

const endpoints = {
    homepage: loanUrl + '/homepage',
    retrieveCategory: loanUrl + '/retrieve/category',
    retrieveSingleCategory: loanUrl + '/retrieve/single/category',
    createOffer: loanUrl + '/create/offer',
    retrievePending: loanUrl + '/retrieve/pending'
}

interface HomepageParams {
    userid: string;
    session: Session;
}

interface RetrieveCategoryParams {
    userid: string;
    category?: string;
    session: Session;
}

interface RetrieveSingleCategoryParams {
    userid: string;
    id: string;
    session: Session;
}

interface CreateOfferParams {
    userid: string;
    category: string;
    amount: number;
    balance: number;
    total_installment: number;
    total_days: number;
    daily_interest: number;
    late_interest: number;
    profit: number;
    totalamount: number;
    installment_period: Array<{
        due_date: string;
        interest: number;
        principal: number;
        repay_amount: number;
        balance: number;
    }>;
    bvn: string;
    workaddress: string;
    workstatus: string;
    bankname: string;
    bankbranch: string;
    residentialaddress: string;
    utilitybill: string;
    monthlyincome: string;
    proof_of_income: string;
    bank_details: {
        accountnumber: string;
        accountname: string;
        bankname: string;
    };
    guarantor_one: {
        name: string;
        email: string;
        utility: string;
        residential_address: string;
        relationship: string;
    };
    guarantor_two: {
        name: string;
        email: string;
        utility: string;
        residential_address: string;
        relationship: string;
    };
    outstanding: {
        owe: boolean;
        amount: number;
    };
    session: Session;
}

interface RetrievePendingParams {
    userid: string;
    session: Session;
}

const loanApi = {
    homepage: async ({ userid, session }: HomepageParams) => {
        const axios = createClientAxios({ session });

        try {
            const response = await axios.post(endpoints.homepage, { userid });
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error, 'Error retrieving loan homepage');
            throw new Error(errorMessage);
        }
    },

    retrieveCategory: async ({ userid, category = '', session }: RetrieveCategoryParams) => {
        const axios = createClientAxios({ session });

        try {
            const response = await axios.post(endpoints.retrieveCategory, { userid, category });
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error, 'Error retrieving loan category');
            throw new Error(errorMessage);
        }
    },

    retrieveSingleCategory: async ({ userid, id, session }: RetrieveSingleCategoryParams) => {
        const axios = createClientAxios({ session });

        try {
            const response = await axios.post(endpoints.retrieveSingleCategory, { userid, categoryid: id });
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error, 'Error retrieving loan category');
            throw new Error(errorMessage);
        }
    },

    createOffer: async (params: CreateOfferParams) => {
        const { session, ...requestParams } = params;
        const axios = createClientAxios({ session });

        try {
            const response = await axios.post(endpoints.createOffer, requestParams);
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error, 'Error creating loan offer');
            throw new Error(errorMessage);
        }
    },

    retrievePending: async ({ userid, session }: RetrievePendingParams) => {
        const axios = createClientAxios({ session });

        try {
            const response = await axios.post(endpoints.retrievePending, { userid });
            return response.data;
        } catch (error) {
            const errorMessage = handleAxiosError(error, 'Error retrieving pending loans');
            throw new Error(errorMessage);
        }
    }
}

export default loanApi;
