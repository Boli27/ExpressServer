import { request, response } from "express";
import bcrypt from "bcrypt"
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createUser = async(req= request,res=response)=>{

    const {name, email, password} = req.body

    const user = new User({name, email,password});

    try{
        user.password = bcrypt.hashSync(user.password,10);
        const newUser = await user.save();
        await sendEmail(email, name, newUser.token, 'Cuenta Creada', 'Cuenta Creada')
        return res.status(201).json({
            ok: true,
            user: newUser
        });
    }catch(e){

        console.error(e);
        return res.status(400).json({ok: false, msg : "algo salio mal"})
    }

};

export const verifyUser = async (req = request, res = response) => {
    const { token } = req.params;

    try {

        const user = await User.findOne({ token })

        user.token = null;
        user.verified = true;

        await user.save();

        return res.status(200).json({ok: true, msg: "User verified succesfully"})

    } catch (error) {
        console.error(error)
    }

}