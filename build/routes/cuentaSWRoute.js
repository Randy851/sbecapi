"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuentaSW_1 = __importDefault(require("../controllers/cuentaSW"));
class cuentasSwitchRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get(':id', cuentaSW_1.default.cambiarStatusCuenta);
    }
}
const cuentasSwitchRoute = new cuentasSwitchRoutes();
exports.default = cuentasSwitchRoute.router;
