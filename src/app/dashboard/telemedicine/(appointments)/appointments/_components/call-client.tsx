"use client";

import { Video, ChevronLeft, MicOff, Mic, PhoneOff, MessageCircleIcon, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { ShadButton } from "@/components/shadcn-button";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { useSocketConnection } from "@/hooks/useSocketConnection";
import { useSession } from "next-auth/react";
import { SingleAppointmentData } from "@/definition";
import dayjs from "dayjs";
import { useAudioPermission } from "@/hooks/useAudioPermission";
import { usePeerConnection } from "@/hooks/usePeerConnection";
import { useCallControls } from "@/hooks/useCallControls";
import PermissionModal from "./permission-modal";



interface CallClientProps {
  appointment: SingleAppointmentData
}

const CallClient: React.FC<CallClientProps> = ({ appointment }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const params = useParams();
  const appointmentId = params.id as string;

  const { socket, isConnected } = useSocketConnection(appointment.session_close);


  const {
    stream,
    permissionStatus,
    showPermissionModal,
    error: permissionError,
    closePermissionModal
  } = useAudioPermission();

  const {
    peer,
    remoteStream,
    connectionStatus,
    error: peerError
  } = usePeerConnection({
    userId: session?.user.id as string,
    stream,
    mode: 'audio'
  });

  const {
    callStatus,
    isMuted,
    callDuration,
    initiateCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleMute
  } = useCallControls({
    socket,
    peer,
    stream,
    appointmentId: appointmentId,
    userId: session?.user.id as string,
    onCallEnd: () => router.back()
  });

  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState<string | null>(null);






  function getStaffDetails() {
    if (typeof appointment.staffid === 'string') {
      return { firstname: '', lastname: '', photo: '' }
    } else {
      return appointment.staffid
    }
  }

  return (
    <div className="flex h-[78vh] flex-col bg-gray-100">
      {showPermissionModal && <PermissionModal
        permissionStatus={permissionStatus}
        closePermissionModal={closePermissionModal}
      />}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="rounded bg-white p-4">
            <h3 className="text-red-500">Error</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      )}

      {/* Chat area */}
      <div className="flex-1">
        <CallHeader
          router={router}
          appointment={appointment}
          connectionStatus={connectionStatus.audio}
          isConnected={isConnected}
        />

        <div className="mx-auto h-full md:max-w-[550px] bg-white">
          <div className="relative flex h-full flex-1 flex-col overflow-hidden">
            <div className="h-full w-full">
              <div className="flex h-[80%] flex-1 flex-col items-center justify-center p-4">
                <h1 className="mb-1 text-2xl font-semibold">Kathryn Cooper</h1>
                <p className="mb-6 text-gray-600">Doctor</p>

                <Avatar className="mb-8 h-48 w-48">
                  <AvatarImage alt="Kathryn Cooper" src="/images/client.jpg" />
                  <AvatarFallback>KC</AvatarFallback>
                </Avatar>

                <div className="rounded-full bg-gray-800 px-4 py-2 text-white">
                  {new Date(callDuration * 1000).toISOString().substr(11, 8)}
                </div>
              </div>
            </div>
            <CallFooterControls toggleMute={toggleMute} isMuted={isMuted} />
          </div>
        </div>
      </div>
      <audio ref={localAudioRef} autoPlay muted />
      <audio ref={remoteAudioRef} autoPlay />
    </div>
  );
}


export default CallClient











interface CallHeaderProps {
  router: {
    back: () => void;
  };
  appointment: SingleAppointmentData;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'failed';
  isConnected: boolean;
}

const CallHeader: React.FC<CallHeaderProps> = ({ router, appointment, connectionStatus, isConnected }) => {
  const staffDetails = typeof appointment.staffid === 'string' ? { firstname: '', lastname: '', photo: '' } : appointment.staffid;

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <ChevronLeft
              onClick={() => router.back()}
              className="h-5 w-5 text-gray-500 hover:text-primary-500"
            />
          </div>
          <Avatar>
            <AvatarImage src="/images/client.jpg" alt="David Moore" />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{staffDetails.firstname} {staffDetails.lastname}</h2>
            {connectionStatus === 'connected' && !appointment.session_close && (
              <p className="text-sm text-gray-500">{dayjs().format('MMMM D, YYYY')}</p>
            )}
            {connectionStatus !== 'connected' && appointment.session_close && (
              <p className="text-sm text-gray-500">SESSION ENDED</p>
            )}
            {connectionStatus === 'connecting' && (
              <div className="text-sm text-gray-500 flex items-center italics">
                Connecting <Loader2 className="animate-spin ml-2 h-4 w-4" />
              </div>
            )}
            {!isConnected && (
              <div className="text-sm text-red-500 flex items-center italics">
                Server not connected <Loader2 className="animate-spin ml-2 h-3 w-3" />
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`${routes.TELEMEDICINE_APPOINTMENTS}/${appointment._id}/video-call`}>
            <ShadButton variant="ghost" size="icon" className="hover:text-primary-500">
              <Video className="h-5 w-5" />
            </ShadButton>
          </Link>
          <Link href={`${routes.TELEMEDICINE_APPOINTMENTS}/${appointment._id}/messages`}>
            <ShadButton variant="ghost" size="icon" className="hover:text-primary-500">
              <MessageCircleIcon className="h-5 w-5" />
            </ShadButton>
          </Link>
        </div>
      </div>
    </>
  );
};




function CallFooterControls(
  {
    toggleMute,
    isMuted,

  }: {
    toggleMute: () => void;
    isMuted: boolean;

  }
) {
  return (
    <section className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent">
      <div className="relative mt-4 flex items-center justify-between px-4">
        <Image
          fill
          src="/images/rect.png"
          alt=""
          className="absolute bottom-0 left-0 z-10 h-full w-full"
        />
        <div className="relative z-50 flex w-full items-center justify-between px-4">
          <ShadButton
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-xl bg-white bg-opacity-80"
            onClick={toggleMute}
          >
            {isMuted ? (
              <GiSpeakerOff className="h-8 w-8 text-primary-500" />
            ) : (
              <GiSpeaker className="h-8 w-8 text-primary-500" />
            )}
          </ShadButton>
          <div className="relative">
            <ShadButton
              variant="destructive"
              size="icon"
              className="relative top-[-60px] h-20 w-20 rounded-full bg-secondary-500 text-white"
            >
              <PhoneOff className="h-8 w-8" />
            </ShadButton>
          </div>

          {/* <ShadButton
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-xl bg-white bg-opacity-80"
            onClick={() => setIsCameraOff(!isCameraOff)}
          >
            {isCameraOff ? (
              <MicOff className="h-8 w-8 text-primary-500" />
            ) : (
              <Mic className="h-8 w-8 text-primary-500" />
            )}
          </ShadButton> */}
          <div />
        </div>
      </div>
    </section>
  )
}