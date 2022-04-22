import mysql from 'promise-mysql';

import keys from './keys';

const dbC = mysql.createPool(keys.database);

    dbC.getConnection()
        .then(connection => {
            dbC.releaseConnection(connection);
            console.log('Estas conectado a tu db ggg');
        });

export default dbC;
