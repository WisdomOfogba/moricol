import { useState, useCallback, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import Peer from 'peerjs';

interface UseVideoCallControlsProps {
    socket: Socket | null;
    peer: Peer | null;
    appointmentId: string;
    userId: string;
    localStream: MediaStream | undefined
    onCallEnd?: () => void;
}

interface UseVideoCallControlsReturn {
    callStatus: 'idle' | 'ringing' | 'connecting' | 'connected' | 'ended' | 'failed';
    isMuted: boolean;
    isVideoOff: boolean;
    callDuration: number;
    isReconnecting: boolean;
    initiateCall: (receiverId: string) => void;
    acceptCall: (callerId: string) => void;
    rejectCall: (callerId: string) => void;
    endCall: () => void;
    toggleMute: () => void;
    toggleVideo: () => void;
    retryConnection: () => void;
}

export const useVideoCallControls = ({
    socket,
    peer,
    appointmentId,
    userId,
    localStream,
    onCallEnd
}: UseVideoCallControlsProps): UseVideoCallControlsReturn => {
    const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'connecting' | 'connected' | 'ended' | 'failed'>('idle');
    const [callDuration, setCallDuration] = useState(0);
    const [isReconnecting, setIsReconnecting] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();

    // Socket event listeners
    useEffect(() => {
        if (!socket) return;

        socket.on('incoming-call', ({ callerId }) => {
            console.log(callerId)
            setCallStatus('ringing');
        });

        socket.on('call-accepted', ({ peerId }) => {
            setCallStatus('connecting');
            if (peer && localStream) {
                const call = peer.call(peerId, localStream);
                call.on('stream', (remoteMediaStream) => {
                    console.log(remoteMediaStream);
                    setCallStatus('connected');
                });
            }
        });

        socket.on('call-rejected', () => {
            setCallStatus('ended');
        });

        socket.on('call-ended', () => {
            handleEndCall();
        });

        return () => {
            socket.off('incoming-call');
            socket.off('call-accepted');
            socket.off('call-rejected');
            socket.off('call-ended');
        };
    }, [socket, peer, localStream]);

    // Peer connection handlers
    useEffect(() => {
        if (!peer) return;

        peer.on('call', (call) => {
            call.answer(localStream);
            call.on('stream', (remoteMediaStream) => {
                console.log(remoteMediaStream);

                setCallStatus('connected');
            });
        });

        return () => {
            peer.removeAllListeners('call');
        };
    }, [peer, localStream]);

    // Call duration timer
    useEffect(() => {
        if (callStatus === 'connected' && !timerRef.current) {
            timerRef.current = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = undefined;
            }
        };
    }, [callStatus]);

    const initiateCall = useCallback((receiverId: string) => {
        if (!socket || !peer) return;
        setCallStatus('connecting');
        socket.emit('initiate-call', {
            roomId: appointmentId,
            callerId: userId,
            receiverId
        });
    }, [socket, peer, appointmentId, userId]);

    const acceptCall = useCallback((callerId: string) => {
        if (!socket || !peer) return;
        socket.emit('accept-call', {
            roomId: appointmentId,
            peerId: peer.id,
            callerId
        });
        setCallStatus('connecting');
    }, [socket, peer, appointmentId]);

    const rejectCall = useCallback((callerId: string) => {
        if (!socket) return;
        socket.emit('reject-call', {
            roomId: appointmentId,
            callerId
        });
        setCallStatus('idle');
    }, [socket, appointmentId]);

    const handleEndCall = useCallback(() => {
        if (!socket) return;

        socket.emit('end-call', {
            roomId: appointmentId
        });

        setCallStatus('ended');
        setCallDuration(0);

        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = undefined;
        }

        onCallEnd?.();
    }, [socket, appointmentId, onCallEnd]);

    const toggleMute = useCallback(() => {
        if (peer) {
            const audioTrack = localStream?.getAudioTracks()[0]; // Use localStream
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
            }
        }
    }, [peer, localStream]);

    const toggleVideo = useCallback(() => {
        if (peer) {
            const videoTrack = localStream?.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
            }
        }
    }, [peer, localStream]);

    const retryConnection = useCallback(() => {
        if (!socket || !peer) return;
        setIsReconnecting(true);
        socket.emit('join-call', {
            roomId: appointmentId,
            peerId: userId
        });
    }, [socket, peer, appointmentId, userId]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (callStatus === 'connected') {
                handleEndCall();
            }
        };
    }, [callStatus, handleEndCall]);

    return {
        callStatus,
        isMuted: localStream?.getAudioTracks().some(track => track.enabled) || false, // Check localStream
        isVideoOff: localStream?.getVideoTracks().some(track => track.enabled) || false, // Check localStream
        callDuration,
        isReconnecting,
        initiateCall,
        acceptCall,
        rejectCall,
        endCall: handleEndCall,
        toggleMute,
        toggleVideo,
        retryConnection
    };
}; 