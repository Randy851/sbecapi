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
const sendEmail_1 = __importDefault(require("./sendEmail"));
const db_1 = __importDefault(require("../db"));
class transferController {
    getuserAccounts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { client } = req.params;
            const accounts = yield db_1.default.query(`call SP_buscarCuentasActivasCliente(?)`, client);
            res.json(accounts);
        });
    }
    consultarExistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numero } = req.params;
            let longitud = numero.toString().length;
            let queryClabeI = `call SP_BuscarCuentaPorCLABE(?);`;
            let queryCuentaBancaria = `call SP_BuscarCuentaPorCuenta(?);`;
            let aceptada = (longitud === 18 || longitud === 11) ? true : false;
            if (aceptada) {
                if (longitud == 18) {
                    const resultCuenta = yield db_1.default.query(queryClabeI, numero);
                    res.json(resultCuenta);
                }
                else if (longitud == 11) { // 12312312415
                    const resultCuenta = yield db_1.default.query(queryCuentaBancaria, numero);
                    res.json(resultCuenta);
                }
                else {
                    res.status(404).json({ text: "Cuenta no encontrada" });
                }
            }
            else {
                res.status(404).json({ text: "No es un formato válido" });
            }
        });
    }
    transferir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idOrigin, typeOrigin, idDestiny, typeDestiny, cantidad, referencia, concepto, originEmail, destinyEmail, transferencia, originAccount, destinyAccount } = req.body;
            const fechaTransferencia = new Date();
            const emailData = {
                originEmail: String(originEmail),
                destinyEmail: String(destinyEmail),
                transferecia: String(transferencia),
                cuentaOrigen: String(originAccount).slice(-4),
                cuentaDestino: String(destinyAccount).slice(-4),
                monto: String(cantidad),
                fecha: fechaTransferencia
            };
            try {
                yield db_1.default.query('call SP_TransferenciaBancaria(?,?,?,?,?,?,?);', [idOrigin, typeOrigin, idDestiny, typeDestiny, cantidad, referencia, concepto]);
                if (emailData.transferecia != 'Propias') {
                    sendEmail_1.default.enviarCorreoTransferencia(emailData, res);
                }
                res.json({ message: "Transferencia realizada" });
            }
            catch (error) {
                sendEmail_1.default.enviarCorreoError(emailData, res);
                throw error;
            }
        });
    }
}
const transferControllerExport = new transferController();
exports.default = transferControllerExport;
