const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const subirArchivo = require('./subirArchivo');


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...subirArchivo,
}
