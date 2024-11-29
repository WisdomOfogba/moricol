import { useState, useEffect } from 'react';

interface UseMediaStreamProps {
    video?: boolean;
    audio?: boolean;
}

interface UseMediaStreamReturn {
    stream: MediaStream | undefined;
    error: string | null;
    isLoading: boolean;
    permissionStatus: 'granted' | 'denied' | 'prompt';
    requestPermissions: () => Promise<void>;
}




export const useMediaStream = ({
    video = true,
    audio = true,
}: UseMediaStreamProps = {}): UseMediaStreamReturn => {
    const [stream, setStream] = useState<MediaStream | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt'>('prompt');

    const requestPermissions = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const permissions = await Promise.all([
                video ? navigator.permissions.query({ name: 'camera' as PermissionName }) : Promise.resolve({ state: 'granted' }),
                audio ? navigator.permissions.query({ name: 'microphone' as PermissionName }) : Promise.resolve({ state: 'granted' })
            ]);

            const denied = permissions.some(p => p && p.state === 'denied');
            if (denied) {
                setPermissionStatus('denied');
                throw new Error('Camera or microphone access denied');
            }

            // Get media stream
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video,
                audio
            });

            setStream(mediaStream);
            setPermissionStatus('granted');
        } catch (err) {
            console.error('Media stream error:', err);
            setError(err instanceof Error ? err.message : 'Failed to access media devices');
            setPermissionStatus('denied');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        requestPermissions();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return {
        stream,
        error,
        isLoading,
        permissionStatus,
        requestPermissions
    };
}; 