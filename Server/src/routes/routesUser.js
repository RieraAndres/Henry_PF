const { Router } = require('express');
const routerForUsers = Router();

const {handlerRegisterUser,handlerUserData ,handleUserLogin} = require('../handlers/handlerUsers.js');

routerForUsers.post('/userLog', handlerRegisterUser); // Crea el registro para un usuario nuevo en la base de datos(crea una cuenta)
routerForUsers.get('/userData',handlerUserData ); //trae la informacion del usuario
routerForUsers.get('/userLogin',handleUserLogin) //devuelve el usuario si el usuario existe y la contraseña igresada es correcta

module.exports = routerForUsers;