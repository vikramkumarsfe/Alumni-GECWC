import { model, models, Schema } from "mongoose";

const AnnouncementsSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    newAnnouncement : {
        type : Boolean,
        default : false
    },
    description : {
        type : String,
        required : true
    }
},{ timestamps : true})

const AnnouncementsModel = models.Announcements || model("Announcements", AnnouncementsSchema)

export default AnnouncementsModel