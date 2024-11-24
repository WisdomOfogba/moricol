'use client';

import telemedicineApi from "@/api/telemedicine";
import Button from "@/components/button";
import { routes } from "@/constants/routes";
import { storeToLocalStorage } from "@/util/store-to-localstorage";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";

const MakeAppointmentPayment = ({ price, tosend }: { price: number, tosend: any }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handlePay = async () => {
        storeToLocalStorage({
            service: 'telemedicine',
            link: routes.TELEMEDICINE_APPOINTMENTS,
            toSend: { ...tosend, medication: tosend.medication.map((med: { days: string, drug: string, drugs?: string }) => ({ days: parseInt(med.days), drug: med.drugs, })) }
        });
        try {
            setIsLoading(true);
            const response = await telemedicineApi.makePayment({
                userid: session?.user.id as string,
                email: session?.user.email as string,
                amount: price,
                session: session as Session
            });
            window.open(response.data, '_self');
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Error making payment', { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            className={`px-4 py-2 font-semibold text-white flex items-center justify-center`}
            onClick={handlePay}
        >
            {isLoading ? <FaSpinner className="animate-spin" /> : 'CONTINUE TO PAYMENT'}
        </Button>
    );
};


export default MakeAppointmentPayment;
