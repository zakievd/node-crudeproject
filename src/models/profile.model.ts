import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProfile extends Document {
  staff: Types.ObjectId; // Reference back to Staff
  avatar?: string;
  bio?: string;
}

const ProfileSchema: Schema = new Schema<IProfile>(
  {
    staff: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
      unique: true,
    },
    avatar: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);
export default Profile;
