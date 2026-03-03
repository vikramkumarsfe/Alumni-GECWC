import mongoose, { model, models, Schema } from "mongoose"

const AgendaSchema = new mongoose.Schema({
  time: { type: String, required: true },
  title: { type: String, required: true }
})

const EventSchema = new Schema({
  title : { 
    type: String, 
    required: true 
},
  bannerImage: { 
    type: String 
},
  category: { 
    type: String
},
  description: { 
    type: String, 
    required: true 
},

  date: { 
    type: Date, 
    required: true 
},
  startTime: { type: String },
  endTime: { type: String },

  venueName: { type: String },
  venueAddress: { type: String },

  organizerName: { type: String },

  capacity: { type: Number, default: 100 },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  agenda: [AgendaSchema],

  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed", "cancelled"],
    default: "upcoming"
  },

  isPublished: { type: Boolean, default: true }
}, { timestamps: true })

const EventModel = models.Event || model("Event", EventSchema)

export default EventModel
