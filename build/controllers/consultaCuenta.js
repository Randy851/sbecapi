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
class consultaCuentaController {
    consultarExistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numero } = req.params;
            let longitud = numero.toString().length;
            let encontrada;
            let query = `select i.nombres, i.apellidoPaterno, i.apellidoMaterno, c.idCuenta, c.saldo, c.cuentaBancaria
        from cuentas c
        INNER JOIN usuarios u
        ON c.fkUsuario = u.nombreUsuario
        INNER JOIN informacionpersonal i
        ON u.fkInformacionPersonal = i.idInformacionPersonal `;
            let queryClabeI = `where clabeInterbancaria = ?`;
            let queryCuentaBancaria = `where cuentaBancaria = ?`;
            let queryNumTarjeta = `where fkFolioTarjeta = (
            select folio
            from tarjetas 
            where numeroTarjeta = ?
        );`;
            encontrada = (longitud == 18 || longitud == 11 || longitud == 16) ? true : false;
            query += (longitud == 18) ? queryClabeI : (longitud == 16) ? queryNumTarjeta : (longitud == 11) ? queryCuentaBancaria : ``;
            if (encontrada) {
                const resultCuenta = yield db_1.default.query(query, numero);
                console.log(resultCuenta);
                if (resultCuenta.length < 1) {
                    res.status(404).json({ text: "Cuenta no encontrada" });
                }
                else {
                    res.json(resultCuenta);
                }
            }
            else {
                res.status(404).json({ text: "Cuenta no encontrada" });
            }
        });
    }
    depositar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let datosMovimiento = req.body;
            let resultDeposito = yield db_1.default.query('call SP_Deposito( ?, ?, ?);', [datosMovimiento.numeroCta, datosMovimiento.cantidad, datosMovimiento.referencia]);
            res.json([{
                    exito: resultDeposito[0][0].exito,
                    fechaMovimiento: resultDeposito[0][0].fechaMovimiento,
                    //resultDeposito
                }]);
        });
    }
    consultarDatosCredito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCuenta } = req.params;
            let resultConsulta = yield db_1.default.query('call SP_consultarCuentaCredito(?);', [idCuenta]);
            res.json(resultConsulta);
        });
    }
}
const consultaCuentaControllers = new consultaCuentaController();
exports.default = consultaCuentaControllers;
