import React from "react";
import telemedicineApi from "@/api/telemedicine";
import { Session } from "next-auth";
import { getUserSession } from "@/lib/auth";
import { OrganizationMember, TelemedicineCategoryData } from "@/definition";
import CompleteAppointmentClient from "./_components/complete-appointment-client";

export const metadata = {
  title: "Book Appointment",
  description: "Book an appointment for telemedicine services",
};


async function getService(serviceId: string, session: Session) {
  try {
    if (!session || !session.user || !('id' in session.user)) {
      throw new Error('User session is invalid or user ID is missing');
    }
    const { data: serviceData }: { data: TelemedicineCategoryData } = await telemedicineApi.retrieveSingleCategory({
      categoryid: serviceId,
      session
    });
    const { data: membershipData }: { data: OrganizationMember[] } = await telemedicineApi.organization.retrieveMembership({
      userid: session.user.id,
      session
    });

    return { serviceData, membershipData };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get doctors data');
  }
}

async function SingleServicePage({ params }: { params: { service_id: string } }) {
  const session = await getUserSession();
  const { serviceData, membershipData } = await getService(params.service_id, session as Session);

  return (
    <div>
      <CompleteAppointmentClient service={serviceData} membership={membershipData} />
    </div>
  );
}

export default SingleServicePage;
