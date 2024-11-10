import React from "react";
import PractitionersClient from "./_components/practitioner-client";
// import telemedicineApi from "@/api/telemedicine";
// import { Session } from "next-auth";

// async function getService(serviceId: string, session: Session) {
//   try {
//     if (!session || !session.user || !('id' in session.user)) {
//       throw new Error('User session is invalid or user ID is missing');
//     }
//     const { data: serviceData } = await telemedicineApi.retrieveSingleCategory({
//       category: serviceId,
//       session
//     });

//     return serviceData;
//   } catch (error) {
//     throw new Error(error instanceof Error ? error.message : 'Failed to get doctors data');
//   }
// }

function PractitionersPage() {
  return (
    <div>
      <PractitionersClient />
    </div>
  );
}

export default PractitionersPage;
