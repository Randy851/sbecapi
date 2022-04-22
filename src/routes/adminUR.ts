import { Router } from 'express';

import adminUserControllers from '../controllers/adminUC';

class adminUsuariosRoutes{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',adminUserControllers.listar );
    }
}

const adminUsuariosRoute = new adminUsuariosRoutes();
export default adminUsuariosRoute.router;