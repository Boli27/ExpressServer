import dontenv from "dotenv"
import express from "express"
import dbConnect from "./config/dbConnect.js"
import router from "./routes/userRoutes.js"

dontenv.config()
await dbConnect();

const PORT = process.env.PORT || 4000;

const server = express();
server.use(express.json())
server.use(router)

server.use("/api/v1/users", router)

server.listen(PORT, ()=>{
    console.log(`Server corriendo en en el puerto ${PORT}`)
})