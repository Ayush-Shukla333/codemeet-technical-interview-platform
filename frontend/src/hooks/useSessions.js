import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { sessionAPI } from '../api/sessions.js';

export const useCreateSession = () => {
    const queryClient = useQueryClient();

    const result = useMutation({
        mutationFn: sessionAPI.createSession,

        onSuccess: () => {
            toast.success("Session created successfully");

            // REFRESH ACTIVE SESSIONS
            queryClient.invalidateQueries({
                queryKey: ['activeSessions']
            });

            // OPTIONAL
            queryClient.invalidateQueries({
                queryKey: ['myRecentSessions']
            });
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create session");
        }
    });

    return result;
};

export const useActiveSessions = () => {
    const result = useQuery({
        queryKey: ['activeSessions'],
        queryFn: sessionAPI.getActiveSessions,
    });

    return result;
};

export const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey: ['myRecentSessions'],
        queryFn: sessionAPI.getMyRecentSessions,
    });

    return result;
};

export const useSessionById = (id) => {
    const result = useQuery({
        queryKey: ['session', id],
        queryFn: () => sessionAPI.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000,
    });

    return result;
};

export const useJoinSession = () => {
    const queryClient = useQueryClient();

    const result = useMutation({
        mutationKey: ["joinSession"],
        mutationFn: sessionAPI.joinSession,

        onSuccess: () => {
            toast.success("Joined session successfully");

            queryClient.invalidateQueries({
                queryKey: ['activeSessions']
            });

            queryClient.invalidateQueries({
                queryKey: ['session', id]
            });
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to join session");
        },
    });

    return result;
};

export const useEndSession = () => {
    const queryClient = useQueryClient();

    const result = useMutation({
        mutationKey: ["endSession"],
        mutationFn: sessionAPI.endSession,

        onSuccess: () => {
            toast.success("Session ended successfully");

            // REMOVE FROM ACTIVE
            queryClient.invalidateQueries({
                queryKey: ['activeSessions']
            });

            // ADD TO RECENT
            queryClient.invalidateQueries({
                queryKey: ['myRecentSessions']
            });

            // REFRESH SESSION DETAILS
            queryClient.invalidateQueries({
                queryKey: ['session', id]
            });
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to end session");
        },
    });

    return result;
};