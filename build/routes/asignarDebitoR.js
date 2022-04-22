"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asignarDebitoC_1 = __importDefault(require("../controllers/asignarDebitoC"));
class asignarDebitoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', asignarDebitoC_1.default.crearCuenta);
    }
}
const asignarDebitoRoute = new asignarDebitoRoutes();
exports.default = asignarDebitoRoute.router;
