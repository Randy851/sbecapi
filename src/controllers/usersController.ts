import {Request, Response} from 'express';

import db from '../db';

class usersController{

    public async listar (req: Request, res: Response): Promise<void> {
        const users = await db.query('SELECT * FROM usuarios where fkRoles=3');
        res.json(users);
    }
}

const usersControllers = new usersController();
export default usersControllers;