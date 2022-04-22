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
class loginController {
    validarLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombreUsuario } = req.params;
            const usuario = yield db_1.default.query(`SELECT u.nombreUsuario, u.contrasena, r.nombreRol, s.nombreStatus
            FROM usuarios u
            inner join roles r
            ON u.fkRoles = r.idRol
            inner join statususuario s
            ON u.fkStatus = s.idStatusUsuario
            where nombreUsuario = ?`, [nombreUsuario]);
            console.log(usuario);
            if (usuario.length > 0) {
                if (usuario[0].nombreRol == "cliente") {
                    const cuenta = yield db_1.default.query(`SELECT s.nombreStatus
                    FROM cuentas c
                    inner join usuarios u
                    ON c.fkUsuario = u.nombreUsuario
                    inner join statuscuentas s
                    on s.idStatusCuenta = c.fkStatusCuenta
                    where nombreUsuario = ?`, [nombreUsuario]);
                    if (cuenta.length > 0) {
                        return res.json(usuario[0]);
                    }
                    else {
                        return res.json({ estado: "inactivo" });
                    }
                }
                else if (usuario[0].nombreRol == "administrador" || usuario[0].nombreRol == "ejecutivo" || usuario[0].nombreRol == "cajero") {
                    return res.json(usuario[0]);
                }
            }
            res.status(404).json({ text: "usuario no encontrado o tu cuenta esta inactiva" });
        });
    }
}
const loginControllers = new loginController();
exports.default = loginControllers;
