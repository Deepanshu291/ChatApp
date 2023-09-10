import { Schema, model } from "mongoose"
import bcrypt from 'bcryptjs'
import { IUser, IUserModal } from "../../@types/user.model";

// Declare the Schema of the Mongo model
var userSchema = new Schema<IUserModal>({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    isAvatar:{
        type:Boolean,
        default:false
    },
    isLogin:{
        type:Boolean,
        default:false
    },
    AvatarPic:{
        type:String,
        default: "https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg"
    }
},{
    timestamps:true
});

userSchema.methods.matchPassword = async function (enterPassword:string):Promise<boolean> {
    return await bcrypt.compare(enterPassword, this.password)
}

userSchema.pre("save",async function(next) {
    if (!this.password) {
        next()
    }
    const salt =await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
//Export the model
export const UserModel = model<IUserModal>('User', userSchema);

var user:IUserModal