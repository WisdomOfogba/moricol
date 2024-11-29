import { useState, useCallback, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import Peer from 'peerjs';

interface UseCallControlsProps {
    socket: Socket | null;
    peer: Peer | null;
    stream: MediaStream | null;
    appointmentId: string;
    userId: string;
    onCallEnd?: () => void;
}

interface UseCallControlsReturn {
    callStatus: 'idle' | 'ringing' | 'connecting' | 'connected' | 'ended' | 'failed';
    isMuted: boolean;
    callDuration: number;
    initiateCall: (receiverId: string) => void;
    acceptCall: (callerId: string) => void;
    rejectCall: (callerId: string) => void;
    endCall: () => void;
    toggleMute: () => void;
    isReconnecting: boolean;
    retryConnection: () => void;
}

export const useCallControls = ({
    socket,
    peer,
    stream,
    appointmentId,
    userId,
    onCallEnd
}: UseCallControlsProps): UseCallControlsReturn => {
    const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'connecting' | 'connected' | 'ended' | 'failed'>('idle');
    const [isMuted, setIsMuted] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const timerRef = useRef<NodeJS.Timeout>();
    const [isReconnecting, setIsReconnecting] = useState(false);

    // Socket event listeners
    useEffect(() => {
        if (!socket) return;

        socket.on('incoming-call', ({ callerId }) => {
            console.log('Incoming call from', callerId);

            setCallStatus('ringing');
        });

        socket.on('call-accepted', () => {
            setCallStatus('connecting');
        });

        socket.on('call-rejected', () => {
            setCallStatus('ended');
        });

        socket.on('call-ended', () => {
            setCallStatus('ended');
            handleEndCall();
        });

        return () => {
            socket.off('incoming-call');
            socket.off('call-accepted');
            socket.off('call-rejected');
            socket.off('call-ended');
        };
    }, [socket]);

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
        if (!socket) return;
        setCallStatus('connecting');
        socket.emit('initiate-call', {
            roomId: appointmentId,
            callerId: userId,
            receiverId
        });
    }, [socket, appointmentId, userId]);

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

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        setCallStatus('ended');
        setCallDuration(0);

        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = undefined;
        }

        onCallEnd?.();
    }, [socket, stream, appointmentId, onCallEnd]);

    const toggleMute = useCallback(() => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setIsMuted(!isMuted);
        }
    }, [stream, isMuted]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (callStatus === 'connected') {
                handleEndCall();
            }
        };
    }, [callStatus, handleEndCall]);

    useEffect(() => {
        if (!socket || !peer) return;

        const handleDisconnect = () => {
            setIsReconnecting(true);
            setCallStatus('failed');

            // Attempt to reconnect
            setTimeout(() => {
                socket.emit('join-call', {
                    roomId: appointmentId,
                    peerId: userId
                });
            }, 1000);
        };

        peer.on('disconnected', handleDisconnect);
        socket.on('disconnect', handleDisconnect);

        return () => {
            peer.off('disconnected', handleDisconnect);
            socket.off('disconnect', handleDisconnect);
        };
    }, [socket, peer, appointmentId, userId]);

    const retryConnection = useCallback(() => {
        if (!socket || !peer) return;
        socket.emit('join-call', {
            roomId: appointmentId,
            peerId: userId
        });
        setIsReconnecting(false);
    }, [socket, peer, appointmentId, userId]);

    return {
        callStatus,
        isMuted,
        callDuration,
        initiateCall,
        acceptCall,
        rejectCall,
        endCall: handleEndCall,
        toggleMute,
        isReconnecting,
        retryConnection
    };
}; 