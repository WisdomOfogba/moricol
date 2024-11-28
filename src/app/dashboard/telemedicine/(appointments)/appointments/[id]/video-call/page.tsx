import React from "react";
import VideoCallClient from "../../_components/video-call-client";
import { SingleAppointmentData } from "@/definition";
import { getUserSession } from "@/lib/auth";
import { Session } from "next-auth";
import telemedicineApi from "@/api/telemedicine";

export const metadata = {
  title: "Video Session",
  description: "Video session with healthcare professional",
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

async function VideoCall(
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
      <VideoCallClient appointment={appointment} />
    </div>
  );
}

export default VideoCall;
