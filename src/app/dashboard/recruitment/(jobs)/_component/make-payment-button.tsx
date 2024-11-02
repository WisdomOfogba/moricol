'use client';

import jobsApi from "@/api/jobs";
import { ShadButton } from "@/components/shadcn-button";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";

const MakePaymentButton = ({ salary, status }: { salary: number, status: string }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handlePay = async () => {
        try {
            setIsLoading(true);
            const response = await jobsApi.makePayment(session?.user.id as string, session?.user.email as string, salary, session as Session);
            window.open(response.data, '_blank');
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Error making payment', { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ShadButton
            className={`w-full px-5 py-1 text-lg font-semibold bg-green-500 text-white`}
            onClick={handlePay}
        >
            {isLoading ? <FaSpinner className="animate-spin" /> : status.toUpperCase()}
        </ShadButton>
    );
};


export default MakePaymentButton;