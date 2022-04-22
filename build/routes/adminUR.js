"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminUC_1 = __importDefault(require("../controllers/adminUC"));
class adminUsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminUC_1.default.listar);
    }
}
const adminUsuariosRoute = new adminUsuariosRoutes();
exports.default = adminUsuariosRoute.router;
