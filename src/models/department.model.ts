import { Schema, model, Document } from "mongoose";
// if we defined the schema in the interface and then hydaret here is correct
export interface IDepartment extends Document {
  name: string;
  description?: string;
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String }
  },
  { timestamps: true }
);

export default model<IDepartment>("Department", departmentSchema);
