import { request, response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import  generarJWT  from "../utils/generateJWT.js";
export const login = async (req = request, res = response)=>{
    const {email, password}=req.body;

    try{
        const user = await User.findOne({email})

        if (!user){
            return res.status(404).json({ok: false, msg: "cuenta no registrada: " + email})
        }
        if(!user.verified){
            return res.status(401).json({ok: false, msg: "Verifica tu cuenta"})
        }

        if(!bcrypt.compareSync(password, user.password)){
            return res.status(401).json({ok: false, msg: "Contraseña no coincide"})

        }

        return res.status(200).json({logeado:"ok", user, jwt: generarJWT(user._id)});
    }catch(error){
        console.error(error)
    }
}