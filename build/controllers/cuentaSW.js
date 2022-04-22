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
class cuentaSwitchController {
    cambiarStatusCuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            // let query = 
            //     `UPDATE cuentas
            //     SET fkStatusCuenta = 1
            //     WHERE idCuenta = 4 || idCuenta = 1;`
            const revisaStatus = yield db_1.default.query(`
            select *
            from cuentas c
            where c.idCuenta = ?;`, [id]);
            //const statusCambio = revisaStatus.fkStatusCuenta;
            // const actualizacion = await db.query(`
            //     SELECT * 
            //     FROM usuarios
            //     inner join roles
            //     on usuarios.fkRoles = roles.idRol
            //     inner join statusUsuario
            //     on usuarios.fkStatus = statusUsuario.idStatusUsuario
            //     where fkRoles != 3;
            // `);
            res.json({ mensaje: { revisaStatus } });
        });
    }
}
const cuentaSwitchControllers = new cuentaSwitchController();
exports.default = cuentaSwitchControllers;
