import { Request, Response } from 'express';

import db from '../db';
class movimientoController {

    public async obtenerTarjeta(req: Request, res: Response): Promise<void> {
        const fkUsuario = req.body;
        /* const dato = req.body; */
        const cuentas = await db.query(`
        select numeroTarjeta,fkTipoTarjeta,nombreTipo,fkUsuario from tarjetas
        inner join tipotarjeta on  tarjetas.fkTipoTarjeta=tipotarjeta.idTipoTarjeta
        inner join cuentas on tarjetas.folio=cuentas.fkFolioTarjeta
        where ?`, fkUsuario);

        console.log(req.body);
        res.json(cuentas);
    }

    public async obtenerMovimineto(req: Request, res: Response): Promise<void> {
        let numeroT = "";
        const datoMovimiento = req.body;
        numeroT = datoMovimiento.numeroTarjeta;
        const movimiento = await db.query(`
        select cantidad,concepto,fechaMovimiento,nombreMovimiento,numeroTarjeta,fkUsuario from movimientosdebito
        inner join tipomovimientosdebito on movimientosdebito.fkTipoMovimiento= tipomovimientosdebito.idTipoMovimiento
        inner join cuentas on movimientosdebito.fkCuenta= cuentas.idCuenta
        inner join tarjetas on cuentas.fkFolioTarjeta= tarjetas.folio
        where numeroTarjeta="${numeroT}" order by fechaMovimiento desc
        LIMIT 10
        `);
        console.log(numeroT);
        res.json(movimiento);
    }

    public async obtenerMovimientoFecha(req: Request, res: Response) {
        let fechaI: Date;
        let fechaF: Date;
        let numeroT = "";
        const datosFechas = req.body;
        fechaI = datosFechas.fechaInicio;
        fechaF = datosFechas.fechaFinal;
        numeroT = datosFechas.numeroTarjeta;
        const consultaFecha = await db.query(` 
        select cantidad,concepto,fechaMovimiento,nombreMovimiento,numeroTarjeta,fkUsuario from movimientosdebito
        inner join tipomovimientosdebito on movimientosdebito.fkTipoMovimiento= tipomovimientosdebito.idTipoMovimiento
        inner join cuentas on movimientosdebito.fkCuenta= cuentas.idCuenta
        inner join tarjetas on cuentas.fkFolioTarjeta= tarjetas.folio
        where fechaMovimiento between "${fechaI}" and "${fechaF}" and numeroTarjeta="${numeroT}"
        `)
        console.log(numeroT)
        res.json(consultaFecha);
    }

    public async obtenerCuentaDetalle(req: Request, res: Response): Promise<void> {
        let numeroTarjeta = "";
        const datoDC = req.body;
        numeroTarjeta = datoDC.numeroTarjeta;
        const consultaCuentaDetalle = await db.query(` 
        select numeroTarjeta,saldo,fkUsuario,nombreStatusTarjeta,nombreTipo, clabeInterbancaria, cuentaBancaria,nombreStatus, nombreTipo, contrasena, nombres, calle from tarjetas
        inner join cuentas on tarjetas.folio = cuentas.fkFolioTarjeta
        inner join statustarjeta on tarjetas.fkStatusTarjeta = statustarjeta.idStatusTarjeta
        inner join tipotarjeta on tarjetas.fkTipoTarjeta = tipotarjeta.idTipoTarjeta
        inner join statuscuentas on cuentas.fkStatusCuenta = statuscuentas.idStatusCuenta
        inner join usuarios on cuentas.fkUsuario = usuarios.nombreUsuario
        inner join informacionpersonal on usuarios.fkInformacionPersonal = informacionpersonal.idInformacionPersonal
        inner join domicilio on informacionpersonal.fkDomicilio = domicilio.idDomicilio
        where numeroTarjeta="${numeroTarjeta}"
        `)
        res.json(consultaCuentaDetalle);
    }

    public async sumafecha(req: Request, res: Response): Promise<void> {
        let ano = "";
        let mes = "";
        let tarjeta = "";
        let usuario = "";
        const datos = req.body;
          ano=datos.ano;
          mes=datos.mes;
          tarjeta=datos.numeroTarjeta;
          usuario=datos.fkUsuario
        let sumames = await db.query(`
            select numeroTarjeta,cantidad,fkUsuario,fechaMovimiento, fkTipoMovimiento, SUM(cantidad) as sumatotal1 from tarjetas
            inner join cuentas on tarjetas.folio = cuentas.fkFolioTarjeta
            inner join movimientosdebito on cuentas.idCuenta = movimientosdebito.fkCuenta
            where fkUsuario="${usuario}"
            and numeroTarjeta="${tarjeta}"
            and  (select month(fechaMovimiento))='${mes}'
            and  (select year(fechaMovimiento))='${ano}'
            and  fkTipoMovimiento='1'`
        );
        let sumames2 = await db.query(`
            select numeroTarjeta,cantidad,fkUsuario,fechaMovimiento, fkTipoMovimiento, SUM(cantidad) as sumatotal2 from tarjetas
            inner join cuentas on tarjetas.folio = cuentas.fkFolioTarjeta
            inner join movimientosdebito on cuentas.idCuenta = movimientosdebito.fkCuenta
            where fkUsuario="${usuario}"
            and numeroTarjeta="${tarjeta}"
            and  (select month(fechaMovimiento))='${mes}'
            and  (select year(fechaMovimiento))='${ano}'
            and  fkTipoMovimiento='2'`
        );

        res.json({sumames,sumames2})
    }

}
const movimientoControllers = new movimientoController();
export default movimientoControllers;