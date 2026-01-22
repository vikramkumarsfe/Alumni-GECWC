import { Schema, model, models } from "mongoose";

const AcademicSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    degreeName: {
      type: String,
      required: true,
      trim: true
    },
    universityName: {
      type: String,
      required: true,
      trim: true
    },
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    completionYear: {
      type: Number,
      required: true,
      min: 1950,
      max: new Date().getFullYear()
    }
  },
  { timestamps: true }
)

const AcademicModel = models.Academic || model("Academic", AcademicSchema)

export default AcademicModel;
