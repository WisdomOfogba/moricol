import { useState, useEffect } from 'react';

interface UseAudioPermissionReturn {
    stream: MediaStream | null;
    permissionStatus: 'granted' | 'denied' | 'prompt';
    showPermissionModal: boolean;
    error: string | null;
    isLoading: boolean;
    requestPermission: () => Promise<void>;
    closePermissionModal: () => void;
}

export const useAudioPermission = (): UseAudioPermissionReturn => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt'>('prompt');
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const requestPermission = async () => {
        setIsLoading(true);
        try {
            const permissions = await navigator.permissions.query({ name: 'microphone' as PermissionName });
            setPermissionStatus(permissions.state);

            if (permissions.state === 'denied') {
                setShowPermissionModal(true);
                return;
            }

            const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStream(mediaStream);
            setPermissionStatus('granted');
        } catch (err) {
            console.error("Error accessing microphone:", err);
            setShowPermissionModal(true);
            setError('Microphone access is required for the call');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        requestPermission();
        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, []);

    return {
        stream,
        permissionStatus,
        showPermissionModal,
        error,
        isLoading,
        requestPermission,
        closePermissionModal: () => setShowPermissionModal(false)
    };
}; 