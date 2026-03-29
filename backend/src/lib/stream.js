import {StreamChat} from 'stream-chat'
import { ENV } from "./env.js";
import { StreamVideoClient } from '@stream-io/video-client'

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if (!apiKey || !apiSecret) {
    console.log("STREAM API_KEY and STREAM_API_SECRET are required. Please set them in the environment variables.")
}

export const streamClient = StreamChat.getInstance(apiKey, apiSecret);  //These are required to confirm the interaction with the exact same application. will be used for chat features
export const videoClient = new StreamVideoClient(apiKey, apiSecret); // used for video calls


//take user from clerk and sync with stream chat, this is for the user created event in inngest function
export const upsertStreamUser = async (userData) => {   //upsert means update or insert, if the user already exists it will update the user data, if not it will create a new user
    try {
        await streamClient.upsertUser(userData);
        console.log("User upserted to Stream Chat:", userData)
    } catch (error) {
        console.error("Error upserting user to Stream Chat:", error);
    }
}

//take user from clerk and delete from stream chat, this is for the user deleted event in inngest function
export const deleteStreamUser = async (userId) => {   //upsert means update or insert, if the user already exists it will update the user data, if not it will create a new user
    try {
        await streamClient.deleteUser(userId)
        console.log("User deleted from Stream Chat:", userId)
    } catch (error) {
        console.error("Error deleting user from Stream Chat:", error)
    }
};