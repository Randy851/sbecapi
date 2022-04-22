import {Request, Response} from 'express';

import db from '../db';

class loginController{

    public async validarLog(req: Request, res: Response): Promise<any> {
        const { nombreUsuario } = req.params;

        const usuario = await db.query(
            `SELECT u.nombreUsuario, u.contrasena, r.nombreRol, s.nombreStatus
            FROM usuarios u
            inner join roles r
            ON u.fkRoles = r.idRol
            inner join statususuario s
            ON u.fkStatus = s.idStatusUsuario
            where nombreUsuario = ?`, [nombreUsuario]
        );

        console.log(usuario);
        if (usuario.length > 0 ) {
            if(usuario[0].nombreRol == "cliente"){
                const cuenta = await db.query(
                    `SELECT s.nombreStatus
                    FROM cuentas c
                    inner join usuarios u
                    ON c.fkUsuario = u.nombreUsuario
                    inner join statuscuentas s
                    on s.idStatusCuenta = c.fkStatusCuenta
                    where nombreUsuario = ?`, [nombreUsuario]
                );

                if(cuenta.length > 0 ){
                    return res.json(usuario[0]);
                }else{
                    return res.json({estado: "inactivo"});
                }
                
            }else if(usuario[0].nombreRol == "administrador" || usuario[0].nombreRol == "ejecutivo" || usuario[0].nombreRol == "cajero"){
                return res.json(usuario[0]);
            }
        }
        res.status(404).json({ text: "usuario no encontrado o tu cuenta esta inactiva" });
    }
}

const loginControllers = new loginController();
export default loginControllers;

