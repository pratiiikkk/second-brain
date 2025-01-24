import jwt from "jsonwebtoken";

interface TokenPayload {
  username: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  const secretKey: string = process.env.SECRET || "";
  const options: jwt.SignOptions = { expiresIn: "1d" };

  return jwt.sign(payload, secretKey, options);
};
