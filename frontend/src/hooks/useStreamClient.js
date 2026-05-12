
import { useState, useEffect } from 'react';
import { StreamChat } from "stream-chat";
import { initializeStreamClient, disconnectStreamClient } from '../lib/stream';
import toast from 'react-hot-toast';
import { sessionAPI } from "../api/sessions";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
    const [streamClient, setStreamClient] = useState(null);
    const [call, setCall] = useState(null);
    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);
    const [isInitializingCall, setIsInitializingCall] = useState(true);

    useEffect(() => {
        let videoCall = null;
        let chatClientInstance = null;
        let cleanup = false;

        const initCall = async () => {
            if (!session?.callId) return;
            if (!isHost && !isParticipant) return;

            try {
                // 1. Get token and user info
                const { token, userId, userName, userImage } = await sessionAPI.getStreamToken();
                if (!token || !userId) {
                    throw new Error("Missing Stream token or userId");
                }
                // 2. Initialize and connect video client
                const client = await initializeStreamClient({ id: userId, name: userName, image: userImage }, token);
                setStreamClient(client);
                // Debug: log client after connectUser
                console.log("Stream video client after connectUser:", client);
                // 3. Join the video call
                videoCall = client.call("default", session.callId);
                await videoCall.join({ create: true });
                setCall(videoCall);

                // 4. Initialize and connect chat client
                const apiKey = import.meta.env.VITE_STREAM_API_KEY;
                chatClientInstance = StreamChat.getInstance(apiKey);
                await chatClientInstance.connectUser({ id: userId, name: userName, image: userImage }, token);
                setChatClient(chatClientInstance);

                // 5. Create and watch chat channel
                const chatChannel = chatClientInstance.channel("messaging", session.callId);
                await chatChannel.watch();
                setChannel(chatChannel);
                setCall(videoCall);
            } catch (error) {
                toast.error("Failed to join video call. Please try again.");
                console.error("Error initializing Stream client:", error);
            } finally {
                setIsInitializingCall(false);
            }
        };

        if (session && !loadingSession) {
            setIsInitializingCall(true);
            initCall();
        }

        // Cleanup function to disconnect the client when the component unmounts or session changes
        return () => {
            cleanup = true;
            (async () => {
                try {
                    if (videoCall) await videoCall.leave();
                    if (chatClientInstance) await chatClientInstance.disconnectUser();
                    await disconnectStreamClient();
                } catch (error) {
                    console.error("Cleanup error:", error);
                }
            })();
        };
    }, [session, loadingSession, isHost, isParticipant]);

    return {
        streamClient,
        call,
        chatClient,
        channel,
        isInitializingCall
    }
}
export default useStreamClient;