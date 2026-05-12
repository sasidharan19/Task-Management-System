"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../config/prisma");
const seedAdmin = async () => {
    try {
        const existingAdmin = await prisma_1.prisma.user.findUnique({
            where: {
                email: "admin@test.com",
            },
        });
        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash("123456", 10);
        await prisma_1.prisma.user.create({
            data: {
                name: "Admin",
                email: "admin@test.com",
                password: hashedPassword,
                role: "ADMIN",
            },
        });
        console.log("Admin created");
    }
    catch (error) {
        console.log(error);
    }
};
exports.seedAdmin = seedAdmin;
