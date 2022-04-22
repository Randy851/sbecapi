"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const cuentasRoutes_1 = __importDefault(require("./routes/cuentasRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const infoRoutes_1 = __importDefault(require("./routes/infoRoutes"));
const adminUR_1 = __importDefault(require("./routes/adminUR"));
const ejecutivoUR_1 = __importDefault(require("./routes/ejecutivoUR"));
const tarjetasFoliosRoute_1 = __importDefault(require("./routes/tarjetasFoliosRoute"));
const cuentaCambioSRoute_1 = __importDefault(require("./routes/cuentaCambioSRoute"));
const tarjetaCambiosRoute_1 = __importDefault(require("./routes/tarjetaCambiosRoute"));
const asignarDebitoR_1 = __importDefault(require("./routes/asignarDebitoR"));
const transferRoute_1 = __importDefault(require("./routes/transferRoute"));
const consultaCuentaR_1 = __importDefault(require("./routes/consultaCuentaR"));
const sendEmailRoute_1 = __importDefault(require("./routes/sendEmailRoute"));
const movimientoRoute_1 = __importDefault(require("./routes/movimientoRoute"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/ejecutivousers', ejecutivoUR_1.default);
        this.app.use('/cambiostatuscta', cuentaCambioSRoute_1.default);
        this.app.use('/asignarDebito', asignarDebitoR_1.default);
        this.app.use('/cambiostatustarjeta', tarjetaCambiosRoute_1.default);
        this.app.use('/adminusers', adminUR_1.default);
        this.app.use('/usuarios', usersRoutes_1.default);
        this.app.use('/cuentas', cuentasRoutes_1.default);
        this.app.use('/existeCuenta', consultaCuentaR_1.default);
        this.app.use('/assignT', tarjetasFoliosRoute_1.default);
        this.app.use('/info/', infoRoutes_1.default);
        this.app.use('/login/', loginRoutes_1.default);
        this.app.use('/transferencias', transferRoute_1.default);
        this.app.use('/enviar', sendEmailRoute_1.default);
        this.app.use('/movimiento/', movimientoRoute_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('El servidor esta escuchando en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
