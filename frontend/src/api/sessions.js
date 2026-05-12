import axiosInstance from '../lib/axios';
//this file is going to contain all the api calls related to sessions, such as creating a session, getting all sessions for a user, etc. We will export an object called sessionAPI that will contain all these functions.
export const sessionAPI = {
    createSession: async (data) => {
        const response = await axiosInstance.post("/sessions", data)
        return response.data;
    },
    getActiveSessions: async () => {
        const response = await axiosInstance.get("/sessions/active")
        return response.data;
    },
    getMyRecentSessions: async () => {
        const response = await axiosInstance.get("/sessions/my-recent")
        return response.data;
    },
    getSessionById: async (id) => {
        const response = await axiosInstance.get(`/sessions/${id}`)
        return response.data;
    },
    joinSession: async (id) => {
        const response = await axiosInstance.post(`/sessions/${id}/join`)
        return response.data;
    },
    endSession: async (id) => {
        const response = await axiosInstance.post(`/sessions/${id}/end`)
        return response.data;
    },
    getStreamToken: async () => {
        const response = await axiosInstance.get(`/chat/token`)
        return response.data;
    }
}

export default axiosInstance;