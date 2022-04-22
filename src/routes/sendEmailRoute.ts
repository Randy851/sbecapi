import { Router } from 'express';

import correoControllers from '../controllers/sendEmail';

class correoRoute{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/codigo', correoControllers.enviarCodigo );
        this.router.post('/deposito', correoControllers.enviarInfoDeposito );
        this.router.post('/transferencia', correoControllers.enviarCorreoTransferencia);
        this.router.post('/error', correoControllers.enviarCorreoTransferencia);

    }
}

const correoRoutes = new correoRoute();
export default correoRoutes.router;