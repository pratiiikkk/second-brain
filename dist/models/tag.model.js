"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const mongoose_1 = require("mongoose");
const tagSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
    },
});
exports.Tag = (0, mongoose_1.model)("tag", tagSchema);
