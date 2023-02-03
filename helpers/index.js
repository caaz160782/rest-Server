const bcrypt       = require('./bcrypt');
const dbvalidators = require('./db-validators');
const googleverify = require('./google-verify');
const jwt          = require('./jwt');
const subirarchivo = require('./subir-archivo');

module.exports={
    ...bcrypt,
    ...dbvalidators,
    ...googleverify,
    ...jwt,
    ...subirarchivo}




