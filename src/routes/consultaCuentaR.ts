import { Router } from 'express';

import consultaCuentaControllers from '../controllers/consultaCuenta';

class consultarCuentaRoute{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/:numero',consultaCuentaControllers.consultarExistencia );
        this.router.get('/consulta/:idCuenta',consultaCuentaControllers.consultarDatosCredito );
        this.router.post('/',consultaCuentaControllers.depositar );
    }
}

const consultarCuentaRoutes = new consultarCuentaRoute();
export default consultarCuentaRoutes.router;