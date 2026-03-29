import { streamClient, videoClient } from "../lib/stream.js";
import Session from "../models/Session.js"


export async function createSession (req, res) {
    try {
        //create a session in the database with the user id of the creator and the title of the session, and return the session id as a response
        const {problem, difficulty} = req.body
        const userId = req.user._id
        const clerkId = req.user.clerkId

        if (!problem || !difficulty) {
            return res.status(400).json({ error: "Problem and difficulty are required" })
        }

        //generate a unique call id for stream video call, this will be used to create a video call room in stream and also to join the call later
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        //create the session in the database
        const session = await Session.create({
            problem,
            difficulty,
            host: userId,
            callId
        })

        //create stream video calling
        await videoClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: {problem, difficulty, sessionId: session._id.toString()},
            },
        });

        //chat messaging will be handled when the user joins the session, we will create a stream chat channel for the session and add the user to the channel when they join the session
        const channel = streamClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId]
        })

        await channel.create()
        res.status(201).json({session})
    }
    catch (error) {
        console.error("Error creating session:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getActiveSessions (_ , res) {
    try {
        const sessions = await Session.find({status: "active"})
        .populate("host", "name profileImage email clerkId")
        .sort({ createdAt:-1 })//descending order
        .limit(20);

        res.status(200).json({ sessions });
    } catch (error) {
        console.error("Error fetching active sessions:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getMyRecentSessions (req, res) {
    try {
        //get session where user is host or participant
        const userId = req.user._id
        const sessions = await Session.find({
            status:"completed",
            $or: [{host:userId}, {participant: userId}],
        })
        .sort({createdAt: -1})
        .limit(20);
        
        res.status(200).json({ sessions });
    } 
    catch (error) {
        console.error("Error fetching recent sessions:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getSessionById (req, res) {
    try {
        const {id} = req.params //used to get the session id from the url

        const session = await Session.findById(id)
        .populate("host", "name profileImage email clerkId")
        .populate("participant", "name profileImage email clerkId")

        if (!session) return res.status(404).json({message:"Session not found"})

        res.status(200).json({session})
    } catch (error) {
        console.error("Error fetching session by id:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export async function joinSession (req, res) {
  try {
    const {id} = req.params //session id from url
    const userId = req.user._id
    const clerkId = req.user.clerkId

    const session = await Session.findById(id)

    if (!session) return res.status(404).json({message:"Session not found"})
    
    //check if the session is already full
    if (session.participant) return res.status(400).json({message:"Session is already full"})
    session.participant = userId //here user is the participant who is joining the session, the host is already set when the session is created
    await session.save()

    const channel = streamClient.channel("messaging", session.callId)
    await channel.addMembers([clerkId]) //add the participant to the stream chat channel for the session

    res.status(200).json({session})
    
  } catch (error) {
    console.error("Error joining session:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function endSession (req, res) {
    try {
        const {id} = req.params //session id from url
        const userId = req.user._id

        const session =await Session.findById(id)
        if (!session) return res.status(404).json({message:"Session not found"})
        
        //only the host can end the session
        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({message:"Only the host can end the session"})
        }

        //check status completed
        if (session.status === "completed") {
            return res.status(400).json({message:"Session is already completed"})
        }

        session.status = "completed"
        await session.save()

        //delete the stream video call room and chat channel for the session
        await videoClient.video.call("default", session.callId).delete({hard:true})

        const channel = streamClient.channel("messaging", session.callId)
        await channel.delete()

        res.status(200).json({message:"Session ended successfully"})
    } 
    catch (error) {
        console.error("Error ending session:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

