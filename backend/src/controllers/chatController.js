import { streamClient } from "../lib/stream.js"
//here we created a token for stream and send this as a response
 export async function getStreamToken(req, res) {
    try {
        const token = streamClient.createToken(req.user.clerkId) //clerkId is the unique identifier for the user in clerk, we are using it as the user id in stream chat.
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image
        })
    }
    catch (error) {
        console.log("Error generating stream token:", error.message)
        res.status(500).json({ error: "Failed to generate stream token" })

    }
}