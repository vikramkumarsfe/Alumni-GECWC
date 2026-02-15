import { models } from "mongoose";
import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"
const UserSchema = new Schema({
    image : {
        type : String,
        default : null
    },
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
    role : {
        type: String,
        enum: ["admin", "alumni", "student"],
        default : null
    },
    resetPasswordToken : {
        type: String,
        default : null
    },
    expiryResetLink : {
        type : String,
        default : null
    },
    isActive : {
        type : Boolean,
        default : false
    }

},{timestamps :  true})

UserSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 12)
})


UserSchema.pre("save", async function(next){
    this.role = "alumni"
})

UserSchema.pre("save", async function (next){
    this.isActive = false
})

const UserModel = models.User || model("User", UserSchema)

export default UserModel