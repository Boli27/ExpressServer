import { request, response } from "express";
import User from "../models/User.js";

export const existToken = async (req =request, res = response, next)=>{

    const {token} = req.params;

    try {
        const existUser  = await User.findOne({token})

        if (!existUser){
            return res.status(200).json({ok:true, msg: "Usuario verificado"})
        }
        next();
    } catch (error) {
        console.error(error)
    }
}