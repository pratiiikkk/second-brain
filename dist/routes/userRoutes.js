"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "username is required"),
    password: zod_1.z.string()
        .min(6, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters long")
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = exports.signupSchema.parse(req.body);
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        const newUser = new user_model_1.User({ username, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error"
        });
    }
}));
router.get("/signin", (req, res) => {
});
exports.default = router;
