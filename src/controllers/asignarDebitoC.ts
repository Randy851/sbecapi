import {Request, Response} from 'express';

import db from '../db';

class cuentaDebitoController{

    public async crearCuenta(req: Request, res: Response): Promise<void> {
        const datosCuenta = req.body.cuenta ;

        const idCuenta = await db.query(` SELECT MAX(idCuenta)+ 1 as idCuenta FROM basedatossbec.cuentas; `);
        
        datosCuenta.idCuenta = Number.parseInt(idCuenta[0].idCuenta);
        
        datosCuenta.fechaAlta =new Date();
        datosCuenta.fkBeneficiario = 3;
        datosCuenta.fkStatusCuenta = 1;
        const resultCuenta = await db.query('INSERT INTO cuentas set ?', datosCuenta);
        res.json({ resultado: resultCuenta});
    }   
}

const cuentaDebitoControllers = new cuentaDebitoController();
export default cuentaDebitoControllers;