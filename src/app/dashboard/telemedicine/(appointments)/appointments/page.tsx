import React from "react";
import AppointmentView from "./_components/appointment-view";
import TelemedicineLayoutTemplate from "../../(main)/template";
import telemedicineApi from "@/api/telemedicine";
import { Session } from "next-auth";
import { getUserSession } from "@/lib/auth";
import { AppointmentScheduleData, AppointmentStatus } from "@/definition";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Appointments | Moricol",
  description: "View and manage your telemedicine appointments"
};

async function getAppointments(session: Session, statusFetched: string, date: string, startTime: string, endTime: string) {
  try {
    if (!session || !session.user || !('id' in session.user)) {
      throw new Error('User session is invalid or user ID is missing');
    }
    const { data: appointmentsData }: { data: AppointmentScheduleData[] } = await telemedicineApi.retrieveAllAppointments({
      status: statusFetched ?? 'ongoing',
      start_time: startTime ?? '',
      end_time: endTime ?? '',
      date: date ?? '',
      userid: session.user.id,
      session
    });
    return appointmentsData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get appointments data');
  }
}

async function Appointments({
  searchParams
}: {
  searchParams: {
    status: string;
    date: string;
    startTime: string;
    endTime: string;
  }
}) {
  const session = await getUserSession();
  const { status, date, startTime, endTime } = searchParams;

  const appointments = await getAppointments(session as Session, status, date, startTime, endTime);

  return (
    <TelemedicineLayoutTemplate>
      <AppointmentView currentStatus={status as AppointmentStatus} appointments={appointments} />
    </TelemedicineLayoutTemplate>
  );
}

export default Appointments;
