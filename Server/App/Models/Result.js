import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
      index: true,
    },
    resultStatus: {
      type: String,
      enum: ["PASS", "FAIL", "On Hold", "Didnt Attempt"],
      default: "On Hold",
    },
  },
  { timestamps: true },
);

//  Prevent duplicate allocation (VERY IMPORTANT)
// One student can have only One Interview Per Company For unique 
resultSchema.index({ studentId: 1, interviewId: 1 }, { unique: true });

const Result = mongoose.model("Result", resultSchema);
export default Result;
