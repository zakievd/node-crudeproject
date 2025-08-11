import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

export const checkPhoneNumberValid=(number:string)=>{
    if(number.length===10){
        return true
    }
return false
}

 export const comparePassword = async (
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);
  };

export const generateToken = (
  payload: object,
  secretKey: string,
  options?: jwt.SignOptions
): string => {
  const defaultOptions: jwt.SignOptions = {
    expiresIn: '24h', 
  
    algorithm: 'HS256', 
  };

  // Merge default options with provided options
  const finalOptions = { ...defaultOptions, ...options };

  return jwt.sign(payload, secretKey, finalOptions);
};
