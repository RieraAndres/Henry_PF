const { Router } = require('express');
const routerForUsers = Router();

const handlerRegisterUser = require('../handlers/handlerUsers.js');

routerForUsers.post('/userLog', handlerRegisterUser); // Crea el registro para un usuario nuevo en la base de datos(crea una cuenta)

module.exports = routerForUsers;