import { Request, Response, Router } from "express";
import { z } from "zod";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../lib/generatetoken";

import { auth } from "../middleware/auth";
import { Content } from "../models/content.model";
import { Tag } from "../models/tag.model";

const router = Router();

export const signinAndSignupSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

export type signupSchemType = z.infer<typeof signinAndSignupSchema>;

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, password } = signinAndSignupSchema.parse(req.body);

    const user = await User.findOne({ username });

    if (user) {
      res.status(403).json({
        message: "user with this username already exist",
      });
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = generateAccessToken({ username });

    res.status(201).json({
      message: "User created successfully",
      user: { username },
      accesstoken: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
    console.log(error);
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { username, password } = signinAndSignupSchema.parse(req.body);

    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const isPasswordValid = user.password
      ? bcrypt.compareSync(password, user.password)
      : false;

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid password",
      });
      return;
    }

    const token = generateAccessToken({ username });

    res.status(200).json({
      message: "Signin successful",
      user: { username },
      accesstoken: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
});

const contentSchema = z.object({
  link: z.string().url(),
  type: z.enum(["image", "video", "article", "audio"]),
  title: z.string().min(1, "Title is required"),
  tags: z.array(z.string()).optional(),
});

router.post("/content", auth, async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { link, type, title, tags } = contentSchema.parse(req.body);

    const tagIds = await Promise.all(
      tags?.map(async (tag) => {
        const existingTag = await Tag.findOne({ title: tag });
        if (existingTag) {
          return existingTag._id;
        } else {
          const newTag = new Tag({ title: tag });
          await newTag.save();
          return newTag._id;
        }
      }) || []
    );

    const newContent = new Content({
      link,
      type,
      title,
      tags: tagIds,
      userId: _id,
    });

    await newContent.save();

    res.status(201).json({
      message: "Content created successfully",
      content: newContent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
});

router.delete("/content/delete", auth, async (req: Request, res: Response) => {
  try {
    const { content_id } = req.body;

  
    const content = await Content.findOneAndDelete({ _id: content_id, userId: req.user._id });

    if (!content) {
      res.status(403).json({
        message: "You are not authorized to delete this content",
      });
      return;
    }
    res.status(200).json({
      message: "deleted succesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
});

export default router;
