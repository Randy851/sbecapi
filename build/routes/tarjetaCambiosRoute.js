"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tarjetaCambioStatus_1 = __importDefault(require("../controllers/tarjetaCambioStatus"));
class tarjetaCambioStatusRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:idCuenta', tarjetaCambioStatus_1.default.cambiarStatusTarjeta);
    }
}
const tarjetaCambioStatusRoute = new tarjetaCambioStatusRoutes();
exports.default = tarjetaCambioStatusRoute.router;
