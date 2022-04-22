import { Router } from 'express';

import cuentaCambioStatusControllers from '../controllers/cuentaCambioStatus';

class cuentasCambioRoutes{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/:id', cuentaCambioStatusControllers.cambiarStatusCuenta );
    }
}


const cuentasCambioRoute = new cuentasCambioRoutes();
export default cuentasCambioRoute.router;