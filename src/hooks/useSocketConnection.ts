import { API_BASE_URL } from '@/constants/config';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';



export function useSocketConnection(session_close: boolean) {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const reconnectAttempts = useRef(0);
    const maxRecon = 5

    useEffect(() => {
        if (session_close) return
        socketRef.current = io(API_BASE_URL, {
            transports: ['websocket', 'polling'],
        });

        socketRef.current.on('connect', () => {
            console.log('connected')
            setIsConnected(true);
            setError(null);
            reconnectAttempts.current = 0;
        });

        socketRef.current.on('disconnect', () => {
            console.log('disconnected')
            setIsConnected(false);
        });

        socketRef.current.on('connect_error', (err) => {
            setError(err);
            setIsConnected(false);

            if (reconnectAttempts.current >= maxRecon) {
                socketRef.current?.disconnect();
            }
            reconnectAttempts.current += 1;
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    return {
        socket: socketRef.current,
        isConnected,
        error
    };
}
