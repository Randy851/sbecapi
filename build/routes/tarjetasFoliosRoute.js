"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tarjetaFolio_1 = __importDefault(require("../controllers/tarjetaFolio"));
class tarjetaFolioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', tarjetaFolio_1.default.tarjetasNuevas);
    }
}
const tarjetaFolioRoute = new tarjetaFolioRoutes();
exports.default = tarjetaFolioRoute.router;
