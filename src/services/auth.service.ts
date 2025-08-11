
import Staff from "../models/staff.model";
import { comparePassword, generateToken } from "../utils";
import bcrypt from "bcryptjs"
class AuthService {
  //SECTION: Method to create a new staff
  loginUser = async (
    phone: string,
    password: string
  ): Promise<{ staff: any; token: string }> => {
    try {
      // Step 1: Get staff based on the user name
      const staff = await Staff.findOne({ phone }).lean();

      if (!staff) {
        throw new Error("Record not Found  for this Staff");
      }

      // Step 2: Compare the password with the hashed password
      const isPasswordValid = await comparePassword(password, staff.password);
      if (!isPasswordValid) {
        throw new Error("Credentail is not Valid");
      }

      // Step 3: Generate a JWT token
      const tokenString = generateToken(
        {
          _id: staff._id,
          role: staff.roleId,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "24h" }
      );

      // Step 4: Generate expiry time using the utility function

      // Step 5: Return staff details and token
      return { staff, token: tokenString };
    } catch (error: any) {
      throw new Error(`Login failed: ${error.message}`);
    }
  };
 registerUser = async (
  phone: string,
  password: string,
  name: string,
  email: string,
  department: string
) => {
  // 1. Check if staff already exists
  const staffExists = await Staff.findOne({
    $or: [{ phone }, { email }]
  }).lean();

  if (staffExists) {
    throw new Error("User already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create new staff
  const newStaff = await Staff.create({
    phone,
    password: hashedPassword,
    name,
    email,
    department
  });

  // 4. Return newly created staff
  return newStaff;
};
}

export default new AuthService();
