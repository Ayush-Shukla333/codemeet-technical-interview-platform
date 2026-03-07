import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';

const app = express();

const _dirname = path.resolve();

app.get("/health", (req, res) => {
    res.status(200).json({ msg: "api is up and running" })
})

app.get("/books", (req, res) => {
    res.status(200).json({ msg: "this is the books endpoint" })
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