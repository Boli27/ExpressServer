import { request, response } from "express";
import bcrypt from "bcrypt"
import User from "../models/User.js";
export const createUser = async(req= request,res=response)=>{

    const {name, email, password} = req.body

    const user = new User({name, email,password});

    try{
        user.password = bcrypt.hashSync(user.password,10);
        const newUser = await user.save();
        return res.status(201).json({
            ok: true,
            user: newUser,
            test: "sad"
        });
    }catch(e){

        console.error(e);
        return res.status(400).json({ok: flase, msg : "algo salio mal"})
    }

};

export const verifyUser = async (req =request, res = response)=>{

    const {token} = req.params;

    try {
        const user = await User.findOne({token})

        user.token = null;
        user.verified = true;

        await user.save();

        return res.status().json({ok:true, msg: "Usuario verificado"})
    } catch (error) {
        console.error(error)
    }

}