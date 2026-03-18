import { Schema, model, models } from "mongoose";


const ExperienceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    designation: {
      type: String,
      required: true,
      trim: true
    },
    starting: {
      type: Number,
      min: 0,
      max: 100
    },
    completion: {
      type: Number,
      required: true,
      min: 1950,
      max: new Date().getFullYear()
    },
    description : {
        type : String,
        default : null,
        trim : true
    }
  },
  { timestamps: true }
)


const ExperienceModel = models.Experience || model("Experience", ExperienceSchema)


export default ExperienceModel;
