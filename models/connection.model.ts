import mongoose, { model, models, Schema } from "mongoose";

const ConnectionSchema = new Schema({
    sender : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    receiver : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    status : {
        type : String,
        enum : ["pending", "approved", "rejected"],
        default : "pending"
    },
    lastMessage : {
        type : String,
        default : null
    }
},{ timestamps : true})

//for the removing the duplicates
ConnectionSchema.index(
  { sender: 1, receiver: 1 },
  { unique: true }
)

const ConnectionModel = models.Connection || model('Connection', ConnectionSchema)

export default ConnectionModel