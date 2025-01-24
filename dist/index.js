"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
require('dotenv').config();
const app = (0, express_1.default)();
(0, db_1.dbConnect)().then(() => {
    app.listen(3000, function () {
        console.log("server is started ");
    });
}).catch((e) => {
    console.log("db connection failed", e.message);
});
app.use(express_1.default.json());
app.use("/api/v1", userRoutes_1.default);
