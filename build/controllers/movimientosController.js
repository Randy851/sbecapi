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
class movimientoController {
    obtenerTarjeta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fkUsuario = req.body;
            /* const dato = req.body; */
            const cuentas = yield db_1.default.query(`
        select numeroTarjeta,fkTipoTarjeta,nombreTipo,fkUsuario from tarjetas
        inner join tipotarjeta on  tarjetas.fkTipoTarjeta=tipotarjeta.idTipoTarjeta
        inner join cuentas on tarjetas.folio=cuentas.fkFolioTarjeta
        where ?`, fkUsuario);
            console.log(req.body);
            res.json(cuentas);
        });
    }
    obtenerMovimineto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let numeroT = "";
            const datoMovimiento = req.body;
            numeroT = datoMovimiento.numeroTarjeta;
            const movimiento = yield db_1.default.query(`
        select cantidad,concepto,fechaMovimiento,nombreMovimiento,numeroTarjeta,fkUsuario from movimientosdebito
        inner join tipomovimientosdebito on movimientosdebito.fkTipoMovimiento= tipomovimientosdebito.idTipoMovimiento
        inner join cuentas on movimientosdebito.fkCuenta= cuentas.idCuenta
        inner join tarjetas on cuentas.fkFolioTarjeta= tarjetas.folio
        where numeroTarjeta="${numeroT}" order by fechaMovimiento desc
        LIMIT 10
        `);
            console.log(numeroT);
            res.json(movimiento);
        });
    }
    obtenerMovimientoFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let fechaI;
            let fechaF;
            let numeroT = "";
            const datosFechas = req.body;
            fechaI = datosFechas.fechaInicio;
            fechaF = datosFechas.fechaFinal;
            numeroT = datosFechas.numeroTarjeta;
            const consultaFecha = yield db_1.default.query(` 
        select cantidad,concepto,fechaMovimiento,nombreMovimiento,numeroTarjeta,fkUsuario from movimientosdebito
        inner join tipomovimientosdebito on movimientosdebito.fkTipoMovimiento= tipomovimientosdebito.idTipoMovimiento
        inner join cuentas on movimientosdebito.fkCuenta= cuentas.idCuenta
        inner join tarjetas on cuentas.fkFolioTarjeta= tarjetas.folio
        where fechaMovimiento between "${fechaI}" and "${fechaF}" and numeroTarjeta="${numeroT}"
        `);
            console.log(numeroT);
            res.json(consultaFecha);
        });
    }
    obtenerCuentaDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let numeroTarjeta = "";
            const datoDC = req.body;
            numeroTarjeta = datoDC.numeroTarjeta;
            const consultaCuentaDetalle = yield db_1.default.query(` 
        select numeroTarjeta,saldo,fkUsuario,nombreStatusTarjeta,nombreTipo, clabeInterbancaria, cuentaBancaria,nombreStatus, nombreTipo, contrasena, nombres, calle from tarjetas
        inner join cuentas on tarjetas.folio = cuentas.fkFolioTarjeta
        inner join statustarjeta on tarjetas.fkStatusTarjeta = statustarjeta.idStatusTarjeta
        inner join tipotarjeta on tarjetas.fkTipoTarjeta = tipotarjeta.idTipoTarjeta
        inner join statuscuentas on cuentas.fkStatusCuenta = statuscuentas.idStatusCuenta
        inner join usuarios on cuentas.fkUsuario = usuarios.nombreUsuario
        inner join informacionpersonal on usuarios.fkInformacionPersonal = informacionpersonal.idInformacionPersonal
        inner join domicilio on informacionpersonal.fkDomicilio = domicilio.idDomicilio
        where numeroTarjeta="${numeroTarjeta}"
        `);
            res.json(consultaCuentaDetalle);
        });
    }
    sumafecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let ano = "";
            let mes = "";
            let tarjeta = "";
            let usuario = "";
            const datos = req.body;
            ano = datos.ano;
            mes = datos.mes;
            tarjeta = datos.numeroTarjeta;
            usuario = datos.fkUsuario;
            let sumames = yield db_1.default.query(`
            select numeroTarjeta,cantidad,fkUsuario,fechaMovimiento, fkTipoMovimiento, SUM(cantidad) as sumatotal1 from tarjetas
            inner join cuentas on tarjetas.folio = cuentas.fkFolioTarjeta
            inner join movimientosdebito on cuentas.idCuenta = movimientosdebito.fkCuenta
            where fkUsuario="${usuario}"
            and numeroTarjeta="${tarjeta}"
            and  (select month(fechaMovimiento))='${mes}'
            and  (select year(fechaMovimiento))='${ano}'
            and  fkTipoMovimiento='1'`);
            let sumames2 = yield db_1.default.query(`
            select numeroTarjeta,cantidad,fkUsuario,fechaMovimiento, fkTipoMovimiento, SUM(cantidad) as sumatotal2 from tarjetas
            inner join cuentas on tarjetas.folio = cuentas.fkFolioTarjeta
            inner join movimientosdebito on cuentas.idCuenta = movimientosdebito.fkCuenta
            where fkUsuario="${usuario}"
            and numeroTarjeta="${tarjeta}"
            and  (select month(fechaMovimiento))='${mes}'
            and  (select year(fechaMovimiento))='${ano}'
            and  fkTipoMovimiento='2'`);
            res.json({ sumames, sumames2 });
        });
    }
}
const movimientoControllers = new movimientoController();
exports.default = movimientoControllers;
