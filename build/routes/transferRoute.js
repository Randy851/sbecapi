"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transferController_1 = __importDefault(require("../controllers/transferController"));
class transferClass {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/buscar/:numero', transferController_1.default.consultarExistencia);
        this.router.get('/cuentas/:client', transferController_1.default.getuserAccounts);
        this.router.post('/transferir', transferController_1.default.transferir);
    }
}
const transferRoute = new transferClass();
exports.default = transferRoute.router;
