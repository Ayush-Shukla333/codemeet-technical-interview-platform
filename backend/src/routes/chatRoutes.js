import express from "express"
import { getStreamToken } from "../controllers/chatController.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/token", protectRoute, getStreamToken) //when user visits the chat page, we will call this endpoint to get the stream token for the user, which will be used to authenticate the user with stream chat and allow them to use the chat features.
export default router