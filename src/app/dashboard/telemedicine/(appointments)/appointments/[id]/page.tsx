import { MessageSquare, Phone, Video } from "lucide-react";
import Image from "next/image";
import React from "react";
import CommunicationOption from "../../../_components/communication-option";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import Button from "@/components/button";
import Link from "next/link";
import { routes } from "@/constants/routes";
import TelemedicineLayoutTemplate from "../../../(main)/template";
import EndAppointmentModal from "../_components/end-appointment-modal";
import { Metadata } from "next";
import { Session } from "next-auth";
import { SingleAppointmentData } from "@/definition";
import telemedicineApi from "@/api/telemedicine";
import { getUserSession } from "@/lib/auth";
import UploadAppointmentFiles from "../_components/upload-appointment-files";
import ReviewClient from "../_components/review-client";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Appointment",
  description: "Appointment page",
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

async function SingleAppointment({
  params: { id },
  searchParams: {
    review
  }
}: {
  params: { id: string };
  searchParams: {
    review: boolean;
  };
}) {
  const session = await getUserSession();
  const appointment = await getAppointment(session as Session, id);

  return (
    <TelemedicineLayoutTemplate>
      <div className="mx-auto max-w-[818px] rounded-3xl bg-white">
        <section className="p-4">
          <Link href={'#upload'} className="ml-auto block w-fit pb-2 ">
            <Button variant="text" className="ml-auto w-fit">
              SEND AN ATTACHMENT
            </Button>
          </Link>
          <div className="flex justify-between">
            {/* @ts-expect-error -- not a problem */}
            <Profile photo={appointment.staffid?.photo} date={appointment.date} name={appointment.staffid?.firstname} />

            <Link
              className="block h-fit"
              href={`${routes.TELEMEDICINE_APPOINTMENTS}/${id}?review=true`}
            >
              <Button variant="text">REVIEW</Button>
            </Link>
          </div>
        </section>
        {/* 
        <section className="flex items-center justify-center gap-x-6 rounded-t-[40px] bg-gray-600 py-7">
          <StatCard
            icon={<TwoUsersSvg />}
            label="1000+"
            description="Patients"
          />
          <StatCard
            icon={<BadgeSvg />}
            label="5 Years"
            description="Experience"
          />
        </section> */}
        <hr />
        <section className="py-4">
          <div className="grid gap-y-6 px-5">
            <div className="mb-4 space-y-4">
              <h3>You get to:</h3>
              {appointment.sessiontype.audio && (
                <Link
                  href={`${routes.TELEMEDICINE_APPOINTMENTS}/${id}/call`}
                  className="ease block border-primary-500 transition transition-all duration-300 hover:scale-[99%]"
                >
                  <CommunicationOption
                    icon={<Phone className="text-blue-500" />}
                    title="Voice Call"
                    description="Can make a voice call with the practitioner."
                  />
                </Link>
              )}
              {appointment.sessiontype.chat && (
                <Link
                  href={`${routes.TELEMEDICINE_APPOINTMENTS}/${id}/messages`}
                  className="ease block border-primary-500 transition transition-all duration-300 hover:scale-[99%]"
                >
                  <CommunicationOption
                    icon={<MessageSquare className="text-primary-500" />}
                    title="Message"
                    description="Can chat with the practitioner."
                  />
                </Link>
              )}
              {appointment.sessiontype.video && (
                <Link
                  href={`${routes.TELEMEDICINE_APPOINTMENTS}/${id}/video-call`}
                  className="ease block border-primary-500 transition transition-all duration-300 hover:scale-[99%]"
                >
                  <CommunicationOption
                    icon={<Video className="text-purple-500" />}
                    title="Video Call"
                    description="Can make a video call with the practitioner."
                  />
                </Link>
              )}
              {/* <Link
                href={`${routes.TELEMEDICINE_APPOINTMENTS}/${id}/notes`}
                className="ease block border-primary-500 transition transition-all duration-300 hover:scale-[99%]"
              >
                <CommunicationOption
                  icon={<Notebook className="text-purple-500" />}
                  title="Notes"
                  description="View notes."
                />
              </Link> */}
              <EndAppointmentModal appointmentid={id} />
              {review && <ReviewClient appointmentid={id} staffid={appointment.staffid} />}
            </div>
          </div>
        </section>

        <section>
          <Tabs defaultValue="Received" className="mb-4 md:mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="Received"
                className="bg-gray-100 uppercase data-[state=active]:bg-primary-500 data-[state=active]:text-white"
              >
                Received
              </TabsTrigger>
              <TabsTrigger
                value="sent"
                className="bg-gray-100 uppercase data-[state=active]:bg-primary-500 data-[state=active]:text-white"
              >
                Sent
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Received" className="px-4">
              {appointment.staffupload.length > 0 ? (
                appointment.staffupload.map(file => (
                  <div key={file._id} className="py-2 flex items-center justify-between">
                    <p className="capitalize">{file.name}</p>
                    <a className="text-primary-500 underline" href={file.upload} target="_blank" rel="noopener noreferrer">View File</a>
                  </div>
                ))
              ) : (
                <p className="py-5">No received files yet.</p>
              )}
              <hr />

            </TabsContent>
            <TabsContent value="sent" className="px-4">
              {appointment.userupload.length > 0 ? (
                appointment.userupload.map(file => (
                  <div key={file._id} className="py-2 flex items-center justify-between">
                    <p className="capitalize">{file.name}</p>
                    <a className="text-primary-500 underline" href={file.upload} target="_blank" rel="noopener noreferrer">View File</a>
                  </div>
                ))
              ) : (
                <p className="py-5">No sent files yet.</p>
              )}
            </TabsContent>
          </Tabs>
          <br />
          <UploadAppointmentFiles appointmentid={id} />
        </section>
      </div>
    </TelemedicineLayoutTemplate>
  );
}

export default SingleAppointment;

function Profile({ photo, date, name = "Unassigned" }: { photo: string | null | undefined, date: string, name?: string }) {
  const formattedDate = (date: string) => {
    if (typeof date === 'string' && date.includes('/')) {
      const [day, month, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

    }
    return date;
  }

  return (
    <article className="flex shrink-0 items-center gap-x-3">
      {photo && <Image
        src={photo}
        alt=""
        width={90}
        height={90}
        className="h-[90px] w-[90px] rounded-xl"
      />}
      {!photo && <div className="mr-2 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
          <span className="text-2xl text-gray-500">
            {'?'}
          </span>
        </div>
      </div>}
      <div>
        <h3 className="mb-0.5 text-lg font-medium text-gray-700">
          {name}
        </h3>
        <p className="text-[#777A95]">{dayjs(formattedDate(date) as string).format('D MMMM, YYYY')}</p>
      </div>
    </article>
  );
}
