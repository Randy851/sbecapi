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
class cuentaDebitoController {
    crearCuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datosCuenta = req.body.cuenta;
            const idCuenta = yield db_1.default.query(` SELECT MAX(idCuenta)+ 1 as idCuenta FROM basedatossbec.cuentas; `);
            datosCuenta.idCuenta = Number.parseInt(idCuenta[0].idCuenta);
            datosCuenta.fechaAlta = new Date();
            datosCuenta.fkBeneficiario = 3;
            datosCuenta.fkStatusCuenta = 1;
            const resultCuenta = yield db_1.default.query('INSERT INTO cuentas set ?', datosCuenta);
            res.json({ resultado: resultCuenta });
        });
    }
}
const cuentaDebitoControllers = new cuentaDebitoController();
exports.default = cuentaDebitoControllers;
