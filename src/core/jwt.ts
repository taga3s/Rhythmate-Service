import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (userId: string, name: string) => {
  const payload = {
    userId: userId,
    name: name,
  };
  const secret = process.env.SECRET ?? "";
  const token = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: "72h" });

  return token;
};

export const verifyToken = (token: string) => {
  const secret = process.env.SECRET ?? "";
  return jwt.verify(token, secret);
};

export const getUserIdFromToken = (token: string): string => {
  const { userId } = verifyToken(token) as JwtPayload;
  return userId;
};