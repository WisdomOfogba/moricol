import React from "react";
import { getUserSession } from "@/lib/session"; 
import ClientMessagingPage from "../../../components/ClientMessagingPage";
import { CourseApi } from "@/api/training";

async function fetchData({userId, session, adminId}:{userId: string, session: any, adminId: string}) {
  const archive = await CourseApi.getArchive({ userid: userId, session });
  const messages = await CourseApi.getMessages({ userid: userId, session, adminid: adminId });
  return { archive: archive.data, messages: messages.data };
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getUserSession();
  
  if (!session?.user?.id) {
    return <p>User session is invalid.</p>;
  }

  const data = await fetchData({userId: session.user.id, session, adminId: params.id});

  return <ClientMessagingPage session={session} adminid={params.id} {...data} />;
}
