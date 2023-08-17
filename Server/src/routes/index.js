const { Router } = require('express');
const routes = Router();

//Imports rutas segun el modelo
const routerPets = require('./routesPets')
const routerForUsers = require('./routesUser.js') //----Marcos
const routesDonations = require('./routesDonations.js')
// const {} = require('./routesDonations')


routes.use('/mascotas', routerPets)  // Model : mascota
routes.use('/usuario', routerForUsers) // Model : User ----Marcos

// routes.use('/donacion', /*rutaDonacion*/) // Model : Donacion
routes.use('/donations', routesDonations)

module.exports = routes;