"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/card";

export default function AppointmentReminderPage() {
    const params = useParams();
    const appointmentId = params.id;

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
        </div>
    );
}
