
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

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth) return user
        throw Error("Incorrect Password")
    }
    throw Error("User not found")
}

const userModel = model('employee',userSchema)

export default userModel;