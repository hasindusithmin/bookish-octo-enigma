import connectMongo from "../../utils/connectMongo";
import userModel from "../../models/userModel";
import CryptoJS from "crypto-js";
import {serialize} from "cookie"
export default async function handler(req,res){
    await connectMongo()
    const {name,email,password,nic,post,contact} = req.body;
    try {
        const user = await userModel.create({name,email,password,nic,post,contact})
        const token = CryptoJS.AES.encrypt(user._id.toString(), process.env.JWT_SECRET).toString()
        res.setHeader('Set-Cookie', serialize('token', token, { httpOnly:true,maxAge:3600 }));
        res.status(200).json({user:user._id})
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}