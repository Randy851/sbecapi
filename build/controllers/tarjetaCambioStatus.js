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
class tarjetaCambioStatusController {
    cambiarStatusTarjeta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCuenta } = req.params;
            const tarjetaActual = yield db_1.default.query(`
            select t.folio, t.fkStatusTarjeta
            from tarjetas t
            where t.folio = (select cuentas.fkFolioTarjeta 
                            from cuentas 
                            where cuentas.idCuenta = ?);`, [idCuenta]);
            let fkStatusTarjeta = (tarjetaActual[0].fkStatusTarjeta == 1) ? 2 : 1;
            const resActualiza = yield db_1.default.query('UPDATE tarjetas set fkStatusTarjeta = ? WHERE folio = ?', [fkStatusTarjeta, tarjetaActual[0].folio]);
            if (resActualiza.affectedRows == 1) {
                res.json({ mensaje: "Se ah actualizado correctamente" });
            }
            else {
                res.json({ mensaje: "Ah ocurrido un error" });
            }
        });
    }
}
const tarjetaCambioStatusControllers = new tarjetaCambioStatusController();
exports.default = tarjetaCambioStatusControllers;
