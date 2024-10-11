import { request,response } from "express";
import Forum from "../models/Forum.js"
export const createForum = async(req=request, res = response)=>{
    const{name, description} = req.body;
    const forum = new Forum(req.body)
}