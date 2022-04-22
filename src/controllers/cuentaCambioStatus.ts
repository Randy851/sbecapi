import {Request, Response} from 'express';

import db from '../db';

class cuentaCambioStatusController{

    public async cambiarStatusCuenta(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        const statusActual = await db.query(`
            select c.fkStatusCuenta
            from cuentas c
            where c.idCuenta = ?;`, [id]
        );

        let fkStatusCuenta = (statusActual[0].fkStatusCuenta == 1) ? 2 : 1;

        const resActualiza = await db.query('UPDATE cuentas set fkStatusCuenta = ? WHERE idCuenta = ?', [fkStatusCuenta , id]);

        if(resActualiza.affectedRows == 1){
            res.json({mensaje: "Se ah actualizado correctamente"});
        }else{
            res.json({mensaje: "Ah ocurrido un error"})
        }
    }
}

const cuentaCambioStatusControllers = new cuentaCambioStatusController();
export default cuentaCambioStatusControllers;

