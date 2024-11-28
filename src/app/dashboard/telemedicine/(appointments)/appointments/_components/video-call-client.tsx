"use client";

import { ChevronLeft, MicOff, Mic, PhoneOff, CameraOff, Camera, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { ShadButton } from "@/components/shadcn-button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SingleAppointmentData } from "@/definition";
import dayjs from "dayjs";
import { useSocketConnection } from "@/hooks/useSocketConnection";
import { usePeerConnection } from "@/hooks/usePeerConnection";
import { useVideoCallControls } from "@/hooks/useVideoCallControls";
import { useRef, useEffect } from "react";
import { useMediaStream } from "@/hooks/useMediaStream";

interface VideoCallClientProps {
  appointment: SingleAppointmentData;
}

export default function VideoCallClient({ appointment }: VideoCallClientProps) {
  const router = useRouter();
  const { data: session } = useSession();

  // Video refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Get media stream first
  const {
    stream: localStream,
    // error: mediaError,
    // isLoading: mediaLoading,
    // permissionStatus
  } = useMediaStream();

  // Initialize peer with stream
  const {
    peer,
    remoteStream,
    // connectionStatus,
    error: peerError
  } = usePeerConnection({
    userId: session?.user?.id as string,
    stream: localStream,
    mode: "video"
  });

  // Initialize socket
  const { socket } = useSocketConnection(false);

  // Finally initialize call controls
  const {
    callStatus,
    isMuted,
    isVideoOff,
    callDuration,
    isReconnecting,
    // initiateCall,
    // acceptCall,
    // rejectCall,
    endCall,
    toggleMute,
    toggleVideo,
    retryConnection
  } = useVideoCallControls({
    socket,
    peer,
    appointmentId: appointment._id,
    userId: session?.user?.id as string,
    localStream,
    onCallEnd: () => router.back()
  });

  // Set up video streams
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-[85vh] flex-col bg-gray-100">
      {/* Header */}
      <div className="top-0 z-10 flex items-center justify-between bg-white p-4 shadow">
        <div className="flex items-center space-x-4">
          <ChevronLeft
            onClick={() => router.back()}
            className="h-5 w-5 cursor-pointer text-gray-500 hover:text-primary-500"
          />
          <Avatar>
            <AvatarImage src={appointment.userid.photo || ""} alt={appointment.userid.firstname || ""} />
            <AvatarFallback>{appointment.userid.firstname?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{appointment.userid.firstname}</h2>
            <p className="text-sm text-gray-500">{dayjs().format('D MMMM, YYYY')}</p>
          </div>
        </div>
      </div>

      {/* Main video area */}
      <div className="relative flex-1 bg-gray-900">
        {/* Remote video (full screen) */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        />

        {/* Local video (picture-in-picture) */}
        <div className="absolute right-4 top-4 h-32 w-24 overflow-hidden rounded-xl border-2 border-white">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        </div>

        {/* Call status overlay */}
        {callStatus === 'connecting' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center text-white">
              <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin" />
              <p>Connecting...</p>
            </div>
          </div>
        )}

        {/* Call duration */}
        {callStatus === 'connected' && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
            {formatDuration(callDuration)}
          </div>
        )}
      </div>

      {/* Call controls */}
      <div className="bg-gray-900 p-4">
        <div className="flex items-center justify-center space-x-4">
          <ShadButton
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className="h-12 w-12 rounded-full bg-white/10"
          >
            {isMuted ? (
              <MicOff className="h-6 w-6 text-red-500" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </ShadButton>

          <ShadButton
            variant="destructive"
            size="icon"
            onClick={endCall}
            className="h-16 w-16 rounded-full"
          >
            <PhoneOff className="h-8 w-8" />
          </ShadButton>

          <ShadButton
            variant="outline"
            size="icon"
            onClick={toggleVideo}
            className="h-12 w-12 rounded-full bg-white/10"
          >
            {isVideoOff ? (
              <CameraOff className="h-6 w-6 text-red-500" />
            ) : (
              <Camera className="h-6 w-6 text-white" />
            )}
          </ShadButton>
        </div>
      </div>

      {/* Error modal */}
      {peerError.video && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-red-600">Error</h3>
            <p className="mb-4 text-gray-600">{peerError.video}</p>
            <div className="flex justify-end space-x-2">
              <ShadButton variant="outline" onClick={() => router.back()}>
                Close
              </ShadButton>
              {isReconnecting && (
                <ShadButton onClick={retryConnection}>
                  Retry
                </ShadButton>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
