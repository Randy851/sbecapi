"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movimientosController_1 = __importDefault(require("../controllers/movimientosController"));
class movimientoRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/obtenerT', movimientosController_1.default.obtenerTarjeta);
        this.router.post('/obtenerM', movimientosController_1.default.obtenerMovimineto);
        /*   this.router.post('/obtenerMSA',movimientoControllers.obtenerMoviminetosemaActual); */
        this.router.post('/obtenerFM', movimientosController_1.default.obtenerMovimientoFecha);
        this.router.post('/obtenerCD', movimientosController_1.default.obtenerCuentaDetalle);
        this.router.post('/sumameses', movimientosController_1.default.sumafecha);
    }
}
const movimientoRoutes = new movimientoRoute();
exports.default = movimientoRoutes.router;
