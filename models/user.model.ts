import { models } from "mongoose";
import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"
const UserSchema = new Schema({
    fullname : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required  : true
    },
    resetPasswordToken : {
        type: String,
        default : null
    },
    expiryResetLink : {
        type : String,
        default : null
    }

},{timestamps :  true})

UserSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 12)
})

const UserModel =models.User || model("User", UserSchema)

export default UserModel