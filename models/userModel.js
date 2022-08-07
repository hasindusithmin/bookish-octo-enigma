
import {Schema,model} from "mongoose"

import bcrypt from "bcrypt";
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
        required:true,
        minlength:8
    }
})

userSchema.pre('save',async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

const userModel = model('employee',userSchema)

export default userModel;