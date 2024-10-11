import Jwt from "jsonwebtoken";
import User from "../models/User.js";


export const validateJWT = async (req, res, next) => {
    const token = req.header("Authorization");

    if (token.startsWith("Bearer ")) {
        try {
            const { uid } = Jwt.verify(token, process.env.JWT_SECRET);

            //Leer el usuario correspodiente al uid
            const usuario = await User.findById(uid);

            //Verificar si el usuario existe
            if (!usuario) {
                return res.status(401).json({
                    msg: "Token no válido - usuario no existe en BD",
                });
            }

            //Verificar si el uid tiene estado true
            if (!usuario.verified) {
                return res.status(401).json({
                    msg: "Token no válido - estado:false",
                });
            }

            req.user = usuario;

            next();
        } catch (er) {

        }
    }
};