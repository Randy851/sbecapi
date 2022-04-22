import { Router } from 'express';

import tarjetasFolioControllers from '../controllers/tarjetaFolio';

class tarjetaFolioRoutes{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',tarjetasFolioControllers.tarjetasNuevas );
    }
}

const tarjetaFolioRoute = new tarjetaFolioRoutes();
export default tarjetaFolioRoute.router;