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
class cuentasController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombreUsuario } = req.params;
            const cuentas = yield db_1.default.query(`
            select *
            from cuentas c
            inner join statuscuentas sc
            on sc.idStatusCuenta = c.fkStatusCuenta
            inner join tiposcuenta tc
            on tc.idTipoCuenta = c.fkTipoCuenta
            inner join tarjetas t
            on t.folio = c.fkFolioTarjeta
            inner join tipotarjeta tt
            on tt.idTipoTarjeta = t.fkTipoTarjeta
            inner join statustarjeta st
            on st.idStatusTarjeta = t.fkStatusTarjeta
            where c.fkUsuario = ?;`, [nombreUsuario]);
            res.json(cuentas);
        });
    }
    obtenerUltimasCuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuentas = yield db_1.default.query(`SELECT MAX(clabeInterbancaria)+ 1 as clabeInterbancariaD,MAX(cuentaBancaria) +1 as cuentaBancariaD FROM cuentas;`);
            res.json(cuentas);
        });
    }
    crearCuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datosCuenta = req.body.cuenta, datosUsuario = req.body.usuario, datosInfoPers = req.body.informacionPersonal, datosDomicilio = req.body.domicilio;
            const idDomicilio = yield db_1.default.query(`SELECT MAX(idDomicilio)+ 1 as idDomicilio FROM basedatossbec.domicilio;`);
            const idInformacionP = yield db_1.default.query(` SELECT MAX(idInformacionPersonal)+ 1 as idInformacionPersonal FROM basedatossbec.informacionPersonal; `);
            const idCuenta = yield db_1.default.query(` SELECT MAX(idCuenta)+ 1 as idCuenta FROM basedatossbec.cuentas; `);
            datosDomicilio.idDomicilio = Number.parseInt(idDomicilio[0].idDomicilio);
            datosInfoPers.idInformacionPersonal = Number.parseInt(idInformacionP[0].idInformacionPersonal);
            datosCuenta.idCuenta = Number.parseInt(idCuenta[0].idCuenta);
            const resultDomicilio = yield db_1.default.query('INSERT INTO domicilio set ?', datosDomicilio);
            datosInfoPers.fkDomicilio = datosDomicilio.idDomicilio;
            const resultInfo = yield db_1.default.query('INSERT INTO informacionPersonal set ?', datosInfoPers);
            datosUsuario.fkInformacionPersonal = datosInfoPers.idInformacionPersonal;
            datosUsuario.fkRoles = 3;
            datosUsuario.fkStatus = 1;
            datosUsuario.fkSucursal = 1;
            datosUsuario.fechaAlta = new Date();
            const resultUsuario = yield db_1.default.query('INSERT INTO usuarios set ?', datosUsuario);
            datosCuenta.fechaAlta = new Date();
            datosCuenta.fkTipoCuenta = 1;
            datosCuenta.fkBeneficiario = 2;
            datosCuenta.fkUsuario = datosUsuario.nombreUsuario;
            datosCuenta.fkStatusCuenta = 1;
            const resultCuenta = yield db_1.default.query('INSERT INTO cuentas set ?', datosCuenta);
            res.json({ result: {
                    cuenta: datosCuenta,
                    usuario: datosUsuario,
                    informacionPersonal: datosInfoPers,
                    domicilio: datosDomicilio
                } });
        });
    }
    obtenerScore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { curp } = req.params;
            const dato = req.body;
            const cuentas = yield db_1.default.query(`
            select * 
            from  basedatossbec.tablacreditos 
            where curp = ?`, [curp]);
            console.log(req.body);
            res.json(cuentas);
        });
    }
    listaFolioCredito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tarjetas = yield db_1.default.query(`
        select folio 
        from tarjetas 
        LEFT join cuentas c
        ON tarjetas.folio = c.fkFolioTarjeta
        WHERE c.fkFolioTarjeta IS NULL 
        and fkTipoTarjeta = 2
        LIMIT 10;
        `);
            res.json(tarjetas);
        });
    }
}
const cuentasControllers = new cuentasController();
exports.default = cuentasControllers;
