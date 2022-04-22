import { Router } from 'express';

import tarjetaCambioStatusControllers from '../controllers/tarjetaCambioStatus';

class tarjetaCambioStatusRoutes{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/:idCuenta',tarjetaCambioStatusControllers.cambiarStatusTarjeta );
    }
}

const tarjetaCambioStatusRoute = new tarjetaCambioStatusRoutes();
export default tarjetaCambioStatusRoute.router;