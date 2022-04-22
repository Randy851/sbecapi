import {Request, Response} from 'express';
import correoControllers from './sendEmail';


import db from '../db';

class transferController{

    public async getuserAccounts(req: Request, res: Response): Promise<void>{
        const {client} = req.params;

        const accounts = await db.query( `call SP_buscarCuentasActivasCliente(?)`, client);

        res.json(accounts);
    }

    public async consultarExistencia (req: Request, res: Response): Promise<void> {
        const { numero } = req.params;
        let longitud = numero.toString().length;

        let queryClabeI = `call SP_BuscarCuentaPorCLABE(?);`;
       
        let queryCuentaBancaria = `call SP_BuscarCuentaPorCuenta(?);`;

        let aceptada = (longitud === 18 || longitud === 11) ? true: false;

        if(aceptada){
            if(longitud == 18 ){
                const resultCuenta = await db.query(queryClabeI, numero);
                res.json(resultCuenta);
            }else if(longitud == 11){ // 12312312415
                const resultCuenta = await db.query(queryCuentaBancaria, numero);
                res.json(resultCuenta);
            }else{
                res.status(404).json({ text: "Cuenta no encontrada"});
            }
        }else{
            res.status(404).json({ text: "No es un formato válido"});
        }
        
    }

    public async transferir(req: Request, res: Response): Promise<void> {

        const {idOrigin, typeOrigin, idDestiny, typeDestiny, cantidad, referencia, concepto,
                originEmail, destinyEmail, transferencia, originAccount, destinyAccount} = req.body;
        const fechaTransferencia = new Date();
        const emailData={
            originEmail: String(originEmail),
            destinyEmail: String(destinyEmail),
            transferecia: String(transferencia),
            cuentaOrigen: String(originAccount).slice(-4),
            cuentaDestino: String(destinyAccount).slice(-4),
            monto: String(cantidad),
            fecha: fechaTransferencia
        }

        
        
        
        try {

            await db.query('call SP_TransferenciaBancaria(?,?,?,?,?,?,?);'
                            , [idOrigin, typeOrigin, idDestiny, typeDestiny, cantidad, referencia, concepto]);
            if(emailData.transferecia != 'Propias'){
                correoControllers.enviarCorreoTransferencia(emailData,res);
            }
            res.json({message:"Transferencia realizada"});
        } catch (error) {
            correoControllers.enviarCorreoError(emailData,res);
            throw error;
        }
    }
}

const transferControllerExport = new transferController();
export default transferControllerExport;