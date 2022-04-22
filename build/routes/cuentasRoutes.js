"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuentasControllers_1 = __importDefault(require("../controllers/cuentasControllers"));
class cuentasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listaF', cuentasControllers_1.default.listaFolioCredito);
        this.router.get('/:nombreUsuario', cuentasControllers_1.default.listar);
        this.router.get('/', cuentasControllers_1.default.obtenerUltimasCuenta);
        this.router.post('/', cuentasControllers_1.default.crearCuenta);
        this.router.get('/Score/:curp', cuentasControllers_1.default.obtenerScore);
    }
}
const cuentaRoutes = new cuentasRoutes();
exports.default = cuentaRoutes.router;
