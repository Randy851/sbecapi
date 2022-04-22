import {Request, Response} from 'express';

import db from '../db';

class tarjetaCambioStatusController{

    public async cambiarStatusTarjeta(req: Request, res: Response): Promise<any> {
        const { idCuenta } = req.params;

        const tarjetaActual = await db.query(`
            select t.folio, t.fkStatusTarjeta
            from tarjetas t
            where t.folio = (select cuentas.fkFolioTarjeta 
                            from cuentas 
                            where cuentas.idCuenta = ?);`, [idCuenta]
        );

        let fkStatusTarjeta = (tarjetaActual[0].fkStatusTarjeta == 1) ? 2 : 1;
        const resActualiza = await db.query('UPDATE tarjetas set fkStatusTarjeta = ? WHERE folio = ?', [fkStatusTarjeta , tarjetaActual[0].folio]);

        if(resActualiza.affectedRows == 1){
            res.json({mensaje: "Se ah actualizado correctamente"});
        }else{
            res.json({mensaje: "Ah ocurrido un error"})
        }
    }
}

const tarjetaCambioStatusControllers = new tarjetaCambioStatusController();
export default tarjetaCambioStatusControllers;

