import React from "react";
import CallClient from "../../_components/call-client";
import { SingleAppointmentData } from "@/definition";
import { getUserSession } from "@/lib/auth";
import { Session } from "next-auth";
import telemedicineApi from "@/api/telemedicine";

export const metadata = {
  title: "Call",
  description: "Call with healthcare professionals",
};

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

async function Call(
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const session = await getUserSession();
  const appointment = await getAppointment(session as Session, params.id);

  return (
    <div>
      <CallClient appointment={appointment} />
    </div>
  );
}

export default Call;
