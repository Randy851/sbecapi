"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const dbC = promise_mysql_1.default.createPool(keys_1.default.database);
dbC.getConnection()
    .then(connection => {
    dbC.releaseConnection(connection);
    console.log('Estas conectado a tu db ggg');
});
exports.default = dbC;
