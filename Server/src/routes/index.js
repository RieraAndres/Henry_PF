const { Router } = require('express');
const routes = Router();

//Imports rutas segun el modelo
const routerPets = require('./routesPets')
const routerForUsers = require('./routesUser.js') //----Marcos
const routerReview = require('./routerReview')
// const {} = require('./routesDonations')


routes.use('/mascotas', routerPets)  // Model : mascota
routes.use('/usuario', routerForUsers) // Model : User ----Marcos
routes.use('/review', routerReview)



// routes.use('/donacion', /*rutaDonacion*/) // Model : Donacion


module.exports = routes;