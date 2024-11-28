import { useState, useEffect } from 'react';
import Peer from 'peerjs';

interface UsePeerConnectionProps {
    userId: string;
    stream: MediaStream | undefined | null;
    mode: 'audio' | 'video';
    constraints?: MediaStreamConstraints;
}

interface UsePeerConnectionReturn {
    peer: Peer | null;
    remoteStream: MediaStream | null;
    connectionStatus: {
        audio: 'disconnected' | 'connecting' | 'connected' | 'failed';
        video?: 'disconnected' | 'connecting' | 'connected' | 'failed';
    };
    error: {
        audio?: string | null;
        video?: string | null;
    };
    connectToPeer: (remotePeerId: string) => void;
    disconnectPeer: () => void;
}

export const usePeerConnection = ({ userId, stream, mode, constraints }: UsePeerConnectionProps): UsePeerConnectionReturn => {
    const [peer, setPeer] = useState<Peer | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<{
        audio: 'disconnected' | 'connecting' | 'connected' | 'failed';
        video?: 'disconnected' | 'connecting' | 'connected' | 'failed';
    }>({ audio: 'disconnected' });
    const [error, setError] = useState<{
        audio?: string | null;
        video?: string | null;
    }>({});

    useEffect(() => {
        if (!userId || !stream) return;

        setConnectionStatus({ audio: 'connecting' });
        const newPeer = new Peer(userId, {
            // Your PeerJS config
        });

        newPeer.on('open', () => {
            setPeer(newPeer);
            setConnectionStatus({ audio: 'connected' });
        });

        newPeer.on('error', (err) => {
            setError({ audio: `PeerJS error: ${err.message}` });
            setConnectionStatus({ audio: 'disconnected' });
        });

        newPeer.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (remoteMediaStream) => {
                setRemoteStream(remoteMediaStream);
                setConnectionStatus({ audio: 'connected' });
            });
        });

        return () => {
            newPeer.destroy();
            setPeer(null);
            setConnectionStatus({ audio: 'disconnected' });
        };
    }, [userId, stream]);

    const connectToPeer = (remotePeerId: string) => {
        if (!peer || !stream) return;

        const call = peer.call(remotePeerId, stream);
        call.on('stream', (remoteMediaStream) => {
            setRemoteStream(remoteMediaStream);
            setConnectionStatus({ audio: 'connected' });
        });
    };

    return {
        peer,
        remoteStream,
        connectionStatus,
        error,
        connectToPeer,
        disconnectPeer: () => peer?.destroy()
    };
}; 