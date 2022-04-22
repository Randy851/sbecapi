import express, {Application} from 'express'; 
import morgan from 'morgan';
import cors from 'cors';

import usuariosRoutes from './routes/usersRoutes';
import cuentasRoutes from './routes/cuentasRoutes';
import loginRoute from './routes/loginRoutes';
import infoRoutes from './routes/infoRoutes';
import adminUsuariosRoute from './routes/adminUR';
import ejecutivoUsuariosRoute from './routes/ejecutivoUR';
import tarjetaFolioRoute from './routes/tarjetasFoliosRoute';
import cuentasCambioRoute from './routes/cuentaCambioSRoute';
import tarjetaCambioStatusRoute from './routes/tarjetaCambiosRoute';
import asignarDebitoRoute from './routes/asignarDebitoR';
import transferRoute from './routes/transferRoute';
import consultarCuentaRoutes from './routes/consultaCuentaR';
import correoRoutes from './routes/sendEmailRoute';
import movimientoRoutes from './routes/movimientoRoute';

class Server{

    public app:Application;

    constructor(){
        this.app = express();

        this.config();
        this.routes();
    }

    config():void{
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(morgan('dev'))
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes():void{
        this.app.use('/ejecutivousers',ejecutivoUsuariosRoute);
        this.app.use('/cambiostatuscta',cuentasCambioRoute);
        this.app.use('/asignarDebito', asignarDebitoRoute);
        this.app.use('/cambiostatustarjeta',tarjetaCambioStatusRoute);
        this.app.use('/adminusers',adminUsuariosRoute);
        this.app.use('/usuarios',usuariosRoutes);
        this.app.use('/cuentas',cuentasRoutes);
        this.app.use('/existeCuenta',consultarCuentaRoutes);
        this.app.use('/assignT',tarjetaFolioRoute);
        this.app.use('/info/',infoRoutes);
        this.app.use('/login/',loginRoute);
        this.app.use('/transferencias', transferRoute);
        this.app.use('/enviar', correoRoutes );
        this.app.use('/movimiento/',movimientoRoutes);
    }

    start():void{
        this.app.listen(this.app.get('port'), () => {
            console.log('El servidor esta escuchando en el puerto: ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
