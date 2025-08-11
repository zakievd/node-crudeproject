import { Request, Response } from "express";

import { HttpResponse } from "../utils/httpResponse";
import profileService from "../services/profile.service";

const { updateUser ,deleteUser} = profileService;
class ProfileController {
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const staffId = req.user?.id;
      const updatedData = req.body;

      const updatedProfile = await updateUser(staffId, updatedData);
      const respone: HttpResponse = {
        statusCode: 200,
        message: "Profile Updated Sucessfully",
        updatedProfile:updatedProfile.data,
      };
      res.status(200).send(respone);

    } catch (error: any) {
      res.status(400).send("Something went wrong");
    }
  }
async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const staffId = req.user?.id;


    await deleteUser(staffId);
      const respone: HttpResponse = {
        statusCode: 200,
        message: "Account deleted Sucessfully",
  
      };
      res.status(200).send(respone);

    } catch (error: any) {
      res.status(400).send("Something went wrong");
    }
  }
}

export default new ProfileController();
