"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tarjetaC_1 = __importDefault(require("../controllers/tarjetaC"));
class tarjetaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:idCuenta', tarjetaC_1.default.tarjetasNuevas);
    }
}
const tarjetaRoute = new tarjetaRoutes();
exports.default = tarjetaRoute.router;
