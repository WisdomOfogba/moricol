import { getServerSession, Session } from "next-auth";

export const getUserDetails = async (): Promise<Session["user"] | null> => {
  const session = await getServerSession();
  
  if (session) {
    return session.user;  
  } else {
    return null; 
  }
};
