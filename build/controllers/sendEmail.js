"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
let correoEnvio = 'tu correo aqui';
let contrasena = 'tu contraseña de app aqui';
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: correoEnvio,
        pass: contrasena
    }
});
class correoController {
    enviarCodigo(req, res) {
        let datosCorreo = req.body;
        res.json(datosCorreo);
        var mailOptions = {
            from: `"SBEC" <${correoEnvio}>`,
            to: datosCorreo.correo,
            subject: 'CÓDIGO DE VERIFICACIÓN',
            text: 'Su código es: ' + datosCorreo.codigo,
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                res.status(200).send();
                console.log(info);
            }
        });
    }
    enviarInfoDeposito(req, res) {
        let datosCorreo = req.body;
        var mailOptions = {
            from: `"SBEC" <${correoEnvio}>`,
            to: datosCorreo.correo,
            subject: 'SE REALIZO UN MOVIMIENTO',
            html: construirTabla(datosCorreo)
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                res.status(200).send();
                console.log(info);
            }
        });
    }
    enviarCorreoTransferencia(_datos, res) {
        let correos = [_datos.originEmail, _datos.destinyEmail];
        correos.forEach(correo => {
            var mailOptions = {
                from: `"SBEC" <${correoEnvio}>`,
                to: correo,
                subject: 'Transferencia Realizada',
                html: correoTransferencia(_datos)
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).send();
                    console.log(info);
                }
            });
        });
    }
    enviarCorreoError(_datos, res) {
        var mailOptions = {
            from: `"SBEC" <${correoEnvio}>`,
            to: _datos.originEmail,
            subject: 'Error en su transacción',
            html: correoError(_datos)
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                res.status(200).send();
                console.log(info);
            }
        });
    }
}
function construirTabla(_datos) {
    let referenciaHTML = (_datos.referencia) ? `<tr>
                            <td>REFERENCIA</td>
                            <td colspan="2">${_datos.referencia}</td>
                        </tr>` : '';
    (_datos.referencia);
    return ` <table style="border: black 1px solid;border-collapse: collapse;">
                <thead>
                    <tr>
                        <th >DETALLES DEL MOVIMIENTO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >Operación</td>
                        <td style="text-align:center;">DEPOSITO</td>
                    </tr>
                    <tr>
                        <td>CUENTA</td>
                        <td tyle="text-align:right;">SBEC ***${_datos.digitosCuenta}</td>
                    </tr>
                    <tr>
                        <td>BENEFICIARIO</td>
                        <td tyle="text-align:right;">${_datos.beneficiario}</td>
                    </tr>
                    <tr>
                        <td>MONTO</td>
                        <td tyle="text-align:right;">${_datos.montoDeposito}</td>
                    </tr>
                    ${referenciaHTML}
                    <tr>
                        <td>FECHA Y HORA</td>
                        <td tyle="text-align:right;">${_datos.fecha}</td>
                    </tr>
                </tbody>
            </table>`;
}
function correoTransferencia(_datos) {
    return ` <table style="border: black 1px solid;border-collapse: collapse;">
                <thead>
                    <tr>
                        <th><bold>DETALLES DEL MOVIMIENTO</bold></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >Operación</td>
                        <td style="text-align:center;">TRANSFERENCIA ${_datos.transferecia}</td>
                    </tr>
                    <tr>
                        <td>CUENTA ORIGEN</td>
                        <td tyle="text-align:right;">SBEC ***${_datos.cuentaOrigen}</td>
                    </tr>
                    <tr>
                        <td>CUENTA DESTINO</td>
                        <td tyle="text-align:right;">SBEC ***${_datos.cuentaDestino}</td>
                    </tr>
                    <tr>
                        <td>MONTO</td>
                        <td tyle="text-align:right;">${_datos.monto}</td>
                    </tr>
                    <tr>
                        <td>FECHA Y HORA</td>
                        <td tyle="text-align:right;">${_datos.fecha}</td>
                    </tr>
                </tbody>
            </table>`;
}
function correoError(_datos) {
    // let referenciaHTML = (_datos.referencia) ? `<tr>
    //                         <td>REFERENCIA</td>
    //                         <td colspan="2">${_datos.referencia}</td>
    //                     </tr>` : '';
    // (_datos.referencia)
    return ` <table style="border: black 1px solid;border-collapse: collapse;">
                <thead>
                    <tr>
                        <th><bold>ERROR EN SU TRANSFERENCIA</bold></th>
                    </tr>
                    <tr>
                        <th><small>DATOS DEL MOVIMIENTO</small></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >Operación</td>
                        <td style="text-align:center;">TRANSFERENCIA ${_datos.transferecia}</td>
                    </tr>
                    <tr>
                        <td>CUENTA ORIGEN</td>
                        <td tyle="text-align:right;">SBEC ***${_datos.cuentaOrigen}</td>
                    </tr>
                    <tr>
                        <td>CUENTA DESTINO</td>
                        <td tyle="text-align:right;">SBEC ***${_datos.cuentaDestino}</td>
                    </tr>
                    <tr>
                        <td>MONTO</td>
                        <td tyle="text-align:right;">${_datos.monto}</td>
                    </tr>
                    <tr>
                        <td>FECHA Y HORA</td>
                        <td tyle="text-align:right;">${_datos.fecha}</td>
                    </tr>
                </tbody>
            </table>`;
}
const correoControllers = new correoController();
exports.default = correoControllers;
