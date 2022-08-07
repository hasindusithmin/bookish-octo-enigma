
import {serialize} from "cookie"

export default function handler(req,res){
    res.setHeader('Set-Cookie', serialize('token', '', {maxAge:1 }));
    res.redirect('/')
}