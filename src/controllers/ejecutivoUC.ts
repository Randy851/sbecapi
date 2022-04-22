import {Request, Response} from 'express';

import db from '../db';

class ejecutivoUserController{

    public async listar (req: Request, res: Response): Promise<void> {
        const cuentas = await db.query(`
            SELECT * 
            FROM usuarios
            inner join roles
            on usuarios.fkRoles = roles.idRol
            inner join statususuario
            on usuarios.fkStatus = statususuario.idStatusUsuario
            inner join informacionpersonal
            on usuarios.fkInformacionPersonal = informacionpersonal.idInformacionPersonal
            where fkRoles = 3 ;
        `);
        res.json(cuentas);
    }
}

const ejecutivoUserControllers = new ejecutivoUserController();
export default ejecutivoUserControllers;