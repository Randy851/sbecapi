import { Router } from 'express';

import loginControllers from '../controllers/loginController';

class loginRoute{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/:nombreUsuario',loginControllers.validarLog );
    }
}

const loginRoutes = new loginRoute();
export default loginRoutes.router;