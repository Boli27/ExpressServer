import dontenv from "dotenv"
import express from "express"
import dbConnect from "./config/dbConnect.js"
import userRouter from "./routes/userRoutes.js"
import authRouter from "./routes/authRoutes.js"

dontenv.config()
await dbConnect();

const PORT = process.env.PORT || 4000;

const server = express();
server.use(express.json())

server.use("/api/v1/users", userRouter);
server.use("/api/v1/auth", authRouter)

server.listen(PORT, ()=>{
    console.log(`Server corriendo en en el puerto ${PORT}`)
})