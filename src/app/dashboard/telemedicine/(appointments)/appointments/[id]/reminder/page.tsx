"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/card";
import SetReminderModal from "@/app/dashboard/telemedicine/(main)/[service_id]/_components/set-reminder-modal";
import { routes } from "@/constants/routes";
import { useEffect } from "react";



export default function AppointmentReminderPage() {
    const params = useParams();
    const appointmentId = params.id;

    const router = useRouter();

    const onClose = () => {
        router.push(routes.TELEMEDICINE_APPOINTMENTS);
    };
    useEffect(() => {
        document.title = "Set Appointment Reminder";
    }, []);
    return (
        <div className="min-h-screen px-5">
            <Card className="border-0 p-0 shadow-none">
                <CardContent className="px-0 py-6">
                    <div className="space-y-6">
                        <h1 className="text-2xl font-bold">Appointment Reminder</h1>
                        <p>Appointment ID: {appointmentId}</p>
                    </div>
                </CardContent>
            </Card>
            <SetReminderModal show={true} appointmentId={appointmentId as string} onClose={onClose} />
        </div>
    );
}
