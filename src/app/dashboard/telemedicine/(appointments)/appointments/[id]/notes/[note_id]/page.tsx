import telemedicineApi from "@/api/telemedicine";
import TelemedicineLayoutTemplate from "@/app/dashboard/telemedicine/(main)/template";
import { Card, CardContent } from "@/components/card";
// import { ShadButton } from "@/components/shadcn-button";
import { NotesData } from "@/definition";
import { getUserSession } from "@/lib/auth";
import dayjs from "dayjs";
import { Metadata } from "next";
import { Session } from "next-auth";


interface NoteDetailProps {
  timestamp: string;
  title: string;
  content: string;
}

const NoteDetail: React.FC<NoteDetailProps> = ({
  timestamp,
  title,
  content,
}) => {
  return (
    <div className="rounded-lg bg-gray-100">
      <Card className="rounded-0 mx-auto max-w-3xl border-0 shadow-none">
        <CardContent className="p-6">
          <div className="mb-6">
            <p className="text-sm text-gray-500">{timestamp}</p>
          </div>
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-sm font-semibold text-gray-500">TITLE</h2>
            <h1 className="text-2xl font-bold capitalize">{title}</h1>
          </div>
          <div>
            <h2 className="mb-2 text-center font-semibold text-gray-500">
              NOTES
            </h2>
            <p className="whitespace-pre-wrap text-gray-700">{content}</p>
          </div>
        </CardContent>
        {/* <CardFooter>
          <ShadButton className="w-full bg-primary-500 text-white hover:bg-primary-600">
            DONE
          </ShadButton>
        </CardFooter> */}
      </Card>
    </div>
  );
};



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
    const { data: note }: { data: NotesData } = await telemedicineApi.retrieveSingleNote({
      noteid: id,
      userid: session.user.id,
      session
    });

    return note;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get appointments data');
  }
}

export default async function NoteDetailView({ params }: {
  params: { id: string, note_id: string }
}) {

  const session = await getUserSession()
  const note = await getNotes(session as Session, params.note_id as string)


  const noteData: NoteDetailProps = {
    timestamp: dayjs(note.createdAt).format('DD/MM/YYYY'),
    title: note.title,
    content: note.comment,
  };

  return (
    <TelemedicineLayoutTemplate>
      <NoteDetail {...noteData} />
    </TelemedicineLayoutTemplate>
  );
}
