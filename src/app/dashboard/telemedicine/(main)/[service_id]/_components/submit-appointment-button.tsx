import telemedicineApi, { AppointmentData } from "@/api/telemedicine";
import Button from "@/components/button";
import { useSnackbar } from "notistack";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Session } from "next-auth";
import { Loader2 } from "lucide-react";

export default function SubmitAppointmentButton({ tosend, setComplete }: { tosend: AppointmentData, setComplete: (value: string) => void }) {
    const { enqueueSnackbar } = useSnackbar();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handlePay = async () => {

        try {
            setIsLoading(true);
            const response = await telemedicineApi.createAppointment({
                session: session as Session,
                ...tosend,
                userid: session?.user.id as string,
            });
            setComplete(response.data);
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Error making payment', { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    }
    return <Button onClick={handlePay} disabled={isLoading} variant="outline" className="mr-2 bg-primary-500 disabled:bg-primary-200 text-white flex items-center justify-center">
        {isLoading ? <Loader2 className="animate-spin" /> : 'SUBMIT'}
    </Button>

}   