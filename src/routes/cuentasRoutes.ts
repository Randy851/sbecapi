import { Router } from 'express';

import cuentasControllers from '../controllers/cuentasControllers';

class cuentasRoutes{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/listaF',cuentasControllers.listaFolioCredito);
        this.router.get('/:nombreUsuario',cuentasControllers.listar );
        this.router.get('/',cuentasControllers.obtenerUltimasCuenta );
        this.router.post('/',cuentasControllers.crearCuenta );
        this.router.get('/Score/:curp', cuentasControllers.obtenerScore);
    }
}

const cuentaRoutes = new cuentasRoutes();
export default cuentaRoutes.router;