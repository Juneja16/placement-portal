import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    college: {
      type: String,
      required: true,
      trim: true,
    },
    batch: {
      type: String, // Used only For Filtering and acts as a Label Only Hence String
      required: true,
      index: true, //  for filtering
    },
    status: {
      type: String,
      enum: ["placed", "not_placed"],
      default: "not_placed",
    },
    scores: {
      dsa: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
      webd: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
      react: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
    },
  },
  { timestamps: true },
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
