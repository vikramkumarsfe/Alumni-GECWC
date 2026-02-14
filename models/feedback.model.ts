import { model, models, Schema } from "mongoose";

const FeedbackSchema = new Schema({
    fullname  :{
        type: String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    role : {
        enum : [ "student", "admin", "alumni"],
        default : "student"
    },
    message : {
        type: String,
        required : true
    },
    category : {
        required : true,
        type : String
    }
}, { timestamps : true})

const FeedbackModal =  models.Feedback || model("Feedback",FeedbackSchema)

export default FeedbackModal