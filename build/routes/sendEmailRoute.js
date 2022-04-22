"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sendEmail_1 = __importDefault(require("../controllers/sendEmail"));
class correoRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/codigo', sendEmail_1.default.enviarCodigo);
        this.router.post('/deposito', sendEmail_1.default.enviarInfoDeposito);
        this.router.post('/transferencia', sendEmail_1.default.enviarCorreoTransferencia);
        this.router.post('/error', sendEmail_1.default.enviarCorreoTransferencia);
    }
}
const correoRoutes = new correoRoute();
exports.default = correoRoutes.router;
