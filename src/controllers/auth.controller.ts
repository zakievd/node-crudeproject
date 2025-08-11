import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { checkPhoneNumberValid } from "../utils";
const { loginUser, registerUser } = AuthService;
import { HttpResponse } from "../utils/httpResponse";
class AuthController {
  async loginUser(
    req: Request,
    res: Response
  ): Promise<Response<HttpResponse>> {
    try {
      const { phone, password } = req.body;

      if (!phone || !password) {
        const missingField = !phone ? "phone" : "Password";
        const errorResponse: HttpResponse = {
          statusCode: 400,
          message: `${missingField} is required`,
        };
        return res.status(400).json(errorResponse);
      }
      if (!checkPhoneNumberValid(phone)) {
        return res.status(400).json("Phone Number is not Valid");
      }

      // Call the service to create a new user
      const { staff, token } = await loginUser(phone, password);

      const result = {
        _id: staff._id,
        name: staff.name ?? null,
        email: staff.email ?? null,
        phone: staff.phone ?? null,
      };

      const successResponse: HttpResponse = {
        statusCode: 200,
        message: "Login Sucessfully",
        auth: token,
        data: result,
      };
      return res.status(200).json(successResponse);
    } catch (error: any) {
      const errorMessage = error.message ?? "Some thing went wrong";
      const errorResponse: HttpResponse = {
        statusCode: 400,
        message: errorMessage,
      };
      return res.status(400).json(errorResponse);
    }
  }
  async registerUser(
    req: Request,
    res: Response
  ): Promise<Response<HttpResponse>> {
    try {
      const { phone, password, name, email, department } = req.body;

      if (!phone || !password || !name || !email || !department) {
        return res.status(400).json("Credential is not Valid");
      }
      if (!checkPhoneNumberValid(phone)) {
        return res.status(400).json("Phone Number is not Valid");
      }

      // Call the service to create a new user
      const data = await registerUser(phone, password, name, email, department);

      const result = {
        data,
      };

      const successResponse: HttpResponse = {
        statusCode: 200,
        message: "Login Sucessfully",

        data: result,
      };
      return res.status(200).json(successResponse);
    } catch (error: any) {
      const errorMessage = error.message ?? "Some thing went wrong";
      const errorResponse: HttpResponse = {
        statusCode: 400,
        message: errorMessage,
      };
      return res.status(400).json(errorResponse);
    }
  }
}

export default new AuthController();
