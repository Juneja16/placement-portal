import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, //  hide password in queries i.e It cant be fetched From Database unless explicitly mentioned
    },
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
