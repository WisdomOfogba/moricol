import { Session } from 'next-auth';
import * as AuthApi from './auth';
import axiosClient, { createClientAxios } from './axios-client';
import handleAxiosError from './handle-axios-error';

async function makeApiRequest({ endpoint, payload, errorMessage, session }: {
    endpoint: string;
    payload: Record<string, any>;
    errorMessage: string;
    session: Session;
}) {
    const axios = createClientAxios({ session });

    try {
        const response = await axios.post(endpoint, payload);
        return response.data;
    } catch (error) {
        const message = handleAxiosError(error, errorMessage);
        throw new Error(message);
    }
}


export { AuthApi, axiosClient, handleAxiosError, makeApiRequest };
