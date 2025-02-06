import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Define the payload structure of the JWT
interface JwtPayload {
  userId: string;
}

//The below redefines the Request type to include the userId property. I am not sure if this is the best way to do this
declare global {
  namespace Express {
    interface Request {
      userId?: string | JwtPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from 'Bearer token'

  if (!token) {
    return res.status(401).send("User not authenticated");
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key") as JwtPayload;
    req.userId = "sample-user-id"; // Assign the userId to the request object
    next();
  } catch (err) {
    return res.status(401).send("Invalid or expired token");
  }
};
