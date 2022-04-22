import { Router } from 'express';

import usersControllers from '../controllers/usersController';

class ejecutivoUsuariosRoutes{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',usersControllers.listar );
    }
}

const ejecutivoUsuariosRoute = new ejecutivoUsuariosRoutes();
export default ejecutivoUsuariosRoute.router;