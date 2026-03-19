import mongoose, { model, models, Schema } from "mongoose";

const MentorshipSchema = new Schema({
    sender : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    receiver : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    status : {
        type : String,
        enum : [ "pending", "running", "completed", "rejected"],
        default : "pending"
    },
    startTime : {
        type : Date,
        default : null
    },
    endTime : {
        type : Date,
        default : null
    },
    session : [{
        type : Date,
    }]
},{ timestamps : true})

const MentorshipModel = models.Mentorship || model("Mentorship", MentorshipSchema)

export default MentorshipModel