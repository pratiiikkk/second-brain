"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const mongoose_1 = require("mongoose");
const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const contentSchema = new mongoose_1.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
});
exports.Content = (0, mongoose_1.model)("content", contentSchema);
