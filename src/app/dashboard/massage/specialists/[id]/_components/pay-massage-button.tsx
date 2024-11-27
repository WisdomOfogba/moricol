'use client';

import { massageApi } from "@/api/massage";
import { ShadButton } from "@/components/shadcn-button";
import { CreateAppointmentPayload } from "@/definition";
import { storeToLocalStorage } from "@/util/store-to-localstorage";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";

const PayMassageButton = ({ price, toSend }: { price: number, toSend: CreateAppointmentPayload }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    const handlePay = async () => {
        storeToLocalStorage({
            service: 'massageTherapy',
            link: pathname,
            toSend
        });
        try {
            setIsLoading(true);
            const response = await massageApi.appointment.makePayment({
                userid: session?.user.id as string,
                email: session?.user.email as string,
                amount: price,
            },
                session as Session
            );
            window.open(response.data, '_self');
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Error making payment', { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ShadButton
            className={`w-full px-5 py-1 text-lg font-semibold bg-primary-500 text-white`}
            onClick={handlePay}
        >
            {isLoading ? <FaSpinner className="animate-spin" /> : "PAY NOW"}
        </ShadButton>
    );
};


export default PayMassageButton;