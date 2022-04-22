import { Router } from 'express';

import cuentaDebitoControllers from '../controllers/asignarDebitoC';

class asignarDebitoRoutes{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/',cuentaDebitoControllers.crearCuenta );
    }
}

const asignarDebitoRoute = new asignarDebitoRoutes();
export default asignarDebitoRoute.router;