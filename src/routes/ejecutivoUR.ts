import { Router } from 'express';

import ejecutivoUserControllers from '../controllers/ejecutivoUC';

class ejecutivoUsuariosRoutes{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',ejecutivoUserControllers.listar );
    }
}

const ejecutivoUsuariosRoute = new ejecutivoUsuariosRoutes();
export default ejecutivoUsuariosRoute.router;