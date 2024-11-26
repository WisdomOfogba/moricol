import { useState, useCallback, useEffect } from "react";
import { useSocketConnection } from "./useSocketConnection";
import { MessagePayload } from "@/definition";

interface UseChatProps {
    roomId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
}

export function useChat({
    roomId,
    userId,
    userName,
    userAvatar = ""
}: UseChatProps) {
    const [messages, setMessages] = useState<MessagePayload[]>([]);
    const [isTyping, setIsTyping] = useState<Record<string, boolean>>({});
    const { socket, isConnected, error } = useSocketConnection();

    console.log({
        coon: isConnected,
        socket, error
    })


    useEffect(() => {
        if (!socket || !isConnected) return;

        socket.emit('telemedicinechat', roomId);
        socket.on('receieve_telemedicine_chat', (message) => {
            setMessages(prev => [...prev, {
                userid: message.userid,
                appointmentid: message.appointmentid,
                usertype: message.usertype,
                text: message.text,
                id: crypto.randomUUID(),
            }]);
        });

        socket.on('user_typing', (typingUserId: string) => {
            setIsTyping(prev => ({ ...prev, [typingUserId]: true }));
        });

        socket.on('user_stop_typing', (typingUserId: string) => {
            setIsTyping(prev => ({ ...prev, [typingUserId]: false }));
        });

        return () => {
            socket.emit('leave_room', roomId);
            socket.off('receieve_telemedicine_chat');
            socket.off('user_typing');
            socket.off('user_stop_typing');
        };
    }, [isConnected, roomId, userId]);

    const sendMessage = useCallback((text: string) => {
        if (!socket || !isConnected) return;

        socket.emit('send_telemedicine_chat', {
            userid: userId,
            appointmentid: roomId,
            usertype: 'patient', // or doctor, depending on context
            text
        });

        // Add message to local state
        setMessages(prev => [...prev, {
            userid: userId,
            appointmentid: roomId,
            usertype: 'user',
            text: text,
            id: crypto.randomUUID(),
        }]);
    }, []);

    const emitTyping = useCallback(() => {
        socket?.emit('typing', roomId);
    }, [roomId]);

    const emitStopTyping = useCallback(() => {
        socket?.emit('stop_typing', roomId);
    }, [roomId]);

    return {
        messages,
        isConnected,
        error,
        sendMessage,
        emitTyping,
        emitStopTyping,
        typingUsers: isTyping
    };
}
