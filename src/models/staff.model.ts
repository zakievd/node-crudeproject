import mongoose, { Document, Schema, Types } from "mongoose";

// Define the Staff interface
export interface IStaff extends Document {
  name: string;
  email: string;
  phone: number;
  password: string;
  roleId: string;
  AccountType: string;
  department: Types.ObjectId;
}

const StaffSchema: Schema = new Schema<IStaff>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model<IStaff>("Staff", StaffSchema);
export default Staff;
