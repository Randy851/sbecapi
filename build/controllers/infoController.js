"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class infoController {
    consultaInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombreUsuario } = req.params;
            const domP = yield db_1.default.query(`
            SELECT d.*
            FROM domicilio d
            INNER JOIN informacionpersonal i
            ON d.idDomicilio = i.fkDomicilio
            INNER JOIN usuarios u
            on i.idInformacionPersonal = u.fkInformacionPersonal
            where u.nombreUsuario = ?`, [nombreUsuario]);
            const infoP = yield db_1.default.query(`
            SELECT i.*
            FROM informacionpersonal i
            INNER JOIN usuarios u
            on i.idInformacionPersonal = u.fkInformacionPersonal
            where u.nombreUsuario = ?`, [nombreUsuario]);
            if (infoP.length > 0 && domP.length > 0) {
                let respuesta = { informacionPersonal: infoP, domicilio: domP };
                return res.json(respuesta);
            }
            res.status(404).json({ text: "informacion no encontrada :c" });
        });
    }
}
const infoControllers = new infoController();
exports.default = infoControllers;
