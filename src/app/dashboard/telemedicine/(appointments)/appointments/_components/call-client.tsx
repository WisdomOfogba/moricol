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
import Peer from "peerjs";
import { useSocketConnection } from "@/hooks/useSocketConnection";
import { useSession } from "next-auth/react";
import { SingleAppointmentData } from "@/definition";
import dayjs from "dayjs";

type CallStatus = 'idle' | 'connecting' | 'connected' | 'ended' | 'failed';

interface CallClientProps {
  appointment: SingleAppointmentData
}

const CallClient: React.FC<CallClientProps> = ({ appointment }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const params = useParams();
  const appointmentId = params.id as string;

  const { socket, isConnected } = useSocketConnection(appointment.session_close);

  console.log(appointment.session_close);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [peer, setPeer] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [isCallActive, setIsCallActive] = useState(false);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [callQuality, setCallQuality] = useState<'good' | 'poor' | 'bad'>('good');

  const timerRef = useRef<NodeJS.Timeout>();

  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  useEffect(() => {
    const initializeMedia = async () => {
      setIsLoading(true);
      try {
        // First check if permissions are available
        const permissions = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        setPermissionStatus(permissions.state);

        if (permissions.state === 'denied') {
          setShowPermissionModal(true);
          setIsLoading(false);
          return;
        }

        // Try to get media stream
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(mediaStream);
        if (localAudioRef.current) {
          localAudioRef.current.srcObject = mediaStream;
        }
        setPermissionStatus('granted');

      } catch (err) {
        console.error("Error accessing microphone:", err);
        setShowPermissionModal(true);
        setError('Microphone access is required for the call');
      } finally {
        setIsLoading(false);
      }
    };

    initializeMedia();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [permissionStatus]);

  useEffect(() => {
    setIsLoading(true);
    try {
      const newPeer = new Peer(session?.user.id as string, {
        //complete peerjs config here
      });

      newPeer.on('open', () => {
        setPeer(newPeer);
        setIsLoading(false);
      });

      newPeer.on('error', (err) => {
        setError(`PeerJS error: ${err.message}`);
        setIsLoading(false);
      });

      return () => {
        stream?.getTracks().forEach(track => track.stop());
        newPeer.destroy();
      };
    } catch (err) {
      setError('Failed to initialize call');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!peer || !socket || !stream) return;

    peer.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (remoteMediaStream) => {
        setRemoteStream(remoteMediaStream);
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteMediaStream;
        }
        setIsCallActive(true);
      });
    });

    socket.on('user-joined', (remotePeerId) => {
      const call = peer.call(remotePeerId, stream);
      call.on('stream', (remoteMediaStream) => {
        setRemoteStream(remoteMediaStream);
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteMediaStream;
        }
        setIsCallActive(true);
      });
    });

    return () => {
      socket.off('user-joined');
    };
  }, [peer, socket, stream]);

  useEffect(() => {
    if (callStatus === 'connected' && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [callStatus]);

  useEffect(() => {
    if (!peer || !socket) return;

    const handleDisconnect = () => {
      setCallStatus('failed');
      // Attempt to reconnect
      setTimeout(() => {
        socket.emit('join-call', {
          roomId: appointmentId,
          peerId: session?.user.id as string
        });
      }, 1000);
    };

    peer.on('disconnected', handleDisconnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      peer.off('disconnected', handleDisconnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [peer, socket, appointmentId, session?.user.id]);

  useEffect(() => {
    if (!remoteStream) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(remoteStream);
    source.connect(analyser);

    const checkAudioLevel = () => {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

      if (average < 50) setCallQuality('poor');
      else if (average < 100) setCallQuality('good');
      else setCallQuality('bad');
    };

    const interval = setInterval(checkAudioLevel, 1000);

    return () => {
      clearInterval(interval);
      audioContext.close();
    };
  }, [remoteStream]);

  const handleEndCall = useCallback(() => {
    setCallStatus('ended');
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (socket) {
      socket.emit('leave-call', appointmentId);
    }
    if (peer) {
      peer.destroy();
    }
    router.back();
  }, [stream, socket, peer, router, appointmentId]);

  const handleToggleMute = useCallback(() => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!isMuted);
    }
  }, [stream, isMuted]);


  function getStaffDetails() {
    if (typeof appointment.staffid === 'string') {
      return { firstname: '', lastname: '', photo: '' }
    } else {
      return appointment.staffid
    }
  }


  const PermissionModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">
          Microphone Access Required
        </h3>

        <div className="mb-4 text-gray-600">
          {permissionStatus === 'denied' ? (
            <>
              <p className="mb-2">
                Microphone access has been blocked. To use this feature:
              </p>
              <ol className="ml-4 list-decimal">
                <li>Click the camera/microphone icon in your browser's address bar</li>
                <li>Select "Allow" for microphone access</li>
                <li>Refresh the page</li>
              </ol>
            </>
          ) : (
            <p>
              This app needs access to your microphone to make calls.
              Please click "Allow" when prompted by your browser.
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <ShadButton
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </ShadButton>
          {permissionStatus === 'denied' ? (
            <ShadButton
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </ShadButton>
          ) : (
            <ShadButton
              onClick={() => {
                setShowPermissionModal(false);

              }}
            >
              Try Again
            </ShadButton>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-[78vh] flex-col bg-gray-100">
      {showPermissionModal && <PermissionModal />}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <span className="text-white">Connecting...</span>
        </div>
      )}

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
        {/* Patient info */}
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
              <h2 className="font-semibold">{getStaffDetails().firstname} {getStaffDetails().lastname}</h2>
              {!isLoading && !appointment.session_close && <p className="text-sm text-gray-500">{
                dayjs().format('MMMM D, YYYY')
              }</p>}
              {!isLoading && appointment.session_close && <p className="text-sm text-gray-500">
                SESSION ENDED
              </p>}

              {isLoading && <div className="text-sm text-gray-500 flex items-center italics">
                Connecting <Loader2 className="animate-spin ml-2 h-4 w-4" />
              </div>}
              {!isConnected && <div className="text-sm text-red-500 flex items-center italics">
                Server not connected <Loader2 className="animate-spin ml-2 h-3 w-3" />
              </div>}
              {/* <small className={`text-xxs ${callQuality === 'good' ? 'bg-green-500' :
                callQuality === 'poor' ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                {callQuality} connection
              </small> */}
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href={`${routes.TELEMEDICINE_APPOINTMENTS}/${appointmentId}/video-call`}>
              <ShadButton
                variant="ghost"
                size="icon"
                className="hover:text-primary-500"
              >
                <Video className="h-5 w-5" />
              </ShadButton>
            </Link>
            <Link href={`${routes.TELEMEDICINE_APPOINTMENTS}/${appointmentId}/messages`}>
              <ShadButton
                variant="ghost"
                size="icon"
                className="hover:text-primary-500"
              >
                <MessageCircleIcon className="h-5 w-5" />
              </ShadButton>
            </Link>
          </div>
        </div>
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
                    onClick={handleToggleMute}
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

                  <ShadButton
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
                  </ShadButton>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <audio ref={localAudioRef} autoPlay muted />
      <audio ref={remoteAudioRef} autoPlay />
    </div>
  );
}


export default CallClient