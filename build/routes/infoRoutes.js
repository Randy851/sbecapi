"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const infoController_1 = __importDefault(require("../controllers/infoController"));
class infoRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:nombreUsuario', infoController_1.default.consultaInfo);
    }
}
const infoRoutes = new infoRoute();
exports.default = infoRoutes.router;
