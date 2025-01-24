import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";


export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(403).json({
        message: "unauthorized",
      });
      return;
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, process.env.SECRET || "", async (err, payload) => {
      if (err) {
        res.status(403).json({
          message: "unauthorized",
        });
        return;
      }

      const { username } = payload as jwt.JwtPayload;
      const userdata = await User.findOne({ username });

      req.user = userdata;
      next();
    });
  } catch (error) {
    res.status(500)
    console.log(error)
  }
};
