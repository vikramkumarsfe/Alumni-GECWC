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
        type: Date,
        default : null
    },
    isActive : {
        type: String,
        enum: ["inactive", "active", "pending"],
        default : "pending"
    }, 
    batch  :{
        type : Number,
        required : true
    },
    branch : {
        type : String,
        required : true
    },
    regNo : {
        type : String,
        required : true
    },
    address : {
        street : {
            type : String,
            default : null
        },
        city : {
            type : String,
            default : null
        },
        state : {
            type : String,
            default : null
        },
        country : {
            type : String,
            default : null
        },
        pincode : {
            type : String,
            default : null
        }
    },
    profile : {
        bio : {
            type : String,
            default : "Welcome to Bio."
        },
        skills:{
            type:[String],
            default:[]
        },
        headline : {
            type : String,
            default : "I am a GECWC family."
        }
    },
    socialLinks : {
        linkedIn : String,
        github : String,
        twitter : String
    }
},{timestamps :  true})

UserSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 12)
})

UserSchema.pre("save", function(next){
    if(this.role === "admin"){
        return new Error("Admin role cannot be assigned during registration")
    }
})

const UserModel = models.User || model("User", UserSchema)

export default UserModel