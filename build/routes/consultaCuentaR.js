"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultaCuenta_1 = __importDefault(require("../controllers/consultaCuenta"));
class consultarCuentaRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:numero', consultaCuenta_1.default.consultarExistencia);
        this.router.get('/consulta/:idCuenta', consultaCuenta_1.default.consultarDatosCredito);
        this.router.post('/', consultaCuenta_1.default.depositar);
    }
}
const consultarCuentaRoutes = new consultarCuentaRoute();
exports.default = consultarCuentaRoutes.router;
