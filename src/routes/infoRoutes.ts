import { Router } from 'express';

import infoControllers from '../controllers/infoController';

class infoRoute{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/:nombreUsuario',infoControllers.consultaInfo );
    }
}

const infoRoutes = new infoRoute();
export default infoRoutes.router;