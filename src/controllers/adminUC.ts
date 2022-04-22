import {Request, Response} from 'express';

import db from '../db';

class adminUserController{

    public async listar (req: Request, res: Response): Promise<void> {
        const cuentas = await db.query(`
            SELECT * 
            FROM usuarios
            inner join roles
            on usuarios.fkRoles = roles.idRol
            inner join statususuario
            on usuarios.fkStatus = statususuario.idStatusUsuario
            where fkRoles != 3;
        `);
        res.json(cuentas);
    }
}

const adminUserControllers = new adminUserController();
export default adminUserControllers;