import {Request, Response} from 'express';

import db from '../db';

class cuentasController{

    public async listar (req: Request, res: Response): Promise<void> {
        const { nombreUsuario } = req.params;
        const cuentas = await db.query(`
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
            where c.fkUsuario = ?;`, [nombreUsuario]
        );
        res.json(cuentas);
    }

    public async obtenerUltimasCuenta (req: Request, res: Response): Promise<void> {
        const cuentas = await db.query(`SELECT MAX(clabeInterbancaria)+ 1 as clabeInterbancariaD,MAX(cuentaBancaria) +1 as cuentaBancariaD FROM cuentas;`);
        res.json(cuentas);
    }

    public async crearCuenta(req: Request, res: Response): Promise<void> {
        const datosCuenta = req.body.cuenta , datosUsuario = req.body.usuario, 
        datosInfoPers = req.body.informacionPersonal, datosDomicilio = req.body.domicilio;

        const idDomicilio = await db.query(`SELECT MAX(idDomicilio)+ 1 as idDomicilio FROM basedatossbec.domicilio;`);
        const idInformacionP = await db.query(` SELECT MAX(idInformacionPersonal)+ 1 as idInformacionPersonal FROM basedatossbec.informacionPersonal; `);
        const idCuenta = await db.query(` SELECT MAX(idCuenta)+ 1 as idCuenta FROM basedatossbec.cuentas; `);
        
        datosDomicilio.idDomicilio = Number.parseInt(idDomicilio[0].idDomicilio);
        datosInfoPers.idInformacionPersonal = Number.parseInt(idInformacionP[0].idInformacionPersonal);
        datosCuenta.idCuenta = Number.parseInt(idCuenta[0].idCuenta);

        const resultDomicilio = await db.query('INSERT INTO domicilio set ?', datosDomicilio);
        datosInfoPers.fkDomicilio = datosDomicilio.idDomicilio;
        
        const resultInfo = await db.query('INSERT INTO informacionPersonal set ?', datosInfoPers);
        
        datosUsuario.fkInformacionPersonal = datosInfoPers.idInformacionPersonal;
        datosUsuario.fkRoles = 3;
        datosUsuario.fkStatus = 1;
        datosUsuario.fkSucursal = 1;
        datosUsuario.fechaAlta = new Date();
        
        const resultUsuario = await db.query('INSERT INTO usuarios set ?', datosUsuario);
        
        datosCuenta.fechaAlta =new Date();
        datosCuenta.fkTipoCuenta = 1;
        datosCuenta.fkBeneficiario = 2;
        datosCuenta.fkUsuario = datosUsuario.nombreUsuario;
        datosCuenta.fkStatusCuenta = 1;
        const resultCuenta = await db.query('INSERT INTO cuentas set ?', datosCuenta);
        
        res.json({ result: {
            cuenta: datosCuenta,
            usuario: datosUsuario,
            informacionPersonal: datosInfoPers,
            domicilio: datosDomicilio
        }});
    }   

    public async obtenerScore (req: Request, res: Response): Promise<void> {
        const { curp } = req.params;
        const dato = req.body;
        const cuentas = await db.query(`
            select * 
            from  basedatossbec.tablacreditos 
            where curp = ?`, [curp] );
            
        console.log( req.body);
        res.json(cuentas);
    }

    public async listaFolioCredito (req: Request, res: Response): Promise<void> {
        const tarjetas = await db.query(`
        select folio 
        from tarjetas 
        LEFT join cuentas c
        ON tarjetas.folio = c.fkFolioTarjeta
        WHERE c.fkFolioTarjeta IS NULL 
        and fkTipoTarjeta = 2
        LIMIT 10;
        `);
        res.json(tarjetas);
    }
}

const cuentasControllers = new cuentasController();
export default cuentasControllers;