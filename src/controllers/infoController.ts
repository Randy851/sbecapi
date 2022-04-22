import {Request, Response} from 'express';

import db from '../db';

class infoController{

    public async consultaInfo (req: Request, res: Response): Promise<any> {
        const { nombreUsuario } = req.params;
        const domP = await db.query(`
            SELECT d.*
            FROM domicilio d
            INNER JOIN informacionpersonal i
            ON d.idDomicilio = i.fkDomicilio
            INNER JOIN usuarios u
            on i.idInformacionPersonal = u.fkInformacionPersonal
            where u.nombreUsuario = ?`, [nombreUsuario]
        );
        const infoP = await db.query(`
            SELECT i.*
            FROM informacionpersonal i
            INNER JOIN usuarios u
            on i.idInformacionPersonal = u.fkInformacionPersonal
            where u.nombreUsuario = ?`, [nombreUsuario]
        );
        if (infoP.length > 0 && domP.length > 0) {
            let respuesta = { informacionPersonal: infoP, domicilio: domP};
            return res.json(respuesta);
        }
        res.status(404).json({ text: "informacion no encontrada :c" });
        
    }
}

const infoControllers = new infoController();
export default infoControllers;