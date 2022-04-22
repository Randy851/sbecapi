"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ejecutivoUC_1 = __importDefault(require("../controllers/ejecutivoUC"));
class ejecutivoUsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', ejecutivoUC_1.default.listar);
    }
}
const ejecutivoUsuariosRoute = new ejecutivoUsuariosRoutes();
exports.default = ejecutivoUsuariosRoute.router;
