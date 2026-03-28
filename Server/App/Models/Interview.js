import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
      index: true, //  for searching/filtering
    },
    date: {
      type: Date,
      required: true,
      index: true, //  for date queries
    },
  },
  { timestamps: true },
);

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
