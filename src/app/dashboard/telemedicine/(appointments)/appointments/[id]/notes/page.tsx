import TelemedicineLayoutTemplate from "@/app/dashboard/telemedicine/(main)/template";
import { Session } from "next-auth";
import telemedicineApi from "@/api/telemedicine";
import { getUserSession } from "@/lib/auth";
import { Metadata } from "next";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { Card, CardContent } from "@/components/card";
import { NotesData } from "@/definition";
import dayjs from "dayjs";


export const revalidate = 0


export const metadata: Metadata = {
  title: "Notes | View Appointment Notes - Moricol",
  description: "View notes shared during appointment",
};


async function getNotes(session: Session, id: string) {
  try {
    if (!session || !session.user || !('id' in session.user)) {
      throw new Error('User session is invalid or user ID is missing');
    }
    const { data: notes }: { data: NotesData[] } = await telemedicineApi.retrieveAllNotes({
      appointmentid: id,
      userid: session.user.id,
      session
    });

    return notes;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get appointments data');
  }
}


export default async function NotesPage({ params }: {
  params: { id: string }
}) {

  const session = await getUserSession()
  const notes = await getNotes(session as Session, params.id as string)



  return (
    <TelemedicineLayoutTemplate>
      <div className="min-h-screen">
        <h1 className="mb-6 text-2xl font-bold">Notes</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Link
              href={`${routes.TELEMEDICINE_APPOINTMENTS}/${params.id}/notes/${note._id}`}
              key={note._id}
              className="block"
            >
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <h2 className="mb-2 text-lg font-semibold capitalize">{note.title}</h2>
                  <p className="text-sm text-gray-500">{dayjs(note.createdAt).format('DD/MM/YYYY')}</p>
                </CardContent>
              </Card>
            </Link>
          ))}

          {notes.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
              <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-xl text-gray-500">No notes have been added yet.</p>
            </div>
          )}
        </div>
      </div>
    </TelemedicineLayoutTemplate>
  );
}
