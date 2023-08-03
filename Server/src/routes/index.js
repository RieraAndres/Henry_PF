const { Router } = require('express');
const routes = Router();

//Imports rutas segun el modelo

//Imports rutas segun el modelo
const routerPets = require('./routesPets')
// const {} = require('./routesUser')
// const {} = require('./routesDonations')
// const {} = require('./routesAdoptions')

routes.use('/mascotas', routerPets)  // Model : Mascota
// routes.use('/usuario', /*rutaUser*/)      // Model : User
// routes.use('/donacion', /*rutaDonacion*/) // Model : Donacion
// routes.use('/Adopcion', /*rutaAdopcion*/) // Model : Adopcion


module.exports = routes;