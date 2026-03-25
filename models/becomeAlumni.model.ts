import mongoose, { model, models, Schema } from "mongoose";

const BecomeAlumniSchema = new Schema({
    student : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    status : {
        type: String,
        enum: ["pending", "approved","reject"],
        default : "pending"
    },
    rejectionReason: {
        type: String,
        default: null
    }
},{timestamps : true})

const BecomeAlumniModel = models.BecomeAlumni || model("BecomeAlumni",BecomeAlumniSchema)

export default BecomeAlumniModel