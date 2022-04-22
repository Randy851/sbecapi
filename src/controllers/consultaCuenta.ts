import {Request, Response} from 'express';

import db from '../db';

class consultaCuentaController{

    public async consultarExistencia (req: Request, res: Response): Promise<void> {
        const { numero } = req.params;
        let longitud = numero.toString().length;
        let encontrada;

        let query =
        `select i.nombres, i.apellidoPaterno, i.apellidoMaterno, c.idCuenta, c.saldo, c.cuentaBancaria
        from cuentas c
        INNER JOIN usuarios u
        ON c.fkUsuario = u.nombreUsuario
        INNER JOIN informacionpersonal i
        ON u.fkInformacionPersonal = i.idInformacionPersonal `;

        let queryClabeI = `where clabeInterbancaria = ?`;
        let queryCuentaBancaria = `where cuentaBancaria = ?`;
        
        let queryNumTarjeta = 
        `where fkFolioTarjeta = (
            select folio
            from tarjetas 
            where numeroTarjeta = ?
        );`;

        encontrada = (longitud == 18 || longitud == 11 || longitud == 16) ? true : false;

        query += (longitud == 18) ? queryClabeI : (longitud == 16) ? queryNumTarjeta : (longitud == 11) ? queryCuentaBancaria : ``;

        if(encontrada){
            const resultCuenta = await db.query(query, numero);
            console.log(resultCuenta);
            if(resultCuenta.length < 1){
                res.status(404).json({ text: "Cuenta no encontrada" });
            }else{
                res.json(resultCuenta);
            }
        }else{
            res.status(404).json({ text: "Cuenta no encontrada" });
        }
        
    }

    public async depositar (req: Request, res: Response): Promise<void> {
        let datosMovimiento = req.body;

        let resultDeposito = await db.query('call SP_Deposito( ?, ?, ?);', [datosMovimiento.numeroCta, datosMovimiento.cantidad, datosMovimiento.referencia ]);
        res.json(
            [{
                exito: resultDeposito[0][0].exito,  
                fechaMovimiento: resultDeposito[0][0].fechaMovimiento,
                //resultDeposito
            }]
        );    
    }

    public async consultarDatosCredito (req: Request, res: Response): Promise<void> {
        const { idCuenta } = req.params;

        let resultConsulta = await db.query('call SP_consultarCuentaCredito(?);', [idCuenta]);
        
        res.json(resultConsulta);
    }


}

const consultaCuentaControllers = new consultaCuentaController();
export default consultaCuentaControllers;