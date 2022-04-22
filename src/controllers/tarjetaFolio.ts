import {Request, Response} from 'express';

import db from '../db';

class tarjetasFolioController{

    public async tarjetasNuevas (req: Request, res: Response): Promise<void> {
        const tarjetas = await db.query(`
            SELECT t.folio
            FROM tarjetas t
            LEFT join cuentas c
            ON t.folio = c.fkFolioTarjeta
            WHERE c.fkFolioTarjeta IS NULL
            LIMIT 10;
        `);
        res.json(tarjetas);
    }
}

const tarjetasFolioControllers = new tarjetasFolioController();
export default tarjetasFolioControllers;