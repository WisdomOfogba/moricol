import React from "react";
import AppointmentMessagesClient from "../../_components/appointment-messages-client";
import { Session } from "next-auth";
import { SingleAppointmentData } from "@/definition";
import telemedicineApi from "@/api/telemedicine";
import { getUserSession } from "@/lib/auth";



async function getAppointment(session: Session, id: string) {
  try {
    if (!session || !session.user || !('id' in session.user)) {
      throw new Error('User session is invalid or user ID is missing');
    }
    const { data: appointmentsData }: { data: SingleAppointmentData } = await telemedicineApi.retrieveSingleAppointment({
      appointmentid: id,
      userid: session.user.id,
      session
    });

    return appointmentsData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get appointments data');
  }
}
async function AppointmentMessages({
  params,
}: {
  params: {
    id: string;
  }
}) {
  const session = await getUserSession();
  const appointment = await getAppointment(session as Session, params.id);

  console.log(appointment)


  return (
    <div>
      <AppointmentMessagesClient appointment={appointment} />
    </div>
  );
}
export default AppointmentMessages;
