"use client";
import Button from "@/components/button";
import ModalLayout from "@/components/layouts/modal-layout";
import Image from "next/image";
import React, { useState } from "react";
import CommunicationOption from "../../../_components/communication-option";
import { CheckCheck, Loader2 } from "lucide-react";
import telemedicineApi from "@/api/telemedicine";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useSnackbar } from "notistack";
import { routes } from "@/constants/routes";
import { useRouter } from "next/navigation";

function EndAppointmentModal({ appointmentid }: { appointmentid: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleEndAppointment = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to end this appointment?"
      );
      if (!confirmed) {
        return;
      }
      setLoading(true);
      await telemedicineApi.endAppointment({
        appointmentid,
        userid: session?.user.id as string,
        session: session as Session,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleEndAppointment}>
        <CommunicationOption
          icon={loading ? <Loader2 className="h-full w-full animate-spin" /> : <CheckCheck className="text-green-500" />}
          title="Close Appointment"
          description="End appointment"
        />
      </div>
      {isModalOpen && (
        <ModalLayout>
          <article className="flex w-full max-w-[806px] flex-col items-center justify-center rounded-lg bg-white px-7 py-10">
            <h3>COMPLETED</h3>
            <div className="relative mb-7 h-20 w-20">
              <Image
                src="/images/end-app.png"
                alt=""
                fill
                sizes="128px"
                className="h-full object-contain"
              />
            </div>
            <h3 className="mb-8 max-w-[635px] text-center text-2xl font-medium">
              Your appointment booking has successfully ended.
            </h3>

            <div className="mb-7 space-y-3.5 text-center font-medium text-[#667085]">
              <p>
                Kindly leave a review for this doctor so we can know how to
                serve you better
              </p>
            </div>

            <Button onClick={() => {
              setIsModalOpen(false);
              router.push(routes.TELEMEDICINE_APPOINTMENTS + '/' + appointmentid + '?review=true');
            }}>OKAY</Button>

            <Button className="border-none text-primary-500 mt-4" variant="outline" onClick={() => {
              setIsModalOpen(false);
            }}>DONE</Button>


          </article>



        </ModalLayout>
      )}
    </>
  );
}

export default EndAppointmentModal;
