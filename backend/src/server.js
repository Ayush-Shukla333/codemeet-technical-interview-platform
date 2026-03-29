import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import cors from "cors";
import { serve } from "inngest/express"
import { inngest, functions } from "./lib/inngest.js"
import { clerkMiddleware} from "@clerk/express"
import { protectRoute } from './middleware/protectRoute.js';
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoute from "./routes/sessionRoute.js"

const app = express();

const _dirname = path.resolve();

//middlewares
app.use(express.json())

//credentials:true means server allows a browser to invlude cookies on requests to the API. This is needed for authentication and session management.
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}))

app.use(clerkMiddleware())  //this is going to add the user object to the request, so we can access it in the protected routes.

app.use("/api/inngest", serve({client: inngest, functions}))
app.use("/api/chat", chatRoutes)
app.use("/api/sessions", sessionRoute)

app.get("/health", (req, res) => {
    
    res.status(200).json({ msg: "api is up and running" })
})


//when you pass an array of middleware to express, it will execute them in order. So in this case, when a request comes to the /video-calls endpoint, it will first execute the requireAuth middleware, which checks if the user is authenticated. If the user is authenticated, it will then execute the next middleware in the array, which is the async function that checks if the user exists in the database and adds the user object to the request.

app.get("/video-calls", protectRoute, (req, res) => {  //protectRoute is going to check in the background if the user is authenticated or not
    res.status(200).json({ msg: "this is a protected route" })
})

//make ready for deployment
if (ENV.NODE_ENV === "production") { 
    app.use(express.static(path.join(_dirname, "../frontend/dist")))
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(_dirname, "../frontend/dist/index.html"))
    })
}



const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log("server is running on port:", ENV.PORT)
        })
    }
    catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();