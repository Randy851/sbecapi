import { Router } from 'express';
import transferControllerExport from '../controllers/transferController';

class transferClass{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/buscar/:numero',transferControllerExport.consultarExistencia);
        this.router.get('/cuentas/:client',transferControllerExport.getuserAccounts);
        this.router.post('/transferir',transferControllerExport.transferir);
    }
}

const transferRoute = new transferClass();
export default transferRoute.router;