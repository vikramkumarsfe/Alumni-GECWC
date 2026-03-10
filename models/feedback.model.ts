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
    message : {
        type: String,
        required : true
    },
    category : {
        required : true,
        type : String
    },
    staus : {
        type : String,
        enum : ["pending", "reviewed", "resolved"],
        default : "pending"
    }
}, { timestamps : true})

const FeedbackModal =  models.Feedback || model("Feedback",FeedbackSchema)

export default FeedbackModal