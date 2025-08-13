import { Request, Response } from "express";
import { HttpResponse } from "../utils/httpResponse";
import Staff from "../models/staff.model";
import Profile from "../models/profile.model";

class ProfileController {
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const staffId = req.user?.id;
      if (!staffId) {
        res.status(401).send({ message: "Unauthorized" });
        return;
      }

      const { name, email, phone, department, avatar, bio } = req.body;

      // 1️⃣ Update Staff document
      const updatedStaff = await Staff.findByIdAndUpdate(
        staffId,
        { name, email, phone, department },
        { new: true }
      );

      if (!updatedStaff) {
        res.status(404).send({ message: "Staff not found" });
        return;
      }

      // 2️⃣ Update or create Profile document
      if (avatar || bio) {
        await Profile.findOneAndUpdate(
          { staff: staffId },
          { avatar, bio },
          { upsert: true, new: true }
        );
      }

 
      const populatedStaff = await Staff.findById(staffId)
        .populate("profile")
        .populate("department");

      const response: HttpResponse = {
        statusCode: 200,
        message: "Profile updated successfully",
        data: populatedStaff,
      };

      res.status(200).send(response);
    } catch (error: any) {
      console.error("Update Profile Error:", error);
      res.status(400).send({ message: "Something went wrong", error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const staffId = req.user?.id;
      if (!staffId) {
        res.status(401).send({ message: "Unauthorized" });
        return;
      }

      // Delete profile first
      await Profile.findOneAndDelete({ staff: staffId });

      // Delete staff
      await Staff.findByIdAndDelete(staffId);

      const response: HttpResponse = {
        statusCode: 200,
        message: "Account deleted successfully",
      };
      res.status(200).send(response);
    } catch (error: any) {
      console.error("Delete User Error:", error);
      res.status(400).send({ message: "Something went wrong", error: error.message });
    }
  }
}

export default new ProfileController();
