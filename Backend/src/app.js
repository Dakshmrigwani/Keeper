import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true
    
}))
app.use(express.json({limit: "1024kb"}))
app.use(express.static("public"))
app.use(cookieParser())
 
import notesRouter from "./routes/notes.routes.js"
import reminderRouter from "./routes/reminder.routes.js"
import archieveRouter from "./routes/archieve.routes.js"
import userRouter from "./routes/user.routes.js"
import trashRouter from "./routes/trash.routes.js"
import editRouter from "./routes/edit.routes.js"



app.use("/api/v1/Note", notesRouter)
app.use("/api/v1/Reminder", reminderRouter)
app.use("/api/v1/Archieve", archieveRouter)
app.use("/api/v1/trash", trashRouter)
app.use("/api/v1/Edit", editRouter)
app.use("/api/v1/User", userRouter)

export { app }; 
