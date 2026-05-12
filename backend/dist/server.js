"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const seedAdmin_1 = require("./utils/seedAdmin");
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await (0, seedAdmin_1.seedAdmin)();
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startServer();
