"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuentaCambioStatus_1 = __importDefault(require("../controllers/cuentaCambioStatus"));
class cuentasCambioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', cuentaCambioStatus_1.default.cambiarStatusCuenta);
    }
}
const cuentasCambioRoute = new cuentasCambioRoutes();
exports.default = cuentasCambioRoute.router;
