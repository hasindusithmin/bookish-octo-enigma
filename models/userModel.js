
import {Schema,model} from "mongoose"

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = model('Client',userSchema)

export default userModel;