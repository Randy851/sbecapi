import { Router } from 'express';
import movimientoControllers from '../controllers/movimientosController';
class movimientoRoute{
    public router:Router =  Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/obtenerT',movimientoControllers.obtenerTarjeta);
        this.router.post('/obtenerM',movimientoControllers.obtenerMovimineto);
      /*   this.router.post('/obtenerMSA',movimientoControllers.obtenerMoviminetosemaActual); */
        this.router.post('/obtenerFM',movimientoControllers.obtenerMovimientoFecha);
        this.router.post('/obtenerCD',movimientoControllers.obtenerCuentaDetalle);
        this.router.post('/sumameses',movimientoControllers.sumafecha)
    }
}

const movimientoRoutes = new movimientoRoute();
export default movimientoRoutes.router;